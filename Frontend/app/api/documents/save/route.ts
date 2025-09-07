import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { templateId, title, data, status } = await request.json()

    // Simulate saving to database
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const documentId = `draft_${Date.now()}`

    return NextResponse.json({
      documentId,
      status: "saved",
      message: "Document saved successfully",
    })
  } catch (error) {
    console.error("Error saving document:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
