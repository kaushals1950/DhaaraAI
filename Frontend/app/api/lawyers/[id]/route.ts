import { type NextRequest, NextResponse } from "next/server"

interface Review {
  id: string
  clientName: string
  rating: number
  comment: string
  date: string
  caseType: string
}

// Mock reviews data
const mockReviews: { [key: string]: Review[] } = {
  "1": [
    {
      id: "1",
      clientName: "John D.",
      rating: 5,
      comment:
        "Sarah was exceptional in handling my medical malpractice case. She was thorough, professional, and kept me informed throughout the entire process. Highly recommend!",
      date: "2024-01-15",
      caseType: "Medical Malpractice",
    },
    {
      id: "2",
      clientName: "Maria S.",
      rating: 5,
      comment:
        "Outstanding attorney! Sarah secured a great settlement for my car accident case. Her attention to detail and dedication to her clients is remarkable.",
      date: "2024-01-08",
      caseType: "Auto Accident",
    },
  ],
  "2": [
    {
      id: "3",
      clientName: "Robert K.",
      rating: 5,
      comment:
        "Michael fought hard for my case and got me the compensation I deserved. Very knowledgeable and responsive to all my questions.",
      date: "2024-01-12",
      caseType: "Personal Injury",
    },
  ],
}

// Import the mock lawyers data (in a real app, this would come from a database)
const mockLawyers = [
  {
    id: "1",
    name: "Sarah Johnson",
    specialty: ["Personal Injury", "Medical Malpractice"],
    rating: 4.9,
    reviewCount: 127,
    experience: 15,
    hourlyRate: 350,
    location: "New York, NY",
    bio: "Experienced personal injury attorney with a track record of securing substantial settlements for clients. Specializes in medical malpractice and auto accident cases. With over 15 years of experience, I have successfully represented hundreds of clients in complex personal injury matters, securing over $50 million in settlements and verdicts. My approach combines aggressive advocacy with compassionate client care, ensuring that each client receives personalized attention and the best possible outcome for their case.",
    education: ["Harvard Law School (JD)", "Columbia University (BA)"],
    certifications: ["Board Certified Personal Injury Trial Law", "Medical Malpractice Specialist"],
    languages: ["English", "Spanish"],
    availability: "Available" as const,
    caseTypes: ["Auto Accidents", "Medical Malpractice", "Slip and Fall", "Product Liability"],
    successRate: 94,
  },
  // Add other lawyers here...
]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const lawyer = mockLawyers.find((l) => l.id === id)

    if (!lawyer) {
      return NextResponse.json({ error: "Lawyer not found" }, { status: 404 })
    }

    const reviews = mockReviews[id] || []

    return NextResponse.json({
      lawyer,
      reviews,
    })
  } catch (error) {
    console.error("Error fetching lawyer profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
