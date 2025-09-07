import { type NextRequest, NextResponse } from "next/server"

interface LawyerRecommendation {
  name: string
  specialty: string
  rating: number
  experience: string
  hourlyRate: string
}

// Mock AI legal analysis system
function analyzeLegalIssue(message: string): {
  category: string
  response: string
  recommendations: LawyerRecommendation[]
} {
  const lowerMessage = message.toLowerCase()

  // Personal Injury
  if (
    lowerMessage.includes("accident") ||
    lowerMessage.includes("injury") ||
    lowerMessage.includes("hurt") ||
    lowerMessage.includes("medical malpractice")
  ) {
    return {
      category: "Personal Injury Law",
      response:
        "Based on your description, this appears to be a personal injury case. Personal injury law covers accidents, medical malpractice, and situations where you've been harmed due to someone else's negligence. I recommend consulting with a personal injury advocate who can evaluate your case for potential compensation including medical expenses, lost wages, and pain and suffering.",
      recommendations: [
        {
          name: "Ravi Kumar",
          specialty: "Personal Injury & Medical Negligence",
          rating: 4.9,
          experience: "15+ years experience",
          hourlyRate: "₹2,500/hour",
        },
        {
          name: "Anjali Sharma",
          specialty: "Accident & Compensation Claims",
          rating: 4.8,
          experience: "12+ years experience",
          hourlyRate: "₹2,000/hour",
        },
      ],
    }
  }

  // Family Law
  if (
    lowerMessage.includes("divorce") ||
    lowerMessage.includes("custody") ||
    lowerMessage.includes("marriage") ||
    lowerMessage.includes("child support")
  ) {
    return {
      category: "Family Law",
      response:
        "This sounds like a family law matter. Family law encompasses divorce, child custody, child support, alimony, and other domestic relations issues. These cases often involve complex emotional and financial considerations. I recommend working with a family law advocate who can guide you through the legal process while protecting your interests and those of any children involved.",
      recommendations: [
        {
          name: "Neha Verma",
          specialty: "Divorce & Child Custody",
          rating: 4.9,
          experience: "18+ years experience",
          hourlyRate: "₹3,000/hour",
        },
        {
          name: "Arjun Mehta",
          specialty: "Family Law & Mediation",
          rating: 4.7,
          experience: "10+ years experience",
          hourlyRate: "₹2,200/hour",
        },
      ],
    }
  }

  // Criminal Law
  if (
    lowerMessage.includes("arrest") ||
    lowerMessage.includes("criminal") ||
    lowerMessage.includes("charge") ||
    lowerMessage.includes("police")
  ) {
    return {
      category: "Criminal Defense",
      response:
        "This appears to be a criminal law matter. If you're facing criminal charges or have been arrested, it's crucial to exercise your right to remain silent and contact a criminal defense advocate immediately. Criminal cases can have serious consequences including fines, probation, or imprisonment. A skilled criminal defense lawyer can protect your rights and build the strongest possible defense.",
      recommendations: [
        {
          name: "Suresh Nair",
          specialty: "Criminal Defense & Bail Matters",
          rating: 4.8,
          experience: "20+ years experience",
          hourlyRate: "₹3,500/hour",
        },
        {
          name: "Priya Iyer",
          specialty: "White Collar Crime & Cyber Law",
          rating: 4.9,
          experience: "14+ years experience",
          hourlyRate: "₹3,800/hour",
        },
      ],
    }
  }

  // Business/Corporate Law
  if (
    lowerMessage.includes("business") ||
    lowerMessage.includes("contract") ||
    lowerMessage.includes("company") ||
    lowerMessage.includes("employment")
  ) {
    return {
      category: "Business & Employment Law",
      response:
        "This seems to be a business or employment law issue. Business law covers contracts, corporate formation, employment disputes, intellectual property, and commercial transactions. Whether you're starting a business, dealing with employment issues, or facing contract disputes, a business advocate can help protect your interests and ensure compliance with applicable laws.",
      recommendations: [
        {
          name: "Manish Gupta",
          specialty: "Business Law & Contracts",
          rating: 4.8,
          experience: "16+ years experience",
          hourlyRate: "₹2,800/hour",
        },
        {
          name: "Kavita Desai",
          specialty: "Employment Law & HR Compliance",
          rating: 4.7,
          experience: "11+ years experience",
          hourlyRate: "₹2,400/hour",
        },
      ],
    }
  }

  // Real Estate
  if (
    lowerMessage.includes("property") ||
    lowerMessage.includes("real estate") ||
    lowerMessage.includes("landlord") ||
    lowerMessage.includes("tenant")
  ) {
    return {
      category: "Real Estate Law",
      response:
        "This appears to be a real estate law matter. Real estate law covers property transactions, landlord-tenant disputes, property development, zoning issues, and real estate contracts. Whether you're buying, selling, or dealing with property disputes, a real estate advocate can help navigate the complex legal requirements and protect your property interests.",
      recommendations: [
        {
          name: "Vikram Singh",
          specialty: "Property Transactions & Disputes",
          rating: 4.9,
          experience: "19+ years experience",
          hourlyRate: "₹3,000/hour",
        },
        {
          name: "Shalini Reddy",
          specialty: "Commercial Real Estate Law",
          rating: 4.6,
          experience: "13+ years experience",
          hourlyRate: "₹3,200/hour",
        },
      ],
    }
  }

  // Default response
  return {
    category: "General Legal Consultation",
    response:
      "Thank you for sharing your legal concern. To provide you with the most accurate guidance and lawyer recommendations, could you please provide more specific details about your situation? For example, what type of legal issue are you facing, when did it occur, and what outcome are you hoping to achieve? This will help me better understand your case and connect you with the right legal specialist.",
    recommendations: [
      {
        name: "Rahul Joshi",
        specialty: "General Practice & Consultation",
        rating: 4.7,
        experience: "12+ years experience",
        hourlyRate: "₹1,800/hour",
      },
    ],
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Simulate AI processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const analysis = analyzeLegalIssue(message)

    return NextResponse.json({
      response: analysis.response,
      legalCategory: analysis.category,
      recommendations: analysis.recommendations,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
