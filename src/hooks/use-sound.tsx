"use client";

import React, { createContext, useContext, useRef, ReactNode, useCallback } from 'react';

interface SoundContextType {
  playSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // This effect runs only on the client
  if (typeof window !== 'undefined' && !audioRef.current) {
    const audio = new Audio("https://www.myinstants.com/media/sounds/pisseim-mund-online-audio-converter.mp3");
    audio.preload = 'auto';
    audioRef.current = audio;
  }
  
  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => console.error("Audio play failed:", error));
    }
  }, []);

  return (
    <SoundContext.Provider value={{ playSound }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
