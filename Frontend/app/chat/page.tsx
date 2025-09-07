"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, FileText, Scale, Users } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  recommendations?: LawyerRecommendation[]
  legalCategory?: string
}

interface LawyerRecommendation {
  name: string
  specialty: string
  rating: number
  experience: string
  hourlyRate: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI legal assistant. I can help you understand your legal situation and recommend the right type of lawyer for your case. Please describe your legal issue in detail.",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "ai",
        timestamp: new Date(),
        recommendations: data.recommendations,
        legalCategory: data.legalCategory,
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">AI Legal Assistant</h1>
          <p className="text-muted-foreground">Get instant legal guidance and lawyer recommendations</p>
        </div>

        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Legal AI Chat
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        <AvatarFallback>
                          {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>

                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>

                        {message.legalCategory && (
                          <div className="mt-2">
                            <Badge variant="secondary" className="text-xs">
                              <Scale className="h-3 w-3 mr-1" />
                              {message.legalCategory}
                            </Badge>
                          </div>
                        )}

                        {message.recommendations && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs font-medium text-muted-foreground">Recommended Lawyers:</p>
                            {message.recommendations.map((lawyer, index) => (
                              <Card key={index} className="p-3 bg-background/50">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium text-sm">{lawyer.name}</h4>
                                  <Badge variant="outline" className="text-xs">
                                    {lawyer.rating}★
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mb-1">{lawyer.specialty}</p>
                                <p className="text-xs text-muted-foreground mb-1">{lawyer.experience}</p>
                                <p className="text-xs font-medium text-primary">{lawyer.hourlyRate}</p>
                              </Card>
                            ))}
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground mt-2">{message.timestamp.toLocaleTimeString()}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your legal issue..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Press Enter to send • This AI assistant provides general guidance only
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-sm">Document Generation</h3>
            </div>
            <p className="text-xs text-muted-foreground">Generate legal documents based on your case</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-sm">Lawyer Matching</h3>
            </div>
            <p className="text-xs text-muted-foreground">Find specialized lawyers for your case type</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Scale className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-sm">Case Analysis</h3>
            </div>
            <p className="text-xs text-muted-foreground">AI-powered legal case understanding</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
