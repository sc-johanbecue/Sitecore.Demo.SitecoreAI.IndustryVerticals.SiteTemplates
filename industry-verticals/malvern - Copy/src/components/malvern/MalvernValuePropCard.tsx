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
 * MalvernValuePropCard
 * Vertical card: full-width image band (~40% via aspect ratio), white copy block with rounded corners and light shadow; CTA is Malvern-blue text with a thin arrow before the label.
 */

interface Fields {
  /** Hero image for the top of the card (replaces legacy small Icon). */
  Image: ImageField;
  Title: TextField;
  Description: RichTextField;
  LinkText: TextField;
  Link: LinkField;
}

const defaultFields: Fields = {
  Image: {
    value: { src: '/images/malvern-value-prop-mining.jpg', alt: 'Mining and mineral processing' },
  },
  Title: { value: 'Mining solutions' },
  Description: {
    value:
      '<p>Improve recovery rates and process efficiency from exploration to mineral processing</p>',
  },
  LinkText: { value: 'View industry' },
  Link: { value: { href: '/industries/mining' } },
};

export type MalvernValuePropCardProps = ComponentProps & {
  fields: Fields & { Icon?: ImageField };
};

function imageFieldHasSrc(field: ImageField | undefined): boolean {
  const v = field?.value;
  if (!v || typeof v !== 'object' || !('src' in v)) return false;
  const src = (v as { src?: string }).src;
  return Boolean(src && String(src).trim());
}

export const Default = (props: MalvernValuePropCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const raw = (props.fields || {}) as Partial<Fields & { Icon?: ImageField }>;
  const merged = { ...defaultFields, ...raw } as Fields & { Icon?: ImageField };
  /** Prefer `Image`; fall back to legacy `Icon` when datasource has not been updated. */
  const imageField = imageFieldHasSrc(raw.Image)
    ? raw.Image!
    : imageFieldHasSrc(raw.Icon)
      ? raw.Icon!
      : merged.Image;

  return (
    <div
      className={`malvern-value-prop-card component flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_2px_14px_rgba(15,23,42,0.07)] ring-1 ring-gray-200/70 ${styles || ''}`}
      id={id}
    >
      {/* Fixed image height so every card aligns in a row regardless of column width. */}
      <div className="relative h-40 w-full shrink-0 bg-[#e8ecef] sm:h-44 lg:h-48">
        <SitecoreImage
          field={imageField}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-7 py-8 lg:px-8 lg:py-9">
        {/*
          At lg+, reserve two title lines so cards in a row share the same title block height
          when some headings wrap and others do not (matches ~2× title line-height at lg size).
        */}
        <div className="malvern-value-prop-title mb-3 shrink-0 lg:min-h-12">
          <Text
            tag="h3"
            field={merged.Title}
            className="text-lg leading-snug font-bold text-[#1a1a1a] lg:text-[1.0625rem]"
          />
        </div>
        <div className="malvern-value-prop-desc min-h-0 flex-1 text-base leading-relaxed text-[#4a5568]">
          <RichText field={merged.Description} />
        </div>
        <SitecoreLink
          field={merged.Link}
          className="mt-auto inline-flex w-fit shrink-0 items-center gap-2 pt-6 text-base font-medium text-[#007fa3] underline decoration-[#007fa3] underline-offset-[0.2em] transition-colors hover:text-[#006688] hover:decoration-[#006688]"
        >
          <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
          <Text tag="span" field={merged.LinkText} className="inline" />
        </SitecoreLink>
      </div>

      <style jsx>{`
        .malvern-value-prop-desc :global(p) {
          margin: 0 0 0.5rem 0;
        }
        .malvern-value-prop-desc :global(p:last-child) {
          margin-bottom: 0;
        }
        .malvern-value-prop-desc :global(a) {
          color: #007fa3;
          text-decoration: underline;
        }
        .malvern-value-prop-desc :global(a:hover) {
          color: #006688;
        }
      `}</style>
    </div>
  );
};
