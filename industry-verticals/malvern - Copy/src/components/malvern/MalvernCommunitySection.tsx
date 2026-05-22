'use client';

import React, { type JSX, useState } from 'react';
import {
  TextField,
  RichTextField,
  Text,
  RichText,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * MalvernCommunitySection
 * Patterned light background, filters, community cards placeholder (adp ArticlesCarouselSection + filters).
 */

interface Fields {
  Title: TextField;
  Intro: RichTextField;
  FilterAllText: TextField;
  Filter1Text: TextField;
  Filter2Text: TextField;
  Filter3Text: TextField;
  Filter4Text: TextField;
}

const defaultFields: Fields = {
  Title: { value: 'Learn from our community' },
  Intro: {
    value:
      '<p>The latest news, events, application notes, and webinars from our specialists worldwide.</p>',
  },
  FilterAllText: { value: 'All types' },
  Filter1Text: { value: 'News' },
  Filter2Text: { value: 'Events' },
  Filter3Text: { value: 'Application notes' },
  Filter4Text: { value: 'Webinars' },
};

export type MalvernCommunitySectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernCommunitySectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;
  const [activeFilter, setActiveFilter] = useState(0);

  const phCards = `malvern-community-cards-${DynamicPlaceholderId}`;

  const filters = [
    fields.FilterAllText,
    fields.Filter1Text,
    fields.Filter2Text,
    fields.Filter3Text,
    fields.Filter4Text,
  ];

  return (
    <section
      className={`component malvern-community-section relative py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[#eef2f4]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5d5db' fill-opacity='0.35'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4">
        <Text
          tag="h2"
          field={fields.Title}
          className="mb-4 text-2xl font-bold text-[#0a1f24] lg:text-3xl"
        />
        <div className="malvern-community-intro mb-8 max-w-3xl text-base text-[#4a5a5f] lg:text-lg">
          <RichText field={fields.Intro} />
        </div>

        <div className="mb-8 flex flex-wrap gap-2 lg:gap-3">
          {filters.map((f, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveFilter(i)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                activeFilter === i
                  ? 'bg-[#00333d] text-white'
                  : 'bg-white text-[#00333d] ring-1 ring-gray-200 hover:ring-[#00A651]'
              }`}
            >
              <Text tag="span" field={f} className="inline" />
            </button>
          ))}
        </div>

        <div className="malvern-community-grid flex flex-col gap-6 lg:flex-row lg:gap-6">
          <Placeholder name={phCards} rendering={props.rendering} />
        </div>
      </div>

      <style jsx>{`
        .malvern-community-intro :global(a) {
          color: #00a651;
        }
        .malvern-community-grid :global(> .malvern-community-card) {
          width: 100%;
        }
        @media (min-width: 1024px) {
          .malvern-community-grid :global(> .malvern-community-card) {
            width: calc(33.333% - 1rem);
          }
        }
      `}</style>
    </section>
  );
};
