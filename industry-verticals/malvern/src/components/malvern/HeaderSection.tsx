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
import { Phone, Menu, X, ChevronDown, Search } from 'lucide-react';

/**
 * HeaderSection Component
 * Malvern-style header with logo, navigation, optional phone, and primary CTA
 *
 * Layout:
 * - Desktop: logo left, main nav center, utilities right
 * - Mobile: logo left, hamburger right (nav in overlay)
 * - Sticky top navigation
 */

interface Fields {
  Logo: ImageField;
  LogoLink: LinkField;
  PhoneNumber: TextField;
  PhoneLink: LinkField;
  FreeQuoteText: TextField;
  FreeQuoteLink: LinkField;
  NavItem1Text: TextField;
  NavItem1Link: LinkField;
  NavItem2Text: TextField;
  NavItem2Link: LinkField;
  NavItem3Text: TextField;
  NavItem3Link: LinkField;
  NavItem4Text: TextField;
  NavItem4Link: LinkField;
  CloseMenuText: TextField;
  OpenMenuText: TextField;
}

const defaultFields: Fields = {
  Logo: { value: { src: '/adp-logo.svg', alt: 'Malvern Panalytical' } },
  LogoLink: { value: { href: '/' } },
  PhoneNumber: { value: '0800 1707 677' },
  PhoneLink: { value: { href: 'tel:08001707677' } },
  FreeQuoteText: { value: 'Sign in' },
  FreeQuoteLink: { value: { href: '/sign-in' } },
  NavItem1Text: { value: 'Products' },
  NavItem1Link: { value: { href: '/products' } },
  NavItem2Text: { value: 'Services' },
  NavItem2Link: { value: { href: '/services' } },
  NavItem3Text: { value: 'Solutions' },
  NavItem3Link: { value: { href: '/solutions' } },
  NavItem4Text: { value: 'About us' },
  NavItem4Link: { value: { href: '/about' } },
  CloseMenuText: { value: 'Close menu' },
  OpenMenuText: { value: 'Open menu' },
};

