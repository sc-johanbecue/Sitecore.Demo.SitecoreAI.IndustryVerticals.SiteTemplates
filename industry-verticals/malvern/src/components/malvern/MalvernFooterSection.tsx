'use client';

import React, { type JSX } from 'react';
import {
  TextField,
  RichText,
  RichTextField,
  ImageField,
  Image as SitecoreImage,
  LinkField,
  Link as SitecoreLink,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * MalvernFooterSection
 * Dark teal footer with four link columns, logo row, social icons, legal bar (adp FooterSection structure).
 */

interface Fields {
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  TitleFour: TextField;
  Logo: ImageField;
  SpectrisLogo: ImageField;
  SubBrandText: TextField;
  FacebookLink: LinkField;
  TwitterLink: LinkField;
  YoutubeLink: LinkField;
  LinkedinLink: LinkField;
  InstagramLink: LinkField;
  LegalLink: LinkField;
  CookieLink: LinkField;
  CopyrightText: RichTextField;
}

const defaultFields: Fields = {
  TitleOne: { value: 'Applications' },
  TitleTwo: { value: 'Product families' },
  TitleThree: { value: 'Product types' },
  TitleFour: { value: 'Our services' },
  Logo: { value: { src: '/logos/malvern-logo-white.svg', alt: 'Malvern Panalytical' } },
  SpectrisLogo: { value: { src: '/logos/spectris-mark.svg', alt: 'Spectris' } },
  SubBrandText: { value: 'A Spectris company' },
  FacebookLink: { value: { href: 'https://www.facebook.com/malvernpanalytical' } },
  TwitterLink: { value: { href: 'https://twitter.com/malvernofficial' } },
  YoutubeLink: { value: { href: 'https://www.youtube.com/user/MalvernInstruments' } },
  LinkedinLink: { value: { href: 'https://www.linkedin.com/company/malvern-panalytical' } },
  InstagramLink: { value: { href: 'https://www.instagram.com/malvernpanalytical' } },
  LegalLink: { value: { href: '/legal', text: 'Legal' } },
  CookieLink: { value: { href: '/cookies', text: 'Cookie policy' } },
  CopyrightText: {
    value: '© 2026 Malvern Panalytical Limited. All rights reserved.',
  },
};

export type MalvernFooterSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernFooterSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;

  const phKeyOne = `malvern-footer-col-1-${DynamicPlaceholderId}`;
  const phKeyTwo = `malvern-footer-col-2-${DynamicPlaceholderId}`;
  const phKeyThree = `malvern-footer-col-3-${DynamicPlaceholderId}`;
  const phKeyFour = `malvern-footer-col-4-${DynamicPlaceholderId}`;

  const sectionDefs = [
    { key: 'col1' as const, ph: phKeyOne },
    { key: 'col2' as const, ph: phKeyTwo },
    { key: 'col3' as const, ph: phKeyThree },
    { key: 'col4' as const, ph: phKeyFour },
  ];

  const socialLinkClass = 'text-white/80 transition-colors hover:text-[#47bcd3]';

  return (
    <footer
      className={`component malvern-footer-section bg-[#00333d] text-white ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {sectionDefs.map(({ key, ph }) => (
            <div key={key} className="malvern-footer-column">
              <div className="flex flex-col gap-2 text-sm text-white/85 [&_a]:text-white/85 [&_a:hover]:text-[#47bcd3]">
                <Placeholder name={ph} rendering={props.rendering} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-8 border-t border-white/15 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-6">
            <SitecoreImage field={fields.Logo} className="h-9 w-auto" />
            <div className="flex items-center gap-5">
              <SitecoreLink
                field={fields.LinkedinLink}
                className={socialLinkClass}
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </SitecoreLink>
              <SitecoreLink
                field={fields.TwitterLink}
                className={socialLinkClass}
                aria-label="X / Twitter"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SitecoreLink>
              <SitecoreLink
                field={fields.YoutubeLink}
                className={socialLinkClass}
                aria-label="YouTube"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </SitecoreLink>
              <SitecoreLink
                field={fields.FacebookLink}
                className={socialLinkClass}
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </SitecoreLink>
              <SitecoreLink
                field={fields.InstagramLink}
                className={socialLinkClass}
                aria-label="Instagram"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </SitecoreLink>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-black/20 bg-[#00262e]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-xs text-white/75 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <SitecoreLink field={fields.LegalLink} className="hover:text-white hover:underline" />
            <span className="text-white/30">|</span>
            <SitecoreLink field={fields.CookieLink} className="hover:text-white hover:underline" />
          </div>
          <RichText field={fields.CopyrightText} className="max-w-prose sm:text-right" />
        </div>
      </div>
    </footer>
  );
};
