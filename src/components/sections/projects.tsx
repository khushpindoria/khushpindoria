import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import FadeIn from "../fade-in";
import { ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const projectData = [
  {
    id: "project-threat-feed",
    title: "Live Threat Feed",
    description: "Real‑time CVE ticker. Stay updated with the latest cybersecurity vulnerabilities.",
    href: "/project-threat-feed",
    external: false,
  },
  {
    id: "project-cli",
    title: "Command‑Line Résumé",
    description: "An interactive résumé in a terminal interface. Type commands to learn about me.",
    href: "/project-cli",
    external: false,
  },
  {
    id: "project-slider",
    title: "Before/After Slider",
    description: "A visual comparison of insecure vs. secure code snippets with a simple drag.",
    href: "/project-slider",
    external: false,
  },
  {
    id: "project-explain-log",
    title: "AI Code Explainer",
    description: "Paste a code snippet and get a plain-English summary of what it does using generative AI.",
    href: "/project-code-explainer",
    external: false,
  },
  {
    id: "project-makeup-artist",
    title: "Makeup Artist Website",
    description: "A professional portfolio website designed and built for a freelance makeup artist.",
    href: "https://tushartistryy.com",
    external: true,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 sm:py-24 px-4 container mx-auto">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Projects</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A selection of my technical demos, experiments, and freelance work.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project) => {
            const projectImage = PlaceHolderImages.find((p) => p.id === project.id);
            return (
              <Card key={project.title} className="flex flex-col transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden group bg-card/50 backdrop-blur-sm rounded-lg border-secondary">
                {projectImage && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={projectImage.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      data-ai-hint={projectImage.imageHint}
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full btn-grad uppercase text-sm font-bold tracking-wider">
                    <Link href={project.href} target={project.external ? "_blank" : "_self"}>
                      View Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
