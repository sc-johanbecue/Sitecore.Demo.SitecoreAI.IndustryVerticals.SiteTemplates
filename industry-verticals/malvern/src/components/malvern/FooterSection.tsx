'use client';

import React, { type JSX } from 'react';
import {
  TextField,
  Text,
  ImageField,
  Image as SitecoreImage,
  LinkField,
  Link as SitecoreLink,
  Placeholder,
  ComponentRendering,
  ComponentParams,
} from '@sitecore-content-sdk/nextjs';

/**
 * FooterSection Component
 * Malvern-style dark teal footer: five link columns with titles, logo, region, social, and legal row.
 */

interface Fields {
  /** Column titles */
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  TitleFour: TextField;
  TitleFive: TextField;

  /** Bottom section */
  Logo: ImageField;
  CountryLabel: TextField;
  AllLocationsLink: LinkField;

  /** Social links */
  FacebookLink: LinkField;
  TwitterLink: LinkField;
  YoutubeLink: LinkField;
  LinkedinLink: LinkField;

  /** Legal links */
  SiteMapLink: LinkField;
  PrivacyLink: LinkField;
  SlaveryStatementLink: LinkField;
  GenderPayReportsLink: LinkField;
  AccessibilityLink: LinkField;

  /** Copyright */
  CopyrightText: TextField;
}

const defaultFields: Fields = {
  TitleOne: { value: 'Products' },
  TitleTwo: { value: 'Sector solutions' },
  TitleThree: { value: 'Services' },
  TitleFour: { value: 'Company info' },
  TitleFive: { value: 'Quick links' },

  Logo: { value: { src: '/logos/adp-red.svg', alt: 'ADP' } },
  CountryLabel: { value: 'United Kingdom' },
  AllLocationsLink: { value: { href: '/worldwide-locations', text: 'All Worldwide Locations' } },

  FacebookLink: { value: { href: 'https://facebook.com/adp' } },
  TwitterLink: { value: { href: 'https://twitter.com/adp' } },
  YoutubeLink: { value: { href: 'https://youtube.com/adp' } },
  LinkedinLink: { value: { href: 'https://linkedin.com/company/adp' } },

  SiteMapLink: { value: { href: '/sitemap', text: 'Site Map' } },
  PrivacyLink: { value: { href: '/privacy', text: 'Privacy' } },
  SlaveryStatementLink: {
    value: { href: '/modern-slavery-statement', text: 'Modern Slavery Statement' },
  },
  GenderPayReportsLink: {
    value: { href: '/gender-pay-reports', text: 'ADP UK Gender Pay Reports' },
  },
  AccessibilityLink: { value: { href: '/accessibility', text: 'Web Accessibility Statement' } },
  CopyrightText: {
    value: 'Copyright © 2026 Malvern Panalytical Ltd. All rights reserved.',
  },
};

