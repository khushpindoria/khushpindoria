import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import CliResumeLoader from "@/components/cli-resume-loader";

export default function ProjectCliPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl space-y-8 text-center">
        <h1 className="text-3xl md:text-5xl font-bold">
          Interactive CLI Résumé
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Type{" "}
          <code className="font-mono bg-muted px-1.5 py-1 rounded-md text-foreground">
            help
          </code>{" "}
          or press <kbd className="font-mono bg-muted px-1.5 py-1 rounded-md text-foreground">Tab</kbd> for commands. Autocomplete & history
          supported.
        </p>

        <CliResumeLoader />

        <Button asChild variant="outline" className="mt-8">
          <Link href="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>
    </div>
  );
}
