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
 * MalvernCommunityCard
 * Tall card: image, date + title band, teal tag strip, green CTA.
 */

interface Fields {
  Image: ImageField;
  DateLine: TextField;
  Title: TextField;
  TagsFooter: RichTextField;
  CTAText: TextField;
  CTALink: LinkField;
}

const defaultFields: Fields = {
  Image: { value: { src: '/images/malvern-community-1.jpg', alt: 'Webinar' } },
  DateLine: { value: '7 May' },
  Title: { value: 'Advances in battery electrode characterization' },
  TagsFooter: {
    value: '<p>Batteries · Webinars · Research</p>',
  },
  CTAText: { value: 'View program' },
  CTALink: { value: { href: '/events/battery-webinar' } },
};

export type MalvernCommunityCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernCommunityCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  return (
    <div
      className={`malvern-community-card component flex h-full min-h-[420px] flex-col overflow-hidden rounded-lg bg-white shadow-md lg:min-h-[460px] ${styles || ''}`}
      id={id}
    >
      <div className="aspect-[16/10] shrink-0 overflow-hidden bg-[#dfe5e8]">
        <SitecoreImage field={fields.Image} className="h-full w-full object-cover" />
      </div>
      <div className="flex grow flex-col px-5 pt-5 pb-0">
        <Text tag="p" field={fields.DateLine} className="mb-1 text-sm font-bold text-[#00333d]" />
        <Text
          tag="h3"
          field={fields.Title}
          className="mb-0 text-lg leading-snug font-bold text-[#0a1f24] lg:text-xl"
        />
      </div>
      <div className="malvern-community-tags mt-auto bg-[#00333d] px-5 py-4 text-sm text-white/95">
        <RichText field={fields.TagsFooter} />
      </div>
      <div className="p-5 pt-4">
        <SitecoreLink
          field={fields.CTALink}
          className="inline-flex w-full items-center justify-center rounded-md bg-[#00A651] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008f45]"
        >
          <Text tag="span" field={fields.CTAText} className="inline" />
        </SitecoreLink>
      </div>
      <style jsx>{`
        .malvern-community-tags :global(p) {
          margin: 0;
        }
        .malvern-community-tags :global(a) {
          color: #7ec8e3;
        }
      `}</style>
    </div>
  );
};
