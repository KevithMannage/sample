"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2, Loader2 } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/components/ui/use-toast"

// Define types for CV data
interface PersonalInfo {
  name: string
  email: string
  phone: string
  address: string
  website: string
  linkedin: string
  github: string
}

interface Education {
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description: string
}

interface Experience {
  position: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
}

interface Skill {
  category: string
  items: string
}

interface CustomSection {
  title: string
  content: string
}

// Add a new interface for design preferences after the existing interfaces
interface DesignPreferences {
  template: string
  primaryColor: string
  fontSize: string
  spacing: string
  additionalNotes: string
}

// Update the CVData interface to include designPreferences
interface CVData {
  personalInfo: PersonalInfo
  summary: string
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  customSections: CustomSection[]
  designPreferences: DesignPreferences
}

// Initial CV data structure
const initialCvData: CVData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    linkedin: "",
    github: "",
  },
  summary: "",
  education: [
    {
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  experience: [
    {
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  skills: [
    {
      category: "Technical Skills",
      items: "",
    },
  ],
  customSections: [
    {
      title: "",
      content: "",
    },
  ],
  designPreferences: {
    template: "classic",
    primaryColor: "#2c5282",
    fontSize: "11pt",
    spacing: "single",
    additionalNotes: "",
  },
}

interface CvFormProps {
  onGenerateLatex: (cvData: CVData) => void
  isGenerating: boolean
}

export default function CvForm({ onGenerateLatex, isGenerating }: CvFormProps) {
  const { toast } = useToast()
  const [cvData, setCvData] = useState<CVData>(initialCvData)
  const [expandedSections, setExpandedSections] = useState<string[]>(["personalInfo"])

  // Handle input changes for personal info
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCvData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        [name]: value,
      },
    })
  }

  // Handle input changes for summary
  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCvData({
      ...cvData,
      summary: e.target.value,
    })
  }

  // Handle input changes for array items (education, experience, skills)
  const handleArrayItemChange = (
    section: "education" | "experience" | "skills" | "customSections",
    index: number,
    field: string,
    value: string,
  ) => {
    const updatedItems = [...cvData[section]]
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    }
    setCvData({
      ...cvData,
      [section]: updatedItems,
    })
  }

  // Add new item to array sections
  const addArrayItem = (section: "education" | "experience" | "skills" | "customSections", template: any) => {
    setCvData({
      ...cvData,
      [section]: [...cvData[section], { ...template }],
    })
  }

  // Remove item from array sections
  const removeArrayItem = (section: "education" | "experience" | "skills" | "customSections", index: number) => {
    if (cvData[section].length <= 1) {
      toast({
        title: "Cannot remove",
        description: "You need at least one entry in this section.",
        variant: "destructive",
      })
      return
    }

    const updatedItems = [...cvData[section]]
    updatedItems.splice(index, 1)
    setCvData({
      ...cvData,
      [section]: updatedItems,
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerateLatex(cvData)
  }

  // Add a handler for design preferences changes
  const handleDesignPreferencesChange = (field: string, value: string) => {
    setCvData({
      ...cvData,
      designPreferences: {
        ...cvData.designPreferences,
        [field]: value,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Accordion type="multiple" value={expandedSections} onValueChange={setExpandedSections} className="w-full">
        {/* Personal Information */}
        <AccordionItem value="personalInfo">
          <AccordionTrigger className="text-lg font-semibold">Personal Information</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={cvData.personalInfo.name}
                  onChange={handlePersonalInfoChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={cvData.personalInfo.email}
                  onChange={handlePersonalInfoChange}
                  placeholder="john.doe@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={cvData.personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                  placeholder="+1 (123) 456-7890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={cvData.personalInfo.address}
                  onChange={handlePersonalInfoChange}
                  placeholder="123 Main St, City, Country"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  value={cvData.personalInfo.website}
                  onChange={handlePersonalInfoChange}
                  placeholder="www.johndoe.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={cvData.personalInfo.linkedin}
                  onChange={handlePersonalInfoChange}
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  name="github"
                  value={cvData.personalInfo.github}
                  onChange={handlePersonalInfoChange}
                  placeholder="github.com/johndoe"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Professional Summary */}
        <AccordionItem value="summary">
          <AccordionTrigger className="text-lg font-semibold">Professional Summary</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={cvData.summary}
                onChange={handleSummaryChange}
                placeholder="A brief summary of your professional background and career goals..."
                className="min-h-[100px]"
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Education */}
        <AccordionItem value="education">
          <AccordionTrigger className="text-lg font-semibold">Education</AccordionTrigger>
          <AccordionContent>
            {cvData.education.map((edu, index) => (
              <div key={index} className="p-4 border rounded-md mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Education #{index + 1}</h4>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayItem("education", index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`edu-degree-${index}`}>Degree/Certificate</Label>
                    <Input
                      id={`edu-degree-${index}`}
                      value={edu.degree}
                      onChange={(e) => handleArrayItemChange("education", index, "degree", e.target.value)}
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edu-institution-${index}`}>Institution</Label>
                    <Input
                      id={`edu-institution-${index}`}
                      value={edu.institution}
                      onChange={(e) => handleArrayItemChange("education", index, "institution", e.target.value)}
                      placeholder="University of Example"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`edu-location-${index}`}>Location</Label>
                    <Input
                      id={`edu-location-${index}`}
                      value={edu.location}
                      onChange={(e) => handleArrayItemChange("education", index, "location", e.target.value)}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor={`edu-start-${index}`}>Start Date</Label>
                      <Input
                        id={`edu-start-${index}`}
                        value={edu.startDate}
                        onChange={(e) => handleArrayItemChange("education", index, "startDate", e.target.value)}
                        placeholder="Sep 2018"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edu-end-${index}`}>End Date</Label>
                      <Input
                        id={`edu-end-${index}`}
                        value={edu.endDate}
                        onChange={(e) => handleArrayItemChange("education", index, "endDate", e.target.value)}
                        placeholder="May 2022 (or Present)"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`edu-description-${index}`}>Description</Label>
                    <Textarea
                      id={`edu-description-${index}`}
                      value={edu.description}
                      onChange={(e) => handleArrayItemChange("education", index, "description", e.target.value)}
                      placeholder="Relevant coursework, achievements, GPA, etc."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                addArrayItem("education", {
                  degree: "",
                  institution: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
              className="w-full"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Work Experience */}
        <AccordionItem value="experience">
          <AccordionTrigger className="text-lg font-semibold">Work Experience</AccordionTrigger>
          <AccordionContent>
            {cvData.experience.map((exp, index) => (
              <div key={index} className="p-4 border rounded-md mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Experience #{index + 1}</h4>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayItem("experience", index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`exp-position-${index}`}>Position</Label>
                    <Input
                      id={`exp-position-${index}`}
                      value={exp.position}
                      onChange={(e) => handleArrayItemChange("experience", index, "position", e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`exp-company-${index}`}>Company</Label>
                    <Input
                      id={`exp-company-${index}`}
                      value={exp.company}
                      onChange={(e) => handleArrayItemChange("experience", index, "company", e.target.value)}
                      placeholder="Tech Company Inc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`exp-location-${index}`}>Location</Label>
                    <Input
                      id={`exp-location-${index}`}
                      value={exp.location}
                      onChange={(e) => handleArrayItemChange("experience", index, "location", e.target.value)}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor={`exp-start-${index}`}>Start Date</Label>
                      <Input
                        id={`exp-start-${index}`}
                        value={exp.startDate}
                        onChange={(e) => handleArrayItemChange("experience", index, "startDate", e.target.value)}
                        placeholder="Jan 2022"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`exp-end-${index}`}>End Date</Label>
                      <Input
                        id={`exp-end-${index}`}
                        value={exp.endDate}
                        onChange={(e) => handleArrayItemChange("experience", index, "endDate", e.target.value)}
                        placeholder="Present"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor={`exp-description-${index}`}>Description</Label>
                    <Textarea
                      id={`exp-description-${index}`}
                      value={exp.description}
                      onChange={(e) => handleArrayItemChange("experience", index, "description", e.target.value)}
                      placeholder="Describe your responsibilities, achievements, and technologies used..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                addArrayItem("experience", {
                  position: "",
                  company: "",
                  location: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
              className="w-full"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Skills */}
        <AccordionItem value="skills">
          <AccordionTrigger className="text-lg font-semibold">Skills</AccordionTrigger>
          <AccordionContent>
            {cvData.skills.map((skill, index) => (
              <div key={index} className="p-4 border rounded-md mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Skill Category #{index + 1}</h4>
                  <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayItem("skills", index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`skill-category-${index}`}>Category</Label>
                    <Input
                      id={`skill-category-${index}`}
                      value={skill.category}
                      onChange={(e) => handleArrayItemChange("skills", index, "category", e.target.value)}
                      placeholder="Technical Skills, Languages, Soft Skills, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`skill-items-${index}`}>Skills</Label>
                    <Textarea
                      id={`skill-items-${index}`}
                      value={skill.items}
                      onChange={(e) => handleArrayItemChange("skills", index, "items", e.target.value)}
                      placeholder="JavaScript, React, Node.js, Python, etc."
                      className="min-h-[80px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Separate skills with commas or write in paragraph form.
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                addArrayItem("skills", {
                  category: "",
                  items: "",
                })
              }
              className="w-full"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Skill Category
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Custom Sections */}
        <AccordionItem value="customSections">
          <AccordionTrigger className="text-lg font-semibold">Additional Sections</AccordionTrigger>
          <AccordionContent>
            {cvData.customSections.map((section, index) => (
              <div key={index} className="p-4 border rounded-md mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Custom Section #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeArrayItem("customSections", index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`custom-title-${index}`}>Section Title</Label>
                    <Input
                      id={`custom-title-${index}`}
                      value={section.title}
                      onChange={(e) => handleArrayItemChange("customSections", index, "title", e.target.value)}
                      placeholder="Projects, Certifications, Publications, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`custom-content-${index}`}>Content</Label>
                    <Textarea
                      id={`custom-content-${index}`}
                      value={section.content}
                      onChange={(e) => handleArrayItemChange("customSections", index, "content", e.target.value)}
                      placeholder="Describe your projects, certifications, or any other relevant information..."
                      className="min-h-[120px]"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                addArrayItem("customSections", {
                  title: "",
                  content: "",
                })
              }
              className="w-full"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Custom Section
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Design Preferences */}
        <AccordionItem value="designPreferences">
          <AccordionTrigger className="text-lg font-semibold">Design Preferences</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="template">Template Style</Label>
                <select
                  id="template"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={cvData.designPreferences.template}
                  onChange={(e) => handleDesignPreferencesChange("template", e.target.value)}
                >
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="minimal">Minimal</option>
                  <option value="professional">Professional</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="primaryColor"
                    value={cvData.designPreferences.primaryColor}
                    onChange={(e) => handleDesignPreferencesChange("primaryColor", e.target.value)}
                    className="h-10 w-10 rounded-md border border-input"
                  />
                  <Input
                    value={cvData.designPreferences.primaryColor}
                    onChange={(e) => handleDesignPreferencesChange("primaryColor", e.target.value)}
                    placeholder="#2c5282"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                <select
                  id="fontSize"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={cvData.designPreferences.fontSize}
                  onChange={(e) => handleDesignPreferencesChange("fontSize", e.target.value)}
                >
                  <option value="10pt">Small (10pt)</option>
                  <option value="11pt">Medium (11pt)</option>
                  <option value="12pt">Large (12pt)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="spacing">Line Spacing</Label>
                <select
                  id="spacing"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={cvData.designPreferences.spacing}
                  onChange={(e) => handleDesignPreferencesChange("spacing", e.target.value)}
                >
                  <option value="single">Single</option>
                  <option value="onehalfspacing">One and Half</option>
                  <option value="doublespacing">Double</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Design Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={cvData.designPreferences.additionalNotes}
                  onChange={(e) => handleDesignPreferencesChange("additionalNotes", e.target.value)}
                  placeholder="Any additional design preferences or special formatting requirements..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button type="submit" className="w-full" disabled={isGenerating}>
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating CV...
          </>
        ) : (
          "Generate CV"
        )}
      </Button>
    </form>
  )
}

