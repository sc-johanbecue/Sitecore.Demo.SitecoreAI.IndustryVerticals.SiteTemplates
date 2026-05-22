'use client';

import React, { type JSX } from 'react';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * MalvernDualFeatureSection
 * Two side-by-side dark feature tiles (placeholder for MalvernPromoFeatureCard), stacked on mobile.
 */

export type MalvernDualFeatureSectionProps = ComponentProps;

export const Default = (props: MalvernDualFeatureSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;

  const ph = `malvern-dual-features-${DynamicPlaceholderId}`;

  return (
    <section
      className={`component malvern-dual-feature-section bg-white py-10 lg:py-14 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="malvern-dual-feature-grid flex flex-col gap-5 lg:flex-row lg:gap-6">
          <Placeholder name={ph} rendering={props.rendering} />
        </div>
      </div>

      <style jsx>{`
        .malvern-dual-feature-grid :global(> .malvern-promo-feature-card) {
          width: 100%;
        }
        @media (min-width: 1024px) {
          .malvern-dual-feature-grid :global(> .malvern-promo-feature-card) {
            width: calc(50% - 0.75rem);
          }
        }
      `}</style>
    </section>
  );
};
