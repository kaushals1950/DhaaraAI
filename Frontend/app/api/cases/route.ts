import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock cases data
    const cases = [
      {
        id: "case_1",
        title: "Employment Contract Review",
        lawyerName: "Sarvesh Rai",
        caseType: "Employment Law",
        status: "active",
        progress: 75,
        startDate: "2024-01-10",
        expectedCompletion: "2024-01-25",
        totalCost: 2500,
        paidAmount: 1875,
        nextMilestone: "Final contract review and signing",
        priority: "high",
      },
      // Add more mock cases...
    ]

    return NextResponse.json({ cases })
  } catch (error) {
    console.error("Error fetching cases:", error)
    return NextResponse.json({ error: "Failed to fetch cases" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, lawyerId, caseType, description } = await request.json()

    // Simulate case creation
    await new Promise((resolve) => setTimeout(resolve, 500))

    const caseId = `case_${Date.now()}`

    return NextResponse.json({
      success: true,
      caseId,
      status: "created",
      message: "Case created successfully",
    })
  } catch (error) {
    console.error("Error creating case:", error)
    return NextResponse.json({ error: "Failed to create case" }, { status: 500 })
  }
}
