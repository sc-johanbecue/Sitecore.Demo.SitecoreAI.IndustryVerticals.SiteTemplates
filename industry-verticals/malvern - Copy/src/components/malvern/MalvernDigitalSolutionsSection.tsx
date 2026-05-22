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
import { ArrowRight } from 'lucide-react';

/**
 * MalvernDigitalSolutionsSection
 * Desktop: 50/50 image | pale cyan copy, flush seam, chamfered bottom-right on the copy panel.
 * Mobile: image on top (~40–45% height), copy below with bottom-left rounded and same chamfer.
 */

interface Fields {
  Heading: TextField;
  Content: RichTextField;
  LinkText: TextField;
  Link: LinkField;
  Image: ImageField;
}

const defaultFields: Fields = {
  Heading: {
    value: 'Your new solution for unattended high-throughput XRD analysis',
  },
  Content: {
    value:
      '<p>With over 60 sample positions, the Aeris High-Capacity Sample Changer brings innovative, automated, round-the-clock analysis to your high-throughput environment, cutting operator workload by up to 50%</p>',
  },
  LinkText: { value: 'Find out more' },
  Link: { value: { href: '/solutions/aeris' } },
  Image: {
    value: { src: '/images/malvern-digital-solutions.jpg', alt: 'Aeris XRD in the lab' },
  },
};

/** 45° chamfer at bottom-right; keep other edges square so outer overflow can round BL (mobile) and TR (desktop). */
const contentClip =
  '[clip-path:polygon(0_0,100%_0,100%_calc(100%-2.25rem),calc(100%-2.25rem)_100%,0_100%)]';

export type MalvernDigitalSolutionsSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernDigitalSolutionsSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = { ...defaultFields, ...(props.fields || {}) } as Fields;

  return (
    <section
      className={`component malvern-digital-solutions-section bg-white py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="malvern-digital-solutions-tile flex flex-col overflow-hidden lg:flex-row">
          <div className="relative w-full max-md:h-[clamp(11rem,42vmin,20rem)] max-md:min-h-44 max-md:shrink-0 max-md:overflow-hidden max-md:rounded-t-2xl lg:h-auto lg:min-h-80 lg:w-1/2 lg:overflow-hidden lg:rounded-tl-2xl lg:rounded-bl-2xl xl:min-h-88">
            <SitecoreImage
              field={fields.Image}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="overflow-hidden rounded-bl-2xl lg:w-1/2 lg:rounded-tr-2xl lg:rounded-bl-none">
            <div
              className={`malvern-digital-solutions-content flex flex-col justify-center bg-[#c5e8f0] px-7 py-10 sm:px-9 sm:py-11 lg:min-h-80 lg:px-10 lg:py-12 xl:min-h-88 xl:px-12 xl:py-14 ${contentClip}`}
            >
              <Text
                tag="h2"
                field={fields.Heading}
                className="mb-4 text-2xl leading-[1.2] font-bold tracking-tight text-[#1a1a1a] sm:mb-5 sm:text-[1.625rem] lg:mb-5 lg:text-[1.75rem] xl:text-[1.875rem]"
              />
              <div className="malvern-digital-solutions-body mb-7 text-base leading-relaxed text-[#3d4d52] sm:mb-8 lg:mb-8 lg:text-lg">
                <RichText field={fields.Content} />
              </div>
              <SitecoreLink
                field={fields.Link}
                className="malvern-digital-solutions-cta inline-flex w-fit items-center gap-2 text-base font-semibold text-[#0a7a8c] no-underline transition-colors hover:text-[#065f6e]"
              >
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
                <Text tag="span" field={fields.LinkText} className="inline" />
              </SitecoreLink>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .malvern-digital-solutions-body :global(p) {
          margin: 0 0 0.75rem 0;
        }
        .malvern-digital-solutions-body :global(p:last-child) {
          margin-bottom: 0;
        }
        .malvern-digital-solutions-body :global(a) {
          color: #0a7a8c;
          text-decoration: underline;
        }
        .malvern-digital-solutions-body :global(a:hover) {
          color: #065f6e;
        }
      `}</style>
    </section>
  );
};
