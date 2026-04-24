'use client';

import type { JSX } from 'react';
import {
  RichTextField,
  RichText,
  TextField,
  Text,
  ImageField,
  Image as SitecoreImage,
  LinkField,
  Link as SitecoreLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * PromoBannerSection Component
 * Full-width split promo (dark panel + optional product image).
 */

interface Fields {
  Title: RichTextField;
  CTAText: TextField;
  CTALink: LinkField;
  BackgroundColor: TextField;
  Image: ImageField;
}

const defaultFields: Fields = {
  Title: { value: '<p>Groundbreaking solutions for your laboratory</p>' },
  CTAText: { value: 'Discover more' },
  CTALink: { value: { href: '/solutions' } },
  BackgroundColor: { value: '#004c54' },
  Image: { value: { src: '/promo-benchmark.jpg', alt: 'Product' } },
};

export type PromoBannerSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: PromoBannerSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  const bgColor = (fields.BackgroundColor?.value as string) || '#004c54';

  return (
    <section
      className={`component promo-banner-section text-white ${styles || ''}`}
      id={id}
      style={{ backgroundColor: bgColor }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-stretch gap-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:py-14">
          <div className="flex-1 text-center lg:text-left">
            <RichText
              tag="h2"
              className="mb-4 text-2xl leading-snug font-bold text-white lg:text-3xl xl:text-4xl [&_p]:m-0"
              field={fields.Title}
            />
            {fields.CTALink?.value?.href ? (
              <SitecoreLink
                field={fields.CTALink}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/70 underline-offset-4 transition-colors hover:decoration-white"
              >
                <Text field={fields.CTAText} />
                <span aria-hidden="true">→</span>
              </SitecoreLink>
            ) : (
              <button
                type="button"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/70 underline-offset-4"
              >
                <Text field={fields.CTAText} />
              </button>
            )}
          </div>

          <div className="flex shrink-0 justify-center lg:justify-end">
            <SitecoreImage
              field={fields.Image}
              className="h-40 w-auto max-w-full rounded object-contain object-right lg:h-52"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
