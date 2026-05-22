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
 * Product-style tile: fixed-aspect image band (`object-cover` fills `#eef2f3` frame), left-aligned title + description,
 * stacked full-width CTAs — outline “View range” then solid “Request a quote”.
 * Intended to stretch to row height via parent flex (h-full).
 */

interface Fields {
  Image: ImageField;
  Title: TextField;
  Description: TextField;
  /** Outline button (e.g. View range) — rendered first. */
  SecondaryCTAText: TextField;
  SecondaryCTALink: LinkField;
  /** Solid green button (e.g. Request a quote) — rendered second. */
  PrimaryCTAText: TextField;
  PrimaryCTALink: LinkField;
}

const defaultFields: Fields = {
  Image: {
    value: {
      src: '/images/malvern-tab-placeholder.jpg',
      alt: 'Zetasizer Advance Range instruments',
    },
  },
  Title: { value: 'Zetasizer Advance Range' },
  Description: { value: 'Light Scattering for every application' },
  SecondaryCTAText: { value: 'View range' },
  SecondaryCTALink: { value: { href: '/products/zetasizer-advance' } },
  PrimaryCTAText: { value: 'Request a quote' },
  PrimaryCTALink: { value: { href: '/contact/quote' } },
};

export type MalvernTabExplorerCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernTabExplorerCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = { ...defaultFields, ...(props.fields || {}) } as Fields;

  return (
    <div
      className={`malvern-tab-explorer-card component flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-sm ${styles || ''}`}
      id={id}
    >
      <div className="relative isolate aspect-5/3 w-full shrink-0 overflow-hidden bg-[#eef2f3]">
        <SitecoreImage field={fields.Image} className="h-full w-full object-cover object-center" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col bg-white px-5 pt-5 pb-5">
        <div className="min-w-0 flex-1 text-left">
          <div className="malvern-tab-explorer-card-title mb-2 lg:min-h-12">
            <Text
              tag="h3"
              field={fields.Title}
              className="text-lg leading-snug font-bold text-[#1a1a1a] lg:text-xl"
            />
          </div>
          <Text
            tag="p"
            field={fields.Description}
            className="text-base leading-relaxed text-[#5c6b70]"
          />
        </div>

        <div className="mt-auto flex shrink-0 flex-col gap-2.5 pt-5">
          <SitecoreLink
            field={fields.SecondaryCTALink}
            className="inline-flex w-full items-center justify-center rounded-md border-2 border-[#00A651] bg-transparent px-4 py-2.5 text-center text-sm font-semibold text-[#00A651] no-underline transition-colors hover:bg-[#00A651]/8"
          >
            <Text tag="span" field={fields.SecondaryCTAText} className="inline" />
          </SitecoreLink>
          <SitecoreLink
            field={fields.PrimaryCTALink}
            className="inline-flex w-full items-center justify-center rounded-md bg-[#00A651] px-4 py-2.5 text-center text-sm font-semibold text-white no-underline transition-colors hover:bg-[#008f45]"
          >
            <Text tag="span" field={fields.PrimaryCTAText} className="inline" />
          </SitecoreLink>
        </div>
      </div>
    </div>
  );
};
