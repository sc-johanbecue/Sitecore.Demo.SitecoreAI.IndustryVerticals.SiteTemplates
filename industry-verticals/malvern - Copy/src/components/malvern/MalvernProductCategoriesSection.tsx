'use client';

import React, { type JSX } from 'react';
import { TextField, Text, Placeholder } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * MalvernProductCategoriesSection
 * "Explore our full range of products" grid (adp BusinessSizeSection pattern).
 */

interface Fields {
  Title: TextField;
}

const defaultFields: Fields = {
  Title: { value: 'Explore our full range of products' },
};

export type MalvernProductCategoriesSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernProductCategoriesSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;

  const phCards = `malvern-category-cards-${DynamicPlaceholderId}`;

  return (
    <section
      className={`component malvern-product-categories-section bg-white py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <Text
          tag="h2"
          field={fields.Title}
          className="mb-8 text-2xl font-bold text-[#0a1f24] lg:mb-10 lg:text-3xl"
        />

        {/*
         * display:contents unwraps Sitecore placeholder wrappers only.
         * Never apply contents to .malvern-product-category-card — it removes the card box and
         * stacks inner nodes as separate flex items (everything looks like one column).
         */}
        <div className="malvern-category-grid flex flex-wrap justify-center gap-5 md:gap-6">
          <Placeholder name={phCards} rendering={props.rendering} />
        </div>
      </div>

      <style jsx>{`
        .malvern-category-grid > :global(*):not(:global(.malvern-product-category-card)) {
          display: contents;
        }
        .malvern-category-grid :global(.malvern-product-category-card) {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 0 0 100%;
          width: 100%;
          max-width: 100%;
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .malvern-category-grid :global(.malvern-product-category-card) {
            flex: 0 0 calc((100% - 1.5rem) / 2);
            width: calc((100% - 1.5rem) / 2);
            max-width: calc((100% - 1.5rem) / 2);
          }
        }
        @media (min-width: 1024px) {
          .malvern-category-grid :global(.malvern-product-category-card) {
            flex: 0 0 calc((100% - 3rem) / 3);
            width: calc((100% - 3rem) / 3);
            max-width: calc((100% - 3rem) / 3);
          }
        }
      `}</style>
    </section>
  );
};
