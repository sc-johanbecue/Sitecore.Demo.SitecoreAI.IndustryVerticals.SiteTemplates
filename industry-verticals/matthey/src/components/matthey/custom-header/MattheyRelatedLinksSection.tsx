'use client';

import React, { JSX } from 'react';
import { TextField, Text, Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

type Fields = {
  Title: TextField;
};

export type RelatedLinksSectionComponentProps = ComponentProps & {
  params: { [key: string]: string };
  fields: Fields;
};

const DEFAULT_FIELDS: Fields = {
  Title: { value: 'Read more' },
};

export const Default = (props: RelatedLinksSectionComponentProps): JSX.Element => {
  const fields = props.fields || DEFAULT_FIELDS;
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <section className={`bg-white py-12 md:py-16 ${styles || ''}`} key={id}>
      <div className="container mx-auto px-4">
        {fields.Title?.value && (
          <h2 className="mb-6 text-2xl font-light text-[#1e22aa] md:mb-8 md:text-3xl">
            <Text field={fields.Title} />
          </h2>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <Placeholder
            name={`matthey-related-links-${DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        </div>
      </div>
    </section>
  );
};
