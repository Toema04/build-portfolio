'use client'

import { useState, useRef } from "react"
import { Download, Edit2, ChevronDown, User, BookOpen, Code, Languages, Briefcase, FileText, Palette, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Section = "profile" | "education" | "skills" | "languages" | "projects"

type PortfolioData = {
  profile: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    about: string
    photo: string
  }
  education: { school: string; degree: string; year: string }[]
  skills: string[]
  languages: string[]
  projects: { name: string; description: string }[]
}

export default function Component() {
  const [activeSection, setActiveSection] = useState<"content" | "customize" | "links">("content")
  const [expandedSection, setExpandedSection] = useState<Section | null>(null)
  const [portfolioTitle, setPortfolioTitle] = useState("My Portfolio")
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    profile: {
      name: "John Doe",
      title: "Software Developer",
      email: "john@example.com",
      phone: "(123) 456-7890",
      location: "New York, NY",
      about: "Passionate about creating efficient and user-friendly applications.",
      photo: "",
    },
    education: [
      {
        school: "University of Technology",
        degree: "Bachelor of Science in Computer Science",
        year: "2018 - 2022",
      },
    ],
    skills: ["JavaScript", "React", "Node.js"],
    languages: ["English", "Spanish"],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform using MERN stack",
      },
    ],
  })

  const handleTitleEdit = () => setIsEditingTitle(true);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setPortfolioTitle(e.target.value);
  const handleTitleBlur = () => setIsEditingTitle(false);

  const toggleSection = (section: Section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const handleDataChange = (section: Section, field: string, value: string, index?: number) => {
    setPortfolioData((prev) => {
      if (section === "profile") {
        return { ...prev, profile: { ...prev.profile, [field]: value } }
      }
      if (Array.isArray(prev[section])) {
        const newArray = [...prev[section]]
        if (typeof index === "number") {
          if (typeof newArray[index] === "string") {
            newArray[index] = value
          } else {
            newArray[index] = { ...newArray[index], [field]: value }
          }
        } else {
          newArray.push(value)
        }
        return { ...prev, [section]: newArray }
      }
      return prev
    })
  }

  const sectionIcons = {
    profile: <User size={20} />,
    education: <BookOpen size={20} />,
    skills: <Code size={20} />,
    languages: <Languages size={20} />,
    projects: <Briefcase size={20} />,
  }

  const downloadPortfolio = () => {
    // Add your download logic here
    console.log("Download portfolio");
  };

  return (
    <div className="flex h-screen bg-[#F5F5F5] p-4">
      {/* Sidebar */}
      <div className="w-[130px] bg-white rounded-lg shadow-md p-4 mr-4">
        <div className="flex flex-col items-center space-y-8">
          {["content", "customize", "links"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section as "content" | "customize" | "links")}
              className={`w-[110px] h-[90px] rounded-[20px] flex flex-col items-center justify-center py-1.5 px-6 ${
                activeSection === section ? "bg-gray-50" : ""
              }`}
            >
              {section === "content" && <FileText size={36} className={activeSection === section ? "text-pink-500" : "text-gray-400"} />}
              {section === "customize" && <Palette size={36} className={activeSection === section ? "text-pink-500" : "text-gray-400"} />}
              {section === "links" && <Globe size={36} className={activeSection === section ? "text-pink-500" : "text-gray-400"} />}
              <span className={`mt-1 text-base ${
                activeSection === section
                  ? "bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text"
                  : "text-[#200E32]"
              }`}>
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Middle Section - Editable Components */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-4 overflow-y-auto mx-4">
        <div className="sticky top-0 flex h-[112px] shrink-0 items-center gap-2 border-b bg-[#F0EEE8] px-4 pt-8 pb-5 rounded-b-[20px] shadow-[0_-25px_15px_15px_#F0EEE8]">
          <div className="flex items-center">
            {isEditingTitle ? (
              <Input
                ref={titleInputRef}
                value={portfolioTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                className="text-2xl font-extrabold mr-2 w-32 border-none focus:ring-0 text-[#200E32]"
              />
            ) : (
              <h2 className="text-2xl font-extrabold mr-2 text-[#200E32]">{portfolioTitle}</h2>
            )}
            <button className="p-2 rounded-xl hover:bg-gray-100" onClick={handleTitleEdit}>
              <Edit2 className="h-4 w-4 text-gray-400" />
            </button>
          </div>
          <Button
            variant="outline"
            className="bg-[#200E32] text-white hover:bg-[#2D0A4E] px-7 py-2 rounded-full text-base font-bold min-w-[120px] flex items-center justify-center"
            onClick={downloadPortfolio}
          >
            <span>Download</span>
            <Download className="ml-3 h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-100px)]">
          {(Object.keys(portfolioData) as Section[]).map((section) => (
            <Card key={section} className="mb-4">
              <CardContent className="p-4">
                <button
                  className="w-full flex justify-between items-center"
                  onClick={() => toggleSection(section)}
                >
                  <span className="flex items-center">
                    {sectionIcons[section]}
                    <span className="ml-2 capitalize font-bold">{section}</span>
                  </span>
                  <ChevronDown
                    size={20}
                    className={`transform transition-transform ${
                      expandedSection === section ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedSection === section && (
                  <div className="mt-4 space-y-2">
                    {section === "profile" && (
                      <>
                        <div className="flex items-center justify-center mb-4">
                          <Avatar className="w-24 h-24">
                            <AvatarImage src={portfolioData.profile.photo} alt="Profile photo" />
                            <AvatarFallback>{portfolioData.profile.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <Input
                          placeholder="Name"
                          value={portfolioData.profile.name}
                          onChange={(e) => handleDataChange("profile", "name", e.target.value)}
                        />
                        <Input
                          placeholder="Title"
                          value={portfolioData.profile.title}
                          onChange={(e) => handleDataChange("profile", "title", e.target.value)}
                        />
                        <Input
                          placeholder="Email"
                          value={portfolioData.profile.email}
                          onChange={(e) => handleDataChange("profile", "email", e.target.value)}
                        />
                        <Input
                          placeholder="Phone"
                          value={portfolioData.profile.phone}
                          onChange={(e) => handleDataChange("profile", "phone", e.target.value)}
                        />
                        <Input
                          placeholder="Location"
                          value={portfolioData.profile.location}
                          onChange={(e) => handleDataChange("profile", "location", e.target.value)}
                        />
                        <Textarea
                          placeholder="About"
                          value={portfolioData.profile.about}
                          onChange={(e) => handleDataChange("profile", "about", e.target.value)}
                        />
                      </>
                    )}
                    {(section === "skills" || section === "languages") &&
                      portfolioData[section].map((item, index) => (
                        <Input
                          key={`${section}-${index}`}
                          placeholder={`${section.slice(0, -1)} ${index + 1}`}
                          value={item}
                          onChange={(e) => handleDataChange(section, "", e.target.value, index)}
                        />
                      ))}
                    {(section === "education" || section === "projects") &&
                      portfolioData[section].map((item, index) => (
                        <div key={`${section}-${index}`} className="space-y-2">
                          {Object.entries(item).map(([field, value]) => (
                            <Input
                              key={`${section}-${index}-${field}`}
                              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                              value={value}
                              onChange={(e) => handleDataChange(section, field, e.target.value, index)}
                            />
                          ))}
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>

      {/* Right Section - Preview */}
      <div className="w-1/2 bg-white rounded-lg shadow-md p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{portfolioData.profile.name}</h1>
            <p className="text-xl text-gray-600">{portfolioData.profile.title}</p>
          </div>
          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            <span>{portfolioData.profile.email}</span>
            <span>{portfolioData.profile.phone}</span>
            <span>{portfolioData.profile.location}</span>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">PROFILE</h2>
            <p>{portfolioData.profile.about}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">EDUCATION</h2>
            {portfolioData.education.map((edu, index) => (
              <div key={index} className="mb-2">
                <p className="font-semibold">{edu.school}</p>
                <p>{edu.degree}</p>
                <p className="text-sm text-gray-500">{edu.year}</p>
              </div>
            ))}
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">SKILLS</h2>
            <ul className="list-disc list-inside">
              {portfolioData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">LANGUAGES</h2>
            <p>{portfolioData.languages.join(", ")}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">PROJECTS</h2>
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="mb-2">
                <p className="font-semibold">{project.name}</p>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}