export type HeaderSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: HeaderSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = props.fields || defaultFields;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const phHeaderNav = `header-nav-${DynamicPlaceholderId}`;

  const navLinkClass =
    'flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#333] transition-colors hover:text-malvern-teal lg:px-4';

  return (
    <header
      className={`component header-section sticky top-0 z-50 bg-white shadow-sm ${styles || ''}`}
      id={id}
    >
      <div className="bg-malvern-teal-dark h-1" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-3 lg:h-20">
          {/* Left: Logo */}
          <div className="flex min-w-0 shrink-0 items-center gap-3">
            <SitecoreLink field={fields.LogoLink} className="block shrink-0">
              {fields.Logo?.value?.src ? (
                <SitecoreImage field={fields.Logo} className="h-8 w-auto lg:h-10" />
              ) : (
                <div className="flex items-baseline gap-1.5">
                  <span className="text-malvern-teal text-2xl font-bold tracking-tight">M</span>
                  <span className="text-malvern-teal hidden text-sm font-semibold sm:inline">
                    Malvern Panalytical
                  </span>
                </div>
              )}
            </SitecoreLink>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden min-w-0 flex-1 justify-center px-4 lg:flex">
            <div className="flex flex-wrap items-center justify-center gap-0.5">
              {fields.NavItem1Link?.value?.href && (
                <SitecoreLink field={fields.NavItem1Link} className={navLinkClass}>
                  <Text field={fields.NavItem1Text} />
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </SitecoreLink>
              )}
              {fields.NavItem2Link?.value?.href && (
                <SitecoreLink field={fields.NavItem2Link} className={navLinkClass}>
                  <Text field={fields.NavItem2Text} />
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </SitecoreLink>
              )}
              {fields.NavItem3Link?.value?.href && (
                <SitecoreLink field={fields.NavItem3Link} className={navLinkClass}>
                  <Text field={fields.NavItem3Text} />
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </SitecoreLink>
              )}
              {fields.NavItem4Link?.value?.href && (
                <SitecoreLink field={fields.NavItem4Link} className={navLinkClass}>
                  <Text field={fields.NavItem4Text} />
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </SitecoreLink>
              )}
              <div className="header-nav-wrapper flex items-center">
                <Placeholder name={phHeaderNav} rendering={props.rendering} />
              </div>
            </div>
          </nav>

          {/* Right: search-style control (visual), phone, CTA, mobile menu */}
          <div className="flex shrink-0 items-center gap-2 lg:gap-3">
            <button
              type="button"
              className="text-malvern-teal hover:border-malvern-teal/40 hidden h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 transition-colors hover:bg-white lg:inline-flex"
              aria-label="Search"
            >
              <Search className="h-4 w-4 shrink-0" />
            </button>

            {fields.PhoneLink?.value?.href && (
              <SitecoreLink
                field={fields.PhoneLink}
                className="hover:text-malvern-teal hidden items-center gap-2 text-sm font-semibold text-[#333] transition-colors xl:flex"
              >
                <Phone className="h-4 w-4" />
                <Text field={fields.PhoneNumber} />
              </SitecoreLink>
            )}

            {fields.FreeQuoteLink?.value?.href && (
              <SitecoreLink
                field={fields.FreeQuoteLink}
                className="border-malvern-teal text-malvern-teal hover:bg-malvern-teal hidden items-center rounded border-2 px-4 py-1.5 text-sm font-semibold transition-colors hover:text-white lg:inline-flex"
              >
                <Text field={fields.FreeQuoteText} />
              </SitecoreLink>
            )}

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-malvern-teal flex h-10 w-10 items-center justify-center lg:hidden"
              aria-label={
                isMobileMenuOpen
                  ? (fields.CloseMenuText?.value as string)
                  : (fields.OpenMenuText?.value as string)
              }
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white shadow-lg lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <nav className="flex flex-col gap-1">
              {fields.NavItem1Link?.value?.href && (
                <SitecoreLink
                  field={fields.NavItem1Link}
                  className="hover:text-malvern-teal flex items-center justify-between border-b border-gray-100 py-3 text-base font-medium text-[#333]"
                >
                  <Text field={fields.NavItem1Text} />
                  <ChevronDown className="h-4 w-4" />
                </SitecoreLink>
              )}
              {fields.NavItem2Link?.value?.href && (
                <SitecoreLink
                  field={fields.NavItem2Link}
                  className="hover:text-malvern-teal flex items-center justify-between border-b border-gray-100 py-3 text-base font-medium text-[#333]"
                >
                  <Text field={fields.NavItem2Text} />
                  <ChevronDown className="h-4 w-4" />
                </SitecoreLink>
              )}
              {fields.NavItem3Link?.value?.href && (
                <SitecoreLink
                  field={fields.NavItem3Link}
                  className="hover:text-malvern-teal flex items-center justify-between border-b border-gray-100 py-3 text-base font-medium text-[#333]"
                >
                  <Text field={fields.NavItem3Text} />
                  <ChevronDown className="h-4 w-4" />
                </SitecoreLink>
              )}
              {fields.NavItem4Link?.value?.href && (
                <SitecoreLink
                  field={fields.NavItem4Link}
                  className="hover:text-malvern-teal flex items-center justify-between border-b border-gray-100 py-3 text-base font-medium text-[#333]"
                >
                  <Text field={fields.NavItem4Text} />
                  <ChevronDown className="h-4 w-4" />
                </SitecoreLink>
              )}
            </nav>

            <div className="mobile-nav-wrapper mt-2">
              <Placeholder name={phHeaderNav} rendering={props.rendering} />
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-gray-200 pt-4">
              {fields.FreeQuoteLink?.value?.href && (
                <SitecoreLink
                  field={fields.FreeQuoteLink}
                  className="border-malvern-teal text-malvern-teal inline-flex w-full items-center justify-center rounded border-2 py-2.5 text-sm font-semibold"
                >
                  <Text field={fields.FreeQuoteText} />
                </SitecoreLink>
              )}
              {fields.PhoneLink?.value?.href && (
                <SitecoreLink
                  field={fields.PhoneLink}
                  className="flex items-center gap-2 text-sm font-semibold text-[#333]"
                >
                  <Phone className="h-4 w-4" />
                  <Text field={fields.PhoneNumber} />
                </SitecoreLink>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
