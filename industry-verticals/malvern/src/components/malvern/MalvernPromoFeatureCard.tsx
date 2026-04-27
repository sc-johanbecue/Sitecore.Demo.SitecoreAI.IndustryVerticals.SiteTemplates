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
 * MalvernPromoFeatureCard
 * Full-card background image with a pure black copy column on the left (headline, body, outline CTA); rounded card.
 */

interface Fields {
  Title: TextField;
  Description: RichTextField;
  LinkText: TextField;
  Link: LinkField;
  BackgroundImage: ImageField;
}

const defaultFields: Fields = {
  Title: { value: 'Software and downloads' },
  Description: {
    value:
      '<p>Download the latest software, drivers, and documentation for your Malvern Panalytical instruments.</p>',
  },
  LinkText: { value: 'View all downloads' },
  Link: { value: { href: '/downloads' } },
  BackgroundImage: {
    value: { src: '/images/malvern-promo-compact.jpg', alt: 'Malvern Panalytical instrument' },
  },
};

export type MalvernPromoFeatureCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernPromoFeatureCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = { ...defaultFields, ...(props.fields || {}) } as Fields;

  return (
    <div
      className={`malvern-promo-feature-card relative flex min-h-48 w-full flex-col overflow-hidden rounded-2xl sm:min-h-70 sm:flex-row lg:min-h-75 lg:flex-1 ${styles || ''}`}
      id={id}
    >
      <SitecoreImage
        field={fields.BackgroundImage}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
      />
      <div className="relative z-10 flex flex-col justify-center px-6 py-9 sm:w-[56%] sm:max-w-[56%] sm:shrink-0 sm:px-7 sm:py-10 lg:px-8 lg:py-11">
        <Text
          tag="h3"
          field={fields.Title}
          className="mb-5 text-[1.75rem] leading-[1.15] font-bold tracking-tight text-white sm:mb-6 sm:text-[2rem] sm:leading-[1.12]"
        />
        <div className="malvern-promo-feature-desc mb-7 text-lg leading-relaxed text-white sm:mb-8">
          <RichText field={fields.Description} />
        </div>
        <SitecoreLink
          field={fields.Link}
          className="inline-flex w-fit min-w-48 items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 text-base font-bold text-white no-underline transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-w-56"
        >
          <Text tag="span" field={fields.LinkText} className="inline" />
        </SitecoreLink>
      </div>

      <style jsx>{`
        .malvern-promo-feature-desc :global(p) {
          margin: 0 0 0.75rem 0;
          color: #fff;
        }
        .malvern-promo-feature-desc :global(p:last-child) {
          margin-bottom: 0;
        }
        .malvern-promo-feature-desc :global(a) {
          color: #7ec8e3;
          text-decoration: underline;
        }
        .malvern-promo-feature-desc :global(a:hover) {
          color: #fff;
        }
      `}</style>
    </div>
  );
};