export type FooterSectionProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FooterSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;

  // Placeholder keys for each footer column
  const phKeyOne = `footer-list-first-${DynamicPlaceholderId}`;
  const phKeyTwo = `footer-list-second-${DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${DynamicPlaceholderId}`;
  const phKeyFour = `footer-list-fourth-${DynamicPlaceholderId}`;
  const phKeyFive = `footer-list-fifth-${DynamicPlaceholderId}`;

  const sections = [
    {
      key: 'first_nav',
      title: <Text field={fields.TitleOne} />,
      content: <Placeholder name={phKeyOne} rendering={props.rendering} key={phKeyOne} />,
    },
    {
      key: 'second_nav',
      title: <Text field={fields.TitleTwo} />,
      content: <Placeholder name={phKeyTwo} rendering={props.rendering} key={phKeyTwo} />,
    },
    {
      key: 'third_nav',
      title: <Text field={fields.TitleThree} />,
      content: <Placeholder name={phKeyThree} rendering={props.rendering} key={phKeyThree} />,
    },
    {
      key: 'fourth_nav',
      title: <Text field={fields.TitleFour} />,
      content: <Placeholder name={phKeyFour} rendering={props.rendering} key={phKeyFour} />,
    },
    {
      key: 'fifth_nav',
      title: <Text field={fields.TitleFive} />,
      content: <Placeholder name={phKeyFive} rendering={props.rendering} key={phKeyFive} />,
    },
  ];

  const linkMuted = 'text-sm text-white/85 transition-colors hover:text-white';
  const linkLegal = 'text-sm text-white/80 hover:text-white hover:underline';

  return (
    <footer
      className={`component footer-section bg-malvern-teal-dark text-white ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {sections.map(({ key, title, content }) => (
            <div key={key} className="footer-column">
              <h3 className="mb-4 text-sm font-semibold tracking-wide text-white">{title}</h3>
              <div
                className={`flex flex-col gap-2 ${linkMuted} [&_a]:text-white/85 [&_a]:underline-offset-2 [&_a]:hover:text-white`}
              >
                {content}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/15 pt-10">
          <div className="hidden lg:flex lg:flex-col lg:gap-8">
            <div className="flex flex-wrap items-start justify-between gap-8">
              <SitecoreImage field={fields.Logo} className="h-9 w-auto brightness-0 invert" />

              <div className="flex flex-col gap-2">
                <div className="inline-flex w-fit items-center gap-2 rounded border border-white/25 bg-white/5 px-4 py-2 text-sm text-white">
                  <Text field={fields.CountryLabel} />
                  <svg
                    className="h-4 w-4 text-white/80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <SitecoreLink
                  field={fields.AllLocationsLink}
                  className="text-malvern-sky-deep text-sm hover:text-white"
                />
              </div>

              <div className="flex items-center gap-5">
                {fields.FacebookLink?.value?.href && (
                  <SitecoreLink
                    field={fields.FacebookLink}
                    className="text-white/85 transition-colors hover:text-white"
                    aria-label="Facebook"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </SitecoreLink>
                )}
                {fields.TwitterLink?.value?.href && (
                  <SitecoreLink
                    field={fields.TwitterLink}
                    className="text-white/85 transition-colors hover:text-white"
                    aria-label="Twitter/X"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </SitecoreLink>
                )}
                {fields.YoutubeLink?.value?.href && (
                  <SitecoreLink
                    field={fields.YoutubeLink}
                    className="text-white/85 transition-colors hover:text-white"
                    aria-label="YouTube"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </SitecoreLink>
                )}
                {fields.LinkedinLink?.value?.href && (
                  <SitecoreLink
                    field={fields.LinkedinLink}
                    className="text-white/85 transition-colors hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </SitecoreLink>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm text-white/80">
              <SitecoreLink field={fields.SiteMapLink} className={linkLegal} />
              <span className="text-white/40">|</span>
              <SitecoreLink field={fields.PrivacyLink} className={linkLegal} />
              <span className="text-white/40">|</span>
              <SitecoreLink field={fields.SlaveryStatementLink} className={linkLegal} />
              <span className="text-white/40">|</span>
              <SitecoreLink field={fields.GenderPayReportsLink} className={linkLegal} />
              <span className="text-white/40">|</span>
              <SitecoreLink field={fields.AccessibilityLink} className={linkLegal} />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <p className="text-sm text-white/75">
                <Text field={fields.CopyrightText} />
              </p>
              <button
                type="button"
                className="text-left text-sm text-white/80 hover:text-white hover:underline sm:text-right"
              >
                Cookie Preferences
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:hidden">
            <SitecoreImage field={fields.Logo} className="h-8 w-auto brightness-0 invert" />

            <div className="flex flex-col gap-2">
              <div className="inline-flex w-fit items-center gap-2 rounded border border-white/25 bg-white/5 px-4 py-2 text-sm text-white">
                <Text field={fields.CountryLabel} />
                <svg
                  className="h-4 w-4 text-white/80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <SitecoreLink
                field={fields.AllLocationsLink}
                className="text-malvern-sky-deep text-sm hover:text-white"
              />
            </div>

            <div className="flex items-center gap-6">
              {fields.FacebookLink?.value?.href && (
                <SitecoreLink
                  field={fields.FacebookLink}
                  className="text-white/85 transition-colors hover:text-white"
                  aria-label="Facebook"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </SitecoreLink>
              )}
              {fields.TwitterLink?.value?.href && (
                <SitecoreLink
                  field={fields.TwitterLink}
                  className="text-white/85 transition-colors hover:text-white"
                  aria-label="Twitter/X"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </SitecoreLink>
              )}
              {fields.YoutubeLink?.value?.href && (
                <SitecoreLink
                  field={fields.YoutubeLink}
                  className="text-white/85 transition-colors hover:text-white"
                  aria-label="YouTube"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </SitecoreLink>
              )}
              {fields.LinkedinLink?.value?.href && (
                <SitecoreLink
                  field={fields.LinkedinLink}
                  className="text-white/85 transition-colors hover:text-white"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      clipRule="evenodd"
                    />
                  </svg>
                </SitecoreLink>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-sm text-white/80">
              <SitecoreLink field={fields.SiteMapLink} className={linkLegal} />
              <span className="text-white/40">|</span>
              <SitecoreLink field={fields.PrivacyLink} className={linkLegal} />
              <span className="text-white/40">|</span>
              <SitecoreLink field={fields.SlaveryStatementLink} className={linkLegal} />
              <span className="text-white/40">|</span>
              <SitecoreLink field={fields.GenderPayReportsLink} className={linkLegal} />
              <span className="text-white/40">|</span>
              <SitecoreLink field={fields.AccessibilityLink} className={linkLegal} />
            </div>

            <div className="flex flex-col gap-4 border-t border-white/15 pt-6">
              <p className="text-sm text-white/75">
                <Text field={fields.CopyrightText} />
              </p>
              <button
                type="button"
                className="text-sm text-white/80 hover:text-white hover:underline"
              >
                Cookie Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
