'use client';

import React, { JSX } from 'react';
import {
  TextField,
  ImageField,
  Text,
  Image as JssImage,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

type Fields = {
  BackgroundImage: ImageField;
  Title: TextField;
};

export type PromoSectionComponentProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

const DEFAULT_FIELDS: Fields = {
  BackgroundImage: {
    value: {
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80',
      alt: 'Nature background',
      width: 1920,
      height: 600,
    },
  },
  Title: { value: 'Read more' },
};

export const Default = (props: PromoSectionComponentProps): JSX.Element => {
  const fields = props.fields || DEFAULT_FIELDS;
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <section className={`relative w-full ${styles || ''}`} key={id}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <JssImage field={fields.BackgroundImage} className="h-full w-full object-cover" />
        <div className="pointer-events-none absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {fields.Title?.value && (
            <h2 className="mb-6 text-2xl font-light text-white md:mb-8 md:text-3xl">
              <Text field={fields.Title} />
            </h2>
          )}

          {/* Cards Grid - 2 columns on top, 1 full width below */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Placeholder
                name={`matthey-promo-section-top-${DynamicPlaceholderId}`}
                rendering={props.rendering}
              />
            </div>
            <div className="grid grid-cols-1">
              <Placeholder
                name={`matthey-promo-section-bottom-${DynamicPlaceholderId}`}
                rendering={props.rendering}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
