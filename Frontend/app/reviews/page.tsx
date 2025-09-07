"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp, MessageSquare, TrendingUp, Award, Filter, Search, Plus, CheckCircle } from "lucide-react"

interface Review {
  id: string
  clientName: string
  lawyerName: string
  lawyerId: string
  rating: number
  title: string
  content: string
  caseType: string
  date: string
  helpful: number
  verified: boolean
  response?: {
    content: string
    date: string
  }
}

interface LawyerStats {
  id: string
  name: string
  avatar?: string
  totalReviews: number
  averageRating: number
  ratingDistribution: { [key: number]: number }
  responseRate: number
  recommendationRate: number
}

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("browse")
  const [selectedRating, setSelectedRating] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCaseType, setFilterCaseType] = useState("all")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const reviews: Review[] = [
    {
      id: "rev_1",
      clientName: "John D.",
      lawyerName: "Sarah Johnson",
      lawyerId: "lawyer_1",
      rating: 5,
      title: "Exceptional service and expertise",
      content:
        "Sarah handled my employment contract review with incredible attention to detail. She explained every clause clearly and negotiated better terms than I expected. Highly professional and responsive throughout the entire process.",
      caseType: "Employment Law",
      date: "2024-01-15",
      helpful: 12,
      verified: true,
      response: {
        content: "Thank you John! It was a pleasure working with you on your employment contract.",
        date: "2024-01-16",
      },
    },
    {
      id: "rev_2",
      clientName: "Maria S.",
      lawyerName: "Jennifer Martinez",
      lawyerId: "lawyer_2",
      rating: 5,
      title: "Compassionate and skilled family lawyer",
      content:
        "Jennifer guided me through a difficult divorce with empathy and professionalism. She kept me informed at every step and achieved a fair settlement. I couldn't have asked for better representation.",
      caseType: "Family Law",
      date: "2024-01-12",
      helpful: 8,
      verified: true,
    },
    {
      id: "rev_3",
      clientName: "Robert K.",
      lawyerId: "lawyer_3",
      lawyerName: "Robert Williams",
      rating: 4,
      title: "Strong criminal defense representation",
      content:
        "Robert successfully defended my case and got the charges reduced significantly. His knowledge of criminal law is impressive and he fought hard for the best outcome.",
      caseType: "Criminal Defense",
      date: "2024-01-10",
      helpful: 15,
      verified: true,
    },
  ]

  const lawyerStats: LawyerStats[] = [
    {
      id: "lawyer_1",
      name: "Sarah Johnson",
      totalReviews: 127,
      averageRating: 4.9,
      ratingDistribution: { 5: 115, 4: 10, 3: 2, 2: 0, 1: 0 },
      responseRate: 98,
      recommendationRate: 96,
    },
    {
      id: "lawyer_2",
      name: "Jennifer Martinez",
      totalReviews: 156,
      averageRating: 4.8,
      ratingDistribution: { 5: 135, 4: 18, 3: 3, 2: 0, 1: 0 },
      responseRate: 95,
      recommendationRate: 94,
    },
    {
      id: "lawyer_3",
      name: "Robert Williams",
      totalReviews: 201,
      averageRating: 4.7,
      ratingDistribution: { 5: 165, 4: 28, 3: 6, 2: 2, 1: 0 },
      responseRate: 92,
      recommendationRate: 91,
    },
  ]

  const caseTypes = [
    "Employment Law",
    "Family Law",
    "Criminal Defense",
    "Business Law",
    "Real Estate",
    "Personal Injury",
  ]

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.lawyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.content.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCaseType = filterCaseType === "all" || review.caseType === filterCaseType

    return matchesSearch && matchesCaseType
  })

  const handleSubmitReview = async (reviewData: any) => {
    setIsSubmitting(true)
    try {
      await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      })
      // Handle success
    } catch (error) {
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const StarRating = ({ rating, onRatingChange, interactive = false }: any) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => interactive && onRatingChange && onRatingChange(star)}
            className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
            disabled={!interactive}
          >
            <Star
              className={`h-5 w-5 ${
                star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              } transition-colors`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Reviews & Ratings</h1>
          <p className="text-muted-foreground text-lg">
            Read client experiences and share your feedback to help others find the right legal representation
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse Reviews</TabsTrigger>
            <TabsTrigger value="write">Write Review</TabsTrigger>
            <TabsTrigger value="my-reviews">My Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reviews by lawyer name or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterCaseType}
                onChange={(e) => setFilterCaseType(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="all">All Case Types</option>
                {caseTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>

            {/* Top Rated Lawyers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Top Rated Lawyers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {lawyerStats.slice(0, 3).map((lawyer) => (
                    <div key={lawyer.id} className="text-center p-4 border rounded-lg">
                      <Avatar className="h-16 w-16 mx-auto mb-3">
                        <AvatarImage src={lawyer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {lawyer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold mb-1">{lawyer.name}</h3>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{lawyer.averageRating}</span>
                        <span className="text-sm text-muted-foreground">({lawyer.totalReviews})</span>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div>{lawyer.responseRate}% response rate</div>
                        <div>{lawyer.recommendationRate}% recommend</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {review.clientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{review.clientName}</h3>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Reviewed {review.lawyerName} • {review.date}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <StarRating rating={review.rating} />
                            <Badge variant="outline">{review.caseType}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">{review.title}</h4>
                      <p className="text-muted-foreground leading-relaxed">{review.content}</p>
                    </div>

                    {review.response && (
                      <div className="bg-muted p-4 rounded-lg mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {review.lawyerName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{review.lawyerName}</span>
                          <span className="text-xs text-muted-foreground">responded on {review.response.date}</span>
                        </div>
                        <p className="text-sm">{review.response.content}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Helpful ({review.helpful})
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="write" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
                <p className="text-muted-foreground">
                  Share your experience to help other clients make informed decisions
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lawyer-select">Select Lawyer</Label>
                    <select
                      id="lawyer-select"
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm mt-1"
                    >
                      <option value="">Choose a lawyer...</option>
                      <option value="lawyer_1">Sarah Johnson</option>
                      <option value="lawyer_2">Jennifer Martinez</option>
                      <option value="lawyer_3">Robert Williams</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="case-type-select">Case Type</Label>
                    <select
                      id="case-type-select"
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm mt-1"
                    >
                      <option value="">Select case type...</option>
                      {caseTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label>Overall Rating</Label>
                  <div className="mt-2">
                    <StarRating rating={selectedRating} onRatingChange={setSelectedRating} interactive={true} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="review-title">Review Title</Label>
                  <Input id="review-title" placeholder="Summarize your experience..." className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="review-content">Your Review</Label>
                  <Textarea
                    id="review-content"
                    placeholder="Share details about your experience, the lawyer's expertise, communication, and results..."
                    rows={6}
                    className="mt-1"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="recommend" />
                  <Label htmlFor="recommend" className="text-sm">
                    I would recommend this lawyer to others
                  </Label>
                </div>

                <Button onClick={() => handleSubmitReview({})} disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-reviews" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Reviews</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Write New Review
              </Button>
            </div>

            <div className="space-y-4">
              {reviews.slice(0, 2).map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold mb-1">{review.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          Review for {review.lawyerName} • {review.date}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <StarRating rating={review.rating} />
                          <Badge variant="outline">{review.caseType}</Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                    <p className="text-muted-foreground mb-4">{review.content}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{review.helpful} people found this helpful</span>
                      {review.response && <span>Lawyer responded</span>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Reviews</p>
                      <p className="text-2xl font-bold">484</p>
                    </div>
                    <MessageSquare className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Average Rating</p>
                      <p className="text-2xl font-bold">4.8</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                      <p className="text-2xl font-bold">95%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Verified Reviews</p>
                      <p className="text-2xl font-bold">92%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rating Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-12">
                          <span className="text-sm">{rating}</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        </div>
                        <Progress
                          value={rating === 5 ? 85 : rating === 4 ? 12 : rating === 3 ? 2 : 1}
                          className="flex-1"
                        />
                        <span className="text-sm text-muted-foreground w-12">
                          {rating === 5 ? "85%" : rating === 4 ? "12%" : rating === 3 ? "2%" : "1%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Reviews by Case Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: "Employment Law", count: 156, percentage: 32 },
                      { type: "Family Law", count: 134, percentage: 28 },
                      { type: "Criminal Defense", count: 98, percentage: 20 },
                      { type: "Business Law", count: 67, percentage: 14 },
                      { type: "Real Estate", count: 29, percentage: 6 },
                    ].map((item) => (
                      <div key={item.type} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.type}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-secondary rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                          </div>
                          <span className="text-sm text-muted-foreground w-8">{item.count}</span>
                        </div>
                      </div>
                    ))}
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
