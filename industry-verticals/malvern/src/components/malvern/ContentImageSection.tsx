'use client';

import React, { JSX } from 'react';
import {
  TextField,
  Text,
  ImageField,
  Image as SitecoreImage,
  RichTextField,
  RichText,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-content-sdk/nextjs';

/**
 * ContentImageSection Component
 * Two-column layout with rich text content on the left and image on the right (desktop)
 * Stacked layout on mobile with image below content
 */

interface Fields {
  Heading: TextField;
  Content: RichTextField;
  Image: ImageField;
}

const defaultFields: Fields = {
  Heading: { value: 'Precision measurement, trusted worldwide' },
  Content: {
    value: `<p>From particle size to molecular structure, our analytical solutions help you turn data into decisions. Our experts support you with <strong>implementation</strong>, <strong>training</strong>, and <span style="color: #0066b3;">application guidance</span> tailored to your workflow.</p>
    <p>Whether you work in pharmaceuticals, materials, or academia, we combine robust instrumentation with software and services designed to <strong>integrate</strong> seamlessly into your laboratory environment.</p>`,
  },
  Image: {
    value: {
      src: '/images/image.png',
      alt: 'Woman using tablet in office',
    },
  },
};

export type ContentImageSectionProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields?: Fields;
};

export const Default = (props: ContentImageSectionProps): JSX.Element => {
  const fields = props.fields || defaultFields;
  const id = props.params?.RenderingIdentifier;
  const styles = props.params?.Styles || '';

  return (
    <section
      className={`component content-image-section bg-malvern-sky py-12 lg:py-16 ${styles}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col justify-center gap-8 lg:flex-row lg:items-center lg:gap-12 lg:pl-55">
          {/* Content Column */}
          <div className="lg:w-1/2">
            <Text
              tag="h2"
              className="text-malvern-teal-dark mb-6 text-3xl leading-tight font-bold lg:text-4xl"
              field={fields.Heading}
            />
            <RichText
              field={fields.Content}
              className="contentimagesection-content prose prose-lg text-foreground max-w-none"
            />
          </div>

          {/* Image Column */}
          <div className="lg:w-1/2">
            <div className="overflow-hidden rounded-lg">
              <SitecoreImage field={fields.Image} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        <style jsx>{`
          .contentimagesection-content :global(strong) {
            color: #004c54;
          }
          .contentimagesection-content :global(a) {
            color: #0066b3;
            text-decoration: none;
          }
          .contentimagesection-content :global(a:hover) {
            text-decoration: underline;
          }
        `}</style>
      </div>
    </section>
  );
};

export const Reversed = (props: ContentImageSectionProps): JSX.Element => {
  const fields = props.fields || defaultFields;
  const id = props.params?.RenderingIdentifier;
  const styles = props.params?.Styles || '';

  return (
    <section
      className={`component image-content-section bg-white py-12 lg:py-16 ${styles}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col justify-center gap-8 lg:flex-row lg:items-center lg:gap-12 lg:pl-55">
          {/* Image Column - First on Desktop */}
          <div className="lg:w-1/2">
            <div className="overflow-hidden rounded-lg">
              <SitecoreImage field={fields.Image} className="h-full w-full object-cover" />
            </div>
          </div>

          {/* Content Column - Second on Desktop */}
          <div className="lg:w-1/2">
            <Text
              tag="h2"
              className="text-malvern-teal-dark mb-6 text-3xl leading-tight font-bold lg:text-4xl"
              field={fields.Heading}
            />
            <RichText
              field={fields.Content}
              className="imagecontentsection-content prose prose-lg text-foreground max-w-none"
            />
          </div>
        </div>

        <style jsx>{`
          .imagecontentsection-content :global(strong) {
            color: #004c54;
          }
          .imagecontentsection-content :global(a) {
            color: #0066b3;
            text-decoration: none;
          }
          .imagecontentsection-content :global(a:hover) {
            text-decoration: underline;
          }
        `}</style>
      </div>
    </section>
  );
};
