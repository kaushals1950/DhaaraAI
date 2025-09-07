import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { lawyerId, rating, title, content, caseType, recommend } = await request.json()

    // Simulate review submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const reviewId = `rev_${Date.now()}`

    // In a real app, this would:
    // 1. Validate the review data
    // 2. Check if client actually worked with the lawyer
    // 3. Save to database with moderation status
    // 4. Update lawyer's rating statistics
    // 5. Send notification to lawyer
    // 6. Implement anti-spam measures

    return NextResponse.json({
      success: true,
      reviewId,
      status: "submitted",
      message: "Review submitted successfully and is pending moderation",
    })
  } catch (error) {
    console.error("Error submitting review:", error)
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lawyerId = searchParams.get("lawyerId")
    const caseType = searchParams.get("caseType")

    // Mock reviews data with filtering
    const allReviews = [
      {
        id: "rev_1",
        clientName: "John D.",
        lawyerName: "Sarah Johnson",
        lawyerId: "lawyer_1",
        rating: 5,
        title: "Exceptional service and expertise",
        content: "Sarah handled my employment contract review with incredible attention to detail...",
        caseType: "Employment Law",
        date: "2024-01-15",
        helpful: 12,
        verified: true,
      },
      // Add more mock reviews...
    ]

    let filteredReviews = allReviews

    if (lawyerId) {
      filteredReviews = filteredReviews.filter((review) => review.lawyerId === lawyerId)
    }

    if (caseType && caseType !== "all") {
      filteredReviews = filteredReviews.filter((review) => review.caseType === caseType)
    }

    return NextResponse.json({ reviews: filteredReviews })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}
