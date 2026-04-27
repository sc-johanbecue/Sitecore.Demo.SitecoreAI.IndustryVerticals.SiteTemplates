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
 * MalvernArticleRowCard
 * Horizontal insight row for MalvernArticleListSection.
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
  Tag: { value: 'Article' },
  Title: { value: 'Supporting sustainable pharmaceutical development' },
  DateLine: { value: '24 April 2026' },
  Snippet: {
    value:
      '<p>How orthogonal analytical techniques accelerate formulation understanding from early development to QC.</p>',
  },
  Image: { value: { src: '/images/malvern-article-thumb.jpg', alt: '' } },
  Link: { value: { href: '/insights/pharma-sustainability' } },
};

export type MalvernArticleRowCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernArticleRowCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  const inner = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
      <div className="relative h-36 shrink-0 overflow-hidden rounded-md bg-[#d4e9f5] sm:h-auto sm:w-40 lg:w-44">
        <SitecoreImage field={fields.Image} className="h-full w-full object-cover" />
      </div>
      <div className="min-w-0 flex-1 py-1">
        <Text
          tag="span"
          field={fields.Tag}
          className="mb-2 block text-xs font-bold tracking-wide text-[#0077b6] uppercase"
        />
        <Text
          tag="h3"
          field={fields.Title}
          className="mb-2 text-lg leading-snug font-bold text-[#003d7a] lg:text-xl"
        />
        <Text tag="p" field={fields.DateLine} className="mb-2 text-xs text-[#5a6a6e]" />
        <div className="malvern-article-row-snippet text-sm leading-relaxed text-[#4a5a5f]">
          <RichText field={fields.Snippet} />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`malvern-article-row-card component rounded-lg border border-gray-100 bg-[#e8f4fc] p-4 shadow-sm lg:p-5 ${styles || ''}`}
      id={id}
    >
      <SitecoreLink field={fields.Link} className="block text-left hover:opacity-90">
        {inner}
      </SitecoreLink>
      <style jsx>{`
        .malvern-article-row-snippet :global(a) {
          color: #00a651;
        }
      `}</style>
    </div>
  );
};
