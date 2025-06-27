import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Funded Career Builder | TradeLinx",
  description: "Your path to becoming a professional funded trader.",
};

export default function FundedCareerBuilderPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"not_started" | "in_progress" | "completed" | "failed">("not_started");

  const handleStartProgram = () => {
    setStatus("in_progress");
    setProgress(0);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        setStatus("completed");
      }
    }, 500);
  };

  const programSteps = [
    {
      title: "Complete Trading Education",
      description: "Master fundamental and advanced trading concepts.",
      status: "completed",
    },
    {
      title: "Pass Evaluation Phase 1",
      description: "Achieve profit target with strict risk management.",
      status: "in_progress",
    },
    {
      title: "Pass Evaluation Phase 2",
      description: "Demonstrate consistent profitability and discipline.",
      status: "not_started",
    },
    {
      title: "Receive Funded Account",
      description: "Get access to capital and start trading live.",
      status: "not_started",
    },
  ];

  const latestUpdates = [
    {
      id: 1,
      title: "New educational module released: Advanced Risk Management",
      date: "2023-10-26",
    },
    {
      id: 2,
      title: "Evaluation Phase 1 requirements updated",
      date: "2023-10-20",
    },
    {
      id: 3,
      title: "Live webinar: Trading Psychology for Funded Traders",
      date: "2023-10-15",
    },
  ].slice(0, 3);

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Funded Career Builder Program</CardTitle>
              <CardDescription>
                Your path to becoming a professional funded trader. Follow the steps below to achieve your goals.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                This program is designed to guide you through the necessary stages to acquire a funded trading account.
                Each step is crucial for developing the skills and discipline required for professional trading.
              </p>
              <Button onClick={handleStartProgram} disabled={status === "in_progress"}>
                {status === "not_started" && "Start Program"}
                {status === "in_progress" && (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Program In Progress...
                  </>
                )}
                {status === "completed" && "Program Completed"}
                {status === "failed" && "Program Failed - Retry"}
              </Button>
              {status === "in_progress" && (
                <div className="space-y-2">
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-muted-foreground text-center">{progress}% Complete</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Program Steps</CardTitle>
                <CardDescription>Overview of your journey</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {programSteps.map((step, index) => (
                    <li key={index} className="flex items-center">
                      {step.status === "completed" && <CheckCircle className="text-green-500 mr-2" />}
                      {step.status === "in_progress" && <Loader2 className="animate-spin text-blue-500 mr-2" />}
                      {step.status === "not_started" && <XCircle className="text-gray-400 mr-2" />}
                      <div>
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Latest Updates</CardTitle>
                <CardDescription>Stay informed about program news</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {latestUpdates.map((update) => (
                    <li key={update.id} className="flex items-center">
                      <span className="text-sm text-muted-foreground mr-3">{update.date}:</span>
                      <p className="text-sm font-medium">{update.title}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Progress</CardTitle>
              <CardDescription>Detailed breakdown of your progress in the program.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Progress tracking features will be implemented here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Access educational materials, webinars, and tools.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Resource links and content will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about the program.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">FAQ content will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Program Settings</CardTitle>
              <CardDescription>Manage your program preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Settings options will be available here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


