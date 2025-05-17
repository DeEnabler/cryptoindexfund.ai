
"use client";

import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { summarizeDefiArticle, type SummarizeDefiArticleInput } from "@/ai/flows/summarize-defi-article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  articleUrl: z.string().url({ message: "Please enter a valid URL." }),
});

type ArticleSummarizerFormValues = z.infer<typeof FormSchema>;

export function ArticleSummarizer() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<ArticleSummarizerFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      articleUrl: "",
    },
  });

  const onSubmit: SubmitHandler<ArticleSummarizerFormValues> = async (data) => {
    startTransition(async () => {
      try {
        setSummary(null); // Clear previous summary
        const result = await summarizeDefiArticle(data as SummarizeDefiArticleInput);
        if (result && result.summary) {
          setSummary(result.summary);
          toast({
            title: "Success!",
            description: "Article summarized successfully.",
          });
        } else {
          throw new Error("Failed to get summary from AI.");
        }
      } catch (error) {
        console.error("Summarization error:", error);
        setSummary("Error: Could not summarize the article. Please ensure the URL is correct and accessible, or try again later.");
        toast({
          title: "Error",
          description: "Failed to summarize article. The URL might be inaccessible or the content unsuitable for summarization.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Card className="shadow-xl w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <FileText className="h-6 w-6 mr-2 text-primary" />
          AI Article Summarizer
        </CardTitle>
        <CardDescription>
          Paste a DeFi article URL below to get a concise summary. Powered by GenAI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="articleUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="articleUrl">Article URL</FormLabel>
                  <FormControl>
                    <Input
                      id="articleUrl"
                      placeholder="https://example.com/defi-article"
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              disabled={isPending} 
              className="w-full sm:w-auto" /* Removed redundant bg-primary, hover:bg-primary/90, text-primary-foreground */
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Summarizing...
                </>
              ) : (
                "Summarize Article"
              )}
            </Button>
          </form>
        </Form>

        {summary && (
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-xl font-semibold mb-3 text-primary">Summary:</h3>
            <Textarea
              value={summary}
              readOnly
              rows={10}
              className="text-base bg-muted/50 border-border"
              aria-label="Article summary"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
