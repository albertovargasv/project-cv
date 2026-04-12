"use client";

import React from "react";
import { CVData } from "@/types/cv";
import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink } from "lucide-react";

interface Props {
  data: CVData;
}

export function CVPreview({ data }: Props) {
  const { personalInfo, experience, education, skills, projects } = data;

  return (
    <div className="p-8 h-full bg-white text-slate-800 font-body overflow-y-auto">
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-6 mb-6">
        <h1 className="text-4xl font-bold uppercase tracking-tight text-slate-900 mb-1">{personalInfo.fullName || "Your Name"}</h1>
        <p className="text-xl text-primary font-medium mb-4">{personalInfo.jobTitle || "Job Title"}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 text-xs">
          {personalInfo.email && <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-slate-500" /> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-slate-500" /> {personalInfo.phone}</div>}
          {personalInfo.location && <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-slate-500" /> {personalInfo.location}</div>}
          {personalInfo.github && <div className="flex items-center gap-2"><Github className="w-3 h-3 text-slate-500" /> {personalInfo.github}</div>}
          {personalInfo.linkedin && <div className="flex items-center gap-2"><Linkedin className="w-3 h-3 text-slate-500" /> {personalInfo.linkedin}</div>}
          {personalInfo.website && <div className="flex items-center gap-2"><Globe className="w-3 h-3 text-slate-500" /> {personalInfo.website}</div>}
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Main Content */}
        <div className="col-span-8 space-y-8">
          {/* Summary */}
          {personalInfo.summary && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">Professional Summary</h2>
              <p className="text-sm leading-relaxed text-slate-700">{personalInfo.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-4">Experience</h2>
              <div className="space-y-6">
                {experience.map(exp => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-bold text-slate-900">{exp.position}</h3>
                        <p className="text-sm text-primary font-medium">{exp.company}</p>
                      </div>
                      <p className="text-xs font-medium text-slate-500">
                        {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                    {exp.location && <p className="text-xs text-slate-500 mb-2 italic">{exp.location}</p>}
                    <p className="text-sm text-slate-700 whitespace-pre-line leading-snug">{exp.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-4">Selected Projects</h2>
              <div className="space-y-4">
                {projects.map(proj => (
                  <div key={proj.id} className="p-3 bg-slate-50 rounded border border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        {proj.title}
                        {(proj.link || proj.github) && <ExternalLink className="w-3 h-3 opacity-30" />}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-700 mb-2 leading-relaxed">{proj.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {proj.technologies.map(t => (
                        <span key={t} className="text-[10px] font-bold bg-slate-200 px-1.5 py-0.5 rounded uppercase tracking-tight">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Sidebar */}
        <div className="col-span-4 space-y-8">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">Technical Skills</h2>
              <div className="space-y-4">
                {Object.entries(skills.reduce((acc, s) => {
                  if (!acc[s.category]) acc[s.category] = [];
                  acc[s.category].push(s.name);
                  return acc;
                }, {} as Record<string, string[]>)).map(([category, names]) => (
                  <div key={category}>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{category}</h4>
                    <p className="text-xs text-slate-800 font-medium leading-relaxed">{names.join(", ")}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">Education</h2>
              <div className="space-y-4">
                {education.map(edu => (
                  <div key={edu.id}>
                    <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                    <p className="text-xs text-primary font-medium leading-tight">{edu.fieldOfStudy}</p>
                    <p className="text-[11px] text-slate-600 mt-1">{edu.school}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-tighter">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}