import { type NextRequest, NextResponse } from "next/server"

interface FormField {
  id: string
  label: string
  type: "text" | "textarea" | "select" | "checkbox" | "date" | "number"
  required: boolean
  placeholder?: string
  options?: string[]
  helpText?: string
}

interface DocumentSection {
  id: string
  title: string
  description: string
  fields: FormField[]
  completed: boolean
}

// Mock template data
const mockTemplates: { [key: string]: { title: string; sections: DocumentSection[] } } = {
  "1": {
    title: "Last Will and Testament",
    sections: [
      {
        id: "personal-info",
        title: "Personal Information",
        description: "Basic information about the testator (person making the will)",
        completed: false,
        fields: [
          {
            id: "full-name",
            label: "Full Legal Name",
            type: "text",
            required: true,
            placeholder: "Enter your full legal name as it appears on official documents",
          },
          {
            id: "address",
            label: "Current Address",
            type: "textarea",
            required: true,
            placeholder: "Enter your complete current address",
          },
          {
            id: "date-of-birth",
            label: "Date of Birth",
            type: "date",
            required: true,
          },
          {
            id: "marital-status",
            label: "Marital Status",
            type: "select",
            required: true,
            options: ["Single", "Married", "Divorced", "Widowed"],
          },
          {
            id: "spouse-name",
            label: "Spouse's Name (if applicable)",
            type: "text",
            required: false,
            placeholder: "Enter spouse's full legal name",
          },
        ],
      },
      {
        id: "assets",
        title: "Assets and Property",
        description: "List your assets, property, and valuable possessions",
        completed: false,
        fields: [
          {
            id: "real-estate",
            label: "Real Estate Properties",
            type: "textarea",
            required: false,
            placeholder: "List all real estate properties you own (addresses, descriptions)",
            helpText: "Include primary residence, vacation homes, rental properties, etc.",
          },
          {
            id: "bank-accounts",
            label: "Bank Accounts",
            type: "textarea",
            required: false,
            placeholder: "List bank accounts (institution names, account types)",
            helpText: "Include checking, savings, CDs, money market accounts",
          },
          {
            id: "investments",
            label: "Investments",
            type: "textarea",
            required: false,
            placeholder: "List investment accounts, stocks, bonds, retirement accounts",
          },
          {
            id: "personal-property",
            label: "Valuable Personal Property",
            type: "textarea",
            required: false,
            placeholder: "Jewelry, artwork, vehicles, collectibles, etc.",
          },
          {
            id: "business-interests",
            label: "Business Interests",
            type: "textarea",
            required: false,
            placeholder: "Ownership in businesses, partnerships, corporations",
          },
        ],
      },
      {
        id: "beneficiaries",
        title: "Beneficiaries",
        description: "Specify who will inherit your assets",
        completed: false,
        fields: [
          {
            id: "primary-beneficiaries",
            label: "Primary Beneficiaries",
            type: "textarea",
            required: true,
            placeholder: "List primary beneficiaries (name, relationship, percentage/specific bequests)",
            helpText: "These are the main people who will inherit your assets",
          },
          {
            id: "contingent-beneficiaries",
            label: "Contingent Beneficiaries",
            type: "textarea",
            required: false,
            placeholder: "List backup beneficiaries in case primary beneficiaries cannot inherit",
          },
          {
            id: "specific-bequests",
            label: "Specific Bequests",
            type: "textarea",
            required: false,
            placeholder: "Specific items or amounts to specific people",
            helpText: "e.g., 'My wedding ring to my daughter Sarah'",
          },
          {
            id: "charitable-donations",
            label: "Charitable Donations",
            type: "textarea",
            required: false,
            placeholder: "Any donations to charities or organizations",
          },
        ],
      },
      {
        id: "executor",
        title: "Executor and Administration",
        description: "Choose who will manage your estate",
        completed: false,
        fields: [
          {
            id: "executor-name",
            label: "Primary Executor",
            type: "text",
            required: true,
            placeholder: "Full name of the person who will execute your will",
            helpText: "This person will be responsible for carrying out your wishes",
          },
          {
            id: "executor-address",
            label: "Executor's Address",
            type: "textarea",
            required: true,
            placeholder: "Complete address of your chosen executor",
          },
          {
            id: "alternate-executor",
            label: "Alternate Executor",
            type: "text",
            required: false,
            placeholder: "Backup executor in case the primary cannot serve",
          },
          {
            id: "bond-requirement",
            label: "Require Bond for Executor",
            type: "checkbox",
            required: false,
            placeholder: "Require the executor to post a bond (usually not necessary for trusted family)",
          },
        ],
      },
    ],
  },
  "2": {
    title: "Power of Attorney",
    sections: [
      {
        id: "principal-info",
        title: "Principal Information",
        description: "Information about the person granting the power of attorney",
        completed: false,
        fields: [
          {
            id: "principal-name",
            label: "Principal's Full Name",
            type: "text",
            required: true,
            placeholder: "Your full legal name",
          },
          {
            id: "principal-address",
            label: "Principal's Address",
            type: "textarea",
            required: true,
            placeholder: "Your complete current address",
          },
        ],
      },
    ],
  },
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const template = mockTemplates[id]

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    return NextResponse.json(template)
  } catch (error) {
    console.error("Error fetching template:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
