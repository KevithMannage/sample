import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the LaTeX code
    const body = await request.json()
    const { latex } = body

    if (!latex) {
      return NextResponse.json({ error: "No LaTeX code provided" }, { status: 400 })
    }

    // Use the GET endpoint directly with URL parameters
    const encodedLatex = encodeURIComponent(latex)
    const pdfUrl = `https://latexonline.cc/compile?text=${encodedLatex}&command=pdflatex&force=true`

    return NextResponse.json({
      success: true,
      pdfUrl,
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}

