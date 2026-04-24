'use client';

import type { JSX } from 'react';
import { TextField, RichTextField, Text, RichText } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * BenefitCard Component
 * Droppable card for the TabCard placeholder.
 *
 * Renders a single benefit item with a bold title and a description paragraph.
 * Multiple BenefitCards can be dropped into a TabCard's placeholder to build
 * the list of benefits shown under each tab.
 *
 * Uses `.benefit-card` CSS class for parent discovery.
 */

interface Fields {
  /** Benefit title (bold heading) */
  Title: TextField;
  /** Benefit description (rich text paragraph) */
  Description: RichTextField;
}

const defaultFields: Fields = {
  Title: { value: 'Lagere kosten' },
  Description: {
    value:
      '<p>Vertrouw op HCM-software die is gebaseerd op payroll-gegevens om het beheer eenvoudiger te houden en de kosten te drukken.</p>',
  },
};

export type BenefitCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: BenefitCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  return (
    <div className={`benefit-card ${styles || ''}`} id={id}>
      {fields.Title?.value && (
        <h3 className="text-malvern-teal-dark mb-2 text-xl font-bold md:text-2xl">
          <Text field={fields.Title} />
        </h3>
      )}
      {fields.Description?.value && (
        <div className="tab-benefit-desc text-sm leading-relaxed text-[#555] md:text-base">
          <RichText field={fields.Description} />
        </div>
      )}
      <style jsx>{`
        .tab-benefit-desc :global(a) {
          color: #0066b3;
          text-decoration: none;
          font-weight: 600;
        }
        .tab-benefit-desc :global(a:hover) {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
