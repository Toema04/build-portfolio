"use client";

import { useRef, useEffect, useCallback } from "react";
import { jsPDF } from "jspdf";
import { useState } from "react";
import {
  ChevronDown,
  Download,
  Edit2,
  Globe,
  Home,
  Palette,
  Plus,
  User,
  BookOpen,
  Code,
  Languages,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

type Section = "profile" | "education" | "skills" | "languages" | "projects";

type PortfolioData = {
  profile: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    about: string;
  };
  education: { school: string; degree: string; year: string }[];
  skills: string[];
  languages: string[];
  projects: { name: string; description: string }[];
};

export function PortfolioEditorComponent() {
  const [activeSection, setActiveSection] = useState<
    "content" | "customize" | "links"
  >("content");
  const [expandedSection, setExpandedSection] = useState<Section | null>(null);
  const [portfolioTitle, setPortfolioTitle] = useState("Resume 1");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    profile: {
      name: "John Doe",
      title: "Full Stack Developer",
      email: "john@example.com",
      phone: "(123) 456-7890",
      location: "New York, USA",
      about: "Passionate developer with 5 years of experience.",
    },
    education: [
      {
        school: "University of Technology",
        degree: "Bachelor of Computer Science",
        year: "2015 - 2019",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
    languages: ["English", "Spanish"],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform using MERN stack",
      },
    ],
  });

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditingTitle]);

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPortfolioTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const downloadPortfolio = useCallback(() => {
    const doc = new jsPDF();
    const lineHeight = 10;
    let yPosition = 20;

    // Title
    doc.setFontSize(24);
    doc.text(portfolioTitle, 20, yPosition);
    yPosition += lineHeight * 2;

    // Profile
    doc.setFontSize(18);
    doc.text("Profile", 20, yPosition);
    yPosition += lineHeight;

    doc.setFontSize(12);
    Object.entries(portfolioData.profile).forEach(([key, value]) => {
      doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, 20, yPosition);
      yPosition += lineHeight;
    });

    // Education
    yPosition += lineHeight;
    doc.setFontSize(18);
    doc.text("Education", 20, yPosition);
    yPosition += lineHeight;

    doc.setFontSize(12);
    portfolioData.education.forEach((edu) => {
      doc.text(`${edu.school} - ${edu.degree} (${edu.year})`, 20, yPosition);
      yPosition += lineHeight;
    });

    // Skills
    yPosition += lineHeight;
    doc.setFontSize(18);
    doc.text("Skills", 20, yPosition);
    yPosition += lineHeight;

    doc.setFontSize(12);
    doc.text(portfolioData.skills.join(", "), 20, yPosition);
    yPosition += lineHeight;

    // Languages
    yPosition += lineHeight;
    doc.setFontSize(18);
    doc.text("Languages", 20, yPosition);
    yPosition += lineHeight;

    doc.setFontSize(12);
    doc.text(portfolioData.languages.join(", "), 20, yPosition);
    yPosition += lineHeight;

    // Projects
    yPosition += lineHeight;
    doc.setFontSize(18);
    doc.text("Projects", 20, yPosition);
    yPosition += lineHeight;

    doc.setFontSize(12);
    portfolioData.projects.forEach((project) => {
      doc.text(`${project.name}: ${project.description}`, 20, yPosition);
      yPosition += lineHeight;
    });

    doc.save(`${portfolioTitle}.pdf`);
  }, [portfolioData, portfolioTitle]);

  const toggleSection = (section: Section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleDataChange = (
    section: Section,
    field: string,
    value: string,
    index?: number
  ) => {
    setPortfolioData((prev) => {
      if (section === "profile") {
        return { ...prev, profile: { ...prev.profile, [field]: value } };
      }
      if (Array.isArray(prev[section])) {
        const newArray = [...prev[section]];
        if (typeof index === "number") {
          if (typeof newArray[index] === "string") {
            newArray[index] = value;
          } else {
            newArray[index] = { ...newArray[index], [field]: value };
          }
        } else {
          newArray.push(value);
        }
        return { ...prev, [section]: newArray };
      }
      return prev;
    });
  };

  const addContent = () => {
    // Implement logic to add new content
    console.log("Adding new content...");
  };

  const sectionIcons = {
    profile: <User size={20} />,
    education: <BookOpen size={20} />,
    skills: <Code size={20} />,
    languages: <Languages size={20} />,
    projects: <Briefcase size={20} />,
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-16 bg-white shadow-md flex flex-col items-center py-4 space-y-8">
        <div className="w-10 h-10 bg-pink-500 rounded-md flex items-center justify-center">
          <Home className="text-white" size={24} />
        </div>
        <Edit2
          className={`cursor-pointer ${
            activeSection === "content" ? "text-pink-500" : "text-gray-400"
          }`}
          size={24}
          onClick={() => setActiveSection("content")}
        />
        <Palette
          className={`cursor-pointer ${
            activeSection === "customize" ? "text-pink-500" : "text-gray-400"
          }`}
          size={24}
          onClick={() => setActiveSection("customize")}
        />
        <Globe
          className={`cursor-pointer ${
            activeSection === "links" ? "text-pink-500" : "text-gray-400"
          }`}
          size={24}
          onClick={() => setActiveSection("links")}
        />
      </div>

      {/* Middle Section - Editable Components */}
      <div className="w-1/3  shadow-md p-4 overflow-y-auto">
        <div className="flex bg-white p-2 rounded-lg justify-between items-center mb-4">
          <div className="flex items-center rounded-md px-3 py-2">
            {isEditingTitle ? (
              <Input
                ref={titleInputRef}
                value={portfolioTitle}
                onChange={handleTitleChange}
                onBlur={handleTitleBlur}
                className="text-lg font-semibold mr-2 w-32 border-none focus:ring-0"
              />
            ) : (
              <h2 className="text-lg font-semibold mr-2">{portfolioTitle}</h2>
            )}
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={handleTitleEdit}
            >
              <Edit2 size={14} />
            </button>
          </div>
          <Button
            variant="outline"
            className="bg-[#2D0A4E] text-white hover:bg-[#3D1A5E] px-3 py-1.5 rounded-md text-sm flex items-center"
            onClick={downloadPortfolio}
          >
            <Download size={14} className="mr-1.5" />
            Download
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-120px)]">
          {(Object.keys(portfolioData) as Section[]).map((section) => (
            <div key={section} className="mb-4">
              <button
                className="w-full flex justify-between items-center p-3 bg-gray-50 rounded-md"
                onClick={() => toggleSection(section)}
              >
                <span className="flex items-center">
                  {sectionIcons[section]}
                  <span className="ml-2 capitalize font-bold text-md">{section}</span>
                </span>
                <ChevronDown
                  size={20}
                  className={`transform transition-transform ${
                    expandedSection === section ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedSection === section && (
                <div className="p-3 bg-white border border-gray-200 rounded-md mt-2 space-y-2">
                  {section === "profile" && (
                    <>
                      {Object.entries(portfolioData.profile).map(
                        ([field, value]) =>
                          field === "about" ? (
                            <Textarea
                              key={field}
                              placeholder={
                                field.charAt(0).toUpperCase() + field.slice(1)
                              }
                              value={value}
                              onChange={(e) =>
                                handleDataChange(
                                  "profile",
                                  field,
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            <Input
                              key={field}
                              placeholder={
                                field.charAt(0).toUpperCase() + field.slice(1)
                              }
                              value={value}
                              onChange={(e) =>
                                handleDataChange(
                                  "profile",
                                  field,
                                  e.target.value
                                )
                              }
                            />
                          )
                      )}
                    </>
                  )}
                  {(section === "skills" || section === "languages") &&
                    portfolioData[section].map((item, index) => (
                      <Input
                        key={`${section}-${index}`}
                        placeholder={`${section.slice(0, -1)} ${index + 1}`}
                        value={item}
                        onChange={(e) =>
                          handleDataChange(section, "", e.target.value, index)
                        }
                      />
                    ))}
                  {(section === "education" || section === "projects") &&
                    portfolioData[section].map((item, index) => (
                      <div key={`${section}-${index}`} className="space-y-2">
                        {Object.entries(item).map(([field, value]) =>
                          field === "description" ? (
                            <Textarea
                              key={`${section}-${index}-${field}`}
                              placeholder={
                                field.charAt(0).toUpperCase() + field.slice(1)
                              }
                              value={value}
                              onChange={(e) =>
                                handleDataChange(
                                  section,
                                  field,
                                  e.target.value,
                                  index
                                )
                              }
                            />
                          ) : (
                            <Input
                              key={`${section}-${index}-${field}`}
                              placeholder={
                                field.charAt(0).toUpperCase() + field.slice(1)
                              }
                              value={value}
                              onChange={(e) =>
                                handleDataChange(
                                  section,
                                  field,
                                  e.target.value,
                                  index
                                )
                              }
                            />
                          )
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </ScrollArea>
        <Button
          className="w-full mt-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600"
          onClick={addContent}
        >
          <Plus size={16} className="mr-2" />
          Add Content
        </Button>
      </div>

      {/* Right Section - Preview */}
      <div className="flex-1 bg-gray-200 p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">
            {portfolioData.profile.name}
          </h1>
          <p className="text-gray-600 mb-4">{portfolioData.profile.title}</p>
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span>{portfolioData.profile.email}</span>
            <span>{portfolioData.profile.phone}</span>
            <span>{portfolioData.profile.location}</span>
          </div>
          <p className="mb-4">{portfolioData.profile.about}</p>
          <h2 className="text-xl font-semibold mb-2 uppercase">Education</h2>
          {portfolioData.education.map((edu, index) => (
            <div key={`education-${index}`} className="mb-2">
              <p className="font-semibold">{edu.school}</p>
              <p>{edu.degree}</p>
              <p className="text-sm text-gray-500">{edu.year}</p>
            </div>
          ))}
          <h2 className="text-xl font-semibold mb-2 mt-4 uppercase">Skills</h2>
          <ul className="list-disc list-inside mb-4">
            {portfolioData.skills.map((skill, index) => (
              <li key={`skill-${index}`}>{skill}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2 uppercase">Languages</h2>
          <ul className="list-disc list-inside mb-4">
            {portfolioData.languages.map((language, index) => (
              <li key={`language-${index}`}>{language}</li>
            ))}
          </ul>
          <h2 className="text-xl font-semibold mb-2 uppercase">Projects</h2>
          {portfolioData.projects.map((project, index) => (
            <div key={`project-${index}`} className="mb-2">
              <p className="font-semibold">{project.name}</p>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}