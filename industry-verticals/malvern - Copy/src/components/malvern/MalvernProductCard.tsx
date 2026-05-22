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
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { ChevronRight } from 'lucide-react';

/**
 * MalvernProductCard
 * Product tile: fixed total dimensions; image (fixed band) → title → eyebrow → description → CTA line.
 * When not in Experience Editor, the whole card navigates to Link (CTA is not a separate anchor).
 */

interface Fields {
  Image: ImageField;
  Title: TextField;
  Eyebrow: TextField;
  Description: RichTextField;
  LinkText: TextField;
  Link: LinkField;
}

const defaultFields: Fields = {
  Image: { value: { src: '/images/malvern-product-zetasizer.jpg', alt: 'Empyrean' } },
  Title: { value: 'Empyrean' },
  Eyebrow: { value: 'X-ray diffractometer' },
  Description: {
    value: '<p>Multipurpose X-ray diffractometers</p>',
  },
  LinkText: { value: 'View all models' },
  Link: { value: { href: '/products/zetasizer' } },
};

export type MalvernProductCardProps = ComponentProps & {
  fields: Fields;
};

/** Fixed image band + body heights so all cards are identical; total ≈ 28.5rem. */
const IMAGE_BAND_H = 'h-[168px] sm:h-[176px]';
const CARD_H = 'h-[456px] sm:h-[464px] lg:h-[472px]';

export const Default = (props: MalvernProductCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;
  const { page } = useSitecore();
  const isEditor = page.mode.isEditing || page.mode.isPreview;
  const isCardClickable = Boolean(fields.Link?.value?.href) && !isEditor;

  const titleStr = String(fields.Title?.value ?? '');
  const ctaStr = String(fields.LinkText?.value ?? '');
  const cardAriaLabel = [titleStr, ctaStr].filter(Boolean).join(' — ');

  const cardInner = (
    <div
      className={`flex min-h-0 w-full ${CARD_H} min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200/90 bg-white shadow-sm`}
    >
      <div
        className={`flex shrink-0 ${IMAGE_BAND_H} items-center justify-center bg-[#E9EEF0] px-4 py-5 sm:px-6 sm:py-6`}
      >
        <div className="max-h-full border border-black bg-white shadow-md">
          <SitecoreImage
            field={fields.Image}
            className="h-24 max-h-full w-auto max-w-[min(100%,200px)] object-contain sm:h-28"
          />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center p-4 text-center sm:p-5 lg:p-6">
        <Text
          tag="h3"
          field={fields.Title}
          className="line-clamp-2 min-h-14 w-full text-lg leading-snug font-bold text-[#0a1f24] sm:min-h-16 sm:text-xl"
        />
        <Text
          tag="span"
          field={fields.Eyebrow}
          className="mt-1 mb-2 inline-flex max-w-full shrink-0 items-center justify-center rounded-full bg-[#E2E6E9] px-3 py-1.5 text-xs font-medium text-[#5a6a6e] transition-colors duration-200 hover:bg-black hover:text-white"
        />
        <div
          className={`malvern-product-card-desc line-clamp-4 min-h-0 w-full max-w-full flex-1 text-sm leading-relaxed text-[#4a5a5f] sm:line-clamp-3${isCardClickable ? 'malvern-product-card-desc--in-card-link' : ''}`}
        >
          <RichText field={fields.Description} />
        </div>
        <span className="mt-auto inline-flex shrink-0 items-center justify-center gap-1 pt-2 text-sm font-semibold text-[#00333d] group-hover:text-[#00A651]">
          <Text tag="span" field={fields.LinkText} className="inline" />
          <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
        </span>
      </div>
    </div>
  );

  return (
    <div
      className={`malvern-product-card component flex h-full w-full shrink-0 self-stretch px-1.5 sm:px-2 md:w-1/2 lg:w-1/4 ${styles || ''}`}
      id={id}
    >
      {isCardClickable ? (
        <SitecoreLink
          field={fields.Link}
          className="group block h-full w-full rounded-xl no-underline outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#00A651]"
          aria-label={cardAriaLabel || titleStr}
        >
          {cardInner}
        </SitecoreLink>
      ) : (
        cardInner
      )}
      <style jsx>{`
        .malvern-product-card-desc :global(p) {
          margin: 0;
        }
        .malvern-product-card-desc :global(a) {
          color: #00a651;
        }
        .malvern-product-card-desc--in-card-link :global(a) {
          pointer-events: none;
          cursor: inherit;
        }
      `}</style>
    </div>
  );
};
