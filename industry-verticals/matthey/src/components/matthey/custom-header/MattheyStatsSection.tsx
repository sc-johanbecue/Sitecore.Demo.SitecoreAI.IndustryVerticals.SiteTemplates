'use client';

import React, { JSX } from 'react';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

export type StatsSectionComponentProps = ComponentProps & {
  params: { [key: string]: string };
};

export const Default = (props: StatsSectionComponentProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <section className={`w-full bg-[#1e22aa] ${styles || ''}`} key={id}>
      <div className="container mx-auto">
        <div className="flex flex-col divide-y divide-white/30 md:grid md:grid-cols-2 md:divide-x md:divide-y-0">
          <Placeholder
            name={`matthey-stats-section-${DynamicPlaceholderId}`}
            rendering={props.rendering}
          />
        </div>
      </div>
    </section>
  );
};
