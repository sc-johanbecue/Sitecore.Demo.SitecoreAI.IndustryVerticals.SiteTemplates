'use client';

import type { JSX } from 'react';
import { TextField, LinkField, Text, Link as SitecoreLink } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * CtaLinkCard Component
 * A reusable CTA link/button component that can be dropped into any
 * section's placeholder. Supports a "variant" rendering parameter to
 * switch between primary (filled) and secondary (outlined) styles.
 *
 * Features:
 * - Label text + link field
 * - Variant param: "primary" (red filled) or "secondary" (white outlined)
 * - Designed to be placed inside placeholder containers (e.g. in TestimonialCarouselSection)
 * - Wrapped with class "cta-link-card" for parent detection
 */

interface Fields {
  /** Button label text */
  Label: TextField;
  /** Button link/href */
  Link: LinkField;
}

const defaultFields: Fields = {
  Label: { value: 'Talk to an Expert' },
  Link: { value: { href: '/contact' } },
};

export type CtaLinkCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: CtaLinkCardProps): JSX.Element | null => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  // Variant is set via rendering parameters in Sitecore
  // "primary" = red filled, "secondary" = white outlined
  const variant = (props.params.Variant || 'primary') as 'primary' | 'secondary';

  if (!fields.Link?.value?.href) return null;

  const baseClasses =
    'inline-flex max-w-[280px] items-center justify-center rounded-md px-8 py-3.5 text-base font-semibold transition-colors';

  const variantClasses =
    variant === 'secondary'
      ? 'border-2 border-white text-white hover:bg-white hover:text-malvern-teal-dark'
      : 'bg-malvern-green text-white hover:bg-malvern-green-hover';

  return (
    <SitecoreLink
      field={fields.Link}
      className={`component cta-link-card inline-block ${styles || ''} ${baseClasses} ${variantClasses}`}
      id={id}
    >
      <Text field={fields.Label} />
    </SitecoreLink>
  );
};
