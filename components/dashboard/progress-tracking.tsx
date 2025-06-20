"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { t } from "@/lib/simple-translations"
import { Target, Brain, Award, Activity, CheckCircle, Clock } from "lucide-react"

export function ProgressTracking() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const overallStats = {
    psychologyScore: 78,
    weeklyImprovement: 12,
    exercisesCompleted: 24,
    streakDays: 7,
    achievements: 8,
    totalSessions: 45,
  }

  const skillProgress = [
    {
      skill: "Emotional Control",
      current: 78,
      target: 85,
      improvement: 12,
      color: "bg-blue-500",
    },
    {
      skill: "Risk Management",
      current: 85,
      target: 90,
      improvement: 8,
      color: "bg-green-500",
    },
    {
      skill: "Decision Making",
      current: 72,
      target: 80,
      improvement: -3,
      color: "bg-purple-500",
    },
    {
      skill: "Stress Management",
      current: 80,
      target: 85,
      improvement: 15,
      color: "bg-orange-500",
    },
    {
      skill: "Discipline",
      current: 75,
      target: 85,
      improvement: 10,
      color: "bg-red-500",
    },
  ]

  const weeklyData = [
    { day: "Mon", score: 72, exercises: 2, sessions: 1 },
    { day: "Tue", score: 75, exercises: 3, sessions: 1 },
    { day: "Wed", score: 78, exercises: 2, sessions: 2 },
    { day: "Thu", score: 76, exercises: 4, sessions: 1 },
    { day: "Fri", score: 80, exercises: 3, sessions: 1 },
    { day: "Sat", score: 82, exercises: 2, sessions: 2 },
    { day: "Sun", score: 78, exercises: 1, sessions: 1 },
  ]

  const achievements = [
    {
      title: "7-Day Streak",
      description: "Completed exercises for 7 consecutive days",
      icon: "🔥",
      earned: true,
      date: "2024-01-15",
    },
    {
      title: "Emotional Master",
      description: "Achieved 80+ emotional control score",
      icon: "🧘",
      earned: true,
      date: "2024-01-12",
    },
    {
      title: "Risk Warrior",
      description: "Perfect risk management for 5 trades",
      icon: "🛡️",
      earned: true,
      date: "2024-01-10",
    },
    {
      title: "Discipline Champion",
      description: "Followed trading plan for 10 consecutive days",
      icon: "🏆",
      earned: false,
      progress: 70,
    },
  ]

  const recentMilestones = [
    {
      title: "Reached 75+ Psychology Score",
      date: "2 days ago",
      type: "score",
      icon: Brain,
    },
    {
      title: "Completed Advanced Risk Module",
      date: "5 days ago",
      type: "course",
      icon: Target,
    },
    {
      title: "Earned Emotional Control Badge",
      date: "1 week ago",
      type: "achievement",
      icon: Award,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t("progressTracking")}</h1>
        <p className="text-gray-600 mt-2">Track your trading psychology development</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("psychologyScore")}</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.psychologyScore}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+{overallStats.weeklyImprovement}%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("exercisesCompleted")}</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.exercisesCompleted}</div>
            <p className="text-xs text-muted-foreground">{t("thisMonth")}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.streakDays}</div>
            <p className="text-xs text-muted-foreground">Days in a row</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t("achievements")}</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.achievements}</div>
            <p className="text-xs text-muted-foreground">Badges earned</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="skills" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="skills">Skill Progress</TabsTrigger>
          <TabsTrigger value="weekly">Weekly View</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Psychology Skills Development</CardTitle>
              <CardDescription>Your progress across key trading psychology areas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {skillProgress.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${skill.color}`} />
                      <span className="font-medium">{skill.skill}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {skill.current}/{skill.target}
                      </span>
                      <Badge variant={skill.improvement > 0 ? "default" : "destructive"} className="text-xs">
                        {skill.improvement > 0 ? "+" : ""}
                        {skill.improvement}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={(skill.current / skill.target) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Current: {skill.current}</span>
                    <span>Target: {skill.target}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress Overview</CardTitle>
              <CardDescription>Your daily performance this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyData.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="font-medium w-12">{day.day}</div>
                      <div className="flex items-center space-x-2">
                        <Brain className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Score: {day.score}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{day.exercises} exercises</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">{day.sessions} sessions</span>
                      </div>
                    </div>
                    <Progress value={day.score} className="w-20 h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className={achievement.earned ? "border-green-200 bg-green-50" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <span className="text-lg">{achievement.title}</span>
                    {achievement.earned && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {achievement.earned ? (
                    <div className="flex items-center space-x-2">
                      <Badge variant="default" className="bg-green-600">
                        Earned
                      </Badge>
                      <span className="text-sm text-gray-600">{achievement.date}</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Milestones</CardTitle>
              <CardDescription>Your latest achievements and progress markers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMilestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg border">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <milestone.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{milestone.title}</p>
                      <p className="text-sm text-gray-600">{milestone.date}</p>
                    </div>
                    <Badge variant="outline">{milestone.type}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
