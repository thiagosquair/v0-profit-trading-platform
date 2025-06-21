"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, DollarSign, Target, BarChart3 } from "lucide-react"
import { t } from "@/lib/simple-translations"

export function TradeBuilder() {
  const [currentStep, setCurrentStep] = useState(1)

  const steps = [
    { id: 1, title: t("tradeSetup"), description: t("tradePlan") },
    { id: 2, title: t("psychologyAnalysis"), description: t("emotionalState") },
    { id: 3, title: t("riskAssessment"), description: t("riskManagement") },
    { id: 4, title: t("executeTrade"), description: t("tradingDecision") },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("tradeBuilderTitle")}</h1>
          <p className="text-muted-foreground mt-2">{t("tradeBuilderSubtitle")}</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t("newTrade")}
        </Button>
      </div>

      <Tabs defaultValue="builder" className="space-y-4">
        <TabsList>
          <TabsTrigger value="builder">{t("tradePlan")}</TabsTrigger>
          <TabsTrigger value="history">{t("tradeHistory")}</TabsTrigger>
          <TabsTrigger value="analytics">{t("analytics")}</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("newTrade")}</CardTitle>
              <CardDescription>
                {t("common.next")}: {steps[currentStep - 1]?.title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        currentStep >= step.id
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "border-gray-300 text-gray-500"
                      }`}
                    >
                      {step.id}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-2 ${currentStep > step.id ? "bg-blue-500" : "bg-gray-300"}`} />
                    )}
                  </div>
                ))}
              </div>

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>{t("tradingPair")}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="EUR/USD" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eurusd">EUR/USD</SelectItem>
                          <SelectItem value="gbpusd">GBP/USD</SelectItem>
                          <SelectItem value="usdjpy">USD/JPY</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>{t("timeframe")}</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="1H" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1m">1M</SelectItem>
                          <SelectItem value="5m">5M</SelectItem>
                          <SelectItem value="1h">1H</SelectItem>
                          <SelectItem value="4h">4H</SelectItem>
                          <SelectItem value="1d">1D</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>{t("entryPrice")}</Label>
                      <Input type="number" placeholder="1.0850" />
                    </div>
                    <div>
                      <Label>{t("stopLoss")}</Label>
                      <Input type="number" placeholder="1.0800" />
                    </div>
                    <div>
                      <Label>{t("takeProfit")}</Label>
                      <Input type="number" placeholder="1.0950" />
                    </div>
                  </div>

                  <div>
                    <Label>{t("tradeReason")}</Label>
                    <Textarea placeholder={t("tradeReason")} rows={3} />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label>{t("emotionalState")}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t("emotionalState")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calm">{t("neutral")}</SelectItem>
                        <SelectItem value="confident">{t("confidence")}</SelectItem>
                        <SelectItem value="anxious">{t("fear")}</SelectItem>
                        <SelectItem value="excited">{t("greed")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>{t("confidenceLevel")}</Label>
                    <div className="mt-2">
                      <Progress value={75} className="mb-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{t("low")}</span>
                        <span>75%</span>
                        <span>{t("high")}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <DollarSign className="h-5 w-5" />
                          <span>{t("riskAssessment")}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span>{t("positionSize")}:</span>
                          <span className="font-semibold">0.5 lots</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t("riskReward")}:</span>
                          <span className="font-semibold">1:2</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Risk per trade:</span>
                          <span className="font-semibold">$250 (2.5%)</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Target className="h-5 w-5" />
                          <span>{t("tradingDecision")}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span>{t("confidenceLevel")}:</span>
                          <Badge variant="outline" className="text-blue-600">
                            {t("high")}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>{t("emotionalState")}:</span>
                          <Badge variant="outline" className="text-green-600">
                            {t("neutral")}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Setup Quality:</span>
                          <Badge variant="outline" className="text-purple-600">
                            {t("high")}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="text-center space-y-4">
                  <div className="text-green-600 text-6xl">✓</div>
                  <h3 className="text-xl font-semibold">
                    {t("tradePlan")} {t("completed")}
                  </h3>
                  <p className="text-muted-foreground">{t("executeTrade")}</p>
                  <div className="flex justify-center space-x-4">
                    <Button size="lg">{t("executeTrade")}</Button>
                    <Button size="lg" variant="outline">
                      {t("saveTrade")}
                    </Button>
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  {t("common.previous")}
                </Button>
                <Button
                  onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                  disabled={currentStep === steps.length}
                >
                  {currentStep === steps.length ? t("complete") : t("common.next")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>{t("tradeHistory")}</CardTitle>
              <CardDescription>
                {t("tradePlan")} {t("analytics")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("tradeHistory")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>{t("performanceMetrics")}</span>
              </CardTitle>
              <CardDescription>
                {t("tradingDecision")} {t("analytics")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t("performanceMetrics")} {t("common.loading")}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
