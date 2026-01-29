'use client';

import React, { JSX } from 'react';
import {
  ImageField,
  RichTextField,
  RichText,
  Image as JssImage,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';

type Fields = {
  Body: RichTextField;
  Image: ImageField;
};

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

const DEFAULT_FIELDS: Fields = {
  Body: {
    value: `<p>Our global transport system is going through its biggest transition in decades. Air pollution kills millions of people every year and the majority of the world's population are continually exposed to poor air quality.</p>
<p>With increasing urbanisation, tightening air quality regulations are pushing the automotive industry to build cleaner engines and use more sustainable fuels, to reduce harmful emissions from transport.</p>
<p>That's where JM comes in.</p>`,
  },
  Image: {
    value: {
      src: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80',
      alt: 'Electric vehicle charging',
      width: 600,
      height: 400,
    },
  },
};

export const Default = (props: ComponentProps): JSX.Element => {
  const fields = props.fields || DEFAULT_FIELDS;
  const id = props.rendering?.uid;

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20" key={id}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <RichText
              field={fields.Body}
              className="prose prose-lg max-w-none text-gray-700 [&>p]:mb-4 [&>p:last-child]:mb-0"
            />
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2">
            <JssImage field={fields.Image} className="h-auto w-full rounded-sm" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Inversed = (props: ComponentProps): JSX.Element => {
  const fields = props.fields || DEFAULT_FIELDS;
  const id = props.rendering?.uid;

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20" key={id}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-start gap-8 lg:flex-row-reverse lg:gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <RichText
              field={fields.Body}
              className="prose prose-lg max-w-none text-gray-700 [&>p]:mb-4 [&>p:last-child]:mb-0"
            />
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2">
            <JssImage field={fields.Image} className="h-auto w-full rounded-sm" />
          </div>
        </div>
      </div>
    </section>
  );
};
