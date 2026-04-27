'use client';

import type { JSX } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  TextField,
  Text,
  LinkField,
  Link as SitecoreLink,
  ImageField,
  Image as SitecoreImage,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { GraduationCap, Mail, Globe } from 'lucide-react';

/**
 * MalvernHelpLinksSection
 * "How can we help?" — three modules: outline icon (ImageField or brand fallbacks), bold title, teal underlined link.
 * Desktop: three columns; mobile: stacked rows, icon + copy aligned.
 */

interface Fields {
  Title: TextField;
  Col1Icon: ImageField;
  Col1Title: TextField;
  Col1LinkText: TextField;
  Col1Link: LinkField;
  Col2Icon: ImageField;
  Col2Title: TextField;
  Col2LinkText: TextField;
  Col2Link: LinkField;
  Col3Icon: ImageField;
  Col3Title: TextField;
  Col3LinkText: TextField;
  Col3Link: LinkField;
}

const defaultFields: Fields = {
  Title: { value: 'How can we help?' },
  Col1Icon: { value: {} },
  Col1Title: { value: 'Dive into our knowledge center' },
  Col1LinkText: {
    value:
      'Browse our huge freely-available library of manuals and instrument and application information.',
  },
  Col1Link: { value: { href: '/support/knowledge-center' } },
  Col2Icon: { value: {} },
  Col2Title: { value: 'Contact customer support' },
  Col2LinkText: { value: 'Get the support you need, fast.' },
  Col2Link: { value: { href: '/support/contact' } },
  Col3Icon: { value: {} },
  Col3Title: { value: 'Get in touch' },
  Col3LinkText: { value: 'Find your local Malvern Panalytical office.' },
  Col3Link: { value: { href: '/contact/offices' } },
};

const fallbacks: LucideIcon[] = [GraduationCap, Mail, Globe];

export type MalvernHelpLinksSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernHelpLinksSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = { ...defaultFields, ...(props.fields || {}) } as Fields;

  const cols = [
    {
      icon: fields.Col1Icon,
      title: fields.Col1Title,
      linkText: fields.Col1LinkText,
      link: fields.Col1Link,
      Fallback: fallbacks[0],
    },
    {
      icon: fields.Col2Icon,
      title: fields.Col2Title,
      linkText: fields.Col2LinkText,
      link: fields.Col2Link,
      Fallback: fallbacks[1],
    },
    {
      icon: fields.Col3Icon,
      title: fields.Col3Title,
      linkText: fields.Col3LinkText,
      link: fields.Col3Link,
      Fallback: fallbacks[2],
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
          className="mb-10 text-left text-2xl font-bold tracking-tight text-[#1a1a1a] sm:text-[1.65rem] lg:mb-12 lg:text-3xl"
        />
        <ul className="m-0 grid list-none grid-cols-1 gap-12 p-0 lg:grid-cols-3 lg:gap-10 xl:gap-14">
          {cols.map((col, i) => {
            return (
              <li key={i}>
                <div className="flex items-center gap-4 sm:gap-5 lg:items-start">
                  <div className="malvern-help-links-icon shrink-0 text-[#C21E56]" aria-hidden>
                    <SitecoreImage
                      field={col.icon}
                      className="block h-12 w-12 object-contain sm:h-14 sm:w-14"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <Text
                      tag="h3"
                      field={col.title}
                      className="mb-2 text-lg leading-snug font-bold text-[#1a1a1a] lg:text-[1.125rem]"
                    />
                    <SitecoreLink
                      field={col.link}
                      className="block text-[0.9375rem] leading-relaxed font-normal text-[#007fa3] underline decoration-[#007fa3] underline-offset-[0.2em] transition-colors hover:text-[#006688] hover:decoration-[#006688] lg:text-base"
                    >
                      <Text tag="span" field={col.linkText} className="inline" />
                    </SitecoreLink>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
