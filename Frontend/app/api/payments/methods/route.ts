import { NextResponse, type NextRequest } from "next/server"

export async function GET() {
  try {
    // Mock payment methods data
    const paymentMethods = [
      {
        id: "pm_1",
        type: "card",
        brand: "visa",
        last4: "1234",
        expiryMonth: 12,
        expiryYear: 2026,
        isDefault: true,
      },
      {
        id: "pm_2",
        type: "card",
        brand: "mastercard",
        last4: "5678",
        expiryMonth: 8,
        expiryYear: 2027,
        isDefault: false,
      },
      {
        id: "pm_3",
        type: "bank_account",
        bankName: "Chase Bank",
        last4: "9012",
        isDefault: false,
      },
    ]

    return NextResponse.json({ paymentMethods })
  } catch (error) {
    console.error("Error fetching payment methods:", error)
    return NextResponse.json({ error: "Failed to fetch payment methods" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, cardNumber, expiryMonth, expiryYear, cvc, bankAccount } = await request.json()

    // Simulate adding payment method
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const paymentMethodId = `pm_${Date.now()}`

    return NextResponse.json({
      success: true,
      paymentMethodId,
      message: "Payment method added successfully",
    })
  } catch (error) {
    console.error("Error adding payment method:", error)
    return NextResponse.json({ error: "Failed to add payment method" }, { status: 500 })
  }
}
