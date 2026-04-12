'use server';
/**
 * @fileOverview An AI-powered content assistant that helps users write concise and impactful descriptions
 * for their CV experience entries and project details.
 *
 * - assistContent - A function that handles the content improvement process.
 * - AiContentAssistantInput - The input type for the assistContent function.
 * - AiContentAssistantOutput - The return type for the assistContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiContentAssistantInputSchema = z.object({
  content: z
    .string()
    .describe(
      'The original text for a CV experience entry or project detail that needs improvement.'
    ),
});
export type AiContentAssistantInput = z.infer<typeof AiContentAssistantInputSchema>;

const AiContentAssistantOutputSchema = z.object({
  improvedContent: z
    .string()
    .describe('The AI-suggested improved and optimized text.'),
});
export type AiContentAssistantOutput = z.infer<typeof AiContentAssistantOutputSchema>;

export async function assistContent(
  input: AiContentAssistantInput
): Promise<AiContentAssistantOutput> {
  return aiContentAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiContentAssistantPrompt',
  input: { schema: AiContentAssistantInputSchema },
  output: { schema: AiContentAssistantOutputSchema },
  prompt: `You are an AI-powered CV content assistant. Your goal is to help users write concise and impactful descriptions for their CV experience entries and project details, following industry best practices.

Review the following content and provide an improved version that is professional, achievement-oriented, and easy to read. Focus on using strong action verbs and quantifying achievements where possible. Ensure the output is only the improved content, without any conversational filler or extra notes.

Original Content:
{{{content}}}`,
});

const aiContentAssistantFlow = ai.defineFlow(
  {
    name: 'aiContentAssistantFlow',
    inputSchema: AiContentAssistantInputSchema,
    outputSchema: AiContentAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
