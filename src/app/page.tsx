import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import DjMixes from "@/components/sections/dj-mixes";
import Hero from "@/components/sections/hero";
import Photography from "@/components/sections/photography";
import Projects from "@/components/sections/projects";

export default function Home() {
  const sections = [
    { component: <Photography />, id: 'photography' },
    { component: <DjMixes />, id: 'dj' },
    { component: <Projects />, id: 'projects' },
    { component: <About />, id: 'about' },
    { component: <Contact />, id: 'contact' },
  ];

  return (
    <div className="flex flex-col">
      <Hero />
      {sections.map((section) => (
        <div key={section.id} className="relative z-10">
          {section.component}
        </div>
      ))}
    </div>
  );
}
