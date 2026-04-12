"use client";

import React from "react";
import { PersonalInfo } from "@/types/cv";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AiAssistant } from "@/components/ai-assistant";

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export function PersonalInfoEditor({ data, onChange }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" value={data.fullName} onChange={handleChange} placeholder="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input id="jobTitle" name="jobTitle" value={data.jobTitle} onChange={handleChange} placeholder="Software Engineer" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" value={data.email} onChange={handleChange} placeholder="email@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" value={data.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" value={data.location} onChange={handleChange} placeholder="City, State" />
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input id="github" name="github" value={data.github} onChange={handleChange} placeholder="github.com/user" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input id="linkedin" name="linkedin" value={data.linkedin} onChange={handleChange} placeholder="linkedin.com/in/user" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" name="website" value={data.website} onChange={handleChange} placeholder="portfolio.dev" />
        </div>
      </div>

      <div className="space-y-2 relative">
        <div className="flex items-center justify-between mb-1">
          <Label htmlFor="summary">Professional Summary</Label>
          <AiAssistant 
            content={data.summary} 
            onImproved={(improved) => onChange({ ...data, summary: improved })} 
          />
        </div>
        <Textarea 
          id="summary" 
          name="summary" 
          value={data.summary} 
          onChange={handleChange} 
          placeholder="Write a brief professional overview..." 
          className="min-h-[120px] resize-none"
        />
      </div>
    </div>
  );
}