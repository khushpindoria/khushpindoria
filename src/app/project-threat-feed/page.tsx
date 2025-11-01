import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Rss } from "lucide-react";
import ThreatFeedTicker from "@/components/threat-feed-ticker";

export default function ProjectThreatFeedPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center text-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Live Threat Feed</h1>
          <p className="text-lg text-muted-foreground">
            A real-time feed of the latest CVEs and cybersecurity headlines.
          </p>
        </div>
        
        <ThreatFeedTicker />

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
