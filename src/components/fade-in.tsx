"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
}

export default function FadeIn({ children, className }: FadeInProps) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        // No need to disconnect the observer
        observer.unobserve(domRef.current!);
      }
    }, { threshold: 0.1 });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if(current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div ref={domRef} className={cn('fade-in', isVisible ? 'visible' : '', className)}>
      {children}
    </div>
  );
}
