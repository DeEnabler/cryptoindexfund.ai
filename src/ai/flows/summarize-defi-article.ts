'use server';

/**
 * @fileOverview An AI-powered summarizer tool for DeFi articles.
 *
 * - summarizeDefiArticle - A function that handles the summarization process.
 * - SummarizeDefiArticleInput - The input type for the summarizeDefiArticle function.
 * - SummarizeDefiArticleOutput - The return type for the summarizeDefiArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDefiArticleInputSchema = z.object({
  articleUrl: z.string().describe('The URL of the DeFi article to summarize.'),
});
export type SummarizeDefiArticleInput = z.infer<typeof SummarizeDefiArticleInputSchema>;

const SummarizeDefiArticleOutputSchema = z.object({
  summary: z.string().describe('The summarized content of the DeFi article.'),
});
export type SummarizeDefiArticleOutput = z.infer<typeof SummarizeDefiArticleOutputSchema>;

export async function summarizeDefiArticle(input: SummarizeDefiArticleInput): Promise<SummarizeDefiArticleOutput> {
  return summarizeDefiArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDefiArticlePrompt',
  input: {schema: SummarizeDefiArticleInputSchema},
  output: {schema: SummarizeDefiArticleOutputSchema},
  prompt: `You are an expert in decentralized finance (DeFi). Your task is to summarize the key points of a DeFi article provided via URL.

  Article URL: {{{articleUrl}}}
  Summary: `,
});

const summarizeDefiArticleFlow = ai.defineFlow(
  {
    name: 'summarizeDefiArticleFlow',
    inputSchema: SummarizeDefiArticleInputSchema,
    outputSchema: SummarizeDefiArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
