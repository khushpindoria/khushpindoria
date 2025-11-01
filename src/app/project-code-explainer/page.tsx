
"use client";

import { useActionState, useTransition } from "react";
import { getCodeSummary } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import FadeIn from "@/components/fade-in";
import { useSound } from "@/hooks/use-sound";
import Link from "next/link";

const initialState = {
  summary: "",
  error: "",
  errors: {},
};

export default function CodeExplainerPage() {
  const [state, formAction] = useActionState(getCodeSummary, initialState);
  const [isPending, startTransition] = useTransition();
  const { playSound } = useSound();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    playSound();
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
        <FadeIn>
            <div className="max-w-4xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">AI Code Explainer</h1>
                <p className="text-lg text-muted-foreground">
                    Paste a snippet of code below and let AI explain what it does in plain English.
                </p>
            </div>
            <Card className="max-w-4xl mx-auto shadow-lg bg-card/50 backdrop-blur-sm border-secondary">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <Wand2 className="text-primary" />
                <span>Explain This Code</span>
                </CardTitle>
                <CardDescription>
                This tool uses a generative AI model to analyze and summarize code.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Textarea
                    name="code"
                    placeholder="Paste your code here..."
                    className="min-h-[200px] font-mono text-sm bg-background/70 border-secondary"
                    required
                    />
                    {state?.errors?.code && <p className="text-sm text-destructive">{state.errors.code}</p>}
                </div>
                <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                    {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Summarizing...
                    </>
                    ) : (
                    "Summarize"
                    )}
                </Button>
                </form>

                {state?.summary && (
                <div className="mt-6 p-4 border-l-4 border-primary bg-secondary/50 rounded-r-lg">
                    <h3 className="font-semibold text-lg mb-2">Summary:</h3>
                    <p className="text-foreground/90 whitespace-pre-wrap">{state.summary}</p>
                </div>
                )}
                {state?.error && (
                <div className="mt-6 p-4 border-l-4 border-destructive bg-destructive/10 rounded-r-lg text-destructive flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <p>{state.error}</p>
                </div>
                )}
            </CardContent>
            </Card>

            <div className="text-center">
              <Button asChild variant="outline" className="mt-8">
                <Link href="/#projects">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Link>
              </Button>
            </div>
        </FadeIn>
    </div>
  );
}
