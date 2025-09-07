"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Search,
  Plus,
  Download,
  Eye,
  Edit,
  Clock,
  Star,
  Briefcase,
  Home,
  Users,
  Building,
  Scale,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

interface DocumentTemplate {
  id: string
  title: string
  description: string
  category: string
  complexity: "Simple" | "Intermediate" | "Complex"
  estimatedTime: string
  price: number
  rating: number
  usageCount: number
  fields: string[]
  icon: React.ReactNode
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedComplexity, setSelectedComplexity] = useState("all")

  const documentTemplates: DocumentTemplate[] = [
    {
      id: "1",
      title: "Last Will and Testament",
      description: "Create a comprehensive will to distribute your assets and name guardians for minor children.",
      category: "Estate Planning",
      complexity: "Intermediate",
      estimatedTime: "15-20 minutes",
      price: 49,
      rating: 4.8,
      usageCount: 1247,
      fields: ["Personal Information", "Assets", "Beneficiaries", "Executor", "Guardianship"],
      icon: <FileText className="h-6 w-6" />,
    },
    {
      id: "2",
      title: "Power of Attorney",
      description: "Grant someone the legal authority to act on your behalf in financial or medical matters.",
      category: "Estate Planning",
      complexity: "Simple",
      estimatedTime: "10-15 minutes",
      price: 29,
      rating: 4.9,
      usageCount: 892,
      fields: ["Principal Information", "Agent Details", "Powers Granted", "Limitations"],
      icon: <Scale className="h-6 w-6" />,
    },
    {
      id: "3",
      title: "Employment Contract",
      description: "Comprehensive employment agreement covering salary, benefits, and terms of employment.",
      category: "Employment",
      complexity: "Complex",
      estimatedTime: "25-30 minutes",
      price: 79,
      rating: 4.7,
      usageCount: 634,
      fields: ["Employee Info", "Job Description", "Compensation", "Benefits", "Termination"],
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      id: "4",
      title: "Non-Disclosure Agreement",
      description: "Protect confidential information shared between parties in business relationships.",
      category: "Business",
      complexity: "Simple",
      estimatedTime: "8-12 minutes",
      price: 19,
      rating: 4.6,
      usageCount: 1456,
      fields: ["Parties", "Confidential Information", "Obligations", "Duration"],
      icon: <Building className="h-6 w-6" />,
    },
    {
      id: "5",
      title: "Residential Lease Agreement",
      description: "Standard rental agreement for residential properties with customizable terms.",
      category: "Real Estate",
      complexity: "Intermediate",
      estimatedTime: "20-25 minutes",
      price: 39,
      rating: 4.8,
      usageCount: 987,
      fields: ["Property Details", "Tenant Info", "Rent Terms", "Rules", "Security Deposit"],
      icon: <Home className="h-6 w-6" />,
    },
    {
      id: "6",
      title: "Divorce Settlement Agreement",
      description: "Comprehensive agreement covering asset division, custody, and support arrangements.",
      category: "Family Law",
      complexity: "Complex",
      estimatedTime: "35-45 minutes",
      price: 99,
      rating: 4.9,
      usageCount: 423,
      fields: ["Parties", "Assets", "Debts", "Child Custody", "Support", "Property Division"],
      icon: <Users className="h-6 w-6" />,
    },
  ]

  const categories = ["Estate Planning", "Employment", "Business", "Real Estate", "Family Law", "Personal Injury"]

  const filteredTemplates = documentTemplates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory

    const matchesComplexity = selectedComplexity === "all" || template.complexity === selectedComplexity

    return matchesSearch && matchesCategory && matchesComplexity
  })

  const recentDocuments = [
    {
      id: "1",
      title: "Employment Contract - John Smith",
      status: "Draft",
      lastModified: "2 hours ago",
      progress: 75,
    },
    {
      id: "2",
      title: "NDA - Tech Startup Consulting",
      status: "Completed",
      lastModified: "1 day ago",
      progress: 100,
    },
    {
      id: "3",
      title: "Will and Testament - Sarah Johnson",
      status: "In Review",
      lastModified: "3 days ago",
      progress: 90,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Legal Documents</h1>
          <p className="text-muted-foreground text-lg">
            Generate professional legal documents with AI-powered templates and expert guidance
          </p>
        </div>

        <Tabs defaultValue="templates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Document Templates</TabsTrigger>
            <TabsTrigger value="my-documents">My Documents</TabsTrigger>
            <TabsTrigger value="ai-generator">AI Generator</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search document templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                value={selectedComplexity}
                onChange={(e) => setSelectedComplexity(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Complexity</option>
                <option value="Simple">Simple</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Complex">Complex</option>
              </select>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">{template.icon}</div>
                        <div>
                          <CardTitle className="text-lg">{template.title}</CardTitle>
                          <Badge variant="outline" className="mt-1">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                      <Badge
                        variant={
                          template.complexity === "Simple"
                            ? "default"
                            : template.complexity === "Intermediate"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {template.complexity}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{template.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{template.rating}</span>
                        <span className="text-muted-foreground">({template.usageCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{template.estimatedTime}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {template.fields.slice(0, 3).map((field) => (
                        <Badge key={field} variant="secondary" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                      {template.fields.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.fields.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-lg font-bold text-primary">${template.price}</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/documents/generate/${template.id}`}>
                            <Plus className="h-4 w-4 mr-1" />
                            Create
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-documents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Documents</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Document
              </Button>
            </div>

            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <Card key={doc.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{doc.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <Badge
                              variant={
                                doc.status === "Completed"
                                  ? "default"
                                  : doc.status === "Draft"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {doc.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Last modified {doc.lastModified}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-right mr-4">
                          <div className="text-sm font-medium">{doc.progress}% Complete</div>
                          <div className="w-24 bg-secondary rounded-full h-2 mt-1">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${doc.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ai-generator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Document Generator</CardTitle>
                <p className="text-muted-foreground">
                  Describe your legal needs and let our AI create a custom document for you
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">What type of document do you need?</label>
                  <Input placeholder="e.g., Employment contract for remote software developer..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Describe your specific requirements</label>
                  <textarea
                    className="w-full min-h-[120px] px-3 py-2 border border-input bg-background rounded-md text-sm resize-none"
                    placeholder="Provide details about parties involved, key terms, special conditions, etc..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Document
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat with AI
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <p className="text-sm text-muted-foreground">Document Types</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10k+</div>
                  <p className="text-sm text-muted-foreground">Documents Generated</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">98%</div>
                  <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
