"use client";

import { useEffect, useState } from 'react';

const CursorTrail = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let trails: HTMLElement[] = [];
    const onMouseMove = (e: MouseEvent) => {
      const trail = document.createElement('div');
      trail.className = 'fixed w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] transition-transform duration-200 opacity-50';
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
      document.body.appendChild(trail);
      trails.push(trail);

      setTimeout(() => {
        trail.style.transform = 'scale(0)';
      }, 100);

      setTimeout(() => {
        trail.remove();
        trails = trails.filter(t => t !== trail);
      }, 500);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      trails.forEach(t => t.remove());
    };
  }, [isClient]);

  return null;
};

export default CursorTrail;
