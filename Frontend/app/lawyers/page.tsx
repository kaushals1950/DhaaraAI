"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, MapPin, Clock, DollarSign, Filter, Search, MessageSquare, Phone, Video } from "lucide-react"
import Link from "next/link"

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

export default function LawyersPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [filteredLawyers, setFilteredLawyers] = useState<Lawyer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [rateRange, setRateRange] = useState([0, 1000])
  const [minRating, setMinRating] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLawyers()
  }, [])

  useEffect(() => {
    filterLawyers()
  }, [lawyers, searchTerm, selectedSpecialty, selectedLocation, rateRange, minRating])

  const fetchLawyers = async () => {
    try {
      const response = await fetch("/api/lawyers")
      const data = await response.json()
      setLawyers(data.lawyers)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching lawyers:", error)
      setIsLoading(false)
    }
  }

  const filterLawyers = () => {
    const filtered = lawyers.filter((lawyer) => {
      const matchesSearch =
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.specialty.some((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
        lawyer.bio.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesSpecialty = selectedSpecialty === "all" || lawyer.specialty.includes(selectedSpecialty)

      const matchesLocation = selectedLocation === "all" || lawyer.location.includes(selectedLocation)

      const matchesRate = lawyer.hourlyRate >= rateRange[0] && lawyer.hourlyRate <= rateRange[1]

      const matchesRating = lawyer.rating >= minRating

      return matchesSearch && matchesSpecialty && matchesLocation && matchesRate && matchesRating
    })

    // Sort by rating and availability
    filtered.sort((a, b) => {
      if (a.availability === "Available" && b.availability !== "Available") return -1
      if (b.availability === "Available" && a.availability !== "Available") return 1
      return b.rating - a.rating
    })

    setFilteredLawyers(filtered)
  }

  const specialties = [
    "Personal Injury",
    "Family Law",
    "Criminal Defense",
    "Business Law",
    "Real Estate",
    "Employment Law",
    "Immigration",
    "Bankruptcy",
    "Tax Law",
    "Intellectual Property",
  ]

  const locations = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading lawyers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Find Your Lawyer</h1>
          <p className="text-muted-foreground text-lg">
            Connect with experienced legal professionals specialized in your case type
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search lawyers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Specialty Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Specialty</label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Specialties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Hourly Rate Range */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Hourly Rate: ${rateRange[0]} - ${rateRange[1]}
                  </label>
                  <Slider
                    value={rateRange}
                    onValueChange={setRateRange}
                    max={1000}
                    min={0}
                    step={25}
                    className="w-full"
                  />
                </div>

                {/* Minimum Rating */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Minimum Rating: {minRating}★</label>
                  <Slider
                    value={[minRating]}
                    onValueChange={(value) => setMinRating(value[0])}
                    max={5}
                    min={0}
                    step={0.5}
                  />
                </div>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedSpecialty("all")
                    setSelectedLocation("all")
                    setRateRange([0, 1000])
                    setMinRating(0)
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Lawyers Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-muted-foreground">
                {filteredLawyers.length} lawyer{filteredLawyers.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredLawyers.map((lawyer) => (
                <Card key={lawyer.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={lawyer.profileImage || "/placeholder.svg"} alt={lawyer.name} />
                        <AvatarFallback className="text-lg">
                          {lawyer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{lawyer.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="ml-1 text-sm font-medium">{lawyer.rating}</span>
                                <span className="text-sm text-muted-foreground ml-1">({lawyer.reviewCount})</span>
                              </div>
                              <Badge
                                variant={
                                  lawyer.availability === "Available"
                                    ? "default"
                                    : lawyer.availability === "Busy"
                                      ? "secondary"
                                      : "destructive"
                                }
                                className="text-xs"
                              >
                                {lawyer.availability}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {lawyer.specialty.slice(0, 3).map((spec) => (
                        <Badge key={spec} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                      {lawyer.specialty.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{lawyer.specialty.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{lawyer.bio}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{lawyer.experience} years</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>${lawyer.hourlyRate}/hour</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{lawyer.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <span>{lawyer.successRate}% success</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button asChild size="sm" className="flex-1">
                        <Link href={`/lawyers/${lawyer.id}`}>View Profile</Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredLawyers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No lawyers found</h3>
                  <p>Try adjusting your filters or search terms</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedSpecialty("all")
                    setSelectedLocation("all")
                    setRateRange([0, 1000])
                    setMinRating(0)
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
