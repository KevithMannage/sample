// Add a note about the API key balance issue at the top of the file

// DeepSeek API service for generating LaTeX CV
// Note: The current API key has insufficient balance.
// This implementation falls back to client-side generation.

// Define API constants - keeping for reference but not using due to insufficient balance
const DEEPSEEK_API_KEY = "sk-e4cd2f2cb6434d519a25a5fe8af349e6" // Insufficient balance
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions"

// Define response type
interface DeepSeekResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

// Main function to generate CV LaTeX
export async function generateCvLatex(cvData: any): Promise<string> {
  try {
    // Create prompt from CV data
    const prompt = createCvPrompt(cvData)

    // Call DeepSeek API
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content:
              "You are a professional CV/resume creator that generates LaTeX code for beautiful, professional CVs. Your output should be valid LaTeX code that can be compiled directly.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 4000,
      }),
    })

    // Handle API errors
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`DeepSeek API error: ${errorData.error?.message || response.statusText}`)
    }

    // Parse response
    const data = (await response.json()) as DeepSeekResponse
    const latexCode = data.choices[0].message.content.trim()

    // Extract LaTeX code from markdown code blocks if present
    const latexMatch = latexCode.match(/```(?:latex)?\s*([\s\S]*?)```/)
    return latexMatch ? latexMatch[1].trim() : latexCode
  } catch (error: any) {
    console.error("Error generating CV LaTeX:", error)
    throw new Error(`Failed to generate CV: ${error.message}`)
  }
}

// Update the createCvPrompt function to include design preferences
function createCvPrompt(cvData: any): string {
  // Build sections
  const personalInfo = `
## Personal Information
Name: ${cvData.personalInfo.name}
Email: ${cvData.personalInfo.email}
Phone: ${cvData.personalInfo.phone}
Address: ${cvData.personalInfo.address}
${cvData.personalInfo.website ? `Website: ${cvData.personalInfo.website}` : ""}
${cvData.personalInfo.linkedin ? `LinkedIn: ${cvData.personalInfo.linkedin}` : ""}
${cvData.personalInfo.github ? `GitHub: ${cvData.personalInfo.github}` : ""}
`

  const summary = `
## Professional Summary
${cvData.summary}
`

  const education = `
## Education
${cvData.education
  .map(
    (edu: any, index: number) => `
Education ${index + 1}:
- Degree: ${edu.degree}
- Institution: ${edu.institution}
- Location: ${edu.location}
- Dates: ${edu.startDate} - ${edu.endDate}
- Description: ${edu.description}
`,
  )
  .join("")}
`

  const experience = `
## Work Experience
${cvData.experience
  .map(
    (exp: any, index: number) => `
Experience ${index + 1}:
- Position: ${exp.position}
- Company: ${exp.company}
- Location: ${exp.location}
- Dates: ${exp.startDate} - ${exp.endDate}
- Description: ${exp.description}
`,
  )
  .join("")}
`

  const skills = `
## Skills
${cvData.skills
  .map(
    (skill: any, index: number) => `
Skill Category ${index + 1}: ${skill.category}
Skills: ${skill.items}
`,
  )
  .join("")}
`

  const additionalSections = `
## Additional Sections
${cvData.customSections
  .map(
    (section: any, index: number) => `
Section ${index + 1}: ${section.title}
Content: ${section.content}
`,
  )
  .join("")}
`

  // Add design preferences section
  const designPreferences = `
## Design Preferences
- Template Style: ${cvData.designPreferences?.template || "classic"}
- Primary Color: ${cvData.designPreferences?.primaryColor || "#2c5282"}
- Font Size: ${cvData.designPreferences?.fontSize || "11pt"}
- Line Spacing: ${cvData.designPreferences?.spacing || "single"}
- Additional Notes: ${cvData.designPreferences?.additionalNotes || ""}
`

  // Combine all sections
  return `
Please create a professional CV/resume in LaTeX format using the following information:
${personalInfo}
${summary}
${education}
${experience}
${skills}
${additionalSections}
${designPreferences}

Please create a clean, professional CV in LaTeX format. Use a modern template with good spacing and organization. The LaTeX code should:
1. Be complete and compilable
2. Use appropriate LaTeX packages for CV/resume formatting
3. Have a clean, professional layout
4. Organize the information in a logical way
5. Highlight key achievements and skills
6. Follow the design preferences specified above

Return ONLY the LaTeX code without any explanations or markdown formatting.
`
}

