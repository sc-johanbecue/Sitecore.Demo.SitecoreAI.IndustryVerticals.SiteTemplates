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

/**
 * MalvernProductCategoryCard
 * Full-width `object-cover` image fills the card; title, eyebrow, and description sit in a
 * bottom layer (z-index) over the image, with a gradient for contrast.
 * Entire card is one link when not in Experience Editor.
 */

interface Fields {
  Image: ImageField;
  Title: TextField;
  Eyebrow: TextField;
  Description: RichTextField;
  Link: LinkField;
}

const defaultFields: Fields = {
  Image: { value: { src: '/images/malvern-category-mastersizer.jpg', alt: 'Mastersizer 3000+' } },
  Title: { value: 'Mastersizer 3000+' },
  Eyebrow: { value: 'Particle size analyzers' },
  Description: { value: "<p>World's most popular particle size analyzers</p>" },
  Link: { value: { href: '/products/mastersizer' } },
};

export type MalvernProductCategoryCardProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernProductCategoryCardProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;
  const { page } = useSitecore();
  const isEditor = page.mode.isEditing || page.mode.isPreview;
  const isCardClickable = Boolean(fields.Link?.value?.href) && !isEditor;

  const titleStr = String(fields.Title?.value ?? 'Category');
  const cardAriaLabel = titleStr;

  const cardInner = (
    <div className="malvern-product-category-surface relative h-full min-h-96 w-full min-w-0 overflow-hidden rounded-xl sm:min-h-[28rem]">
      <SitecoreImage
        field={fields.Image}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/0"
        aria-hidden
      />
      {/* Pin copy to the bottom so title / eyebrow / description sit in the dark band, not mid-card */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex w-full min-w-0 flex-col gap-0 px-5 pt-0 pb-4 text-left sm:px-6 sm:pb-5">
        <Text
          tag="h3"
          field={fields.Title}
          className="mb-3 text-2xl leading-tight font-bold text-white sm:mb-4 sm:text-[1.65rem]"
        />
        <Text
          tag="span"
          field={fields.Eyebrow}
          className="mb-3 inline-flex w-fit max-w-full shrink-0 items-center rounded-full border border-white bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-[2px] transition-colors duration-200 group-hover:border-white group-hover:bg-white group-hover:text-black"
        />

        <div
          className={`malvern-product-category-desc line-clamp-4 w-full min-w-0 text-sm leading-relaxed text-white/95 sm:text-base${
            isCardClickable ? 'malvern-product-category-desc--in-card-link' : ''
          }`}
        >
          <RichText field={fields.Description} />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`malvern-product-category-card component flex h-full max-w-full min-w-0 flex-col self-stretch ${styles || ''}`}
      id={id}
    >
      {isCardClickable ? (
        <SitecoreLink
          field={fields.Link}
          className="group block h-full min-h-0 w-full overflow-hidden rounded-xl no-underline shadow-md outline-offset-2 transition duration-200 ease-out hover:shadow-xl hover:brightness-105 focus-visible:outline-2 focus-visible:outline-white"
          aria-label={cardAriaLabel}
        >
          {cardInner}
        </SitecoreLink>
      ) : (
        <div className="group h-full min-h-96 w-full overflow-hidden rounded-xl shadow-md transition duration-200 sm:min-h-[28rem]">
          {cardInner}
        </div>
      )}
      <style jsx>{`
        .malvern-product-category-desc :global(p) {
          margin: 0;
        }
        .malvern-product-category-desc :global(a) {
          color: #7ec8e3;
        }
        .malvern-product-category-desc--in-card-link :global(a) {
          pointer-events: none;
          cursor: inherit;
        }
      `}</style>
    </div>
  );
};
