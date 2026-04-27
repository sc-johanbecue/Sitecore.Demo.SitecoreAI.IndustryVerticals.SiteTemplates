'use client';

import React, { type JSX, useState } from 'react';
import {
  TextField,
  Text,
  LinkField,
  Link as SitecoreLink,
  ImageField,
  Image as SitecoreImage,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { Menu, X, Search } from 'lucide-react';

/**
 * MalvernHeaderSection
 * Malvern Panalytical-style header: utility bar, main nav, search, Register / Login, feedback tab.
 * Structure mirrors adp HeaderSection (sticky, hamburger, desktop nav, Placeholder).
 */

interface Fields {
  Logo: ImageField;
  LogoLink: LinkField;
  Tagline: TextField;
  Utility1Text: TextField;
  Utility1Link: LinkField;
  Utility2Text: TextField;
  Utility2Link: LinkField;
  Utility3Text: TextField;
  Utility3Link: LinkField;
  Utility4Text: TextField;
  Utility4Link: LinkField;
  Utility5Text: TextField;
  Utility5Link: LinkField;
  RegisterText: TextField;
  RegisterLink: LinkField;
  LoginText: TextField;
  LoginLink: LinkField;
  NavItem1Text: TextField;
  NavItem1Link: LinkField;
  NavItem2Text: TextField;
  NavItem2Link: LinkField;
  NavItem3Text: TextField;
  NavItem3Link: LinkField;
  NavItem4Text: TextField;
  NavItem4Link: LinkField;
  NavItem5Text: TextField;
  NavItem5Link: LinkField;
  NavItem6Text: TextField;
  NavItem6Link: LinkField;
  SearchPlaceholder: TextField;
  FeedbackText: TextField;
  FeedbackLink: LinkField;
  CloseMenuText: TextField;
  OpenMenuText: TextField;
}

const defaultFields: Fields = {
  Logo: { value: { src: '/logos/malvern-logo.svg', alt: 'Malvern Panalytical' } },
  LogoLink: { value: { href: '/' } },
  Tagline: { value: 'a spectris company' },
  Utility1Text: { value: 'Events' },
  Utility1Link: { value: { href: '/events' } },
  Utility2Text: { value: 'Careers' },
  Utility2Link: { value: { href: '/careers' } },
  Utility3Text: { value: 'Support' },
  Utility3Link: { value: { href: '/support' } },
  Utility4Text: { value: 'Store' },
  Utility4Link: { value: { href: '/store' } },
  Utility5Text: { value: 'Contact Us' },
  Utility5Link: { value: { href: '/contact' } },
  RegisterText: { value: 'Register' },
  RegisterLink: { value: { href: '/register' } },
  LoginText: { value: 'Login' },
  LoginLink: { value: { href: '/login' } },
  NavItem1Text: { value: 'Products' },
  NavItem1Link: { value: { href: '/products' } },
  NavItem2Text: { value: 'Services' },
  NavItem2Link: { value: { href: '/services' } },
  NavItem3Text: { value: 'Solutions' },
  NavItem3Link: { value: { href: '/solutions' } },
  NavItem4Text: { value: 'Sectors' },
  NavItem4Link: { value: { href: '/sectors' } },
  NavItem5Text: { value: 'Learning Center' },
  NavItem5Link: { value: { href: '/learning' } },
  NavItem6Text: { value: 'Support' },
  NavItem6Link: { value: { href: '/support' } },
  SearchPlaceholder: { value: 'Search' },
  FeedbackText: { value: 'Feedback' },
  FeedbackLink: { value: { href: '/feedback' } },
  CloseMenuText: { value: 'Close menu' },
  OpenMenuText: { value: 'Open menu' },
};

export type MalvernHeaderSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernHeaderSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const phHeaderNav = `malvern-header-nav-${DynamicPlaceholderId}`;

  const utilityLinks = [
    { text: fields.Utility1Text, link: fields.Utility1Link },
    { text: fields.Utility2Text, link: fields.Utility2Link },
    { text: fields.Utility3Text, link: fields.Utility3Link },
    { text: fields.Utility4Text, link: fields.Utility4Link },
    { text: fields.Utility5Text, link: fields.Utility5Link },
  ];

  return (
    <>
      <header
        className={`component malvern-header-section sticky top-0 z-50 bg-white shadow-sm ${styles || ''}`}
        id={id}
      >
        {/* Utility bar */}
        <div className="bg-[#00333d] text-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:text-sm">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              {utilityLinks.map((u, i) => (
                <SitecoreLink
                  key={i}
                  field={u.link}
                  className="text-white/90 transition-colors hover:text-white hover:underline"
                >
                  <Text tag="span" field={u.text} className="inline" />
                </SitecoreLink>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <SitecoreLink
                field={fields.RegisterLink}
                className="hidden rounded border border-white/60 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-white/10 sm:inline-flex"
              >
                <Text tag="span" field={fields.RegisterText} className="inline" />
              </SitecoreLink>
              <SitecoreLink
                field={fields.LoginLink}
                className="rounded border border-[#00A651] bg-[#00A651] px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-[#008f45] sm:px-4"
              >
                <Text tag="span" field={fields.LoginText} className="inline" />
              </SitecoreLink>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-14 items-center justify-between gap-3 lg:h-[4.25rem]">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex h-10 w-10 shrink-0 items-center justify-center text-[#00333d] lg:hidden"
                aria-label={
                  isMobileMenuOpen
                    ? (fields.CloseMenuText?.value as string)
                    : (fields.OpenMenuText?.value as string)
                }
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              <SitecoreLink field={fields.LogoLink} className="flex min-w-0 items-center gap-2">
                <SitecoreImage field={fields.Logo} className="h-8 w-auto shrink-0 lg:h-9" />
                <Text
                  tag="span"
                  field={fields.Tagline}
                  className="hidden text-[10px] leading-tight text-[#5a6a6e] sm:block lg:text-xs"
                />
              </SitecoreLink>
            </div>

            <nav className="hidden flex-1 items-center justify-center gap-1 px-4 lg:flex">
              <div className="malvern-header-nav-wrapper flex items-center">
                <Placeholder name={phHeaderNav} rendering={props.rendering} />
              </div>
            </nav>

            <div className="flex shrink-0 items-center gap-2 lg:gap-3">
              <div className="relative hidden md:block">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#5a6a6e]" />
                <input
                  type="search"
                  placeholder={fields.SearchPlaceholder?.value as string}
                  className="w-44 rounded border border-gray-200 py-2 pr-3 pl-9 text-sm text-[#1a2b2f] outline-none focus:border-[#00A651] lg:w-52"
                  aria-label={fields.SearchPlaceholder?.value as string}
                />
              </div>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center text-[#00333d] md:hidden"
                aria-label={fields.SearchPlaceholder?.value as string}
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-gray-100 bg-white shadow-lg lg:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4">
              <div className="malvern-mobile-nav-wrapper mt-2">
                <Placeholder name={phHeaderNav} rendering={props.rendering} />
              </div>
              <div className="mt-4 flex flex-col gap-2 border-t border-gray-200 pt-4">
                <SitecoreLink
                  field={fields.RegisterLink}
                  className="inline-flex justify-center rounded border border-[#00333d] py-2 text-sm font-semibold text-[#00333d]"
                >
                  <Text tag="span" field={fields.RegisterText} className="inline" />
                </SitecoreLink>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Feedback tab — outside header so it spans viewport */}
      <SitecoreLink
        field={fields.FeedbackLink}
        className="fixed top-1/2 right-0 z-40 flex -translate-y-1/2 rounded-l-md bg-[#7ec8e3] px-1.5 py-6 text-xs font-semibold tracking-wide text-[#00333d] shadow-md"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <Text tag="span" field={fields.FeedbackText} className="inline" />
      </SitecoreLink>
    </>
  );
};
