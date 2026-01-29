'use client';

import React, { JSX } from 'react';
import {
  TextField,
  Text,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';

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
      <p className="text-2xl md:text-3xl font-bold text-white mb-2">
        <Text field={fields.StatValue} />
      </p>
      <p className="text-sm md:text-base text-white/90 leading-relaxed">
        <Text field={fields.Description} />
      </p>
    </div>
  );
};
