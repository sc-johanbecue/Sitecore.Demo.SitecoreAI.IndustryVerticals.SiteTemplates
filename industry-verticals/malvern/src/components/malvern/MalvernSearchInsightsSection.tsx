'use client';

import type { JSX } from 'react';
import {
  TextField,
  Text,
  RichTextField,
  RichText,
  LinkField,
  Link as SitecoreLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * MalvernSearchInsightsSection
 * Centered heading + prominent green CTA (mobile "Search insights" pattern).
 */

interface Fields {
  Title: TextField;
  Description: RichTextField;
  CTAText: TextField;
  CTALink: LinkField;
}

const defaultFields: Fields = {
  Title: { value: 'Find answers faster' },
  Description: {
    value:
      '<p>Search technical notes, webinars, and application articles from Malvern Panalytical.</p>',
  },
  CTAText: { value: 'Search insights' },
  CTALink: { value: { href: '/search' } },
};

export type MalvernSearchInsightsSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernSearchInsightsSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  return (
    <section
      className={`component malvern-search-insights-section bg-white py-10 lg:py-12 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-2xl px-4 text-center">
        <Text
          tag="h2"
          field={fields.Title}
          className="mb-3 text-2xl font-bold text-[#0a1f24] lg:text-3xl"
        />
        <div className="malvern-search-insights-desc mb-8 text-base text-[#4a5a5f]">
          <RichText field={fields.Description} />
        </div>
        <SitecoreLink
          field={fields.CTALink}
          className="inline-flex w-full items-center justify-center rounded-md bg-[#00A651] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#008f45] sm:w-auto"
        >
          <Text tag="span" field={fields.CTAText} className="inline" />
        </SitecoreLink>
      </div>
      <style jsx>{`
        .malvern-search-insights-desc :global(a) {
          color: #00a651;
        }
      `}</style>
    </section>
  );
};
