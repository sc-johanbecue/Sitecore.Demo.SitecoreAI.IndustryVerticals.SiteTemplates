'use client';

import type { JSX } from 'react';
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

/**
 * MalvernValuePropsSection
 * Pale band with heading, intro, equal-height value-prop cards (grid), then a bar with optional bold line + green CTA.
 */

interface Fields {
  Title: TextField;
  Description: RichTextField;
  /** Bold line to the left of the section CTA (e.g. “Explore our full range of industry applications”). */
  CTAHeading: TextField;
  SectionCTAText: TextField;
  SectionCTALink: LinkField;
}

const defaultFields: Fields = {
  Title: { value: 'Groundbreaking solutions for every industry' },
  Description: {
    value:
      '<p>We partner with our customers in a huge range of industries and applications to make their solutions possible through the power of precision measurements, our expertise, trusted data, and insights.</p>',
  },
  CTAHeading: {
    value: 'Explore our full range of industry applications',
  },
  SectionCTAText: { value: 'View all industries' },
  SectionCTALink: { value: { href: '/industries' } },
};

export type MalvernValuePropsSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernValuePropsSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = { ...defaultFields, ...(props.fields || {}) } as Fields;

  const phCards = `malvern-value-prop-cards-${DynamicPlaceholderId}`;

  return (
    <section
      className={`component malvern-value-props-section relative overflow-hidden bg-[#e8f4f8] py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden>
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-white/60 blur-2xl" />
        <div className="absolute top-1/3 right-0 h-56 w-56 rounded-full bg-white/50 blur-2xl" />
        <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-white/45 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <Text
          tag="h2"
          field={fields.Title}
          className="mb-4 text-left text-2xl font-bold text-[#0a1f24] lg:text-3xl"
        />
        <div className="malvern-value-props-intro mb-10 max-w-3xl text-left text-base text-[#4a5a5f] lg:mb-12 lg:text-lg">
          <RichText field={fields.Description} />
        </div>

        {/*
         * Flex + display:contents (same pattern as MalvernProductCategoriesSection). Grid + contents
         * often leaves a single wrapper as one cell so cards stack. Do not apply contents to the card.
         */}
        <div className="malvern-value-prop-grid mb-10 flex flex-wrap justify-center gap-5 lg:mb-12 lg:gap-6">
          <Placeholder name={phCards} rendering={props.rendering} />
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <Text
              tag="p"
              field={fields.CTAHeading}
              className="text-lg leading-snug font-bold text-[#0a1f24] sm:text-xl"
            />
          </div>
          <div className="flex shrink-0 justify-center sm:justify-end">
            <SitecoreLink
              field={fields.SectionCTALink}
              className="inline-flex items-center justify-center rounded-md bg-[#00A651] px-8 py-3 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#008f45]"
            >
              <Text tag="span" field={fields.SectionCTAText} className="inline" />
            </SitecoreLink>
          </div>
        </div>
      </div>

      <style jsx>{`
        .malvern-value-props-intro :global(p) {
          text-align: left;
        }
        .malvern-value-props-intro :global(a) {
          color: #00a651;
        }
        .malvern-value-prop-grid > :global(*):not(:global(.malvern-value-prop-card)) {
          display: contents;
        }
        .malvern-value-prop-grid :global(.malvern-value-prop-card) {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          min-width: 0;
          min-height: 0;
          align-self: stretch;
          flex: 0 0 100%;
          width: 100%;
          max-width: 100%;
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .malvern-value-prop-grid :global(.malvern-value-prop-card) {
            flex: 0 0 calc((100% - 1.25rem) / 2);
            width: calc((100% - 1.25rem) / 2);
            max-width: calc((100% - 1.25rem) / 2);
          }
        }
        @media (min-width: 1024px) {
          .malvern-value-prop-grid :global(.malvern-value-prop-card) {
            flex: 0 0 calc((100% - 4.5rem) / 4);
            width: calc((100% - 4.5rem) / 4);
            max-width: calc((100% - 4.5rem) / 4);
          }
        }
      `}</style>
    </section>
  );
};
