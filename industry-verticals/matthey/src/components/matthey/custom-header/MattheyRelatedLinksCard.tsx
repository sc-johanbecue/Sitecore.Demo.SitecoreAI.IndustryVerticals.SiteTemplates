'use client';

import React, { JSX } from 'react';
import {
  TextField,
  ImageField,
  LinkField,
  Text,
  Image as JssImage,
  Link as JssLink,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';
import { ArrowRight } from 'lucide-react';

type Fields = {
  Title: TextField;
  LinkText: TextField;
  Link: LinkField;
  Image: ImageField;
};

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

const DEFAULT_FIELDS: Fields = {
  Title: { value: 'Mobile emissions control' },
  LinkText: { value: 'Explore' },
  Link: { value: { href: '/products-and-markets/mobile-emissions-control' } },
  Image: {
    value: {
      src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80',
      alt: 'Mobile emissions control',
      width: 400,
      height: 300,
    },
  },
};

export const Default = (props: ComponentProps): JSX.Element => {
  const fields = props.fields || DEFAULT_FIELDS;
  const id = props.rendering?.uid;

  return (
    <div
      className="flex flex-col overflow-hidden bg-[#1e22aa] md:flex-row md:items-stretch"
      key={id}
    >
      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
        <h3 className="mb-4 text-xl font-medium text-white md:text-2xl">
          <Text field={fields.Title} />
        </h3>
        <JssLink
          field={fields.Link}
          className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white/80"
        >
          <Text field={fields.LinkText} />
          <ArrowRight className="h-4 w-4" />
        </JssLink>
      </div>

      {/* Image */}
      <div className="h-48 w-full md:h-auto md:w-2/5">
        <JssImage field={fields.Image} className="h-full w-full object-cover" />
      </div>
    </div>
  );
};