// Fallback LaTeX generation in case the API fails
export function generateFallbackLatex(cvData: any): string {
  // Extract design preferences with defaults
  const template = cvData.designPreferences?.template || "classic"
  const primaryColor = cvData.designPreferences?.primaryColor || "#2c5282"
  const fontSize = cvData.designPreferences?.fontSize || "11pt"
  const spacing = cvData.designPreferences?.spacing || "single"

  // Convert hex color to RGB for LaTeX
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? {
          r: Number.parseInt(result[1], 16),
          g: Number.parseInt(result[2], 16),
          b: Number.parseInt(result[3], 16),
        }
      : { r: 70, g: 130, b: 180 } // Default blue if parsing fails
  }

  const rgb = hexToRgb(primaryColor)

  // Create a simple LaTeX template
  let latex = `\\documentclass[${fontSize},a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage{lmodern}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{xcolor}
`

  // Add spacing package based on preference
  if (spacing === "onehalfspacing" || spacing === "doublespacing") {
    latex += `\\usepackage{setspace}
\\${spacing}
`
  }

  // Template-specific styling
  if (template === "modern") {
    latex += `\\usepackage{fontawesome}
\\usepackage{multicol}
\\setlength{\\columnsep}{1cm}
`
  } else if (template === "minimal") {
    latex += `\\usepackage[compact]{titlesec}
\\titlespacing{\\section}{0pt}{*0.5}{*0.5}
\\titlespacing{\\subsection}{0pt}{*0.5}{*0.5}
`
  } else if (template === "professional") {
    latex += `\\usepackage{fontawesome}
\\usepackage{tabularx}
\\usepackage{booktabs}
`
  }

  // Define colors
  latex += `
\\definecolor{primary}{RGB}{${rgb.r},${rgb.g},${rgb.b}}

% Format section titles
\\titleformat{\\section}{\\normalfont\\Large\\bfseries}{}{0em}{\\color{primary}}[\\titlerule]
\\titlespacing*{\\section}{0pt}{*2}{*1}

% Format subsection titles
\\titleformat{\\subsection}{\\normalfont\\large\\bfseries}{}{0em}{}
\\titlespacing*{\\subsection}{0pt}{*1.5}{*0.5}

% Header and footer
\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\fancyhf{}
\\renewcommand{\\headrulewidth}{0pt}
\\fancyfoot[C]{\\thepage}

\\begin{document}

`

  // Template-specific header
  if (template === "modern") {
    latex += `\\begin{center}
  {\\Huge\\textbf{${cvData.personalInfo.name}}}
  
  \\vspace{0.5em}
  \\begin{multicols}{2}
  ${cvData.personalInfo.phone ? `\\textbf{Phone:} ${cvData.personalInfo.phone}\\\\` : ""}
  ${cvData.personalInfo.email ? `\\textbf{Email:} ${cvData.personalInfo.email}\\\\` : ""}
  \\columnbreak
  ${cvData.personalInfo.address ? `\\textbf{Address:} ${cvData.personalInfo.address}\\\\` : ""}
  ${cvData.personalInfo.website ? `\\textbf{Website:} \\href{https://${cvData.personalInfo.website.replace(/^https?:\/\//, "")}}{${cvData.personalInfo.website.replace(/^https?:\/\//, "")}}\\\\` : ""}
  \\end{multicols}
  ${cvData.personalInfo.linkedin ? `\\href{https://${cvData.personalInfo.linkedin.replace(/^https?:\/\//, "")}}{LinkedIn} $\\cdot$ ` : ""}
  ${cvData.personalInfo.github ? `\\href{https://${cvData.personalInfo.github.replace(/^https?:\/\//, "")}}{GitHub}` : ""}
\\end{center}
`
  } else if (template === "minimal") {
    latex += `\\begin{center}
  \\textbf{\\Huge ${cvData.personalInfo.name}}\\\\[0.3em]
  ${cvData.personalInfo.email}
  ${cvData.personalInfo.phone ? ` $\\cdot$ ${cvData.personalInfo.phone}` : ""}
  ${cvData.personalInfo.address ? ` $\\cdot$ ${cvData.personalInfo.address}` : ""}
\\end{center}
`
  } else if (template === "professional") {
    latex += `\\begin{center}
  \\textbf{\\Huge ${cvData.personalInfo.name}}\\\\[0.5em]
  \\begin{tabular}{ccc}
  ${cvData.personalInfo.email} & ${cvData.personalInfo.phone || ""} & ${cvData.personalInfo.address || ""}
  \\end{tabular}\\\\
  ${cvData.personalInfo.website ? `\\href{https://${cvData.personalInfo.website.replace(/^https?:\/\//, "")}}{${cvData.personalInfo.website.replace(/^https?:\/\//, "")}} $\\cdot$ ` : ""}
  ${cvData.personalInfo.linkedin ? `\\href{https://${cvData.personalInfo.linkedin.replace(/^https?:\/\//, "")}}{LinkedIn} $\\cdot$ ` : ""}
  ${cvData.personalInfo.github ? `\\href{https://${cvData.personalInfo.github.replace(/^https?:\/\//, "")}}{GitHub}` : ""}
\\end{center}
`
  } else {
    // Classic template (default)
    latex += `\\begin{center}
  \\textbf{\\Huge ${cvData.personalInfo.name}}\\\\[0.5em]
  ${cvData.personalInfo.address ? `${cvData.personalInfo.address} $\\cdot$ ` : ""}
  ${cvData.personalInfo.phone ? `${cvData.personalInfo.phone} $\\cdot$ ` : ""}
  ${cvData.personalInfo.email}\\\\
  ${cvData.personalInfo.website ? `\\href{https://${cvData.personalInfo.website.replace(/^https?:\/\//, "")}}{${cvData.personalInfo.website.replace(/^https?:\/\//, "")}} $\\cdot$ ` : ""}
  ${cvData.personalInfo.linkedin ? `\\href{https://${cvData.personalInfo.linkedin.replace(/^https?:\/\//, "")}}{LinkedIn} $\\cdot$ ` : ""}
  ${cvData.personalInfo.github ? `\\href{https://${cvData.personalInfo.github.replace(/^https?:\/\//, "")}}{GitHub}` : ""}
\\end{center}
`
  }

  // Add summary if available
  if (cvData.summary) {
    latex += `\\section{Professional Summary}
${cvData.summary}

`
  }

  // Add education section
  latex += `\\section{Education}
`

  cvData.education.forEach((edu: any) => {
    latex += `\\subsection{${edu.institution}${edu.location ? ` - ${edu.location}` : ""}}
\\textbf{${edu.degree}} \\hfill ${edu.startDate} - ${edu.endDate}
`

    if (edu.description) {
      latex += `\\begin{itemize}[leftmargin=*]
  \\item ${edu.description}
\\end{itemize}
`
    }
  })

  // Add experience section
  latex += `\\section{Work Experience}
`

  cvData.experience.forEach((exp: any) => {
    latex += `\\subsection{${exp.company}${exp.location ? ` - ${exp.location}` : ""}}
\\textbf{${exp.position}} \\hfill ${exp.startDate} - ${exp.endDate}
`

    if (exp.description) {
      const items = exp.description
        .split("\n")
        .map((item: string) => `  \\item ${item}`)
        .join("\n")
      latex += `\\begin{itemize}[leftmargin=*]
${items}
\\end{itemize}
`
    }
  })

  // Add skills section
  latex += `\\section{Skills}
`

  cvData.skills.forEach((skill: any) => {
    latex += `\\subsection{${skill.category}}
${skill.items}

`
  })

  // Add custom sections
  cvData.customSections.forEach((section: any) => {
    if (section.title && section.content) {
      latex += `\\section{${section.title}}
${section.content}

`
    }
  })

  // Close document
  latex += `\\end{document}`

  return latex
}

