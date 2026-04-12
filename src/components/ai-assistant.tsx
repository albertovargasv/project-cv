"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { assistContent } from "@/ai/flows/ai-content-assistant";
import { useToast } from "@/hooks/use-toast";

interface Props {
  content: string;
  onImproved: (improved: string) => void;
}

export function AiAssistant({ content, onImproved }: Props) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleImprove = async () => {
    if (!content.trim()) {
      toast({
        title: "No content to improve",
        description: "Please write something first so the AI can assist you.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const result = await assistContent({ content });
      if (result.improvedContent) {
        onImproved(result.improvedContent);
        toast({
          title: "Content optimized!",
          description: "Your description has been improved by AI."
        });
      }
    } catch (error) {
      console.error("AI Assistant Error:", error);
      toast({
        title: "Assistant error",
        description: "Could not improve content at this time. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      type="button" 
      variant="ghost" 
      size="sm" 
      onClick={handleImprove}
      disabled={loading}
      className="text-xs flex items-center gap-2 h-7 px-2 text-accent hover:text-accent hover:bg-accent/10"
    >
      {loading ? (
        <Loader2 className="w-3 h-3 animate-spin" />
      ) : (
        <Sparkles className="w-3 h-3" />
      )}
      Optimize with AI
    </Button>
  );
}