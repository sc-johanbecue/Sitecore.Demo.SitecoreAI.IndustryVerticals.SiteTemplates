'use client';

import React, { JSX } from 'react';
import {
  TextField,
  RichTextField,
  Text,
  RichText,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';

type Fields = {
  Title: TextField;
  Body: RichTextField;
};

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

const DEFAULT_FIELDS: Fields = {
  Title: { value: 'Cleaner air for all' },
  Body: {
    value: `<p>Today, our emission control technologies are used in hundreds of millions of cars, buses and trucks around the world. Our catalysts and filters prevent millions of tonnes of harmful pollutants, like nitrogen oxides and particulates produced by gasoline and diesel engines, from entering the air. The end result is fewer harmful emissions from transport so everyone across the globe can breathe cleaner air.</p>
<p>While road transportation progressively shifts towards electric powertrains, internal combustion vehicles will remain a reality for years to come, including for economies that cannot yet afford high-cost low carbon solutions and infrastructure.</p>
<p>Significant action is still needed to reduce harmful emissions in the atmosphere, which kill millions of people every year. JM is smartly investing and innovating with a strong capital discipline to ensure our autocatalysts continue to meet evolving legislation and customer needs. Our emission control technologies are also effective in many other applications, such as generators for data centres, shipping, and power generation.</p>`,
  },
};

export const Default = (props: ComponentProps): JSX.Element => {
  const fields = props.fields || DEFAULT_FIELDS;
  const id = props.rendering?.uid;

  return (
    <section className="bg-white py-12 md:py-16" key={id}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl">
          <h2 className="mb-6 text-2xl font-light text-[#1e22aa] md:mb-8 md:text-3xl lg:text-4xl">
            <Text field={fields.Title} />
          </h2>
          <RichText
            field={fields.Body}
            className="prose prose-lg max-w-none text-gray-700 [&>li]:mb-2 [&>p]:mb-4 [&>p:last-child]:mb-0 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-6"
          />
        </div>
      </div>
    </section>
  );
};
