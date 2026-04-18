"use client";

import React, { useState } from "react";
import { Project } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Link as LinkIcon, Github, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AiAssistant } from "@/components/ai-assistant";

interface Props {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function ProjectsEditor({ projects, onChange }: Props) {
  const [techInput, setTechInput] = useState("");

  const addProject = () => {
    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      description: "",
      technologies: [],
      link: "",
      github: ""
    };
    onChange([...projects, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    onChange(projects.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const removeProject = (id: string) => {
    onChange(projects.filter(p => p.id !== id));
  };

  const addTech = (id: string, tech: string) => {
    if (!tech.trim()) return;
    const project = projects.find(p => p.id === id);
    if (project && !project.technologies.includes(tech.trim())) {
      updateProject(id, { technologies: [...project.technologies, tech.trim()] });
    }
  };

  const removeTech = (id: string, tech: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      updateProject(id, { technologies: project.technologies.filter(t => t !== tech) });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.id} className="p-4 border rounded-lg bg-background/50 relative group">
            <button 
              onClick={() => removeProject(project.id)}
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Project Title</Label>
                <Input value={project.title} onChange={(e) => updateProject(project.id, { title: e.target.value })} placeholder="E-commerce Engine" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between mb-1">
                  <Label>Description</Label>
                  <AiAssistant 
                    content={project.description} 
                    onImproved={(improved) => updateProject(project.id, { description: improved })} 
                  />
                </div>
                <Textarea 
                  value={project.description} 
                  onChange={(e) => updateProject(project.id, { description: e.target.value })} 
                  placeholder="Built a custom ORM to handle complex relational queries..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Technologies</Label>
                <div className="flex gap-2 mb-2">
                  <Input 
                    placeholder="Add tech (e.g. Redis)" 
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTech(project.id, (e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-1">
                  {(project.technologies || []).map(t => (
                    <Badge key={t} variant="outline" className="flex items-center gap-1">
                      {t}
                      <button onClick={() => removeTech(project.id, t)}><X className="w-3 h-3" /></button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><LinkIcon className="w-3 h-3" /> Live Demo</Label>
                  <Input value={project.link} onChange={(e) => updateProject(project.id, { link: e.target.value })} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Github className="w-3 h-3" /> Repository</Label>
                  <Input value={project.github} onChange={(e) => updateProject(project.id, { github: e.target.value })} placeholder="https://github.com/..." />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={addProject} variant="outline" className="w-full border-dashed py-8">
        <Plus className="w-4 h-4 mr-2" />
        Add Project Entry
      </Button>
    </div>
  );
}