'use client';

import React, { type JSX, useState } from 'react';
import {
  TextField,
  Text,
  LinkField,
  Link as SitecoreLink,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * MalvernTabbedExplorerSection
 * Underlined tabs + product card grid + footer CTA (adp TabsSection-inspired, simplified tab strip).
 */

interface Fields {
  Title: TextField;
  Tab1Label: TextField;
  Tab2Label: TextField;
  Tab3Label: TextField;
  ViewAllText: TextField;
  ViewAllLink: LinkField;
}

const defaultFields: Fields = {
  Title: { value: 'Browse our range of instrument technologies' },
  Tab1Label: { value: 'Technology' },
  Tab2Label: { value: 'Analysis' },
  Tab3Label: { value: 'Product family' },
  ViewAllText: { value: 'View all products' },
  ViewAllLink: { value: { href: '/products' } },
};

export type MalvernTabbedExplorerSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernTabbedExplorerSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;
  const [activeTab, setActiveTab] = useState(0);

  const phCards = `malvern-tab-explorer-cards-${DynamicPlaceholderId}`;

  const tabs = [
    { label: fields.Tab1Label },
    { label: fields.Tab2Label },
    { label: fields.Tab3Label },
  ];

  return (
    <section
      className={`component malvern-tabbed-explorer-section bg-white py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <Text
          tag="h2"
          field={fields.Title}
          className="mb-8 text-2xl font-bold text-[#0a1f24] lg:mb-10 lg:text-3xl"
        />

        <div
          className="mb-8 flex gap-6 overflow-x-auto border-b border-gray-200 lg:gap-10"
          role="tablist"
          aria-label="Product explorer"
        >
          {tabs.map((tab, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={activeTab === i}
              onClick={() => setActiveTab(i)}
              className={`shrink-0 border-b-2 pb-3 text-sm font-semibold transition-colors lg:text-base ${
                activeTab === i
                  ? 'border-[#00A651] text-[#00A651]'
                  : 'border-transparent text-[#4a5a5f] hover:text-[#00333d]'
              }`}
            >
              <Text tag="span" field={tab.label} className="inline" />
            </button>
          ))}
        </div>

        <div className="malvern-tab-explorer-grid mb-10 flex flex-wrap gap-5 lg:mb-12 lg:gap-6">
          <Placeholder name={phCards} rendering={props.rendering} />
        </div>

        <div className="flex justify-end">
          <SitecoreLink
            field={fields.ViewAllLink}
            className="inline-flex items-center justify-center rounded-md bg-[#00A651] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#008f45]"
          >
            <Text tag="span" field={fields.ViewAllText} className="inline" />
          </SitecoreLink>
        </div>
      </div>

      <style jsx>{`
        .malvern-tab-explorer-grid :global(> .malvern-tab-explorer-card) {
          width: 100%;
        }
        @media (min-width: 640px) {
          .malvern-tab-explorer-grid :global(> .malvern-tab-explorer-card) {
            width: calc(50% - 0.625rem);
          }
        }
        @media (min-width: 1024px) {
          .malvern-tab-explorer-grid :global(> .malvern-tab-explorer-card) {
            width: calc(25% - 1.125rem);
          }
        }
      `}</style>
    </section>
  );
};
