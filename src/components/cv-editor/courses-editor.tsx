"use client";

import React from "react";
import { Course } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface Props {
  entries: Course[];
  onChange: (entries: Course[]) => void;
}

export function CoursesEditor({ entries, onChange }: Props) {
  const addEntry = () => {
    const newEntry: Course = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      issuer: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    onChange([...entries, newEntry]);
  };

  const updateEntry = (id: string, updates: Partial<Course>) => {
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Course / Certification Name</Label>
                  <Input value={entry.name} onChange={(e) => updateEntry(entry.id, { name: e.target.value })} placeholder="AWS Certified Developer" />
                </div>
                <div className="space-y-2">
                  <Label>Issuing Organization</Label>
                  <Input value={entry.issuer} onChange={(e) => updateEntry(entry.id, { issuer: e.target.value })} placeholder="Amazon Web Services" />
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
              
              <div className="space-y-2">
                <Label>Description / Topics (Optional)</Label>
                <Textarea 
                  value={entry.description} 
                  onChange={(e) => updateEntry(entry.id, { description: e.target.value })} 
                  placeholder="Covered serverless architecture, DynamoDB, etc."
                  className="min-h-[80px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={addEntry} variant="outline" className="w-full border-dashed py-8">
        <Plus className="w-4 h-4 mr-2" />
        Add Course or Certification
      </Button>
    </div>
  );
}
