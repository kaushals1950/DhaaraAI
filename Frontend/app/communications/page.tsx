"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Video,
  Phone,
  MessageSquare,
  Calendar,
  FileText,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Share,
  Download,
  Upload,
  Clock,
  Settings,
  CreditCard as Record,
  Pause,
  Play,
  Eye,
} from "lucide-react"

interface CallSession {
  id: string
  lawyerName: string
  lawyerAvatar?: string
  status: "scheduled" | "active" | "ended" | "missed"
  type: "video" | "audio"
  scheduledTime: string
  duration?: string
  recordingUrl?: string
}

interface Message {
  id: string
  senderId: string
  senderName: string
  senderType: "client" | "lawyer"
  content: string
  timestamp: Date
  attachments?: {
    id: string
    name: string
    type: string
    size: number
    url: string
  }[]
  read: boolean
}

interface Conversation {
  id: string
  lawyerName: string
  lawyerAvatar?: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  caseTitle: string
}

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState("calls")
  const [isInCall, setIsInCall] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)

  const callSessions: CallSession[] = [
    {
      id: "call_1",
      lawyerName: "Sarah Johnson",
      status: "scheduled",
      type: "video",
      scheduledTime: "Today, 2:00 PM",
    },
    {
      id: "call_2",
      lawyerName: "Jennifer Martinez",
      status: "ended",
      type: "video",
      scheduledTime: "Yesterday, 10:00 AM",
      duration: "45 minutes",
      recordingUrl: "/recordings/call_2.mp4",
    },
    {
      id: "call_3",
      lawyerName: "Robert Williams",
      status: "missed",
      type: "audio",
      scheduledTime: "Jan 15, 3:00 PM",
    },
  ]

  const conversations: Conversation[] = [
    {
      id: "conv_1",
      lawyerName: "Sarah Johnson",
      lastMessage: "I've reviewed your employment contract. Let's discuss the terms.",
      lastMessageTime: "2 hours ago",
      unreadCount: 2,
      caseTitle: "Employment Contract Review",
    },
    {
      id: "conv_2",
      lawyerName: "Jennifer Martinez",
      lastMessage: "The divorce papers are ready for your review.",
      lastMessageTime: "1 day ago",
      unreadCount: 0,
      caseTitle: "Divorce Settlement",
    },
    {
      id: "conv_3",
      lawyerName: "Robert Williams",
      lastMessage: "Thank you for the additional documents.",
      lastMessageTime: "3 days ago",
      unreadCount: 1,
      caseTitle: "Criminal Defense",
    },
  ]

  const messages: Message[] = [
    {
      id: "msg_1",
      senderId: "lawyer_1",
      senderName: "Sarah Johnson",
      senderType: "lawyer",
      content: "I've reviewed your employment contract. There are a few clauses we should discuss.",
      timestamp: new Date("2024-01-20T14:30:00"),
      read: true,
    },
    {
      id: "msg_2",
      senderId: "client_1",
      senderName: "You",
      senderType: "client",
      content: "Thank you for the quick review. What are your main concerns?",
      timestamp: new Date("2024-01-20T14:35:00"),
      read: true,
    },
    {
      id: "msg_3",
      senderId: "lawyer_1",
      senderName: "Sarah Johnson",
      senderType: "lawyer",
      content:
        "The non-compete clause is quite broad and the termination conditions need clarification. I've attached my detailed notes.",
      timestamp: new Date("2024-01-20T14:40:00"),
      attachments: [
        {
          id: "att_1",
          name: "Contract_Review_Notes.pdf",
          type: "application/pdf",
          size: 245760,
          url: "/attachments/contract_notes.pdf",
        },
      ],
      read: false,
    },
  ]

  const startCall = async (callId: string, type: "video" | "audio") => {
    try {
      setIsInCall(true)
      // In a real app, this would initialize WebRTC connection
      if (type === "video" && videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      console.error("Error starting call:", error)
    }
  }

  const endCall = () => {
    setIsInCall(false)
    setIsMuted(false)
    setIsVideoOff(false)
    setIsRecording(false)
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    try {
      await fetch("/api/communications/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: selectedConversation,
          content: newMessage,
        }),
      })
      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("conversationId", selectedConversation || "")

      await fetch("/api/communications/upload", {
        method: "POST",
        body: formData,
      })
    } catch (error) {
      console.error("Error uploading file:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Communications</h1>
          <p className="text-muted-foreground text-lg">
            Secure video calls, messaging, and file sharing with your legal team
          </p>
        </div>

        {isInCall && (
          <Card className="mb-6 bg-black text-white">
            <CardContent className="p-0 relative">
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                  style={{ display: isVideoOff ? "none" : "block" }}
                />
                {isVideoOff && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <VideoOff className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-400">Video is off</p>
                    </div>
                  </div>
                )}

                {/* Call Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                  <Button
                    variant={isMuted ? "destructive" : "secondary"}
                    size="lg"
                    onClick={() => setIsMuted(!isMuted)}
                    className="rounded-full"
                  >
                    {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                  </Button>
                  <Button
                    variant={isVideoOff ? "destructive" : "secondary"}
                    size="lg"
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className="rounded-full"
                  >
                    {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
                  </Button>
                  <Button
                    variant={isRecording ? "destructive" : "secondary"}
                    size="lg"
                    onClick={() => setIsRecording(!isRecording)}
                    className="rounded-full"
                  >
                    {isRecording ? <Pause className="h-6 w-6" /> : <Record className="h-6 w-6" />}
                  </Button>
                  <Button variant="secondary" size="lg" className="rounded-full">
                    <Share className="h-6 w-6" />
                  </Button>
                  <Button variant="destructive" size="lg" onClick={endCall} className="rounded-full">
                    <PhoneOff className="h-6 w-6" />
                  </Button>
                </div>

                {/* Call Info */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 bg-black/50 rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Call in progress</span>
                    {isRecording && (
                      <>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse ml-2"></div>
                        <span className="text-sm">Recording</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calls">Video Calls</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="calls" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Video & Audio Calls</h2>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Call
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {callSessions.map((session) => (
                <Card key={session.id}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={session.lawyerAvatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {session.lawyerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{session.lawyerName}</CardTitle>
                          <p className="text-sm text-muted-foreground">{session.scheduledTime}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          session.status === "scheduled"
                            ? "default"
                            : session.status === "active"
                              ? "default"
                              : session.status === "ended"
                                ? "secondary"
                                : "destructive"
                        }
                      >
                        {session.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {session.type === "video" ? <Video className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
                      <span>{session.type === "video" ? "Video Call" : "Audio Call"}</span>
                      {session.duration && (
                        <>
                          <Clock className="h-4 w-4 ml-2" />
                          <span>{session.duration}</span>
                        </>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {session.status === "scheduled" && (
                        <>
                          <Button size="sm" className="flex-1" onClick={() => startCall(session.id, session.type)}>
                            <Video className="h-4 w-4 mr-2" />
                            Join Call
                          </Button>
                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {session.status === "ended" && (
                        <>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Button>
                          {session.recordingUrl && (
                            <Button variant="outline" size="sm">
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                        </>
                      )}
                      {session.status === "missed" && (
                        <Button size="sm" className="flex-1">
                          <Phone className="h-4 w-4 mr-2" />
                          Call Back
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
              {/* Conversations List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Conversations
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {conversations.map((conversation) => (
                      <button
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation.id)}
                        className={`w-full text-left p-4 hover:bg-muted transition-colors ${
                          selectedConversation === conversation.id ? "bg-muted" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.lawyerAvatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {conversation.lawyerName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate">{conversation.lawyerName}</p>
                              {conversation.unreadCount > 0 && (
                                <Badge variant="destructive" className="text-xs">
                                  {conversation.unreadCount}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{conversation.caseTitle}</p>
                            <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                            <p className="text-xs text-muted-foreground mt-1">{conversation.lastMessageTime}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="lg:col-span-2 flex flex-col">
                {selectedConversation ? (
                  <>
                    <CardHeader className="border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>SJ</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">Sarah Johnson</CardTitle>
                            <p className="text-sm text-muted-foreground">Employment Contract Review</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Video className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${message.senderType === "client" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex gap-3 max-w-[80%] ${
                              message.senderType === "client" ? "flex-row-reverse" : "flex-row"
                            }`}
                          >
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarFallback className="text-xs">
                                {message.senderType === "client" ? "You" : "SJ"}
                              </AvatarFallback>
                            </Avatar>

                            <div
                              className={`rounded-lg p-3 ${
                                message.senderType === "client" ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.content}</p>

                              {message.attachments && (
                                <div className="mt-2 space-y-2">
                                  {message.attachments.map((attachment) => (
                                    <div
                                      key={attachment.id}
                                      className="flex items-center gap-2 p-2 bg-background/50 rounded border"
                                    >
                                      <FileText className="h-4 w-4" />
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium truncate">{attachment.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                          {(attachment.size / 1024).toFixed(1)} KB
                                        </p>
                                      </div>
                                      <Button variant="ghost" size="sm">
                                        <Download className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              )}

                              <p className="text-xs text-muted-foreground mt-2">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>

                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1"
                          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <Button variant="outline" size="icon">
                          <Upload className="h-4 w-4" />
                        </Button>
                        <Button onClick={sendMessage}>Send</Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="files" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Shared Files</h2>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload File
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  name: "Employment_Contract_Draft.pdf",
                  size: "245 KB",
                  date: "2 hours ago",
                  sharedBy: "Sarah Johnson",
                  type: "pdf",
                },
                {
                  name: "Contract_Review_Notes.pdf",
                  size: "156 KB",
                  date: "1 day ago",
                  sharedBy: "Sarah Johnson",
                  type: "pdf",
                },
                {
                  name: "Supporting_Documents.zip",
                  size: "1.2 MB",
                  date: "3 days ago",
                  sharedBy: "You",
                  type: "zip",
                },
              ].map((file, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{file.size}</p>
                        <p className="text-xs text-muted-foreground">
                          Shared by {file.sharedBy} • {file.date}
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

          <TabsContent value="schedule" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Schedule & Appointments</h2>
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                New Appointment
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Contract Review Session",
                      lawyer: "Sarah Johnson",
                      date: "Today, 2:00 PM",
                      type: "Video Call",
                      duration: "1 hour",
                    },
                    {
                      title: "Case Strategy Discussion",
                      lawyer: "Robert Williams",
                      date: "Tomorrow, 10:00 AM",
                      type: "In-Person",
                      duration: "2 hours",
                    },
                    {
                      title: "Document Signing",
                      lawyer: "Jennifer Martinez",
                      date: "Jan 25, 3:00 PM",
                      type: "Video Call",
                      duration: "30 minutes",
                    },
                  ].map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{appointment.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.lawyer} • {appointment.date}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <Badge variant="outline">{appointment.type}</Badge>
                          <span className="text-xs text-muted-foreground">{appointment.duration}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Calendar Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Sync with Calendar</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Connect your calendar to automatically sync appointments and receive reminders.
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Google Calendar
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Outlook
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">Notification Preferences</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          Email reminders (24 hours before)
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" defaultChecked />
                          SMS reminders (1 hour before)
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" />
                          Push notifications
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
