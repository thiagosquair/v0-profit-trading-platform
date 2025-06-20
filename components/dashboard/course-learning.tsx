"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { t } from "@/lib/simple-translations"
import {
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Star,
  Users,
  Award,
  TrendingUp,
  Brain,
  Target,
  Zap,
  Lock,
  PlayCircle,
} from "lucide-react"

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
  const [activeTab, setActiveTab] = useState("browse")

  const courses: Course[] = [
    {
      id: "psychology-fundamentals",
      title: t("tradingPsychologyFundamentals"),
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
      title: t("advancedRiskManagementPsychology"),
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
      title: t("overcomingFOMOInTrading"),
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
        return <PlayCircle className="h-4 w-4 text-royal-blue-500" />
      case "reading":
        return <BookOpen className="h-4 w-4 text-green-500" />
      case "exercise":
        return <Target className="h-4 w-4 text-purple-500" />
      case "quiz":
        return <Brain className="h-4 w-4 text-orange-500" />
      default:
        return <BookOpen className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t("psychologyCoursesTitle")}</h1>
          <p className="text-gray-600 mt-1">{t("structuredLearningPaths")}</p>
        </div>
        <Badge variant="secondary" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          {enrolledCourses.length} {t("enrolled")}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">{t("browseCourses")}</TabsTrigger>
          <TabsTrigger value="enrolled">{t("myCourses")}</TabsTrigger>
          <TabsTrigger value="progress">{t("progress")}</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
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
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg?height=24&width=24" />
                        <AvatarFallback>
                          {course.instructor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{course.instructor}</span>
                    </div>

                    {course.isEnrolled && (
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{t("progress")}</span>
                          <span className="text-sm text-gray-600">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}

                    <Button
                      className={`w-full ${
                        course.isEnrolled
                          ? "bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white"
                          : ""
                      }`}
                      variant={course.isEnrolled ? "default" : "outline"}
                    >
                      {course.isEnrolled ? (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          {t("continueLearning")}
                        </>
                      ) : (
                        <>
                          <BookOpen className="h-4 w-4 mr-2" />
                          {t("enrollNow")}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enrolled" className="space-y-6">
          {enrolledCourses.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("noCoursesEnrolled")}</h3>
                <p className="text-gray-600 mb-4">{t("startLearningJourney")}</p>
                <Button onClick={() => setActiveTab("browse")}>{t("browseCourses")}</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <CardDescription className="mt-2">{course.description}</CardDescription>
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {course.duration}h {t("totalEnrolled")}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4" />
                            <span>
                              {course.modules.filter((m) => m.isCompleted).length}/{course.modules.length}{" "}
                              {t("modulesCompleted")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-royal-blue-600">{course.progress}%</div>
                        <div className="text-sm text-gray-600">{t("completionRate")}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Progress value={course.progress} className="h-2" />

                      <div className="space-y-2">
                        <h4 className="font-semibold">{t("courseModules")}</h4>
                        {course.modules.map((module, index) => (
                          <div
                            key={module.id}
                            className={`flex items-center justify-between p-3 rounded-lg border ${
                              module.isCompleted
                                ? "bg-green-50 border-green-200"
                                : module.isLocked
                                  ? "bg-gray-50 border-gray-200"
                                  : "bg-blue-50 border-blue-200"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-2">
                                {getModuleIcon(module.type)}
                                {module.isCompleted ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : module.isLocked ? (
                                  <Lock className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <div className="h-4 w-4 rounded-full border-2 border-royal-blue-500" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium">{module.title}</div>
                                <div className="text-sm text-gray-600">
                                  {module.duration} {t("minutes")}
                                </div>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant={module.isCompleted ? "outline" : "default"}
                              disabled={module.isLocked}
                              className={
                                !module.isCompleted && !module.isLocked
                                  ? "bg-gradient-to-r from-navy-600 to-royal-blue-500 hover:from-navy-700 hover:to-royal-blue-600 text-white"
                                  : ""
                              }
                            >
                              {module.isCompleted ? t("review") : module.isLocked ? t("locked") : t("start")}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-royal-blue-500" />
                  {t("coursesEnrolled")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-royal-blue-600 mb-2">{enrolledCourses.length}</div>
                <p className="text-sm text-gray-600">{t("activeLearningPaths")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  {t("modulesCompletedTotal")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {enrolledCourses.reduce((acc, course) => acc + course.modules.filter((m) => m.isCompleted).length, 0)}
                </div>
                <p className="text-sm text-gray-600">{t("learningMilestonesAchieved")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-500" />
                  {t("learningTime")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {enrolledCourses.reduce(
                    (acc, course) =>
                      acc + course.modules.filter((m) => m.isCompleted).reduce((sum, m) => sum + m.duration, 0),
                    0,
                  )}
                  m
                </div>
                <p className="text-sm text-gray-600">{t("minutesOfFocusedLearning")}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t("learningAchievements")}</CardTitle>
              <CardDescription>{t("courseCompletionMilestones")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">{t("firstCourseStarted")}</h4>
                      <p className="text-sm text-green-600">{t("beganPsychologyLearningJourney")}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white">{t("earned")}</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-blue-800">{t("consistentLearner")}</h4>
                      <p className="text-sm text-blue-600">{t("completeModules3Days")}</p>
                    </div>
                  </div>
                  <Badge variant="outline">2/3 {t("days")}</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <Zap className="h-8 w-8 text-gray-400" />
                    <div>
                      <h4 className="font-semibold text-gray-600">{t("courseCompletion")}</h4>
                      <p className="text-sm text-gray-500">{t("completeFirstFullCourse")}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{t("locked")}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
