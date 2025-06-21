"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { t } from "@/lib/simple-translations"
import { BookOpen, Play, Star, Users, Clock } from "lucide-react"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: number // in hours
  level: "beginner" | "intermediate" | "advanced"
  rating: number
  students: number
  progress: number
  isEnrolled: boolean
  isPremium: boolean
  modules: Module[]
  category: string
  thumbnail: string
}

interface Module {
  id: string
  title: string
  duration: number // in minutes
  isCompleted: boolean
  isLocked: boolean
  type: "video" | "reading" | "exercise" | "quiz"
}

export function CourseLearning() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("available")

  const courses: Course[] = [
    {
      id: "psychology-fundamentals",
      title: t("psychologyCoursesTitle"),
      description: t("masterBasicsOfTradingPsychology"),
      instructor: "Dr. Sarah Chen",
      duration: 8,
      level: "beginner",
      rating: 4.8,
      students: 2847,
      progress: 65,
      isEnrolled: true,
      isPremium: false,
      category: t("fundamentals"),
      thumbnail: "/placeholder.svg?height=200&width=300",
      modules: [
        {
          id: "1",
          title: "Introduction to Trading Psychology",
          duration: 45,
          isCompleted: true,
          isLocked: false,
          type: "video",
        },
        {
          id: "2",
          title: "Understanding Emotional Biases",
          duration: 60,
          isCompleted: true,
          isLocked: false,
          type: "video",
        },
        {
          id: "3",
          title: "The Fear and Greed Cycle",
          duration: 50,
          isCompleted: true,
          isLocked: false,
          type: "reading",
        },
        {
          id: "4",
          title: "Building Emotional Awareness",
          duration: 30,
          isCompleted: false,
          isLocked: false,
          type: "exercise",
        },
        {
          id: "5",
          title: "Cognitive Biases Assessment",
          duration: 25,
          isCompleted: false,
          isLocked: false,
          type: "quiz",
        },
        {
          id: "6",
          title: "Creating Your Psychology Plan",
          duration: 40,
          isCompleted: false,
          isLocked: true,
          type: "video",
        },
      ],
    },
    {
      id: "risk-management-psychology",
      title: t("riskManagement"),
      description: t("deepDiveIntoPsychologicalAspects"),
      instructor: "Marcus Rodriguez",
      duration: 12,
      level: "advanced",
      rating: 4.9,
      students: 1523,
      progress: 0,
      isEnrolled: false,
      isPremium: true,
      category: t("riskManagement"),
      thumbnail: "/placeholder.svg?height=200&width=300",
      modules: [
        {
          id: "1",
          title: "Risk Perception Psychology",
          duration: 90,
          isCompleted: false,
          isLocked: false,
          type: "video",
        },
        { id: "2", title: "Position Sizing Mindset", duration: 75, isCompleted: false, isLocked: true, type: "video" },
        { id: "3", title: "Stop Loss Psychology", duration: 60, isCompleted: false, isLocked: true, type: "reading" },
      ],
    },
    {
      id: "overcoming-fomo",
      title: t("emotionalControl"),
      description: t("learnPracticalStrategies"),
      instructor: "Emma Thompson",
      duration: 6,
      level: "intermediate",
      rating: 4.7,
      students: 3241,
      progress: 25,
      isEnrolled: true,
      isPremium: false,
      category: "behavioral-patterns",
      thumbnail: "/placeholder.svg?height=200&width=300",
      modules: [
        { id: "1", title: "Understanding FOMO", duration: 40, isCompleted: true, isLocked: false, type: "video" },
        {
          id: "2",
          title: "FOMO Triggers Identification",
          duration: 35,
          isCompleted: false,
          isLocked: false,
          type: "exercise",
        },
        {
          id: "3",
          title: "Patience Building Techniques",
          duration: 50,
          isCompleted: false,
          isLocked: true,
          type: "video",
        },
      ],
    },
    {
      id: "discipline-mastery",
      title: t("tradingDisciplineMastery"),
      description: t("buildUnshakeableDiscipline"),
      instructor: "Dr. James Wilson",
      duration: 10,
      level: "intermediate",
      rating: 4.6,
      students: 1876,
      progress: 0,
      isEnrolled: false,
      isPremium: false,
      category: t("discipline"),
      thumbnail: "/placeholder.svg?height=200&width=300",
      modules: [
        {
          id: "1",
          title: "The Psychology of Discipline",
          duration: 60,
          isCompleted: false,
          isLocked: false,
          type: "video",
        },
        { id: "2", title: "Creating Trading Rules", duration: 45, isCompleted: false, isLocked: true, type: "reading" },
      ],
    },
  ]

  const categories = [
    { id: "all", name: t("allCourses"), count: courses.length },
    { id: t("fundamentals"), name: t("fundamentals"), count: 1 },
    { id: t("riskManagement"), name: t("riskManagement"), count: 1 },
    { id: "behavioral-patterns", name: "Behavioral Patterns", count: 1 },
    { id: t("discipline"), name: t("discipline"), count: 1 },
  ]

  const enrolledCourses = courses.filter((course) => course.isEnrolled)
  const filteredCourses =
    selectedCategory === "all" ? courses : courses.filter((course) => course.category === selectedCategory)

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getModuleIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Play className="h-4 w-4 text-royal-blue-500" />
      case "reading":
        return <BookOpen className="h-4 w-4 text-green-500" />
      case "exercise":
        return <BookOpen className="h-4 w-4 text-purple-500" />
      case "quiz":
        return <BookOpen className="h-4 w-4 text-orange-500" />
      default:
        return <BookOpen className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("psychologyCoursesTitle")}</h1>
        <p className="text-muted-foreground mt-2">{t("psychologyCoursesSubtitle")}</p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">{t("availableCourses")}</TabsTrigger>
          <TabsTrigger value="enrolled">{t("enrolledCourses")}</TabsTrigger>
          <TabsTrigger value="progress">{t("courseProgress")}</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id ? "bg-gradient-to-r from-navy-600 to-royal-blue-500 text-white" : ""
                }
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {course.isPremium && (
                    <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900">
                      Premium
                    </Badge>
                  )}
                  {course.isEnrolled && (
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white">{t("enrolled")}</Badge>
                  )}
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getLevelColor(course.level)}>{t(course.level as any)}</Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{t("psychologyCoursesSubtitle")}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}h</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>

                    {course.isEnrolled && course.progress > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{t("courseProgress")}</span>
                          <span className="text-sm text-muted-foreground">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}

                    <Button className="w-full" variant={course.isEnrolled ? "default" : "outline"}>
                      {course.isEnrolled ? (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          {course.progress > 0 ? t("continueCourse") : t("startCourse")}
                        </>
                      ) : (
                        <>
                          <BookOpen className="h-4 w-4 mr-2" />
                          {t("startCourse")}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enrolled">
          <div className="space-y-4">
            {enrolledCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>
                        {t("courseDuration")}: {course.duration} {t("hoursAgo")}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{course.progress}%</div>
                      <div className="text-sm text-muted-foreground">{t("completed")}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={course.progress} className="mb-4" />
                  <Button>
                    <Play className="h-4 w-4 mr-2" />
                    {t("continueCourse")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>{t("overallProgress")}</CardTitle>
              <CardDescription>
                {t("courseProgress")} {t("analytics")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("courseProgress")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
