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
 * Article card for MalvernArticleListSection (`malvern-article-cards-*`).
 * Thumbnail: fixed 208×130px on every card and viewport. Mobile: column (image top, centered); sm+: row (image left).
 */

interface Fields {
  Tag: TextField;
  Title: TextField;
  DateLine: TextField;
  Snippet: RichTextField;
  Image: ImageField;
  Link: LinkField;
}

const defaultFields: Fields = {
  Tag: { value: 'Blog' },
  Title: { value: 'Australia 2026: Upcoming Events and Highlights' },
  DateLine: { value: 'by Malvern Panalytical APAC | 22 April 2026' },
  Snippet: {
    value:
      "<p>Discover Australia's most exciting events lined up for 2026 — from industry-leading conferences to customer trainings. Stay tuned for key dates and venues.</p>",
  },
  Image: { value: { src: '/images/malvern-article-thumb.jpg', alt: '' } },
  Link: { value: { href: '/insights/australia-2026' } },
};

export type MalvernArticleCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernArticleCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = { ...defaultFields, ...(props.fields || {}) } as Fields;

  const inner = (
    <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-stretch sm:gap-5 sm:p-6">
      <span className="absolute top-4 right-4 z-10 rounded bg-[#0d9488] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase sm:top-5 sm:right-5">
        <Text tag="span" field={fields.Tag} className="inline" />
      </span>

      <div className="relative h-[130px] w-[208px] shrink-0 overflow-hidden rounded-lg bg-[#d4e9f5] max-sm:mx-auto sm:mx-0">
        <SitecoreImage field={fields.Image} className="h-full w-full object-cover" />
      </div>

      <div className="min-w-0 flex-1 pr-0 pt-1 sm:pr-14">
        <Text
          tag="h3"
          field={fields.Title}
          className="mb-2 text-lg font-bold leading-snug text-[#0a1f24] lg:text-xl"
        />
        <Text tag="p" field={fields.DateLine} className="mb-3 text-sm text-[#6b7280]" />
        <div className="malvern-article-card-snippet line-clamp-3 text-sm leading-relaxed text-[#4a5a5f]">
          <RichText field={fields.Snippet} />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`malvern-article-card component relative overflow-hidden rounded-xl bg-white shadow-[0_2px_14px_rgba(15,23,42,0.07)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_4px_20px_rgba(15,23,42,0.09)] ${styles || ''}`}
      id={id}
    >
      <SitecoreLink field={fields.Link} className="block text-left no-underline hover:opacity-[0.98]">
        {inner}
      </SitecoreLink>
      <style jsx>{`
        .malvern-article-card-snippet :global(p) {
          margin: 0;
        }
        .malvern-article-card-snippet :global(p + p) {
          margin-top: 0.35rem;
        }
        .malvern-article-card-snippet :global(a) {
          color: #00768f;
        }
        .malvern-article-card-snippet :global(a:hover) {
          color: #47bcd3;
        }
      `}</style>
    </div>
  );
};
