'use client';

import React, { type JSX, useState, useEffect, useRef, useCallback } from 'react';
import { TextField, Text, Placeholder, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * MalvernProductCarouselSection
 * Horizontal product carousel (adp ArticlesCarouselSection pattern).
 */

interface Fields {
  Title: TextField;
}

const defaultFields: Fields = {
  Title: { value: '' },
};

export type MalvernProductCarouselSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernProductCarouselSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;

  const sitecore = useSitecore();
  const isEditing = sitecore?.page?.mode?.isEditing ?? false;

  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  const phCards = `malvern-product-cards-${DynamicPlaceholderId}`;

  useEffect(() => {
    if (!carouselRef.current) return;

    const countSlides = () => {
      const slides = carouselRef.current?.querySelectorAll(':scope > .malvern-product-card');
      setTotalSlides(slides?.length || 0);
    };

    countSlides();
    const observer = new MutationObserver(countSlides);
    observer.observe(carouselRef.current, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isEditing || totalSlides <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 6000);
    return () => clearInterval(interval);
  }, [isEditing, totalSlides]);

  const handleGoTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  return (
    <section
      className={`component malvern-product-carousel-section bg-[#fafbfc] py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <Text tag="h2" field={fields.Title} className="sr-only" />

        <div className="relative">
          {totalSlides > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-[#00333d] shadow-md transition-colors hover:border-[#00A651] hover:text-[#00A651] lg:h-11 lg:w-11"
              aria-label="Previous products"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          <div className="overflow-hidden px-2">
            <div
              ref={carouselRef}
              className="malvern-product-carousel-track flex items-stretch transition-transform duration-500 ease-out"
              style={{ '--slide-index': activeIndex } as React.CSSProperties}
            >
              <Placeholder name={phCards} rendering={props.rendering} />
            </div>
          </div>

          {totalSlides > 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="absolute top-1/2 right-0 z-10 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-[#00333d] shadow-md transition-colors hover:border-[#00A651] hover:text-[#00A651] lg:h-11 lg:w-11"
              aria-label="Next products"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>

        <style jsx>{`
          .malvern-product-carousel-track {
            transform: translateX(calc(-1 * var(--slide-index) * 100%));
          }
          @media (min-width: 768px) {
            .malvern-product-carousel-track {
              transform: translateX(calc(-1 * var(--slide-index) * 50%));
            }
          }
          @media (min-width: 1024px) {
            .malvern-product-carousel-track {
              transform: translateX(calc(-1 * var(--slide-index) * 25%));
            }
          }
        `}</style>

        {totalSlides > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleGoTo(i)}
                className={`h-2.5 w-2.5 rounded-full border-2 transition-all ${
                  i === activeIndex
                    ? 'border-[#00A651] bg-[#00A651]'
                    : 'border-[#00333d]/30 bg-transparent'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
