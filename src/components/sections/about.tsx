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
                <span className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">Cybersecurity Innovator</span>
                <span className="text-xs font-medium bg-accent/10 text-primary px-3 py-1 rounded-full">Photographer</span>
                <span className="text-xs font-medium bg-secondary/20 text-muted-foreground px-3 py-1 rounded-full">Tech Enthusiast</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              As a cybersecurity engineering leader, I specialize in transforming security operations through the integration of cutting-edge AI, automation, and SOAR solutions. With extensive experience in building and managing robust security infrastructures, I drive efficiency, improve detection capabilities, and reduce operational overhead.
            </p>
            <p>
              At Slipstream Cyber, I lead efforts to enhance security postures by designing and maintaining advanced tools and systems, including SIEMs, SOAR platforms, EDR solutions, and cloud environments. My work revolves around automating repetitive tasks, developing bespoke playbooks, and ensuring seamless integration between security technologies to deliver real-time protection against evolving threats.
            </p>
            <h4 className="font-semibold text-foreground pt-2">Key areas of expertise:</h4>
            <ul className="list-disc list-inside space-y-2">
              <li><span className="font-semibold text-foreground/80">AI-Driven Automation:</span> Utilizing AI to streamline threat detection, analysis, and response processes.</li>
              <li><span className="font-semibold text-foreground/80">Security Orchestration:</span> Building and optimizing SOAR platforms to handle incidents efficiently and at scale.</li>
              <li><span className="font-semibold text-foreground/80">Cloud Security:</span> Enhancing security in hybrid cloud environments like Azure, AWS, and Google Cloud.</li>
              <li><span className="font-semibold text-foreground/80">Collaboration and Leadership:</span> Empowering teams through training, mentorship, and cross-functional collaboration.</li>
            </ul>
            <p>
              Beyond cybersecurity, I’m a passionate photographer and run a small photography business, KPFotografy, where I capture moments and create stunning visuals. From conceptualizing creative shoots to managing my website (designed and coded by me), I bring the same dedication and precision to my artistic pursuits as I do to cybersecurity.
            </p>
            <p>
              In my free time, I enjoy staying active through soccer and fitness, exploring creative web design projects, and contributing to the community through volunteering.
            </p>
            <p className="text-foreground/90">
              If you’re interested in discussing innovative approaches to cybersecurity, transforming operations through AI and automation, or even photography and creativity, feel free to connect. I’d love to exchange ideas and insights!
            </p>
          </CardContent>
        </Card>
      </FadeIn>
    </section>
  );
}
