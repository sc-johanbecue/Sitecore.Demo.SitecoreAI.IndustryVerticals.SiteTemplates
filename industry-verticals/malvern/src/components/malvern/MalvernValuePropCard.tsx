'use client';

import type { JSX } from 'react';
import {
  TextField,
  RichTextField,
  Text,
  RichText,
  ImageField,
  Image as SitecoreImage,
  LinkField,
  Link as SitecoreLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { ChevronRight } from 'lucide-react';

/**
 * MalvernValuePropCard
 * White card with icon, title, copy, chevron link (adp BenefitCard-style).
 */

interface Fields {
  Icon: ImageField;
  Title: TextField;
  Description: RichTextField;
  LinkText: TextField;
  Link: LinkField;
}

const defaultFields: Fields = {
  Icon: { value: { src: '/icons/malvern-lab.svg', alt: '' } },
  Title: { value: 'Application support' },
  Description: {
    value:
      '<p>Method development and validation from scientists who use the same techniques you do.</p>',
  },
  LinkText: { value: 'Learn more' },
  Link: { value: { href: '/services/support' } },
};

export type MalvernValuePropCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernValuePropCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  return (
    <div
      className={`malvern-value-prop-card component flex w-full flex-col rounded-lg border border-gray-200/80 bg-white p-6 shadow-sm lg:p-8 ${styles || ''}`}
      id={id}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-[#e8f4f8]">
        <SitecoreImage field={fields.Icon} className="h-7 w-7 object-contain" />
      </div>
      <Text tag="h3" field={fields.Title} className="mb-2 text-lg font-bold text-[#0a1f24]" />
      <div className="malvern-value-prop-desc mb-4 grow text-sm leading-relaxed text-[#4a5a5f]">
        <RichText field={fields.Description} />
      </div>
      <SitecoreLink
        field={fields.Link}
        className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[#00333d] hover:text-[#00A651]"
      >
        <Text tag="span" field={fields.LinkText} className="inline" />
        <ChevronRight className="h-4 w-4" />
      </SitecoreLink>
      <style jsx>{`
        .malvern-value-prop-desc :global(a) {
          color: #00a651;
        }
      `}</style>
    </div>
  );
};
