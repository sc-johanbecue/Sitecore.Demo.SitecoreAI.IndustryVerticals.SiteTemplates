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

/**
 * MalvernValuePropsSection
 * Light blue band with centered heading and value-prop cards (adp ServicesSection pattern).
 */

interface Fields {
  Title: TextField;
  Description: RichTextField;
  SectionCTAText: TextField;
  SectionCTALink: LinkField;
}

const defaultFields: Fields = {
  Title: { value: 'Groundbreaking solutions for every laboratory' },
  Description: {
    value:
      '<p>Expertise, instruments, and services designed around your analytical challenges.</p>',
  },
  SectionCTAText: { value: 'Show all services' },
  SectionCTALink: { value: { href: '/services' } },
};

export type MalvernValuePropsSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernValuePropsSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;

  const phCards = `malvern-value-prop-cards-${DynamicPlaceholderId}`;

  return (
    <section
      className={`component malvern-value-props-section bg-[#e8f4f8] py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <Text
          tag="h2"
          field={fields.Title}
          className="mb-4 text-center text-2xl font-bold text-[#0a1f24] lg:text-3xl"
        />
        <div className="malvern-value-props-intro mx-auto mb-10 max-w-3xl text-center text-base text-[#4a5a5f] lg:mb-12 lg:text-lg">
          <RichText field={fields.Description} />
        </div>

        <div className="malvern-value-prop-grid mb-10 flex flex-wrap justify-center gap-5 lg:mb-12 lg:gap-6">
          <Placeholder name={phCards} rendering={props.rendering} />
        </div>

        <div className="flex justify-center lg:justify-end">
          <SitecoreLink
            field={fields.SectionCTALink}
            className="inline-flex items-center justify-center rounded-md bg-[#00A651] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008f45]"
          >
            <Text tag="span" field={fields.SectionCTAText} className="inline" />
          </SitecoreLink>
        </div>
      </div>

      <style jsx>{`
        .malvern-value-props-intro :global(a) {
          color: #00a651;
        }
        .malvern-value-prop-grid :global(> .malvern-value-prop-card) {
          width: 100%;
        }
        @media (min-width: 640px) {
          .malvern-value-prop-grid :global(> .malvern-value-prop-card) {
            width: calc(50% - 0.625rem);
          }
        }
        @media (min-width: 1024px) {
          .malvern-value-prop-grid :global(> .malvern-value-prop-card) {
            width: calc(25% - 1.125rem);
          }
        }
      `}</style>
    </section>
  );
};
