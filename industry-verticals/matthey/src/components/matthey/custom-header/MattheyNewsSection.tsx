'use client';

import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';

export type MattheyHeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

export const Default = (props: MattheyHeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <section className={`bg-[#1e22aa] ${styles}`} key={id}>
      <div className="container mx-auto">
        <div className="flex flex-col divide-y divide-white/30 md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
          <Placeholder
            name={`matthey-news-section-${DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        </div>
      </div>
    </section>
  );
};

export default Default;
