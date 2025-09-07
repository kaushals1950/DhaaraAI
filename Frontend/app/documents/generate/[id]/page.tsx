"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Save, FileText, CheckCircle, HelpCircle } from "lucide-react"

interface FormField {
  id: string
  label: string
  type: "text" | "textarea" | "select" | "checkbox" | "date" | "number"
  required: boolean
  placeholder?: string
  options?: string[]
  helpText?: string
  validation?: string
}

interface DocumentSection {
  id: string
  title: string
  description: string
  fields: FormField[]
  completed: boolean
}

export default function DocumentGeneratorPage() {
  const params = useParams()
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)
  const [formData, setFormData] = useState<{ [key: string]: any }>({})
  const [sections, setSections] = useState<DocumentSection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [documentTitle, setDocumentTitle] = useState("")

  useEffect(() => {
    if (params.id) {
      fetchDocumentTemplate(params.id as string)
    }
  }, [params.id])

  const fetchDocumentTemplate = async (id: string) => {
    try {
      const response = await fetch(`/api/documents/templates/${id}`)
      const data = await response.json()
      setSections(data.sections)
      setDocumentTitle(data.title)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching template:", error)
      setIsLoading(false)
    }
  }

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }))
  }

  const validateSection = (sectionIndex: number) => {
    const section = sections[sectionIndex]
    const requiredFields = section.fields.filter((field) => field.required)

    return requiredFields.every((field) => {
      const value = formData[field.id]
      return value !== undefined && value !== "" && value !== null
    })
  }

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await fetch("/api/documents/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: params.id,
          title: documentTitle,
          data: formData,
          status: "draft",
        }),
      })
      // Show success message
    } catch (error) {
      console.error("Error saving document:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleGenerate = async () => {
    try {
      const response = await fetch("/api/documents/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: params.id,
          data: formData,
        }),
      })
      const result = await response.json()
      // Redirect to preview page
      router.push(`/documents/preview/${result.documentId}`)
    } catch (error) {
      console.error("Error generating document:", error)
    }
  }

  const completedSections = sections.filter((_, index) => validateSection(index)).length
  const progress = sections.length > 0 ? (completedSections / sections.length) * 100 : 0

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading document template...</p>
        </div>
      </div>
    )
  }

  if (sections.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Template Not Found</h1>
          <p className="text-muted-foreground">The document template you're looking for doesn't exist.</p>
          <Button className="mt-4" onClick={() => router.push("/documents")}>
            Back to Documents
          </Button>
        </div>
      </div>
    )
  }

  const currentSectionData = sections[currentSection]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="sm" onClick={() => router.push("/documents")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{documentTitle}</h1>
            <p className="text-muted-foreground">Complete the form to generate your legal document</p>
          </div>
          <Button variant="outline" onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Draft"}
          </Button>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedSections} of {sections.length} sections completed
              </span>
            </div>
            <Progress value={progress} className="mb-4" />
            <div className="flex gap-2">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`flex-1 h-2 rounded-full ${
                    validateSection(index) ? "bg-primary" : index === currentSection ? "bg-primary/50" : "bg-secondary"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Section Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      index === currentSection
                        ? "border-primary bg-primary/5"
                        : validateSection(index)
                          ? "border-green-200 bg-green-50"
                          : "border-border hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {validateSection(index) ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                      )}
                      <span className="text-sm font-medium">{section.title}</span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {currentSectionData.title}
                      {validateSection(currentSection) && <CheckCircle className="h-5 w-5 text-green-600" />}
                    </CardTitle>
                    <p className="text-muted-foreground mt-1">{currentSectionData.description}</p>
                  </div>
                  <Badge variant="outline">
                    {currentSection + 1} of {sections.length}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {currentSectionData.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={field.id} className="text-sm font-medium">
                        {field.label}
                        {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      {field.helpText && (
                        <div className="group relative">
                          <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                            {field.helpText}
                          </div>
                        </div>
                      )}
                    </div>

                    {field.type === "text" && (
                      <Input
                        id={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ""}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      />
                    )}

                    {field.type === "textarea" && (
                      <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        value={formData[field.id] || ""}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        rows={4}
                      />
                    )}

                    {field.type === "select" && (
                      <select
                        id={field.id}
                        value={formData[field.id] || ""}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                      >
                        <option value="">Select an option...</option>
                        {field.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}

                    {field.type === "checkbox" && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={field.id}
                          checked={formData[field.id] || false}
                          onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
                        />
                        <Label htmlFor={field.id} className="text-sm">
                          {field.placeholder}
                        </Label>
                      </div>
                    )}

                    {field.type === "date" && (
                      <Input
                        id={field.id}
                        type="date"
                        value={formData[field.id] || ""}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      />
                    )}

                    {field.type === "number" && (
                      <Input
                        id={field.id}
                        type="number"
                        placeholder={field.placeholder}
                        value={formData[field.id] || ""}
                        onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePreviousSection}
                    disabled={currentSection === 0}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex gap-2">
                    {currentSection === sections.length - 1 ? (
                      <Button
                        onClick={handleGenerate}
                        disabled={!validateSection(currentSection)}
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4" />
                        Generate Document
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNextSection}
                        disabled={!validateSection(currentSection)}
                        className="flex items-center gap-2"
                      >
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
