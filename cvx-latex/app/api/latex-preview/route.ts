import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the LaTeX code
    const body = await request.json()
    const { latex } = body

    if (!latex) {
      return NextResponse.json({ error: "No LaTeX code provided" }, { status: 400 })
    }

    // Instead of trying to POST directly to the API (which is failing),
    // we'll use the GET method with URL parameters which is more reliable
    const encodedLatex = encodeURIComponent(latex)

    // Use the GET endpoint directly - this is more reliable than the POST method
    const pdfUrl = `https://latexonline.cc/compile?text=${encodedLatex}&command=pdflatex&force=true`

    return NextResponse.json({
      success: true,
      pdfUrl,
    })
  } catch (error) {
    console.error("Error generating preview:", error)
    return NextResponse.json({ error: "Failed to generate preview" }, { status: 500 })
  }
}

