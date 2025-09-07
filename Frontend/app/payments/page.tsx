"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CreditCard,
  Shield,
  Clock,
  DollarSign,
  Download,
  Eye,
  Plus,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Banknote,
  Receipt,
} from "lucide-react"

interface Transaction {
  id: string
  type: "payment" | "escrow" | "refund"
  amount: number
  status: "pending" | "completed" | "failed" | "disputed"
  description: string
  lawyer: string
  date: string
  escrowReleaseDate?: string
}

interface EscrowAccount {
  id: string
  lawyerName: string
  caseTitle: string
  amount: number
  status: "active" | "pending_release" | "released" | "disputed"
  createdDate: string
  releaseDate?: string
  milestones: {
    id: string
    description: string
    amount: number
    completed: boolean
    completedDate?: string
  }[]
}

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isProcessing, setIsProcessing] = useState(false)

  const transactions: Transaction[] = [
    {
      id: "txn_001",
      type: "escrow",
      amount: 2500,
      status: "completed",
      description: "Employment Contract Review - Sarah Johnson",
      lawyer: "Sarah Johnson",
      date: "2024-01-15",
      escrowReleaseDate: "2024-01-22",
    },
    {
      id: "txn_002",
      type: "payment",
      amount: 150,
      status: "completed",
      description: "Document Generation - NDA Template",
      lawyer: "System",
      date: "2024-01-12",
    },
    {
      id: "txn_003",
      type: "escrow",
      amount: 1800,
      status: "pending",
      description: "Divorce Consultation - Jennifer Martinez",
      lawyer: "Jennifer Martinez",
      date: "2024-01-10",
    },
  ]

  const escrowAccounts: EscrowAccount[] = [
    {
      id: "esc_001",
      lawyerName: "Jennifer Martinez",
      caseTitle: "Divorce Settlement Consultation",
      amount: 1800,
      status: "active",
      createdDate: "2024-01-10",
      milestones: [
        {
          id: "m1",
          description: "Initial consultation and case review",
          amount: 600,
          completed: true,
          completedDate: "2024-01-11",
        },
        {
          id: "m2",
          description: "Document preparation and filing",
          amount: 800,
          completed: false,
        },
        {
          id: "m3",
          description: "Final settlement negotiation",
          amount: 400,
          completed: false,
        },
      ],
    },
    {
      id: "esc_002",
      lawyerName: "Robert Williams",
      caseTitle: "Criminal Defense Consultation",
      amount: 3500,
      status: "pending_release",
      createdDate: "2024-01-05",
      releaseDate: "2024-01-20",
      milestones: [
        {
          id: "m1",
          description: "Case analysis and strategy development",
          amount: 1500,
          completed: true,
          completedDate: "2024-01-08",
        },
        {
          id: "m2",
          description: "Court representation and defense",
          amount: 2000,
          completed: true,
          completedDate: "2024-01-18",
        },
      ],
    },
  ]

  const handlePayment = async (amount: number, description: string) => {
    setIsProcessing(true)
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))
      // Handle success
    } catch (error) {
      console.error("Payment failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleEscrowRelease = async (escrowId: string, milestoneId?: string) => {
    try {
      await fetch("/api/escrow/release", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ escrowId, milestoneId }),
      })
      // Handle success
    } catch (error) {
      console.error("Escrow release failed:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Payments & Escrow</h1>
          <p className="text-muted-foreground text-lg">
            Secure payment processing and escrow management for legal services
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="escrow">Escrow Accounts</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Available Balance</p>
                      <p className="text-2xl font-bold">$1,247.50</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">In Escrow</p>
                      <p className="text-2xl font-bold">$5,300.00</p>
                    </div>
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending Release</p>
                      <p className="text-2xl font-bold">$3,500.00</p>
                    </div>
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                      <p className="text-2xl font-bold">$12,847.50</p>
                    </div>
                    <Receipt className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add Funds
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" placeholder="$0.00" type="number" />
                  </div>
                  <div>
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card-1234">•••• 1234 (Visa)</SelectItem>
                        <SelectItem value="card-5678">•••• 5678 (Mastercard)</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Add Funds
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Escrow Protection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Funds held securely until work completion</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Milestone-based payment releases</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Dispute resolution protection</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Automatic refunds for non-delivery</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {transaction.type === "escrow" ? (
                            <Shield className="h-4 w-4 text-primary" />
                          ) : transaction.type === "payment" ? (
                            <CreditCard className="h-4 w-4 text-primary" />
                          ) : (
                            <RefreshCw className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${transaction.amount.toLocaleString()}</p>
                        <Badge
                          variant={
                            transaction.status === "completed"
                              ? "default"
                              : transaction.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="escrow" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Escrow Accounts</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Escrow
              </Button>
            </div>

            <div className="space-y-6">
              {escrowAccounts.map((account) => (
                <Card key={account.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {account.caseTitle}
                          <Badge
                            variant={
                              account.status === "active"
                                ? "default"
                                : account.status === "pending_release"
                                  ? "secondary"
                                  : account.status === "released"
                                    ? "outline"
                                    : "destructive"
                            }
                          >
                            {account.status.replace("_", " ")}
                          </Badge>
                        </CardTitle>
                        <p className="text-muted-foreground">
                          Lawyer: {account.lawyerName} • Created: {account.createdDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">${account.amount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Total Escrow</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <h4 className="font-medium">Milestones</h4>
                      {account.milestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          className={`flex items-center justify-between p-4 border rounded-lg ${
                            milestone.completed ? "bg-green-50 border-green-200" : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {milestone.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <Clock className="h-5 w-5 text-muted-foreground" />
                            )}
                            <div>
                              <p className="font-medium">{milestone.description}</p>
                              {milestone.completedDate && (
                                <p className="text-sm text-muted-foreground">Completed: {milestone.completedDate}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-medium">${milestone.amount.toLocaleString()}</p>
                            {milestone.completed && account.status === "active" && (
                              <Button size="sm" onClick={() => handleEscrowRelease(account.id, milestone.id)}>
                                Release
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}

                      {account.status === "pending_release" && (
                        <div className="flex items-center gap-2 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                          <AlertCircle className="h-5 w-5 text-orange-600" />
                          <div className="flex-1">
                            <p className="font-medium text-orange-800">Pending Release</p>
                            <p className="text-sm text-orange-700">
                              Funds will be automatically released on {account.releaseDate}
                            </p>
                          </div>
                          <Button size="sm" onClick={() => handleEscrowRelease(account.id)}>
                            Release Now
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Transaction History</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4 font-medium">Date</th>
                        <th className="text-left p-4 font-medium">Description</th>
                        <th className="text-left p-4 font-medium">Type</th>
                        <th className="text-left p-4 font-medium">Amount</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b">
                          <td className="p-4">{transaction.date}</td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-muted-foreground">{transaction.lawyer}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">{transaction.type}</Badge>
                          </td>
                          <td className="p-4 font-medium">${transaction.amount.toLocaleString()}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                transaction.status === "completed"
                                  ? "default"
                                  : transaction.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {transaction.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment-methods" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Payment Methods</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <CreditCard className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 1234</p>
                        <p className="text-sm text-muted-foreground">Expires 12/26</p>
                      </div>
                    </div>
                    <Badge>Primary</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <CreditCard className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium">Mastercard ending in 5678</p>
                        <p className="text-sm text-muted-foreground">Expires 08/27</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Banknote className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Bank Account ending in 9012</p>
                        <p className="text-sm text-muted-foreground">Chase Bank</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Billing & Invoices</h2>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">$2,847</div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">$8,234</div>
                    <p className="text-sm text-muted-foreground">This Quarter</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">$12,847</div>
                    <p className="text-sm text-muted-foreground">This Year</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "INV-001",
                      date: "2024-01-15",
                      amount: 2500,
                      status: "Paid",
                      description: "Legal Consultation - Sarah Johnson",
                    },
                    {
                      id: "INV-002",
                      date: "2024-01-12",
                      amount: 150,
                      status: "Paid",
                      description: "Document Generation Fee",
                    },
                    {
                      id: "INV-003",
                      date: "2024-01-10",
                      amount: 1800,
                      status: "Pending",
                      description: "Divorce Consultation - Jennifer Martinez",
                    },
                  ].map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{invoice.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {invoice.id} • {invoice.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">${invoice.amount.toLocaleString()}</p>
                          <Badge variant={invoice.status === "Paid" ? "default" : "secondary"}>{invoice.status}</Badge>
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
