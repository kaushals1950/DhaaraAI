"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  MapPin,
  Clock,
  DollarSign,
  MessageSquare,
  Phone,
  Video,
  Calendar,
  Award,
  BookOpen,
  Globe,
  TrendingUp,
  Users,
} from "lucide-react"

interface Lawyer {
  id: string
  name: string
  specialty: string[]
  rating: number
  reviewCount: number
  experience: number
  hourlyRate: number
  location: string
  bio: string
  education: string[]
  certifications: string[]
  languages: string[]
  availability: "Available" | "Busy" | "Unavailable"
  profileImage?: string
  caseTypes: string[]
  successRate: number
}

interface Review {
  id: string
  clientName: string
  rating: number
  comment: string
  date: string
  caseType: string
}

export default function LawyerProfilePage() {
  const params = useParams()
  const [lawyer, setLawyer] = useState<Lawyer | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchLawyerProfile(params.id as string)
    }
  }, [params.id])

  const fetchLawyerProfile = async (id: string) => {
    try {
      const response = await fetch(`/api/lawyers/${id}`)
      const data = await response.json()
      setLawyer(data.lawyer)
      setReviews(data.reviews)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching lawyer profile:", error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading lawyer profile...</p>
        </div>
      </div>
    )
  }

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Lawyer Not Found</h1>
          <p className="text-muted-foreground">The lawyer profile you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-32 w-32 mx-auto md:mx-0">
                <AvatarImage src={lawyer.profileImage || "/placeholder.svg"} alt={lawyer.name} />
                <AvatarFallback className="text-2xl">
                  {lawyer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{lawyer.name}</h1>
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 font-medium">{lawyer.rating}</span>
                        <span className="text-muted-foreground ml-1">({lawyer.reviewCount} reviews)</span>
                      </div>
                      <Badge
                        variant={
                          lawyer.availability === "Available"
                            ? "default"
                            : lawyer.availability === "Busy"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {lawyer.availability}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 justify-center md:justify-end">
                    <Button size="lg">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                    <Button variant="outline" size="lg">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="lg">
                      <Video className="h-4 w-4 mr-2" />
                      Video Call
                    </Button>
                    <Button variant="outline" size="lg">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  {lawyer.specialty.map((spec) => (
                    <Badge key={spec} variant="outline">
                      {spec}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{lawyer.experience} years experience</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>${lawyer.hourlyRate}/hour</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{lawyer.location}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-start">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>{lawyer.successRate}% success rate</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{lawyer.bio}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Case Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {lawyer.caseTypes.map((caseType) => (
                        <Badge key={caseType} variant="secondary" className="justify-center">
                          {caseType}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Success Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{lawyer.successRate}%</div>
                      <Progress value={lawyer.successRate} className="mb-2" />
                      <p className="text-sm text-muted-foreground">Cases won or favorably settled</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Languages
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {lawyer.languages.map((language) => (
                        <Badge key={language} variant="outline" className="w-full justify-center">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lawyer.education.map((edu, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm">{edu}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lawyer.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm">{cert}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium">{review.clientName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {review.caseType}
                          </Badge>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button size="lg" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    Schedule Call
                  </Button>
                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    <Video className="h-4 w-4 mr-2" />
                    Video Consultation
                  </Button>
                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>
                <div className="text-center pt-4">
                  <p className="text-muted-foreground text-sm">
                    Response time: Usually within 2 hours during business hours
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
