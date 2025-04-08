"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Copy, FileText, Eye, RefreshCw, ExternalLink, FileDown } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Add MathJax type to the global Window interface
declare global {
  interface Window {
    MathJax: any
  }
}

interface LatexEditorProps {
  initialLatex?: string
}

export default function LatexEditor({ initialLatex = "" }: LatexEditorProps) {
  const { toast } = useToast()
  const [latex, setLatex] = useState(initialLatex)
  const [isRendering, setIsRendering] = useState(false)
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")
  const [htmlPreview, setHtmlPreview] = useState<string | null>(null)
  const [showPdfDialog, setShowPdfDialog] = useState(false)
  const previewRef = useRef<HTMLDivElement>(null)

  // Update latex when initialLatex prop changes
  useEffect(() => {
    if (initialLatex) {
      setLatex(initialLatex)
      // Auto-switch to preview when new LaTeX is generated
      setActiveTab("preview")
      renderPreview()
    }
  }, [initialLatex])

  // Load MathJax for rendering math expressions
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
    script.async = true
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  // Function to convert LaTeX to HTML preview
  const convertLatexToHtml = (latexCode: string) => {
    try {
      // Extract document content
      const documentMatch = latexCode.match(/\\begin{document}([\s\S]*)\\end{document}/)
      let content = documentMatch ? documentMatch[1] : latexCode

      // Create HTML structure
      let html = '<div class="latex-preview">'

      // Extract and process the header (name, contact info)
      const centerMatch = content.match(/\\begin{center}([\s\S]*?)\\end{center}/)
      if (centerMatch) {
        const headerContent = centerMatch[1]
          .replace(/\\textbf{\\Huge (.*?)}/, "<h1>$1</h1>")
          .replace(/\\\\(\[.*?\])?/g, "<br>")
          .replace(/\$\\cdot\$/g, " • ")
          .replace(/\\href{(.*?)}{(.*?)}/g, '<a href="$1" target="_blank">$2</a>')

        html += `<div class="cv-header">${headerContent}</div>`
        content = content.replace(centerMatch[0], "")
      }

      // Process sections
      content = content.replace(/\\section{([^}]*)}/g, "<h2>$1</h2>")
      content = content.replace(/\\subsection{([^}]*)}/g, "<h3>$1</h3>")

      // Process environments
      content = content.replace(/\\begin{itemize}([\s\S]*?)\\end{itemize}/g, "<ul>$1</ul>")
      content = content.replace(/\\begin{enumerate}([\s\S]*?)\\end{enumerate}/g, "<ol>$1</ol>")
      content = content.replace(/\\item\s(.*?)(?=\\item|\\end{|$)/gs, "<li>$1</li>")

      // Process basic formatting
      content = content.replace(/\\textbf{([^}]*)}/g, "<strong>$1</strong>")
      content = content.replace(/\\textit{([^}]*)}/g, "<em>$1</em>")
      content = content.replace(/\\underline{([^}]*)}/g, "<u>$1</u>")
      content = content.replace(/\\emph{([^}]*)}/g, "<em>$1</em>")
      content = content.replace(/\\LaTeX/g, "LaTeX")
      content = content.replace(/\\hfill/g, '<span class="hfill"></span>')

      // Handle line breaks and paragraphs
      content = content.replace(/\n\n/g, "</p><p>")

      html += `<div class="content"><p>${content}</p></div></div>`

      return html
    } catch (error) {
      console.error("Error converting LaTeX to HTML:", error)
      return `<div class="error">Error rendering LaTeX: ${error.message}</div>`
    }
  }

  // Generate preview
  const renderPreview = async () => {
    if (!latex) return

    setIsRendering(true)

    try {
      // Convert LaTeX to HTML
      const html = convertLatexToHtml(latex)
      setHtmlPreview(html)

      // Process math with MathJax after HTML is set
      setTimeout(() => {
        if (previewRef.current && window.MathJax) {
          window.MathJax.typesetPromise([previewRef.current]).catch((err) => {
            console.error("MathJax error:", err)
          })
        }
        setIsRendering(false)
      }, 100)
    } catch (error) {
      console.error("Preview error:", error)
      toast({
        title: "Preview error",
        description: "There was an error generating the preview.",
        variant: "destructive",
      })
      setIsRendering(false)
    }
  }

  // Function to directly download LaTeX source
  const downloadLatexSource = () => {
    if (!latex) {
      toast({
        title: "No content",
        description: "There is no LaTeX content to download.",
        variant: "destructive",
      })
      return
    }

    const blob = new Blob([latex], { type: "application/x-tex" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "cv.tex"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: "LaTeX Source Downloaded",
      description: "Your CV LaTeX source has been downloaded.",
    })
  }

  // Function to open in Overleaf
  const openInOverleaf = () => {
    if (!latex) {
      toast({
        title: "No content",
        description: "There is no LaTeX content to open in Overleaf.",
        variant: "destructive",
      })
      return
    }

    const encodedLatex = encodeURIComponent(latex)
    const overleafUrl = `https://www.overleaf.com/docs?snip_uri=data:text/x-latex;base64,${btoa(unescape(encodeURIComponent(latex)))}`
    window.open(overleafUrl, "_blank")

    toast({
      title: "Opening in Overleaf",
      description: "Your CV is being opened in Overleaf.",
    })
  }

  // Function to try PDF generation via LaTeX.Online
  const tryLatexOnlinePdf = () => {
    if (!latex) {
      toast({
        title: "No content",
        description: "There is no LaTeX content to convert to PDF.",
        variant: "destructive",
      })
      return false
    }

    try {
      const encodedLatex = encodeURIComponent(latex)
      const pdfUrl = `https://latexonline.cc/compile?text=${encodedLatex}&command=pdflatex&force=true`
      window.open(pdfUrl, "_blank")

      toast({
        title: "PDF Generation",
        description:
          "Attempting to generate PDF via LaTeX.Online. If you see security warnings, you may need to click 'Continue to site'.",
      })

      return true
    } catch (error) {
      console.error("LaTeX.Online PDF error:", error)
      return false
    }
  }

  // Function to handle PDF download options
  const handlePdfDownload = () => {
    if (!latex) {
      toast({
        title: "No content",
        description: "Generate a CV first before downloading as PDF.",
        variant: "destructive",
      })
      return
    }

    setShowPdfDialog(true)
  }

  const copyToClipboard = () => {
    if (!latex) {
      toast({
        title: "No content",
        description: "There is no LaTeX content to copy.",
        variant: "destructive",
      })
      return
    }

    navigator.clipboard.writeText(latex)
    toast({
      title: "Copied to clipboard",
      description: "LaTeX code has been copied to your clipboard.",
    })
  }

  // Effect to update preview when tab changes to preview
  useEffect(() => {
    if (activeTab === "preview" && !isRendering && latex) {
      renderPreview()
    }
  }, [activeTab])

  return (
    <Tabs defaultValue="editor" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="editor" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          LaTeX Editor
        </TabsTrigger>
        <TabsTrigger value="preview" className="flex items-center gap-2">
          <Eye className="h-4 w-4" />
          CV Preview
        </TabsTrigger>
      </TabsList>

      <TabsContent value="editor">
        <Card>
          <CardContent className="pt-6">
            <Textarea
              value={latex}
              onChange={(e) => setLatex(e.target.value)}
              className="font-mono min-h-[70vh] resize-none"
              placeholder="Your CV LaTeX code will appear here..."
            />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="preview">
        <Card>
          <CardContent className="pt-6">
            {!latex ? (
              <div className="flex items-center justify-center min-h-[70vh] border rounded-md">
                <div className="text-center p-6">
                  <p className="text-muted-foreground mb-4">
                    Fill out the CV form and click "Generate CV" to see a preview.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-end mb-4 gap-2">
                  <Button variant="outline" size="sm" onClick={openInOverleaf}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Overleaf
                  </Button>
                  <Button variant="outline" size="sm" onClick={renderPreview} disabled={isRendering}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isRendering ? "animate-spin" : ""}`} />
                    Refresh Preview
                  </Button>
                </div>

                {isRendering ? (
                  <div className="flex items-center justify-center min-h-[70vh]">
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="h-12 w-12 animate-spin text-primary" />
                      <p className="text-muted-foreground">Rendering CV preview...</p>
                    </div>
                  </div>
                ) : (
                  <div
                    ref={previewRef}
                    className="w-full min-h-[70vh] border rounded-md bg-white p-8 overflow-auto"
                    dangerouslySetInnerHTML={{
                      __html:
                        htmlPreview ||
                        '<div class="flex items-center justify-center h-full"><p>No preview available</p></div>',
                    }}
                  />
                )}

                <div className="flex flex-wrap gap-4 justify-center mt-6">
                  <Button onClick={handlePdfDownload} variant="default">
                    <FileDown className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button onClick={openInOverleaf} variant="outline">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open in Overleaf
                  </Button>
                  <Button onClick={downloadLatexSource} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download LaTeX
                  </Button>
                  <Button onClick={copyToClipboard} variant="outline">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy LaTeX
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      {/* PDF Download Options Dialog */}
      <Dialog open={showPdfDialog} onOpenChange={setShowPdfDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download PDF Options</DialogTitle>
            <DialogDescription>Choose how you'd like to generate your PDF document.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => {
                  tryLatexOnlinePdf()
                  setShowPdfDialog(false)
                }}
                className="justify-start"
              >
                <FileDown className="mr-2 h-4 w-4" />
                Try LaTeX.Online (Direct PDF)
              </Button>
              <p className="text-sm text-muted-foreground ml-8">
                Attempts to generate a PDF directly. May show security warnings.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                onClick={() => {
                  openInOverleaf()
                  setShowPdfDialog(false)
                }}
                variant="outline"
                className="justify-start"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in Overleaf
              </Button>
              <p className="text-sm text-muted-foreground ml-8">
                Opens your document in Overleaf where you can download a high-quality PDF.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                onClick={() => {
                  downloadLatexSource()
                  setShowPdfDialog(false)
                }}
                variant="outline"
                className="justify-start"
              >
                <Download className="mr-2 h-4 w-4" />
                Download LaTeX Source
              </Button>
              <p className="text-sm text-muted-foreground ml-8">
                Downloads the LaTeX source code for local compilation.
              </p>
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="secondary" onClick={() => setShowPdfDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  )
}

