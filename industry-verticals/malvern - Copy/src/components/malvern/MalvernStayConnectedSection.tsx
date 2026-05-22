'use client';

import type { JSX } from 'react';
import { TextField, Text, LinkField, Link as SitecoreLink } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * MalvernStayConnectedSection
 * Simple subscribe / social links strip (mobile screenshot "Stay connected").
 */

interface Fields {
  Title: TextField;
  Link1Text: TextField;
  Link1: LinkField;
  Link2Text: TextField;
  Link2: LinkField;
  Link3Text: TextField;
  Link3: LinkField;
}

const defaultFields: Fields = {
  Title: { value: 'Stay connected' },
  Link1Text: { value: 'Newsletter' },
  Link1: { value: { href: '/newsletter' } },
  Link2Text: { value: 'LinkedIn' },
  Link2: { value: { href: 'https://www.linkedin.com/company/malvern-panalytical' } },
  Link3Text: { value: 'YouTube' },
  Link3: { value: { href: 'https://www.youtube.com/user/MalvernInstruments' } },
};

export type MalvernStayConnectedSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernStayConnectedSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  const links = [
    { text: fields.Link1Text, href: fields.Link1 },
    { text: fields.Link2Text, href: fields.Link2 },
    { text: fields.Link3Text, href: fields.Link3 },
  ];

  return (
    <section
      className={`component malvern-stay-connected-section border-y border-gray-200 bg-[#f7fafb] py-8 lg:py-10 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <Text
          tag="h2"
          field={fields.Title}
          className="mb-4 text-xl font-bold text-[#0a1f24] lg:text-2xl"
        />
        <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8">
          {links.map((l, i) => (
            <li key={i}>
              <SitecoreLink
                field={l.href}
                className="text-sm font-semibold text-[#0077b6] hover:text-[#00A651] hover:underline"
              >
                <Text tag="span" field={l.text} className="inline" />
              </SitecoreLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
