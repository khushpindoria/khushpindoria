'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { PhotographyEvent } from '@/lib/types';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import FadeIn from '../fade-in';
import { useSound } from '@/hooks/use-sound';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const eventsEndpoint = 'https://gd.khush23.workers.dev';

export default function Photography() {
  const [events, setEvents] = useState<PhotographyEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { playSound } = useSound();
  const photographyPlaceholder = PlaceHolderImages.find(p => p.id === 'photography-placeholder');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch(eventsEndpoint);
        if (!res.ok) throw new Error('Failed to fetch events');
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error loading photography events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleImageClick = (imageUrl: string) => {
    playSound();
    setSelectedImage(imageUrl);
  };

  return (
    <section id="photography" className="py-16 sm:py-24 px-4 container mx-auto">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">KPFotografy</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A showcase of my photography work. Each tile represents a different event or photoshoot.
        </p>

        {loading ? (
          <div className="flex justify-center gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden bg-card/50 border-secondary w-1/3">
                <Skeleton className="h-80 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                </CardContent>
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
                {events.map((event, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card 
                        className="overflow-hidden cursor-pointer group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl bg-card/50 backdrop-blur-sm rounded-lg border-secondary aspect-square relative"
                        onClick={() => handleImageClick(event.coverPhotoUrl)}
                      >
                        <Image
                          src={event.coverPhotoUrl || photographyPlaceholder?.imageUrl || ''}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          data-ai-hint={photographyPlaceholder?.imageHint || 'photography event'}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/80 transition-all duration-300"></div>
                        <CardContent className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-lg font-semibold text-white truncate drop-shadow-md">{event.title}</h3>
                        </CardContent>
                      </Card>
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
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="p-0 border-0 max-w-5xl bg-transparent shadow-none">
          <DialogTitle className="sr-only">Enlarged photo</DialogTitle>
            {selectedImage && (
                <Image
                    src={selectedImage}
                    alt="Enlarged view"
                    width={1600}
                    height={1000}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                />
            )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
