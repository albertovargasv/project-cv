"use client";

import React from "react";
import { Education } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  entries: Education[];
  onChange: (entries: Education[]) => void;
}

export function EducationEditor({ entries, onChange }: Props) {
  const addEntry = () => {
    const newEntry: Education = {
      id: Math.random().toString(36).substr(2, 9),
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    onChange([...entries, newEntry]);
  };

  const updateEntry = (id: string, updates: Partial<Education>) => {
    onChange(entries.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const removeEntry = (id: string) => {
    onChange(entries.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.id} className="p-4 border rounded-lg bg-background/50 relative group">
            <button 
              onClick={() => removeEntry(entry.id)}
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>School / University</Label>
                <Input value={entry.school} onChange={(e) => updateEntry(entry.id, { school: e.target.value })} placeholder="MIT" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input value={entry.degree} onChange={(e) => updateEntry(entry.id, { degree: e.target.value })} placeholder="Bachelor of Science" />
                </div>
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input value={entry.fieldOfStudy} onChange={(e) => updateEntry(entry.id, { fieldOfStudy: e.target.value })} placeholder="Software Engineering" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="month" value={entry.startDate} onChange={(e) => updateEntry(entry.id, { startDate: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="month" value={entry.endDate} onChange={(e) => updateEntry(entry.id, { endDate: e.target.value })} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={addEntry} variant="outline" className="w-full border-dashed py-8">
        <Plus className="w-4 h-4 mr-2" />
        Add Education Entry
      </Button>
    </div>
  );
}