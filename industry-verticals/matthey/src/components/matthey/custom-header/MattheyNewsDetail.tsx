import React, { JSX } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import {
  TextField,
  ImageField,
  LinkField,
  RichTextField,
  Text,
  Image as JssImage,
  RichText,
  Link as JssLink,
  ComponentParams,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';

type Fields = {
  // Shared with NewsCard
  Label: TextField;
  Title: TextField;
  PublicationDate: TextField;
  // Additional fields for detail page
  Image: ImageField;
  Body: RichTextField;
  DownloadButtonText: TextField;
  DownloadLink: LinkField;
  ContactTitle: TextField;
  ContactEmail: TextField;
  ContactPhone: TextField;
  LinkedInUrl: LinkField;
  XUrl: LinkField;
};

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

const DEFAULT_FIELDS: Fields = {
  Label: { value: 'News' },
  Title: {
    value:
      'Johnson Matthey officially opens first hydrogen internal combustion engine facility in Gothenburg',
  },
  PublicationDate: { value: '2025-12-11T00:00:00Z' },
  Image: {
    value: {
      src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
      alt: 'Facility opening ceremony',
      width: 1200,
      height: 600,
    },
  },
  Body: {
    value: `
      <p>Johnson Matthey (JM) has officially opened its first hydrogen internal combustion engine (H₂ICE) facility, where cutting-edge emission control systems will be tested.</p>
      <p>A global leader in sustainable technologies, JM has developed the new centre of excellence to strengthen its world-class heavy-duty vehicle testing capabilities.</p>
      <p>H₂ICE uses zero carbon hydrogen fuel in tried-and-tested engine technology, presenting a viable path for decarbonising medium and heavy-duty transport, such as trucks and buses.</p>
      <p><strong>Tauseef Salma, JM Chief Technology Officer in Clean Air, said:</strong> "This investment shows JM is backing H₂ICE as a ready-to-go technology that will enable mobility partners to meet their decarbonisation and climate goals."</p>
      <p>The new Gothenburg H₂ICE facility includes:</p>
      <ul>
        <li>An on-site hydrogen supply & storage area with compressor and intermediate storage tank</li>
        <li>Hydrogen supply and storage up to 413 bar</li>
        <li>Hydrogen flow meter and analyser, plus exhaust measuring instruments</li>
        <li>All appropriate control, sensing and safety systems</li>
      </ul>
    `,
  },
  DownloadButtonText: { value: 'DOWNLOAD FULL RELEASE' },
  DownloadLink: { value: { href: '/downloads/press-release.pdf' } },
  ContactTitle: { value: 'For media enquiries' },
  ContactEmail: { value: 'jmpr@matthey.com' },
  ContactPhone: { value: '+44 207 269 8001' },
  LinkedInUrl: { value: { href: 'https://www.linkedin.com/company/johnson-matthey' } },
  XUrl: { value: { href: 'https://x.com/JohnsonMatthey' } },
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export const Default = (props: ComponentProps): JSX.Element => {
  const fields = props.fields || DEFAULT_FIELDS;
  const id = props.rendering?.uid;
  const publicationDate = fields.PublicationDate?.value
    ? formatDate(fields.PublicationDate.value as string)
    : '';

  return (
    <article className="bg-white" key={id}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Title */}
        <h1 className="mb-4 max-w-4xl text-2xl leading-tight font-light text-[#1e22aa] md:text-3xl lg:text-4xl">
          <Text field={fields.Title} />
        </h1>

        {/* Date */}
        <p className="mb-6 text-sm text-gray-600">{publicationDate}</p>

        {/* Download Button - Desktop/Tablet */}
        <div className="mb-8 hidden md:block">
          <JssLink
            field={fields.DownloadLink}
            className="inline-flex items-center gap-2 bg-[#1e22aa] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e22aa]/90"
          >
            <Text field={fields.DownloadButtonText} />
            <ArrowRight className="h-4 w-4" />
          </JssLink>
        </div>

        {/* Download Icon - Mobile */}
        <div className="mb-6 md:hidden">
          <JssLink
            field={fields.DownloadLink}
            className="inline-flex h-10 w-10 items-center justify-center bg-[#1e22aa] text-white transition-colors hover:bg-[#1e22aa]/90"
            aria-label="Download full release"
          >
            <Download className="h-5 w-5" />
          </JssLink>
        </div>

        {/* Hero Image */}
        <div className="mb-8 max-w-4xl">
          <JssImage field={fields.Image} className="h-auto w-full object-cover" />
        </div>

        {/* Body Content */}
        <div className="prose prose-lg prose-blue max-w-4xl">
          <RichText
            field={fields.Body}
            className="leading-relaxed text-gray-700 [&_a]:text-[#1e22aa] [&_a]:underline [&_strong]:text-[#1e22aa] [&>p]:mb-4 [&>ul]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2"
          />
        </div>

        {/* Contact Section */}
        <div className="mt-8 max-w-4xl border-t border-gray-200 pt-8">
          <p className="mb-2 text-[#1e22aa] underline">
            <Text field={fields.ContactTitle} />
          </p>
          <p className="mb-1 text-gray-700">
            Email:{' '}
            <a href={`mailto:${fields.ContactEmail?.value}`} className="text-[#1e22aa] underline">
              {fields.ContactEmail?.value as string}
            </a>
          </p>
          <p className="text-gray-700">Telephone: {fields.ContactPhone?.value as string}</p>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex max-w-4xl items-center gap-4">
          {/* Download Button - Desktop/Tablet */}
          <div className="hidden md:block">
            <JssLink
              field={fields.DownloadLink}
              className="inline-flex items-center gap-2 bg-[#1e22aa] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e22aa]/90"
            >
              <Text field={fields.DownloadButtonText} />
              <ArrowRight className="h-4 w-4" />
            </JssLink>
          </div>

          {/* Download Icon - Mobile */}
          <div className="md:hidden">
            <JssLink
              field={fields.DownloadLink}
              className="inline-flex h-10 w-10 items-center justify-center bg-[#1e22aa] text-white transition-colors hover:bg-[#1e22aa]/90"
              aria-label="Download full release"
            >
              <Download className="h-5 w-5" />
            </JssLink>
          </div>

          {/* Social Icons */}
          <JssLink
            field={fields.LinkedInUrl}
            className="inline-flex h-10 w-10 items-center justify-center bg-[#1e22aa] text-white transition-colors hover:bg-[#1e22aa]/90"
            aria-label="Share on LinkedIn"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </JssLink>
          <JssLink
            field={fields.XUrl}
            className="inline-flex h-10 w-10 items-center justify-center bg-black text-white transition-colors hover:bg-black/90"
            aria-label="Share on X"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </JssLink>
        </div>
      </div>
    </article>
  );
};

export default Default;
