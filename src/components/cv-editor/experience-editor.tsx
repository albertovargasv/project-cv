"use client";

import React from "react";
import { Experience } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { AiAssistant } from "@/components/ai-assistant";

interface Props {
  entries: Experience[];
  onChange: (entries: Experience[]) => void;
}

export function ExperienceEditor({ entries, onChange }: Props) {
  const addEntry = () => {
    const newEntry: Experience = {
      id: Math.random().toString(36).substr(2, 9),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    };
    onChange([...entries, newEntry]);
  };

  const updateEntry = (id: string, updates: Partial<Experience>) => {
    onChange(entries.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const removeEntry = (id: string) => {
    onChange(entries.filter(e => e.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-6">
        {entries.map((entry, index) => (
          <div key={entry.id} className="p-4 border rounded-lg bg-background/50 relative group">
            <button 
              onClick={() => removeEntry(entry.id)}
              className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input value={entry.company} onChange={(e) => updateEntry(entry.id, { company: e.target.value })} placeholder="Apple Inc." />
              </div>
              <div className="space-y-2">
                <Label>Position</Label>
                <Input value={entry.position} onChange={(e) => updateEntry(entry.id, { position: e.target.value })} placeholder="Frontend Architect" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input type="month" value={entry.startDate} onChange={(e) => updateEntry(entry.id, { startDate: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <div className="space-y-2">
                  <Input 
                    type="month" 
                    value={entry.endDate} 
                    disabled={entry.current}
                    onChange={(e) => updateEntry(entry.id, { endDate: e.target.value })} 
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`current-${entry.id}`} 
                      checked={entry.current} 
                      onCheckedChange={(val) => updateEntry(entry.id, { current: !!val, endDate: val ? "" : entry.endDate })} 
                    />
                    <label htmlFor={`current-${entry.id}`} className="text-sm cursor-pointer">I currently work here</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between mb-1">
                <Label>Description</Label>
                <AiAssistant 
                  content={entry.description} 
                  onImproved={(improved) => updateEntry(entry.id, { description: improved })} 
                />
              </div>
              <Textarea 
                value={entry.description} 
                onChange={(e) => updateEntry(entry.id, { description: e.target.value })} 
                placeholder="Managed a team of 5, delivering a high-performance dashboard..."
                className="min-h-[100px]"
              />
            </div>
          </div>
        ))}
      </div>

      <Button onClick={addEntry} variant="outline" className="w-full border-dashed py-8">
        <Plus className="w-4 h-4 mr-2" />
        Add Work Experience
      </Button>
    </div>
  );
}