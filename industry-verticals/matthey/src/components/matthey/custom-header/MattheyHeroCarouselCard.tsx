'use client';

import React, { JSX, useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import {
  TextField,
  ImageField,
  LinkField,
  Text,
  Link as JssLink,
  Image as JssImage,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';

type HeroSlideCard = {
  fields: {
    BackgroundImage: ImageField;
    Eyebrow: TextField;
    Title: TextField;
    ButtonText: TextField;
    ButtonLink: LinkField;
  };
};

type Fields = {
  Slides: HeroSlideCard[];
};

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

const DEFAULT_FIELDS: Fields = {
  Slides: [
    {
      fields: {
        BackgroundImage: {
          value: {
            src: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80',
            alt: 'Forest landscape',
            width: 1920,
            height: 800,
          },
        },
        Eyebrow: { value: "We're Johnson Matthey" },
        Title: { value: 'Our purpose is to catalyse the net zero transition' },
        ButtonText: { value: 'READ MORE' },
        ButtonLink: { value: { href: '/about-us' } },
      },
    },
    {
      fields: {
        BackgroundImage: {
          value: {
            src: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80',
            alt: 'Sustainable energy',
            width: 1920,
            height: 800,
          },
        },
        Eyebrow: { value: 'Sustainability' },
        Title: { value: 'Leading the way in sustainable technology solutions' },
        ButtonText: { value: 'LEARN MORE' },
        ButtonLink: { value: { href: '/sustainability' } },
      },
    },
    {
      fields: {
        BackgroundImage: {
          value: {
            src: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1920&q=80',
            alt: 'Innovation',
            width: 1920,
            height: 800,
          },
        },
        Eyebrow: { value: 'Innovation' },
        Title: { value: 'Pioneering science that matters since 1817' },
        ButtonText: { value: 'DISCOVER' },
        ButtonLink: { value: { href: '/science-and-innovation' } },
      },
    },
  ],
};

const HeroSlide = ({ slide }: { slide: HeroSlideCard }) => (
  <div className="relative h-[500px] w-full before:pointer-events-none before:absolute before:inset-0 before:z-[2] before:bg-black/30 md:h-[550px] lg:h-[500px]">
    <JssImage
      field={slide.fields.BackgroundImage}
      className="absolute inset-0 z-[1] h-full w-full object-cover"
    />
    <div className="absolute right-0 bottom-16 left-0 z-[3] container mx-auto px-4 md:bottom-20">
      <div className="max-w-xl">
        <p className="mb-2 text-sm text-white md:mb-4 md:text-base">
          <Text field={slide.fields.Eyebrow} />
        </p>
        <h1 className="mb-6 text-2xl leading-tight font-light text-balance text-white md:mb-8 md:text-4xl lg:text-5xl">
          <Text field={slide.fields.Title} />
        </h1>
        <JssLink
          field={slide.fields.ButtonLink}
          className="inline-flex items-center gap-2 bg-[#1e22aa] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e22aa]/90"
        >
          <Text field={slide.fields.ButtonText} />
          <ArrowRight className="h-4 w-4" />
        </JssLink>
      </div>
    </div>
  </div>
);

export const Default = (props: ComponentProps): JSX.Element => {
  const fields = props.fields || DEFAULT_FIELDS;
  const id = props.rendering?.uid;
  const hasMultipleSlides = fields.Slides && fields.Slides.length > 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, watchDrag: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Single slide - render without carousel
  if (!hasMultipleSlides && fields.Slides?.[0]) {
    return (
      <section className="relative w-full" key={id}>
        <HeroSlide slide={fields.Slides[0]} />
      </section>
    );
  }

  // Multiple slides - render with carousel
  return (
    <section className="relative w-full" key={id}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {fields.Slides?.map((slide, index) => (
            <div key={index} className="min-w-0 flex-[0_0_100%]">
              <HeroSlide slide={slide} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-4 z-10 -translate-y-1/2 text-white transition-colors hover:text-white/80"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 text-white transition-colors hover:text-white/80"
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8 md:h-10 md:w-10" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {fields.Slides?.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-3 w-3 rounded-full transition-colors ${
              index === selectedIndex
                ? 'bg-white/40 ring-2 ring-white'
                : 'bg-white hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Default;
