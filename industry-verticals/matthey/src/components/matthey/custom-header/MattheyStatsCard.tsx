'use client';

import React, { JSX } from 'react';
import { TextField, Text, ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';

type Fields = {
  StatValue: TextField;
  Description: TextField;
};

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

const DEFAULT_FIELDS: Fields = {
  StatValue: { value: 'c. 112k' },
  Description: {
    value:
      "additional tonnes of NOx removed from tailpipes by JM's catalytic converters in 2024/25",
  },
};

export const Default = (props: ComponentProps): JSX.Element => {
  const fields = props.fields || DEFAULT_FIELDS;
  const id = props.rendering?.uid;

  return (
    <div className="p-6 md:p-8" key={id}>
      <p className="mb-2 text-2xl font-bold text-white md:text-3xl">
        <Text field={fields.StatValue} />
      </p>
      <p className="text-sm leading-relaxed text-white/90 md:text-base">
        <Text field={fields.Description} />
      </p>
    </div>
  );
};
