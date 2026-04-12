"use client";

import React, { useState } from "react";
import { Skill } from "@/types/cv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface Props {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export function SkillsEditor({ skills, onChange }: Props) {
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Languages");

  const categories = ["Languages", "Frameworks", "Backend", "Frontend", "Database", "DevOps", "Tools", "Other"];

  const addSkill = () => {
    if (!newName.trim()) return;
    const newSkill: Skill = {
      id: Math.random().toString(36).substr(2, 9),
      name: newName.trim(),
      category: newCategory
    };
    onChange([...skills, newSkill]);
    setNewName("");
  };

  const removeSkill = (id: string) => {
    onChange(skills.filter(s => s.id !== id));
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label>Skill Name</Label>
            <Input 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              placeholder="e.g. Kubernetes"
              onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            />
          </div>
          <div className="space-y-2">
            <Label>Category</Label>
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              value={newCategory} 
              onChange={(e) => setNewCategory(e.target.value)}
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <Button onClick={addSkill} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
        </Button>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, items]) => (
          <div key={category} className="space-y-2">
            <h4 className="text-sm font-semibold text-muted-foreground">{category}</h4>
            <div className="flex flex-wrap gap-2">
              {items.map(skill => (
                <Badge key={skill.id} variant="secondary" className="flex items-center gap-1 py-1 pl-3 pr-2 border">
                  {skill.name}
                  <button onClick={() => removeSkill(skill.id)} className="hover:text-destructive">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}