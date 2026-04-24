'use client';

import type { JSX } from 'react';
import {
  TextField,
  RichTextField,
  Text,
  RichText,
  LinkField,
  ImageField,
  Link as SitecoreLink,
  Image as SitecoreImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * CtaBannerSection Component
 * Wide promo: instrument imagery with overlapping light panel (Malvern-style).
 */

interface Fields {
  Title: TextField;
  Description: RichTextField;
  Image: ImageField;
  CTAText: TextField;
  CTALink: LinkField;
}

const defaultFields: Fields = {
  Title: { value: 'The future is ultra-fast analysis' },
  Description: {
    value:
      '<p>Discover next-generation characterization workflows designed for throughput without compromising data quality.</p>',
  },
  Image: { value: { src: '/images/cta-banner-image.jpg', alt: 'Analytical instrument' } },
  CTAText: { value: 'Discover more' },
  CTALink: { value: { href: '/discover' } },
};

export type CtaBannerSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: CtaBannerSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  return (
    <section
      className={`component cta-banner-section bg-background-muted py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-0">
          <div className="bg-malvern-teal-dark relative min-h-[220px] overflow-hidden rounded-lg shadow-md lg:min-h-[320px] lg:w-[58%] lg:rounded-l-lg lg:rounded-r-none">
            <SitecoreImage
              field={fields.Image}
              className="h-full min-h-[220px] w-full object-cover opacity-95 lg:min-h-[320px]"
              alt={fields.Image?.value?.alt || 'Product imagery'}
            />
            <div
              className="from-malvern-teal-dark/50 pointer-events-none absolute inset-0 bg-gradient-to-r to-transparent"
              aria-hidden="true"
            />
          </div>

          <div className="bg-malvern-sky border-malvern-sky-deep/25 flex flex-1 flex-col justify-center rounded-lg border p-8 shadow-lg lg:z-10 lg:my-8 lg:-ml-10 lg:max-w-xl lg:rounded-lg lg:p-10 lg:shadow-xl">
            <h2 className="text-malvern-teal-dark mb-4 text-2xl leading-tight font-bold lg:text-3xl xl:text-4xl">
              <Text field={fields.Title} />
            </h2>

            <div className="cta-banner-desc text-foreground mb-6 text-base leading-relaxed lg:text-lg">
              <RichText field={fields.Description} />
            </div>

            {fields.CTALink?.value?.href ? (
              <SitecoreLink
                field={fields.CTALink}
                className="bg-malvern-green hover:bg-malvern-green-hover inline-flex w-full items-center justify-center rounded-md px-8 py-3 text-sm font-semibold text-white transition-colors sm:w-auto lg:inline-flex"
              >
                <Text field={fields.CTAText} />
              </SitecoreLink>
            ) : (
              <button
                type="button"
                className="bg-malvern-green inline-flex w-full items-center justify-center rounded-md px-8 py-3 text-sm font-semibold text-white sm:w-auto"
              >
                <Text field={fields.CTAText} />
              </button>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        .cta-banner-desc :global(a) {
          color: #0066b3;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
      `}</style>
    </section>
  );
};
