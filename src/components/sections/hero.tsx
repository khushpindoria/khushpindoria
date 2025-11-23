
import FadeIn from "../fade-in";
import { Button } from "../ui/button";
import { DiscordIcon, FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon } from "../icons";
import BinaryRain from "../binary-rain";
import WordLoader from "../word-loader";

const socialLinks = [
    { href: "https://www.linkedin.com/in/khush-pindoria-176884189", icon: LinkedinIcon, label: "LinkedIn" },
    { href: "https://github.com/khushpindoria", icon: GithubIcon, label: "GitHub" },
    { href: "https://instagram.com/kpfotografy", icon: InstagramIcon, label: "Instagram" },
    { href: "https://facebook.com/kpfotografy", icon: FacebookIcon, label: "Facebook" },
    { href: "https://discord.gg/ux8QhxJFxj", icon: DiscordIcon, label: "Discord" },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center relative overflow-hidden px-4 pt-24 pb-12">
      <div className="absolute inset-0 hero-gradient-mask">
        <div className="binary-bg" />
        <BinaryRain />
      </div>
      <FadeIn className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-prompt tracking-tighter mb-4 text-foreground">
          KHUSH PINDORIA
        </h1>
        <WordLoader 
          words={["AI", "CYBERSECURITY", "PHOTOGRAPHER"]} 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-semibold"
        />

        <div className="flex justify-center items-center space-x-6 mb-12">
            {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-muted-foreground hover:text-white transition-all duration-300 transform hover:scale-110"
                >
                    <Icon className="w-7 h-7" fill="currentColor"/>
                </a>
            ))}
        </div>
        
        <Button asChild size="lg" className="btn-grad uppercase">
            <a href="#contact">Get in Touch</a>
        </Button>
      </FadeIn>
    </section>
  );
}
