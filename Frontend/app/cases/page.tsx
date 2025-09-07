"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  MessageSquare,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  Plus,
  Filter,
  Bell,
  TrendingUp,
} from "lucide-react"

interface CaseUpdate {
  id: string
  type: "milestone" | "document" | "payment" | "communication" | "court_date"
  title: string
  description: string
  date: string
  status: "completed" | "pending" | "upcoming"
  attachments?: string[]
}

interface Case {
  id: string
  title: string
  lawyerName: string
  lawyerAvatar?: string
  caseType: string
  status: "active" | "pending" | "completed" | "on_hold"
  progress: number
  startDate: string
  expectedCompletion?: string
  totalCost: number
  paidAmount: number
  nextMilestone: string
  updates: CaseUpdate[]
  priority: "high" | "medium" | "low"
}

export default function CasesPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCase, setSelectedCase] = useState<string | null>("case_1")

  const cases: Case[] = [
    {
      id: "case_1",
      title: "Employment Contract Review",
      lawyerName: "Sarah Johnson",
      caseType: "Employment Law",
      status: "active",
      progress: 75,
      startDate: "2024-01-10",
      expectedCompletion: "2024-01-25",
      totalCost: 2500,
      paidAmount: 1875,
      nextMilestone: "Final contract review and signing",
      priority: "high",
      updates: [
        {
          id: "update_1",
          type: "milestone",
          title: "Initial Contract Analysis Completed",
          description: "Reviewed all contract terms and identified key areas for negotiation",
          date: "2024-01-15",
          status: "completed",
        },
        {
          id: "update_2",
          type: "document",
          title: "Negotiation Points Document",
          description: "Prepared detailed document outlining recommended changes",
          date: "2024-01-17",
          status: "completed",
          attachments: ["negotiation_points.pdf"],
        },
        {
          id: "update_3",
          type: "communication",
          title: "Client Meeting Scheduled",
          description: "Video call scheduled to discuss negotiation strategy",
          date: "2024-01-20",
          status: "upcoming",
        },
      ],
    },
    {
      id: "case_2",
      title: "Divorce Settlement",
      lawyerName: "Jennifer Martinez",
      caseType: "Family Law",
      status: "active",
      progress: 45,
      startDate: "2024-01-05",
      expectedCompletion: "2024-03-15",
      totalCost: 5000,
      paidAmount: 2250,
      nextMilestone: "Asset valuation and division proposal",
      priority: "medium",
      updates: [
        {
          id: "update_4",
          type: "court_date",
          title: "Mediation Session Scheduled",
          description: "Court-ordered mediation session with opposing party",
          date: "2024-01-25",
          status: "upcoming",
        },
      ],
    },
    {
      id: "case_3",
      title: "Criminal Defense Consultation",
      lawyerName: "Robert Williams",
      caseType: "Criminal Defense",
      status: "completed",
      progress: 100,
      startDate: "2023-12-15",
      expectedCompletion: "2024-01-18",
      totalCost: 3500,
      paidAmount: 3500,
      nextMilestone: "Case closed - charges dismissed",
      priority: "high",
      updates: [
        {
          id: "update_5",
          type: "milestone",
          title: "Case Successfully Resolved",
          description: "All charges dismissed due to insufficient evidence",
          date: "2024-01-18",
          status: "completed",
        },
      ],
    },
  ]

  const selectedCaseData = cases.find((c) => c.id === selectedCase)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "pending":
        return "secondary"
      case "completed":
        return "outline"
      case "on_hold":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "milestone":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "document":
        return <FileText className="h-4 w-4 text-blue-600" />
      case "payment":
        return <DollarSign className="h-4 w-4 text-purple-600" />
      case "communication":
        return <MessageSquare className="h-4 w-4 text-orange-600" />
      case "court_date":
        return <Calendar className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Case Tracking</h1>
          <p className="text-muted-foreground text-lg">
            Monitor your legal cases, track progress, and stay updated on important milestones
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Cases</p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Completed Cases</p>
                      <p className="text-2xl font-bold">1</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending Updates</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <Bell className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                      <p className="text-2xl font-bold">$11,000</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cases List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>My Cases</CardTitle>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {cases.map((case_) => (
                      <button
                        key={case_.id}
                        onClick={() => setSelectedCase(case_.id)}
                        className={`w-full text-left p-4 hover:bg-muted transition-colors ${
                          selectedCase === case_.id ? "bg-muted" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium truncate">{case_.title}</h3>
                          <Badge variant={getStatusColor(case_.status)} className="text-xs">
                            {case_.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{case_.lawyerName}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {case_.caseType}
                          </Badge>
                          <span className={`text-xs font-medium ${getPriorityColor(case_.priority)}`}>
                            {case_.priority} priority
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>Progress</span>
                            <span>{case_.progress}%</span>
                          </div>
                          <Progress value={case_.progress} className="h-1" />
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Case Details */}
              <Card className="lg:col-span-2">
                {selectedCaseData ? (
                  <>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {selectedCaseData.title}
                            <Badge variant={getStatusColor(selectedCaseData.status)}>{selectedCaseData.status}</Badge>
                          </CardTitle>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={selectedCaseData.lawyerAvatar || "/placeholder.svg"} />
                                <AvatarFallback className="text-xs">
                                  {selectedCaseData.lawyerName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{selectedCaseData.lawyerName}</span>
                            </div>
                            <span>Started: {selectedCaseData.startDate}</span>
                            {selectedCaseData.expectedCompletion && (
                              <span>Expected: {selectedCaseData.expectedCompletion}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Progress Section */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">Case Progress</h4>
                          <span className="text-sm font-medium">{selectedCaseData.progress}%</span>
                        </div>
                        <Progress value={selectedCaseData.progress} className="mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Next milestone: {selectedCaseData.nextMilestone}
                        </p>
                      </div>

                      {/* Financial Summary */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground">Total Cost</p>
                          <p className="text-xl font-bold">${selectedCaseData.totalCost.toLocaleString()}</p>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <p className="text-sm font-medium text-muted-foreground">Paid Amount</p>
                          <p className="text-xl font-bold text-green-600">
                            ${selectedCaseData.paidAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Recent Updates */}
                      <div>
                        <h4 className="font-medium mb-3">Recent Updates</h4>
                        <div className="space-y-3">
                          {selectedCaseData.updates.slice(0, 3).map((update) => (
                            <div key={update.id} className="flex items-start gap-3 p-3 border rounded-lg">
                              {getUpdateIcon(update.type)}
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <h5 className="font-medium text-sm">{update.title}</h5>
                                  <span className="text-xs text-muted-foreground">{update.date}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{update.description}</p>
                                {update.attachments && (
                                  <div className="flex gap-2 mt-2">
                                    {update.attachments.map((attachment, index) => (
                                      <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        className="text-xs bg-transparent"
                                      >
                                        <FileText className="h-3 w-3 mr-1" />
                                        {attachment}
                                      </Button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a case to view details</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Case Timeline</CardTitle>
                <p className="text-muted-foreground">Chronological view of all case activities and milestones</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {selectedCaseData?.updates.map((update, index) => (
                    <div key={update.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="p-2 bg-primary/10 rounded-full">{getUpdateIcon(update.type)}</div>
                        {index < selectedCaseData.updates.length - 1 && (
                          <div className="w-px h-12 bg-border mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{update.title}</h3>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                update.status === "completed"
                                  ? "default"
                                  : update.status === "pending"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs"
                            >
                              {update.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{update.date}</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground">{update.description}</p>
                        {update.attachments && (
                          <div className="flex gap-2 mt-3">
                            {update.attachments.map((attachment, idx) => (
                              <Button key={idx} variant="outline" size="sm" className="bg-transparent">
                                <FileText className="h-4 w-4 mr-2" />
                                {attachment}
                                <Download className="h-4 w-4 ml-2" />
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Case Documents</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Employment_Contract_Original.pdf",
                  type: "Contract",
                  date: "2024-01-10",
                  size: "245 KB",
                },
                {
                  name: "Negotiation_Points.pdf",
                  type: "Analysis",
                  date: "2024-01-17",
                  size: "156 KB",
                },
                {
                  name: "Revised_Contract_Draft.pdf",
                  type: "Draft",
                  date: "2024-01-19",
                  size: "267 KB",
                },
              ].map((doc, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.date} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">$7,625</div>
                    <p className="text-sm text-muted-foreground">Total Paid</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">$3,375</div>
                    <p className="text-sm text-muted-foreground">Outstanding</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">$11,000</div>
                    <p className="text-sm text-muted-foreground">Total Budget</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      invoice: "INV-001",
                      description: "Employment Contract Review - Initial Payment",
                      amount: 1875,
                      date: "2024-01-10",
                      status: "Paid",
                    },
                    {
                      invoice: "INV-002",
                      description: "Divorce Settlement - Retainer",
                      amount: 2250,
                      date: "2024-01-05",
                      status: "Paid",
                    },
                    {
                      invoice: "INV-003",
                      description: "Criminal Defense - Final Payment",
                      amount: 3500,
                      date: "2024-01-18",
                      status: "Paid",
                    },
                  ].map((bill, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{bill.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {bill.invoice} • {bill.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">${bill.amount.toLocaleString()}</p>
                          <Badge variant={bill.status === "Paid" ? "default" : "secondary"}>{bill.status}</Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
