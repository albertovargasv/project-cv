"use client";

import React, { useState, useEffect } from "react";
import { CVData } from "@/types/cv";
import { PersonalInfoEditor } from "@/components/cv-editor/personal-info-editor";
import { ExperienceEditor } from "@/components/cv-editor/experience-editor";
import { EducationEditor } from "@/components/cv-editor/education-editor";
import { SkillsEditor } from "@/components/cv-editor/skills-editor";
import { ProjectsEditor } from "@/components/cv-editor/projects-editor";
import { CoursesEditor } from "@/components/cv-editor/courses-editor";
import { CVPreview } from "@/components/cv-preview/cv-preview";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  Layers, 
  Download, 
  Eye, 
  Edit3,
  Heart,
  Award
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const INITIAL_DATA: CVData = {
  personalInfo: {
    fullName: "Alex Rivera",
    jobTitle: "Senior Full Stack Engineer",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 000-0000",
    github: "github.com/arivera",
    linkedin: "linkedin.com/in/arivera",
    website: "arivera.dev",
    summary: "Dedicated software engineer with 8+ years of experience building scalable web applications. Passionate about clean code, performance optimization, and mentoring junior developers."
  },
  experience: [
    {
      id: "1",
      company: "TechFlow Systems",
      position: "Lead Developer",
      startDate: "2020-01",
      endDate: "",
      current: true,
      description: "Architected and maintained high-traffic SaaS platforms using Next.js and Go. Reduced cloud infrastructure costs by 30% through container orchestration."
    }
  ],
  education: [
    {
      id: "1",
      school: "State University of Technology",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2012-09",
      endDate: "2016-06",
      description: "Specialized in Distributed Systems and Database Management."
    }
  ],
  courses: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      startDate: "2023-01",
      endDate: "2023-03",
      description: "Comprehensive certification covering compute, networking, storage, and database AWS services."
    }
  ],
  skills: [
    { id: "1", name: "TypeScript" },
    { id: "2", name: "React / Next.js" },
    { id: "3", name: "Node.js" },
    { id: "4", name: "PostgreSQL" }
  ],
  softSkills: [
    { id: "1", name: "Communication" },
    { id: "2", name: "Team Leadership" },
    { id: "3", name: "Problem Solving" }
  ],
  projects: [
    {
      id: "1",
      title: "DevVault CV",
      description: "A professional CV builder specifically designed for developers with live preview and AI assistance.",
      technologies: ["Next.js", "Tailwind CSS", "GenAI"],
      link: "https://devvault.app",
      github: "https://github.com/devvault/app"
    }
  ]
};

export default function DevVaultApp() {
  const [cvData, setCvData] = useState<CVData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState("personal");
  const { toast } = useToast();

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      {/* Header */}
      <header className="no-print border-b bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
              <Layers className="text-accent-foreground w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight font-headline">
              DevVault <span className="text-accent">CV</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleExportPdf} className="hidden sm:flex gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editor Section */}
        <section className="no-print lg:col-span-5 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-7 w-full bg-card p-1">
              <TabsTrigger value="personal" title="Personal Info"><User className="w-4 h-4" /></TabsTrigger>
              <TabsTrigger value="experience" title="Experience"><Briefcase className="w-4 h-4" /></TabsTrigger>
              <TabsTrigger value="education" title="Education"><GraduationCap className="w-4 h-4" /></TabsTrigger>
              <TabsTrigger value="courses" title="Courses"><Award className="w-4 h-4" /></TabsTrigger>
              <TabsTrigger value="skills" title="Skills"><Wrench className="w-4 h-4" /></TabsTrigger>
              <TabsTrigger value="softskills" title="Soft Skills"><Heart className="w-4 h-4" /></TabsTrigger>
              <TabsTrigger value="projects" title="Projects"><Layers className="w-4 h-4" /></TabsTrigger>
            </TabsList>

            <div className="mt-6 bg-card border rounded-xl p-6 min-h-[600px] shadow-sm">
              <TabsContent value="personal" className="mt-0">
                <PersonalInfoEditor 
                  data={cvData.personalInfo} 
                  onChange={(info) => setCvData(prev => ({ ...prev, personalInfo: info }))} 
                />
              </TabsContent>
              <TabsContent value="experience" className="mt-0">
                <ExperienceEditor 
                  entries={cvData.experience} 
                  onChange={(entries) => setCvData(prev => ({ ...prev, experience: entries }))} 
                />
              </TabsContent>
              <TabsContent value="education" className="mt-0">
                <EducationEditor 
                  entries={cvData.education} 
                  onChange={(entries) => setCvData(prev => ({ ...prev, education: entries }))} 
                />
              </TabsContent>
              <TabsContent value="courses" className="mt-0">
                <CoursesEditor 
                  entries={cvData.courses || []} 
                  onChange={(entries) => setCvData(prev => ({ ...prev, courses: entries }))} 
                />
              </TabsContent>
              <TabsContent value="skills" className="mt-0">
                <SkillsEditor 
                  skills={cvData.skills} 
                  onChange={(skills) => setCvData(prev => ({ ...prev, skills }))} 
                />
              </TabsContent>
              <TabsContent value="softskills" className="mt-0">
                <SkillsEditor 
                  skills={cvData.softSkills || []} 
                  onChange={(skills) => setCvData(prev => ({ ...prev, softSkills: skills }))} 
                />
              </TabsContent>
              <TabsContent value="projects" className="mt-0">
                <ProjectsEditor 
                  projects={cvData.projects} 
                  onChange={(projects) => setCvData(prev => ({ ...prev, projects }))} 
                />
              </TabsContent>
            </div>
          </Tabs>
        </section>

        {/* Preview Section */}
        <section className="lg:col-span-7 flex flex-col gap-4">
          <div className="no-print flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Eye className="w-5 h-5 text-accent" />
              Live Preview
            </h2>
            <p className="text-xs text-muted-foreground">Changes reflect instantly</p>
          </div>
          
          <div className="relative group">
            <div className="cv-preview-container overflow-hidden">
              <CVPreview data={cvData} />
            </div>
          </div>
          
          <div className="no-print lg:hidden fixed bottom-6 right-6">
             <Button onClick={handleExportPdf} className="rounded-full shadow-lg h-14 w-14 p-0">
                <Download className="w-6 h-6" />
             </Button>
          </div>
        </section>
      </main>
    </div>
  );
}