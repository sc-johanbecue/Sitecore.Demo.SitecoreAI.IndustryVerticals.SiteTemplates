'use client';

import React, { JSX } from 'react';
import { ImageField, Image as JssImage, Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';

type Fields = {
  Image: ImageField;
};

export type MattheyNewsSectionWithImageProps = ComponentProps & {
  params: { [key: string]: string };
  rendering: ComponentRendering & { params: ComponentParams };
  fields?: Fields;
};

const DEFAULT_FIELDS: Fields = {
  Image: {
    value: {
      src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
      alt: 'Johnson Matthey',
      width: 800,
      height: 500,
    },
  },
};

export const Default = (props: MattheyNewsSectionWithImageProps): JSX.Element => {
  const { styles, RenderingIdentifier: id } = props.params;
  const fields = props.fields || DEFAULT_FIELDS;
  const hasImage = fields?.Image?.value?.src;

  return (
    <section
      className={`bg-[#1e22aa] ${styles ?? ''}`}
      key={id}
      data-testid="matthey-news-section-with-image"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Image block - Matthey housestyle blue border */}
          {hasImage && (
            <div className="relative shrink-0 border-b border-white/30 lg:w-96 lg:border-r lg:border-b-0 lg:border-white/30">
              <div className="relative aspect-4/3 w-full lg:aspect-auto lg:h-full lg:min-h-[280px]">
                <JssImage field={fields.Image} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-[#1e22aa]/20 mix-blend-multiply" />
              </div>
            </div>
          )}

          {/* News grid */}
          <div className="flex flex-1 flex-col divide-y divide-white/30 md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
            <Placeholder
              name={`matthey-news-section-${props.params.DynamicPlaceholderId}`}
              rendering={props.rendering}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Default;
