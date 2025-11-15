'use client';

import { useEffect, useState } from 'react';
import { DjMix } from '@/lib/types';
import { Card, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import FadeIn from '../fade-in';
import AudioPlayer from '../audio-player';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const mixesEndpoint = 'https://gdmixes.khush23.workers.dev';
const djPlaceholderImage = '/img/dj-placeholder.png';

export default function DjMixes() {
  const [mixes, setMixes] = useState<DjMix[]>([]);
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
        console.error("Error loading DJ mixes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMixes();
  }, []);

  return (
    <section id="dj" className="py-16 sm:py-24 px-4 container mx-auto">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">DJ Mixes</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Drop in, press play 🔊 A collection of my latest DJ sets and mixes.
        </p>

        {loading ? (
          <div className="flex justify-center gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="border-secondary bg-transparent w-1/3">
                <CardHeader><Skeleton className="h-[280px] w-full rounded-3xl" /></CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <div className="px-32">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {mixes.map((mix, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <AudioPlayer 
                        src={mix.src} 
                        title={mix.name} 
                        cover={djPlaceholderImage}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="h-12 w-12" />
              <CarouselNext className="h-12 w-12" />
            </Carousel>
          </div>
        )}
      </FadeIn>
    </section>
  );
}
