'use client';

import React, { JSX } from 'react';
import {
  TextField,
  LinkField,
  Text,
  Link as JssLink,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';
import { ArrowRight } from 'lucide-react';

type Fields = {
  Label: TextField;
  Title: TextField;
  LinkText: TextField;
  Link: LinkField;
};

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

const DEFAULT_FIELDS: Fields = {
  Label: { value: 'Strategy' },
  Title: { value: 'Read more about our strategy' },
  LinkText: { value: 'Find out more' },
  Link: { value: { href: '/about-us/strategy' } },
};

export const Default = (props: ComponentProps): JSX.Element => {
  const fields = props.fields || DEFAULT_FIELDS;
  const id = props.rendering?.uid;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white" key={id}>
      <div className="flex-grow p-6">
        {fields.Label?.value && (
          <p className="mb-2 text-xs text-gray-500">
            <Text field={fields.Label} />
          </p>
        )}
        <h3 className="mb-4 text-base font-medium text-gray-900 md:text-lg">
          <Text field={fields.Title} />
        </h3>
        <JssLink
          field={fields.Link}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#1e22aa] transition-colors hover:text-[#1e22aa]/80"
        >
          <Text field={fields.LinkText} />
          <ArrowRight className="h-4 w-4" />
        </JssLink>
      </div>
      <div className="mt-auto h-3 bg-[#1e22aa]" />
    </div>
  );
};
