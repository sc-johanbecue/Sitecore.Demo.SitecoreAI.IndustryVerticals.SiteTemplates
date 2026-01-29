import React, { JSX } from 'react';
import {
  TextField,
  ImageField,
  Text,
  Image as JssImage,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';

type Fields = {
  BackgroundImage: ImageField;
  Title: TextField;
};

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

const DEFAULT_FIELDS: Fields = {
  BackgroundImage: {
    value: {
      src: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80',
      alt: 'Automotive highway',
      width: 1920,
      height: 400,
    },
  },
  Title: { value: 'Automotive' },
};

export const Default = (props: ComponentProps): JSX.Element => {
  const fields = props.fields || DEFAULT_FIELDS;
  const id = props.rendering?.uid;

  return (
    <section className="relative w-full" key={id}>
      <div className="relative h-50 w-full md:h-62.5 lg:h-75">
        <JssImage
          field={fields.BackgroundImage}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-black/30" />

        <div className="relative container mx-auto flex h-full flex-col justify-end px-4 pb-8 md:pb-12">
          <h1 className="text-3xl font-light text-white md:text-4xl lg:text-5xl">
            <Text field={fields.Title} />
          </h1>
        </div>
      </div>
    </section>
  );
};
