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
import { ChevronRight } from 'lucide-react';

/**
 * MalvernPromoFeatureCard
 * Dark promotional half-width tile for MalvernDualFeatureSection.
 */

interface Fields {
  Title: TextField;
  Description: RichTextField;
  LinkText: TextField;
  Link: LinkField;
  BackgroundImage: ImageField;
}

const defaultFields: Fields = {
  Title: { value: 'All the analysis. Small footprint.' },
  Description: {
    value:
      '<p>Compact systems that deliver the same trusted analytical performance for busy labs.</p>',
  },
  LinkText: { value: 'Discover more' },
  Link: { value: { href: '/products/compact' } },
  BackgroundImage: {
    value: { src: '/images/malvern-promo-compact.jpg', alt: 'Compact analyzer' },
  },
};

export type MalvernPromoFeatureCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernPromoFeatureCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  return (
    <div
      className={`malvern-promo-feature-card component relative min-h-[260px] overflow-hidden rounded-lg lg:min-h-[300px] ${styles || ''}`}
      id={id}
    >
      <SitecoreImage
        field={fields.BackgroundImage}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/20" />
      <div className="relative flex h-full min-h-[260px] flex-col justify-center p-6 lg:min-h-[300px] lg:max-w-[65%] lg:p-10">
        <Text
          tag="h3"
          field={fields.Title}
          className="mb-3 text-2xl font-bold text-white lg:text-3xl"
        />
        <div className="malvern-promo-feature-desc mb-5 text-sm leading-relaxed text-white/90 lg:text-base">
          <RichText field={fields.Description} />
        </div>
        <SitecoreLink
          field={fields.Link}
          className="inline-flex items-center gap-1 text-sm font-semibold text-white underline-offset-4 hover:underline"
        >
          <Text tag="span" field={fields.LinkText} className="inline" />
          <ChevronRight className="h-4 w-4" />
        </SitecoreLink>
      </div>
      <style jsx>{`
        .malvern-promo-feature-desc :global(a) {
          color: #7ec8e3;
        }
      `}</style>
    </div>
  );
};
