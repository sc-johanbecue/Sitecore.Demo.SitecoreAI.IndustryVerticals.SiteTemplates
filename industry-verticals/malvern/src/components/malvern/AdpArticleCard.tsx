'use client';

import type { JSX } from 'react';
import {
  TextField,
  Text,
  ImageField,
  Image as SitecoreImage,
  LinkField,
  Link as SitecoreLink,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { ArrowRight } from 'lucide-react';

/**
 * ArticleCard Component
 * Individual article/insight card used inside ArticlesCarouselSection
 *
 * Layout:
 * - Article image at top
 * - Category/tag label (e.g., "GUIDEBOOK", "STORY", "REPORT")
 * - Article title
 * - CTA link with arrow (e.g., "Download now", "Access the study", "Download report")
 * - White card with subtle border
 */

interface Fields {
  Image: ImageField;
  Tag: TextField;
  Title: TextField;
  CTAText: TextField;
  CTALink: LinkField;
}

const defaultFields: Fields = {
  Image: { value: { src: '/articles/payroll-guide.jpg', alt: 'Payroll Guide' } },
  Tag: { value: 'GUIDEBOOK' },
  Title: { value: "What's the potential of your payroll organisation in 2026?" },
  CTAText: { value: 'Download now' },
  CTALink: { value: { href: '/articles/payroll-potential' } },
};

export type ArticleCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: ArticleCardProps): JSX.Element | null => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  const hasContent = fields.Title?.value;
  if (!hasContent) return null;

  return (
    <div
      className={`component article-card w-full shrink-0 px-2 md:w-1/2 lg:w-1/3 ${styles || ''}`}
      id={id}
    >
      <div className="bg-malvern-teal-dark flex h-full flex-col overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
        <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
          <SitecoreImage field={fields.Image} className="h-full w-full object-cover" />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#003349]/90 via-transparent to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-5 py-6 text-white lg:px-6 lg:py-8">
          {fields.Tag?.value && (
            <p className="mb-3 text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">
              <Text field={fields.Tag} />
            </p>
          )}

          <h3 className="mb-auto text-lg leading-snug font-bold text-white lg:text-xl">
            <Text field={fields.Title} />
          </h3>

          <div className="mt-6 border-t border-white/15 pt-5">
            {fields.CTALink?.value?.href && (
              <SitecoreLink
                field={fields.CTALink}
                className="bg-malvern-green hover:bg-malvern-green-hover inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-semibold text-white transition-colors lg:w-auto lg:px-6"
              >
                <Text field={fields.CTAText} />
                <ArrowRight className="h-4 w-4 shrink-0" />
              </SitecoreLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
