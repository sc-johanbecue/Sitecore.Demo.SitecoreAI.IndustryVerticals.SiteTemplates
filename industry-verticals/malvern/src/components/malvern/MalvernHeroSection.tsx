/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import type { JSX } from 'react';
import {
  TextField,
  RichTextField,
  Text,
  RichText,
  ImageField,
  Image as SitecoreImage,
  LinkField,
  Link as SitecoreLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * MalvernHeroSection
 * Mobile (&lt;768): image band + black block below.
 * Tablet and desktop (768px+): immersive hero — full-bleed image, overlay copy (no image gradients; xl adds height).
 */

interface Fields {
  EyebrowTag: TextField;
  Title: TextField;
  Subtitle: RichTextField;
  CTAText: TextField;
  CTALink: LinkField;
  HeroImage: ImageField;
}

const defaultFields: Fields = {
  EyebrowTag: { value: 'Promotion ⭐' },
  Title: { value: 'Fast-track your research' },
  Subtitle: {
    value:
      '<p>Our Academic Grant Program helps educational institutions access our cutting-edge analytical instruments, providing scientists with the resources they need to publish high-quality research.</p>',
  },
  CTAText: { value: 'Apply now' },
  CTALink: { value: { href: '/solutions' } },
  HeroImage: {
    value: {
      src: '/images/malvern-hero-instruments.jpg',
      alt: 'Malvern Panalytical laboratory instruments',
    },
  },
};

export type MalvernHeroSectionProps = ComponentProps & {
  fields: Fields;
};

function HeroCopy({ fields }: { fields: Fields }): JSX.Element {
  return (
    <>
      <Text
        tag="span"
        field={fields.EyebrowTag}
        className="mb-5 inline-block rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#1a1a1a] sm:mb-6 sm:px-4 sm:py-2 sm:text-[0.8125rem]"
      />
      <Text
        tag="h1"
        field={fields.Title}
        className="malvern-hero-title mb-4 text-[1.75rem] leading-[1.12] font-bold tracking-tight text-white sm:mb-5 sm:text-[2rem] sm:leading-[1.1] md:mb-5 md:text-[2.65rem] md:leading-[1.08] xl:text-5xl xl:leading-[1.06]"
      />
      <div className="malvern-hero-subtitle mb-8 text-[0.9375rem] leading-relaxed text-white/95 sm:mb-9 sm:text-base md:mb-10 md:text-lg md:leading-relaxed">
        <RichText field={fields.Subtitle} />
      </div>
      <SitecoreLink
        field={fields.CTALink}
        className="malvern-hero-cta inline-flex w-full items-center justify-center rounded-lg bg-[#00A651] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#008f45] md:w-auto md:px-8 md:py-4 md:text-[0.9375rem]"
      >
        <Text tag="span" field={fields.CTAText} className="inline" />
      </SitecoreLink>
    </>
  );
}

export const Default = (props: MalvernHeroSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  return (
    <section
      className={`component malvern-hero-section relative isolate overflow-hidden bg-black text-white md:min-h-[36rem] xl:min-h-[40rem] ${styles || ''}`}
      id={id}
    >
      {/* Image: height band only &lt;768; full-bleed from md (768px) upward */}
      <div className="malvern-hero-visual relative max-md:h-[min(42vh,22rem)] max-md:min-h-[240px] max-md:shrink-0 max-md:overflow-hidden sm:max-md:h-[min(46vh,26rem)] sm:max-md:min-h-[280px] md:absolute md:inset-0 md:h-full md:min-h-0 md:overflow-hidden">
        <SitecoreImage
          field={fields.HeroImage}
          className="absolute inset-0 h-full w-full object-cover object-[52%_62%] sm:object-[55%_58%] md:object-[68%_58%] lg:object-[68%_58%] xl:object-[70%_55%]"
        />
      </div>

      {/* Copy: stacked &lt;768; overlay from md (768px) same as desktop */}
      <div className="malvern-hero-copy relative z-10 mt-0 bg-black px-4 py-9 sm:px-6 sm:py-10 md:absolute md:inset-0 md:flex md:h-full md:items-end md:bg-transparent md:px-6 md:py-0 md:pt-24 md:pb-12 xl:pt-28 xl:pb-16">
        <div className="malvern-hero-copy-shell mx-auto w-full max-w-7xl md:pointer-events-none">
          <div className="malvern-hero-copy-focus max-w-xl md:pointer-events-auto md:max-w-md xl:max-w-xl">
            <HeroCopy fields={fields} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .malvern-hero-subtitle :global(p) {
          margin: 0 0 0.75rem 0;
        }
        .malvern-hero-subtitle :global(p:last-child) {
          margin-bottom: 0;
        }
        .malvern-hero-subtitle :global(a) {
          color: #7ec8e3;
          text-decoration: underline;
        }
        .malvern-hero-subtitle :global(a:hover) {
          color: #fff;
        }
      `}</style>
    </section>
  );
};
