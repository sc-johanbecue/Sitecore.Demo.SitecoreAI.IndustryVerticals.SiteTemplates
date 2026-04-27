'use client';

import type { JSX } from 'react';
import {
  TextField,
  Text,
  ImageField,
  Image as SitecoreImage,
  LinkField,
  Link as SitecoreLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * MalvernTabExplorerCard
 * Grey panel with image, title, green CTA for MalvernTabbedExplorerSection.
 */

interface Fields {
  Image: ImageField;
  Title: TextField;
  CTAText: TextField;
  CTALink: LinkField;
}

const defaultFields: Fields = {
  Image: { value: { src: '/images/malvern-tab-placeholder.jpg', alt: 'Technology' } },
  Title: { value: 'Particle tracking analysis' },
  CTAText: { value: 'Discover range' },
  CTALink: { value: { href: '/products/particle-tracking' } },
};

export type MalvernTabExplorerCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernTabExplorerCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  return (
    <div
      className={`malvern-tab-explorer-card component flex w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-[#eef1f3] shadow-sm ${styles || ''}`}
      id={id}
    >
      <div className="aspect-[5/3] bg-[#dfe5e8]">
        <SitecoreImage field={fields.Image} className="h-full w-full object-cover" />
      </div>
      <div className="flex grow flex-col p-5">
        <Text
          tag="h3"
          field={fields.Title}
          className="mb-4 text-base font-bold text-[#0a1f24] lg:text-lg"
        />
        <SitecoreLink
          field={fields.CTALink}
          className="mt-auto inline-flex w-full items-center justify-center rounded-md bg-[#00A651] py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#008f45]"
        >
          <Text tag="span" field={fields.CTAText} className="inline" />
        </SitecoreLink>
      </div>
    </div>
  );
};
