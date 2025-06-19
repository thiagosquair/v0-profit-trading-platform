"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { Eye, EyeOff, RefreshCw, Trash2 } from "lucide-react"

export function AssessmentDataViewer() {
  const [showData, setShowData] = useState(false)
  const [assessmentData, setAssessmentData] = useState<any>(null)
  const [completionData, setCompletionData] = useState<string | null>(null)
  const { user } = useAuth()

  const loadAssessmentData = () => {
    if (!user) return

    const userId = user.id
    const profileKey = `psychology_profile_${userId}`
    const completionKey = `assessment_completed_${userId}`
    const newSignupKey = `new_signup_${userId}`

    // Get assessment results
    const savedProfile = localStorage.getItem(profileKey)
    const completionTimestamp = localStorage.getItem(completionKey)
    const isNewSignup = localStorage.getItem(newSignupKey)

    setAssessmentData(savedProfile ? JSON.parse(savedProfile) : null)
    setCompletionData(completionTimestamp)

    console.log("=== ASSESSMENT DATA DEBUG ===")
    console.log("User ID:", userId)
    console.log("Profile Key:", profileKey)
    console.log("Completion Key:", completionKey)
    console.log("New Signup Flag:", isNewSignup)
    console.log("Saved Profile:", savedProfile)
    console.log("Completion Timestamp:", completionTimestamp)
    console.log("Parsed Data:", savedProfile ? JSON.parse(savedProfile) : null)
    console.log("==============================")
  }

  const clearAssessmentData = () => {
    if (!user) return

    const userId = user.id
    const profileKey = `psychology_profile_${userId}`
    const completionKey = `assessment_completed_${userId}`
    const newSignupKey = `new_signup_${userId}`

    localStorage.removeItem(profileKey)
    localStorage.removeItem(completionKey)
    localStorage.setItem(newSignupKey, "true") // Reset for testing

    setAssessmentData(null)
    setCompletionData(null)

    console.log("Assessment data cleared for user:", userId)
  }

  useEffect(() => {
    if (user) {
      loadAssessmentData()
    }
  }, [user])

  if (!user) {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <p className="text-yellow-800">Please log in to view assessment data</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-blue-800">
          <span>Assessment Data Debug</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowData(!showData)} className="text-blue-600">
              {showData ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showData ? "Hide" : "Show"} Data
            </Button>
            <Button variant="outline" size="sm" onClick={loadAssessmentData} className="text-blue-600">
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={clearAssessmentData} className="text-red-600 border-red-200">
              <Trash2 className="h-4 w-4" />
              Clear & Reset
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-blue-800">Status</h4>
            <Badge variant={assessmentData ? "default" : "secondary"}>
              {assessmentData ? "Completed" : "Not Completed"}
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-blue-800">Completion Date</h4>
            <p className="text-sm text-gray-600">
              {completionData ? new Date(Number.parseInt(completionData)).toLocaleString() : "Not completed"}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-blue-800">User ID</h4>
            <p className="text-sm text-gray-600 font-mono">{user.id}</p>
          </div>
        </div>

        {showData && assessmentData && (
          <div className="space-y-4 border-t pt-4">
            <h4 className="font-medium text-blue-800">Assessment Results</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h5 className="font-medium text-gray-700">Basic Info</h5>
                <div className="text-sm space-y-1">
                  <p>
                    <strong>Language:</strong> {assessmentData.language}
                  </p>
                  <p>
                    <strong>Completed:</strong> {new Date(assessmentData.completedAt).toLocaleString()}
                  </p>
                  <p>
                    <strong>User ID:</strong> {assessmentData.userId}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="font-medium text-gray-700">Answers</h5>
                <div className="text-sm space-y-1">
                  {Object.entries(assessmentData.answers || {}).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key.replace("_", " ")}:</strong> {value as string}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-3 rounded text-xs">
              <strong>Raw JSON:</strong>
              <pre className="mt-2 overflow-x-auto">{JSON.stringify(assessmentData, null, 2)}</pre>
            </div>
          </div>
        )}

        {showData && !assessmentData && (
          <div className="border-t pt-4">
            <p className="text-gray-600 text-sm">
              No assessment data found. Complete the assessment to see results here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
