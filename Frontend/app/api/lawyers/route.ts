import { NextResponse } from "next/server"

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

// Mock lawyer data
const mockLawyers: Lawyer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    specialty: ["Personal Injury", "Medical Malpractice"],
    rating: 4.9,
    reviewCount: 127,
    experience: 15,
    hourlyRate: 350,
    location: "New York, NY",
    bio: "Experienced personal injury attorney with a track record of securing substantial settlements for clients. Specializes in medical malpractice and auto accident cases.",
    education: ["Harvard Law School (JD)", "Columbia University (BA)"],
    certifications: ["Board Certified Personal Injury Trial Law", "Medical Malpractice Specialist"],
    languages: ["English", "Spanish"],
    availability: "Available",
    caseTypes: ["Auto Accidents", "Medical Malpractice", "Slip and Fall", "Product Liability"],
    successRate: 94,
  },
  {
    id: "2",
    name: "Michael Chen",
    specialty: ["Personal Injury", "Auto Accidents"],
    rating: 4.8,
    reviewCount: 89,
    experience: 12,
    hourlyRate: 300,
    location: "Los Angeles, CA",
    bio: "Dedicated personal injury lawyer focusing on auto accidents and workplace injuries. Known for aggressive representation and client advocacy.",
    education: ["UCLA School of Law (JD)", "UC Berkeley (BS)"],
    certifications: ["Personal Injury Law Specialist", "Trial Advocacy Certification"],
    languages: ["English", "Mandarin", "Cantonese"],
    availability: "Available",
    caseTypes: ["Auto Accidents", "Motorcycle Accidents", "Workplace Injuries", "Wrongful Death"],
    successRate: 91,
  },
  {
    id: "3",
    name: "Jennifer Martinez",
    specialty: ["Family Law", "Divorce"],
    rating: 4.9,
    reviewCount: 156,
    experience: 18,
    hourlyRate: 400,
    location: "Chicago, IL",
    bio: "Compassionate family law attorney helping clients navigate divorce, custody, and domestic relations matters with dignity and respect.",
    education: ["Northwestern Law School (JD)", "University of Illinois (BA)"],
    certifications: ["Family Law Specialist", "Collaborative Divorce Certified"],
    languages: ["English", "Spanish"],
    availability: "Busy",
    caseTypes: ["Divorce", "Child Custody", "Child Support", "Domestic Violence", "Adoption"],
    successRate: 96,
  },
  {
    id: "4",
    name: "David Thompson",
    specialty: ["Family Law", "Mediation"],
    rating: 4.7,
    reviewCount: 73,
    experience: 10,
    hourlyRate: 275,
    location: "Houston, TX",
    bio: "Family law attorney and certified mediator committed to resolving family disputes through collaborative and mediation processes.",
    education: ["University of Texas Law School (JD)", "Texas A&M University (BA)"],
    certifications: ["Certified Family Mediator", "Collaborative Law Trained"],
    languages: ["English"],
    availability: "Available",
    caseTypes: ["Divorce Mediation", "Child Custody", "Prenuptial Agreements", "Property Division"],
    successRate: 88,
  },
  {
    id: "5",
    name: "Robert Williams",
    specialty: ["Criminal Defense", "DUI"],
    rating: 4.8,
    reviewCount: 201,
    experience: 20,
    hourlyRate: 450,
    location: "Phoenix, AZ",
    bio: "Veteran criminal defense attorney with extensive trial experience. Specializes in DUI defense and serious felony cases.",
    education: ["Arizona State Law School (JD)", "Arizona State University (BA)"],
    certifications: ["Board Certified Criminal Law Specialist", "DUI Defense Specialist"],
    languages: ["English", "Spanish"],
    availability: "Available",
    caseTypes: ["DUI/DWI", "Drug Crimes", "Assault", "Theft", "White Collar Crime"],
    successRate: 92,
  },
  {
    id: "6",
    name: "Lisa Anderson",
    specialty: ["Criminal Defense", "White Collar Crime"],
    rating: 4.9,
    reviewCount: 94,
    experience: 14,
    hourlyRate: 500,
    location: "Philadelphia, PA",
    bio: "Elite white collar criminal defense attorney representing executives and professionals in complex federal investigations and prosecutions.",
    education: ["University of Pennsylvania Law School (JD)", "Wharton School (MBA)"],
    certifications: ["White Collar Crime Defense Specialist", "Federal Court Certified"],
    languages: ["English", "French"],
    availability: "Busy",
    caseTypes: ["White Collar Crime", "Federal Investigations", "Securities Fraud", "Tax Evasion"],
    successRate: 95,
  },
  {
    id: "7",
    name: "Amanda Foster",
    specialty: ["Business Law", "Contracts"],
    rating: 4.8,
    reviewCount: 112,
    experience: 16,
    hourlyRate: 375,
    location: "San Antonio, TX",
    bio: "Business law attorney helping startups and established companies with contracts, corporate formation, and commercial transactions.",
    education: ["Stanford Law School (JD)", "Stanford University (BS)"],
    certifications: ["Business Law Specialist", "Corporate Governance Certified"],
    languages: ["English", "Spanish"],
    availability: "Available",
    caseTypes: ["Contract Disputes", "Business Formation", "Mergers & Acquisitions", "Employment Law"],
    successRate: 93,
  },
  {
    id: "8",
    name: "James Wilson",
    specialty: ["Employment Law", "HR Compliance"],
    rating: 4.7,
    reviewCount: 67,
    experience: 11,
    hourlyRate: 325,
    location: "San Diego, CA",
    bio: "Employment law attorney representing both employers and employees in workplace disputes, discrimination cases, and HR compliance matters.",
    education: ["UC San Diego Law School (JD)", "UCSD (BA)"],
    certifications: ["Employment Law Specialist", "HR Compliance Certified"],
    languages: ["English"],
    availability: "Available",
    caseTypes: ["Workplace Discrimination", "Wrongful Termination", "Wage & Hour Disputes", "HR Compliance"],
    successRate: 89,
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json({
      lawyers: mockLawyers,
      total: mockLawyers.length,
    })
  } catch (error) {
    console.error("Error fetching lawyers:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
