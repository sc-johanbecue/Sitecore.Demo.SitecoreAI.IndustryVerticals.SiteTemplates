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
import { ChevronRight } from 'lucide-react';

/**
 * MalvernArticleListSection
 * "Making a difference" left column + article row cards placeholder (adp CaseStudySection two-column idea).
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
  MoreStoriesText: { value: 'More stories' },
  MoreStoriesLink: { value: { href: '/about/stories' } },
};

export type MalvernArticleListSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernArticleListSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;

  const phRows = `malvern-article-row-cards-${DynamicPlaceholderId}`;

  return (
    <section
      className={`component malvern-article-list-section bg-white py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          <div className="lg:w-[38%] lg:shrink-0">
            <Text
              tag="h2"
              field={fields.Title}
              className="mb-4 text-2xl font-bold text-[#0a1f24] lg:text-3xl"
            />
            <div className="malvern-article-list-intro mb-6 text-base leading-relaxed text-[#4a5a5f] lg:text-lg">
              <RichText field={fields.Intro} />
            </div>
            <SitecoreLink
              field={fields.MoreStoriesLink}
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#00333d] hover:text-[#00A651]"
            >
              <Text tag="span" field={fields.MoreStoriesText} className="inline" />
              <ChevronRight className="h-4 w-4" />
            </SitecoreLink>
          </div>
          <div className="flex flex-1 flex-col gap-4 lg:gap-5">
            <Placeholder name={phRows} rendering={props.rendering} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .malvern-article-list-intro :global(a) {
          color: #00a651;
        }
      `}</style>
    </section>
  );
};
