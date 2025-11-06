"use client";

import { useEffect, useState, useCallback } from "react";
import { DjMix } from "@/lib/types";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import FadeIn from "../fade-in";
import { useSound } from "@/hooks/use-sound";
import AudioPlayer from "../audio-player";

const MIX_BATCH = 4;
const mixesEndpoint = 'https://gdmixes.khush23.workers.dev';


export default function DjMixes() {
  const [mixes, setMixes] = useState<DjMix[]>([]);
  const [renderedCount, setRenderedCount] = useState(MIX_BATCH);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMixes = async () => {
      try {
        setLoading(true);
        const res = await fetch(mixesEndpoint);
        if (!res.ok) throw new Error('Failed to fetch mixes');
        const data = await res.json();
        setMixes(data);
      } catch (error) {
        console.error("Error loading mixes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMixes();
  }, []);

  const { playSound } = useSound();
  const loadMore = useCallback(() => {
    playSound();
    setRenderedCount(prev => prev + MIX_BATCH);
  }, [playSound]);

  const hasMore = renderedCount < mixes.length;
  const djPlaceholderImage = "/img/dj-placeholder.png";

  return (
    <section id="dj" className="py-16 sm:py-24 px-4 container mx-auto">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">DJ Mixes</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Drop in, press play 🔊 A collection of my latest DJ sets and mixes.
        </p>
        
        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
             {[...Array(MIX_BATCH)].map((_, i) => (
               <Card key={i} className="border-secondary bg-transparent w-[280px]">
                  <CardHeader><Skeleton className="h-[280px] w-full rounded-3xl" /></CardHeader>
               </Card>
             ))}
           </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {mixes.slice(0, renderedCount).map((mix, index) => (
              <AudioPlayer 
                key={index} 
                src={mix.src} 
                title={mix.name} 
                cover={`${djPlaceholderImage}?random=${index}`}
              />
            ))}
          </div>
        )}

        {hasMore && !loading && (
          <div className="text-center mt-12">
            <Button onClick={loadMore} size="lg">View More Mixes</Button>
          </div>
        )}
      </FadeIn>
    </section>
  );
}
