"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { t } from "@/lib/simple-translations"
import { AlertTriangle, CheckCircle, Target, DollarSign } from "lucide-react"

export function TradeBuilder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [tradeData, setTradeData] = useState({
    symbol: "",
    direction: "",
    entryPrice: "",
    stopLoss: "",
    takeProfit: "",
    positionSize: "",
    timeframe: "",
    strategy: "",
    reasoning: "",
    psychologyChecks: [],
  })

  const psychologyCheckpoints = [
    { id: "emotional-state", label: "I am in a calm, focused emotional state", checked: false },
    { id: "risk-management", label: "I have calculated my risk and it's within my limits", checked: false },
    { id: "strategy-alignment", label: "This trade aligns with my trading strategy", checked: false },
    { id: "no-revenge", label: "I am not revenge trading from previous losses", checked: false },
    { id: "clear-plan", label: "I have a clear exit plan for both profit and loss", checked: false },
    { id: "market-conditions", label: "Market conditions are suitable for this trade", checked: false },
  ]

  const steps = [
    { id: 1, title: t("tradeSetup"), description: t("defineTradeParameters") },
    { id: 2, title: t("psychologyCheck"), description: t("verifyMentalState") },
    { id: 3, title: t("riskAssessment"), description: t("calculateConfirmRisk") },
    { id: 4, title: t("finalReview"), description: t("reviewAndExecute") },
  ]

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="symbol">{t("tradingSymbol")}</Label>
                <Input
                  id="symbol"
                  placeholder="e.g., EURUSD, AAPL, BTC/USD"
                  value={tradeData.symbol}
                  onChange={(e) => setTradeData({ ...tradeData, symbol: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="direction">{t("direction")}</Label>
                <Select onValueChange={(selectedValue) => setTradeData({ ...tradeData, direction: selectedValue })}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectDirection")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="long">{t("longBuy")}</SelectItem>
                    <SelectItem value="short">{t("shortSell")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="entry">{t("entryPrice")}</Label>
                <Input
                  id="entry"
                  type="number"
                  placeholder="0.00"
                  value={tradeData.entryPrice}
                  onChange={(e) => setTradeData({ ...tradeData, entryPrice: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="stopLoss">{t("stopLoss")}</Label>
                <Input
                  id="stopLoss"
                  type="number"
                  placeholder="0.00"
                  value={tradeData.stopLoss}
                  onChange={(e) => setTradeData({ ...tradeData, stopLoss: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="takeProfit">{t("takeProfit")}</Label>
                <Input
                  id="takeProfit"
                  type="number"
                  placeholder="0.00"
                  value={tradeData.takeProfit}
                  onChange={(e) => setTradeData({ ...tradeData, takeProfit: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="reasoning">{t("tradeReasoning")}</Label>
              <Textarea
                id="reasoning"
                placeholder={t("explainWhyTakingTrade")}
                value={tradeData.reasoning}
                onChange={(e) => setTradeData({ ...tradeData, reasoning: e.target.value })}
                rows={4}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">{t("psychologyCheckpoint")}</h3>
              <p className="text-muted-foreground">{t("completePsychologicalChecks")}</p>
            </div>

            <div className="space-y-4">
              {psychologyCheckpoints.map((checkpoint) => (
                <div key={checkpoint.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <Checkbox
                    id={checkpoint.id}
                    checked={checkpoint.checked}
                    onCheckedChange={(checked) => {
                      // Update checkpoint state
                    }}
                  />
                  <div className="flex-1">
                    <Label htmlFor={checkpoint.id} className="text-sm font-medium">
                      {checkpoint.label}
                    </Label>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">{t("psychologyReminder")}</span>
              </div>
              <p className="text-yellow-700 mt-2 text-sm">{t("onlyProceedIfHonest")}</p>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">{t("riskAssessment")}</h3>
              <p className="text-muted-foreground">{t("reviewRiskParameters")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>{t("riskCalculation")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>{t("riskPerTrade")}:</span>
                    <span className="font-semibold">$250 (2.5%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("potentialProfit")}:</span>
                    <span className="font-semibold text-green-600">$500 (5.0%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("riskRewardRatio")}:</span>
                    <span className="font-semibold">1:2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("positionSize")}:</span>
                    <span className="font-semibold">0.5 {t("lots")}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>{t("tradeMetrics")}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t("riskLevel")}</span>
                      <Badge variant="outline" className="text-green-600">
                        {t("moderate")}
                      </Badge>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t("confidenceLevel")}</span>
                      <Badge variant="outline" className="text-blue-600">
                        {t("high")}
                      </Badge>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{t("setupQuality")}</span>
                      <Badge variant="outline" className="text-purple-600">
                        {t("excellent")}
                      </Badge>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t("tradeReadyForExecution")}</h3>
              <p className="text-muted-foreground">{t("tradePassedAllChecks")}</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t("tradeSummary")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">{t("symbol")}:</span>
                    <span className="ml-2 font-semibold">{tradeData.symbol || "EURUSD"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("direction")}:</span>
                    <span className="ml-2 font-semibold">{tradeData.direction || "Long"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("entry")}:</span>
                    <span className="ml-2 font-semibold">{tradeData.entryPrice || "1.0850"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("stopLoss")}:</span>
                    <span className="ml-2 font-semibold">{tradeData.stopLoss || "1.0800"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("takeProfit")}:</span>
                    <span className="ml-2 font-semibold">{tradeData.takeProfit || "1.0950"}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">{t("riskRewardRatio")}:</span>
                    <span className="ml-2 font-semibold">1:2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button className="flex-1" size="lg">
                {t("executeTrade")}
              </Button>
              <Button variant="outline" size="lg">
                {t("saveAsTemplate")}
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("tradeBuilderTitle")}</h1>
          <p className="text-muted-foreground mt-2">{t("planTradesWithPsychology")}</p>
        </div>
        <Badge variant="outline" className="text-blue-600">
          {t("step")} {currentStep} {t("of")} {steps.length}
        </Badge>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id ? "bg-blue-500 border-blue-500 text-white" : "border-gray-300 text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-semibold">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-20 h-0.5 mx-4 ${currentStep > step.id ? "bg-blue-500" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold">{steps[currentStep - 1]?.title}</h3>
            <p className="text-muted-foreground">{steps[currentStep - 1]?.description}</p>
          </div>

          {renderStepContent()}

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              {t("previous")}
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
              disabled={currentStep === steps.length}
            >
              {currentStep === steps.length ? t("complete") : t("next")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
