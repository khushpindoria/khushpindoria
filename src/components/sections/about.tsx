import FadeIn from "../fade-in";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 container mx-auto">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">About Me</h2>
        <Card className="max-w-4xl mx-auto shadow-lg bg-card/50 backdrop-blur-sm border-secondary">
          <CardHeader>
            <CardTitle>Khush Pindoria</CardTitle>
            <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">AI Engineer</span>
                <span className="text-xs font-medium bg-accent/10 text-primary px-3 py-1 rounded-full">Cybersecurity</span>
                <span className="text-xs font-medium bg-secondary/20 text-muted-foreground px-3 py-1 rounded-full">Data Analytics</span>
                <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">Cloud Platforms</span>
                <span className="text-xs font-medium bg-accent/10 text-primary px-3 py-1 rounded-full">Photographer</span>
                <span className="text-xs font-medium bg-secondary/20 text-muted-foreground px-3 py-1 rounded-full">Web Designer</span>
                <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">Mentor</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              AI engineer with a cybersecurity background, helping organisations harness trustworthy AI to strengthen security and operational resilience.
            </p>
            <p>
              At PolusAI I design and build bespoke AI solutions that transform data into actionable insights and automation. Working closely with clients, I architect models and platforms that integrate with existing systems and deliver measurable results. Prior to this, I led security engineering and transformation teams at Slipstream Cyber, managing SIEM, SOAR and EDR deployments, mentoring engineers and developers as well as driving and implementing AI into cyber security operations.
            </p>
            <p>
              I enjoy blending AI, automation and cloud technologies to solve complex problems and improve decision‑making. My technical toolbox includes: machine learning and generative AI, security engineering and threat detection, SIEM/SOAR optimisation, Python and data analytics, and cloud platforms like Azure, AWS and GCP.
            </p>
            <p>
              When I’m not working, I run a photography business, web‑design and volunteer as a mentor in my community. Feel free to connect if you’d like to discuss AI‑driven security, share insights, or collaborate on innovative projects.
            </p>
          </CardContent>
        </Card>
      </FadeIn>
    </section>
  );
}
