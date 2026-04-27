'use client';

import type { JSX } from 'react';
import { TextField, Text, LinkField, Link as SitecoreLink } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * MalvernHelpLinksSection
 * "How can we help?" three-column link row (adp SearchFilterSection-style section shell).
 */

interface Fields {
  Title: TextField;
  Col1Title: TextField;
  Col1LinkText: TextField;
  Col1Link: LinkField;
  Col2Title: TextField;
  Col2LinkText: TextField;
  Col2Link: LinkField;
  Col3Title: TextField;
  Col3LinkText: TextField;
  Col3Link: LinkField;
}

const defaultFields: Fields = {
  Title: { value: 'How can we help?' },
  Col1Title: { value: 'Technical support' },
  Col1LinkText: { value: 'Search our knowledge base' },
  Col1Link: { value: { href: '/support/knowledge-base' } },
  Col2Title: { value: 'Local expertise' },
  Col2LinkText: { value: 'Find a local contact' },
  Col2Link: { value: { href: '/contact/local' } },
  Col3Title: { value: 'Talk to us' },
  Col3LinkText: { value: 'Talk to us' },
  Col3Link: { value: { href: '/contact' } },
};

export type MalvernHelpLinksSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernHelpLinksSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  const cols = [
    {
      title: fields.Col1Title,
      linkText: fields.Col1LinkText,
      link: fields.Col1Link,
    },
    {
      title: fields.Col2Title,
      linkText: fields.Col2LinkText,
      link: fields.Col2Link,
    },
    {
      title: fields.Col3Title,
      linkText: fields.Col3LinkText,
      link: fields.Col3Link,
    },
  ];

  return (
    <section
      className={`component malvern-help-links-section bg-white py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <Text
          tag="h2"
          field={fields.Title}
          className="mb-10 text-center text-2xl font-bold text-[#0a1f24] lg:mb-12 lg:text-3xl"
        />
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {cols.map((col, i) => (
            <div key={i} className="text-center md:text-left">
              <Text tag="h3" field={col.title} className="mb-3 text-lg font-bold text-[#0a1f24]" />
              <SitecoreLink
                field={col.link}
                className="text-base font-medium text-[#00333d] underline decoration-[#00A651] decoration-2 underline-offset-4 hover:text-[#00A651]"
              >
                <Text tag="span" field={col.linkText} className="inline" />
              </SitecoreLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
