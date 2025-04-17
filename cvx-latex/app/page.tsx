"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { FileText } from "lucide-react"
import CvForm from "@/components/cv-form"
import LatexEditor from "@/components/latex-editor"
import { generateFallbackLatex } from "@/lib/deepseek-service"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  const { toast } = useToast()
  const [latex, setLatex] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState("form")

  const handleGenerateLatex = async (cvData: any) => {
    setIsGenerating(true)

    try {
      // Skip DeepSeek API call due to insufficient balance
      // and use the fallback generator directly
      const fallbackLatex = generateFallbackLatex(cvData)
      setLatex(fallbackLatex)

      // Switch to the preview tab
      setActiveTab("preview")

      toast({
        title: "CV Generated",
        description: "Your CV has been generated successfully using our built-in template.",
      })
    } catch (error) {
      console.error("Error generating CV:", error)

      toast({
        title: "Error generating CV",
        description: "There was an error generating your CV. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6 text-center">cvX</h1>
      <p className="text-center text-muted-foreground mb-10">Create professional CVs with LaTeX</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Tabs defaultValue="form" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="form" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                CV Form
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form">
              <Card>
                <CardContent className="pt-6">
                  <CvForm onGenerateLatex={handleGenerateLatex} isGenerating={isGenerating} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <LatexEditor initialLatex={latex} />
        </div>
      </div>
    </div>
  )
}

