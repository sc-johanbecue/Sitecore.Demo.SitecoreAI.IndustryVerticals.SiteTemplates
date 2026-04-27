'use client';

import React, { type JSX } from 'react';
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
import { ChevronRight } from 'lucide-react';

/**
 * MalvernDigitalSolutionsSection
 * Split banner: instrument image left, light-blue content panel right (adp ContentImageSection-style split).
 */

interface Fields {
  Heading: TextField;
  Content: RichTextField;
  LinkText: TextField;
  Link: LinkField;
  Image: ImageField;
}

const defaultFields: Fields = {
  Heading: { value: 'The next generation of instrument management is here' },
  Content: {
    value:
      '<p>Omnian software brings together your instruments, data, and workflows so your team spends less time on administration and more time on science.</p>',
  },
  LinkText: { value: 'Learn more' },
  Link: { value: { href: '/solutions/software' } },
  Image: {
    value: { src: '/images/malvern-digital-solutions.jpg', alt: 'Instrument management' },
  },
};

export type MalvernDigitalSolutionsSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernDigitalSolutionsSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  return (
    <section
      className={`component malvern-digital-solutions-section overflow-hidden bg-white py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          <div className="relative min-h-[220px] flex-1 lg:min-h-[360px] lg:max-w-[48%]">
            <SitecoreImage
              field={fields.Image}
              className="h-full w-full object-cover lg:absolute lg:inset-0"
            />
          </div>
          <div className="relative z-[1] -mt-6 flex flex-1 items-center bg-[#c5e8f0] px-6 py-10 shadow-lg lg:mt-0 lg:-ml-10 lg:max-w-[58%] lg:self-center lg:px-12 lg:py-14">
            <div className="malvern-digital-solutions-content w-full">
              <Text
                tag="h2"
                field={fields.Heading}
                className="mb-4 text-2xl leading-tight font-bold text-[#00333d] lg:text-3xl"
              />
              <RichText
                field={fields.Content}
                className="mb-6 text-base leading-relaxed text-[#1a2b2f] lg:text-lg"
              />
              <SitecoreLink
                field={fields.Link}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#00333d] hover:text-[#00A651]"
              >
                <Text tag="span" field={fields.LinkText} className="inline" />
                <ChevronRight className="h-4 w-4" />
              </SitecoreLink>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .malvern-digital-solutions-content :global(a) {
          color: #00a651;
        }
      `}</style>
    </section>
  );
};
