
"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, TextPlugin);

interface WordLoaderProps {
  words?: string[];
  className?: string;
}

const WordLoader: React.FC<WordLoaderProps> = ({
  words = [
    "AI",
    "CYBERSECURITY",
    "PHOTOGRAPHER",
  ],
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!textRef.current || !cursorRef.current) return;

      const tl = gsap.timeline({ repeat: -1 });

      gsap.to(cursorRef.current, {
        opacity: 0,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      words.forEach((word) => {
        // Typing animation
        tl.to(
          textRef.current,
          {
            duration: word.length * 0.1,
            text: word,
            ease: "none",
          }
        );
        
        // Pause with the full word
        tl.to(textRef.current, {
          duration: 3,
          text: word,
          ease: "none",
        });

        // Deleting (backspace) animation
        for (let i = word.length - 1; i >= 0; i--) {
            tl.to(textRef.current, {
                duration: 0.05,
                text: word.substring(0, i),
                ease: "none",
            });
        }
      });
    },
    { scope: containerRef, dependencies: [words] }
  );

  return (
    <div
      ref={containerRef}
      className={cn("w-full", className)}
    >
      <div className="relative h-12 flex items-center justify-center font-code text-lg md:text-xl text-muted-foreground font-semibold tracking-wider">
        <span ref={textRef}></span>
        <span ref={cursorRef} className="text-primary ml-[-0.2ch]">|</span>
      </div>
    </div>
  );
};

export default WordLoader;
