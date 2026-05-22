'use client';

import React, { type JSX } from 'react';
import {
  TextField,
  RichTextField,
  Text,
  RichText,
  LinkField,
  Link as SitecoreLink,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { ArrowRight } from 'lucide-react';

/**
 * MalvernArticleListSection — intro + dynamic placeholder **malvern-article-cards-{DynamicPlaceholderId}**.
 * Desktop (lg+): two columns (~⅓ intro, ~⅔ cards). Tablet/mobile: stacked header then cards.
 */

interface Fields {
  Title: TextField;
  Intro: RichTextField;
  MoreStoriesText: TextField;
  MoreStoriesLink: LinkField;
}

const defaultFields: Fields = {
  Title: { value: 'Making a difference' },
  Intro: {
    value:
      '<p>We help scientists and engineers address some of the world’s most pressing challenges—from medicines to materials—through measurement.</p>',
  },
  MoreStoriesText: { value: 'Visit the blog' },
  MoreStoriesLink: { value: { href: '/blog' } },
};

export type MalvernArticleListSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernArticleListSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = { ...defaultFields, ...(props.fields || {}) } as Fields;

  const phCards = `malvern-article-cards-${DynamicPlaceholderId ?? ''}`;

  return (
    <section
      className={`component malvern-article-list-section relative overflow-hidden bg-[#00ff00] py-12 md:py-14 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-20 -left-24 h-88 w-88 rounded-full border border-white/70" />
        <div className="absolute top-[8%] left-[35%] h-72 w-72 rounded-full border border-white/55" />
        <div className="absolute -right-16 top-1/4 h-80 w-80 rounded-full border border-white/60" />
        <div className="absolute -bottom-24 left-[10%] h-64 w-64 rounded-full border border-white/50" />
        <div className="absolute right-[20%] bottom-[15%] h-56 w-56 rounded-full border border-white/45" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          <div className="w-full shrink-0 lg:w-[32%] lg:max-w-none">
            <Text
              tag="h2"
              field={fields.Title}
              className="mb-4 text-2xl font-bold tracking-tight text-[#0a1f24] md:text-[1.65rem] lg:text-3xl"
            />
            <div className="malvern-article-list-intro mb-6 text-base leading-relaxed text-[#4a5a5f] lg:text-lg">
              <RichText field={fields.Intro} />
            </div>
            <SitecoreLink
              field={fields.MoreStoriesLink}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#00768f] transition-colors hover:text-[#47bcd3]"
            >
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
              <Text tag="span" field={fields.MoreStoriesText} className="inline" />
            </SitecoreLink>
          </div>

          <div className="malvern-article-list-cards flex min-w-0 flex-1 flex-col gap-4 md:gap-5">
            <Placeholder name={phCards} rendering={props.rendering} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .malvern-article-list-intro :global(p) {
          margin-bottom: 0.75rem;
        }
        .malvern-article-list-intro :global(p:last-child) {
          margin-bottom: 0;
        }
        .malvern-article-list-intro :global(a) {
          color: #00a651;
        }
        .malvern-article-list-cards > :global(*):not(:global(.malvern-article-card)) {
          display: contents;
        }
        .malvern-article-list-cards :global(.malvern-article-card) {
          width: 100%;
          min-width: 0;
        }
      `}</style>
    </section>
  );
};
