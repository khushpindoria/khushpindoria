
"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GitCompareArrows } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export default function ProjectSliderPage() {
  const beforeImage = PlaceHolderImages.find((p) => p.id === "project-slider-before");
  const afterImage = PlaceHolderImages.find((p) => p.id === "project-slider-after");
  
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  return (
    <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center text-center">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Before/After Code Slider</h1>
          <p className="text-lg text-muted-foreground">
            Drag the slider to compare the insecure code with the refactored, secure version.
          </p>
        </div>

        <Card 
          ref={sliderContainerRef}
          className="relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-2xl bg-card/50 border-secondary mx-auto select-none"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchEnd={handleMouseUp}
          onTouchCancel={handleMouseUp}
          onTouchMove={handleTouchMove}
        >
          {!beforeImage || !afterImage ? (
            <div className="w-full h-full flex items-center justify-center">
                <p>Images loading...</p>
            </div>
           ) : (
            <>
              <div className="relative w-full h-full">
                <Image
                  src={beforeImage.imageUrl}
                  alt="Before code"
                  fill
                  className="object-cover"
                  data-ai-hint={beforeImage.imageHint}
                  priority
                />
                <div
                  className="absolute top-0 left-0 w-full h-full overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <Image
                    src={afterImage.imageUrl}
                    alt="After code"
                    fill
                    className="object-cover"
                    data-ai-hint={afterImage.imageHint}
                    priority
                  />
                </div>
                
                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-primary/70 cursor-ew-resize"
                  style={{ left: `calc(${sliderPosition}% - 2px)` }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -left-4 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg pointer-events-none">
                    <GitCompareArrows className="h-5 w-5" />
                  </div>
                </div>
              </div>

              <Slider
                value={[sliderPosition]}
                onValueChange={(value) => setSliderPosition(value[0])}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-3/4 z-20 opacity-75 hover:opacity-100 transition-opacity"
              />
            </>
           )}
        </Card>
        
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
