'use client';

import React, { type JSX, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  TextField,
  Text,
  LinkField,
  Link as SitecoreLink,
  ImageField,
  Image as SitecoreImage,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ComponentProps } from '@/lib/component-props';
import { Menu, X, Search, ChevronDown } from 'lucide-react';

/**
 * MalvernHeaderSection
 * Desktop: dark utility bar (language + links, Login / Register) + white main row (logo, main nav placeholder, search).
 * Mobile: white bar with logo + menu; full-screen teal overlay with main placeholder, utility links, search.
 * Login uses Auth0 (`/api/auth/login`); Register stays the Sitecore general link.
 */

interface Fields {
  Logo: ImageField;
  LogoLink: LinkField;
  LanguageText: TextField;
  LanguageLink: LinkField;
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
  SearchPlaceholder: TextField;
  CloseMenuText: TextField;
  OpenMenuText: TextField;
}

const defaultFields: Fields = {
  Logo: { value: { src: '/logos/malvern-logo.svg', alt: 'Malvern Panalytical' } },
  LogoLink: { value: { href: '/' } },
  LanguageText: { value: 'English' },
  LanguageLink: { value: { href: '/en' } },
  Utility1Text: { value: 'About us' },
  Utility1Link: { value: { href: '/about' } },
  Utility2Text: { value: 'Blog' },
  Utility2Link: { value: { href: '/blog' } },
  Utility3Text: { value: 'Careers' },
  Utility3Link: { value: { href: '/careers' } },
  Utility4Text: { value: 'Store' },
  Utility4Link: { value: { href: '/store' } },
  Utility5Text: { value: 'Contact us' },
  Utility5Link: { value: { href: '/contact' } },
  RegisterText: { value: 'Register' },
  RegisterLink: { value: { href: '/register' } },
  LoginText: { value: 'Login' },
  LoginLink: { value: { href: '/login' } },
  SearchPlaceholder: { value: 'Search' },
  CloseMenuText: { value: 'Close menu' },
  OpenMenuText: { value: 'Open menu' },
};

export type MalvernHeaderSectionProps = ComponentProps & {
  fields: Fields;
};

const loginButtonDesktop =
  'inline-flex items-center justify-center rounded-md bg-[#2ec4d6] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#26b0c2]';
const registerButtonDesktop =
  'inline-flex items-center justify-center rounded-md border border-white px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10';
const logoutButtonDesktop =
  'inline-flex items-center justify-center rounded-md border border-white/40 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10';

const loginButtonMobile =
  'inline-flex w-full items-center justify-center rounded-md bg-[#2ec4d6] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#26b0c2]';
const registerButtonMobile =
  'inline-flex w-full items-center justify-center rounded-md border border-white px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10';
const logoutButtonMobile =
  'inline-flex w-full items-center justify-center rounded-md border border-white/40 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10';

function MalvernHeaderAuthActions({
  fields,
  variant,
}: {
  fields: Fields;
  variant: 'desktop' | 'mobile';
}) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const returnTo = encodeURIComponent(router.asPath || '/');
  const loginHref = `/api/auth/login?returnTo=${returnTo}`;

  const loginClass = variant === 'desktop' ? loginButtonDesktop : loginButtonMobile;
  const registerClass = variant === 'desktop' ? registerButtonDesktop : registerButtonMobile;
  const logoutClass = variant === 'desktop' ? logoutButtonDesktop : logoutButtonMobile;

  if (isLoading) {
    return (
      <div
        className={
          variant === 'desktop' ? 'flex shrink-0 items-center gap-2' : 'flex w-full flex-col gap-2'
        }
        aria-busy="true"
        aria-live="polite"
      >
        <span className={`${loginClass} cursor-wait opacity-70`}>
          <Text tag="span" field={fields.LoginText} className="inline" />
        </span>
        <span className={`${registerClass} cursor-wait opacity-70`}>
          <Text tag="span" field={fields.RegisterText} className="inline" />
        </span>
      </div>
    );
  }

  if (user) {
    const displayName =
      typeof user.name === 'string' && user.name.trim()
        ? user.name
        : typeof user.email === 'string'
          ? user.email
          : ((fields.LoginText?.value as string | undefined) ?? 'Account');

    return (
      <div
        className={
          variant === 'desktop'
            ? 'flex shrink-0 flex-wrap items-center justify-end gap-2'
            : 'flex w-full flex-col gap-2'
        }
      >
        <span
          className={
            variant === 'desktop'
              ? 'max-w-40 truncate text-sm text-white/90 xl:max-w-56'
              : 'truncate text-center text-sm text-white/90'
          }
          title={displayName}
        >
          {displayName}
        </span>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/auth/logout" className={logoutClass}>
          Log out
        </a>
      </div>
    );
  }

  return (
    <div
      className={
        variant === 'desktop' ? 'flex shrink-0 items-center gap-2' : 'flex w-full flex-col gap-2'
      }
    >
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href={loginHref} className={loginClass}>
        <Text tag="span" field={fields.LoginText} className="inline" />
      </a>
      <SitecoreLink field={fields.RegisterLink} className={registerClass}>
        <Text tag="span" field={fields.RegisterText} className="inline" />
      </SitecoreLink>
    </div>
  );
}

export const Default = (props: MalvernHeaderSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = { ...defaultFields, ...(props.fields || {}) } as Fields;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const phHeaderNav = `malvern-header-nav-${DynamicPlaceholderId}`;

  const utilityItems = [
    { text: fields.Utility1Text, link: fields.Utility1Link },
    { text: fields.Utility2Text, link: fields.Utility2Link },
    { text: fields.Utility3Text, link: fields.Utility3Link },
    { text: fields.Utility4Text, link: fields.Utility4Link },
    { text: fields.Utility5Text, link: fields.Utility5Link },
  ];

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  const utilityLinkClass = 'text-white/95 transition-colors hover:text-white hover:underline';
  const utilityLinkClassDesktop =
    'text-white/90 transition-colors hover:text-white hover:underline';

  return (
    <>
      <header
        className={`component malvern-header-section sticky top-0 z-50 bg-white shadow-sm ${styles || ''}`}
        id={id}
      >
        {/* Utility bar — desktop only */}
        <div className="hidden bg-[#00333d] text-white lg:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 text-sm">
            <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-1">
              <SitecoreLink
                field={fields.LanguageLink}
                className={`inline-flex items-center gap-1 ${utilityLinkClassDesktop}`}
              >
                <Text tag="span" field={fields.LanguageText} className="inline" />
                <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
              </SitecoreLink>
              {utilityItems.map((u, i) => (
                <SitecoreLink key={i} field={u.link} className={utilityLinkClassDesktop}>
                  <Text tag="span" field={u.text} className="inline" />
                </SitecoreLink>
              ))}
            </div>
            <MalvernHeaderAuthActions fields={fields} variant="desktop" />
          </div>
        </div>

        {/* Main bar */}
        <div className="border-b border-gray-100">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:h-17 lg:py-0">
            <SitecoreLink
              field={fields.LogoLink}
              className="flex min-w-0 shrink items-center gap-2.5 lg:gap-3"
            >
              <SitecoreImage field={fields.Logo} className="h-9 w-auto shrink-0 lg:h-10" />
            </SitecoreLink>

            <nav className="malvern-header-nav-desktop hidden flex-1 items-center justify-center px-6 lg:flex">
              <div className="malvern-header-nav-wrapper flex flex-wrap items-center justify-center gap-x-6 gap-y-1 xl:gap-x-8">
                <Placeholder name={phHeaderNav} rendering={props.rendering} />
              </div>
            </nav>

            <div className="hidden shrink-0 items-center lg:flex">
              <div className="flex items-stretch overflow-hidden rounded-lg border border-gray-200 bg-gray-100 shadow-sm">
                <input
                  type="search"
                  placeholder={fields.SearchPlaceholder?.value as string}
                  className="min-h-0 w-44 border-0 bg-transparent py-2.5 pr-2 pl-3 text-sm text-[#1a2b2f] outline-none placeholder:text-gray-500 xl:w-52"
                  aria-label={fields.SearchPlaceholder?.value as string}
                />
                <button
                  type="button"
                  className="flex min-w-11 shrink-0 items-center justify-center self-stretch bg-[#00333d] px-3 text-white transition-colors hover:bg-[#004a57]"
                  aria-label={fields.SearchPlaceholder?.value as string}
                >
                  <Search className="h-4 w-4" strokeWidth={2.25} />
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              className="flex h-10 w-10 shrink-0 items-center justify-center text-[#00333d] lg:hidden"
              aria-expanded={isMobileMenuOpen}
              aria-controls="malvern-mobile-menu"
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
      </header>

      {/* Full-screen mobile menu */}
      {isMobileMenuOpen && (
        <div
          id="malvern-mobile-menu"
          className="fixed inset-0 z-100 flex flex-col bg-[#00333d] text-white lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
        >
          <div className="flex shrink-0 justify-end px-4 pt-4">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center text-white"
              aria-label={fields.CloseMenuText?.value as string}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="min-h-0 flex-1 overflow-y-auto px-6 pt-2 pb-6" aria-label="Primary">
            <div className="malvern-mobile-main-nav flex flex-col gap-1">
              <Placeholder name={phHeaderNav} rendering={props.rendering} />
            </div>
          </nav>

          <div className="shrink-0 border-t border-white/15 px-4 pt-5 pb-8">
            <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/95">
              <SitecoreLink
                field={fields.LanguageLink}
                className={`inline-flex items-center gap-1 ${utilityLinkClass}`}
              >
                <Text tag="span" field={fields.LanguageText} className="inline" />
                <ChevronDown className="h-3.5 w-3.5 shrink-0" aria-hidden />
              </SitecoreLink>
              {utilityItems.map((u, i) => (
                <SitecoreLink key={i} field={u.link} className={utilityLinkClass}>
                  <Text tag="span" field={u.text} className="inline" />
                </SitecoreLink>
              ))}
            </div>
            <div className="mb-5">
              <MalvernHeaderAuthActions fields={fields} variant="mobile" />
            </div>
            <div className="flex items-stretch overflow-hidden rounded-lg">
              <input
                type="search"
                placeholder={fields.SearchPlaceholder?.value as string}
                className="min-h-0 min-w-0 flex-1 border-0 bg-gray-200 px-4 py-3.5 text-sm text-[#1a2b2f] outline-none placeholder:text-gray-500"
                aria-label={fields.SearchPlaceholder?.value as string}
              />
              <button
                type="button"
                className="flex w-14 shrink-0 items-center justify-center self-stretch bg-[#081820] text-white"
                aria-label={fields.SearchPlaceholder?.value as string}
              >
                <Search className="h-5 w-5" strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Main nav placeholder: large vertical links (mobile overlay) */
        .malvern-mobile-main-nav :global(a) {
          display: block;
          padding: 0.65rem 0;
          font-size: 1.25rem;
          font-weight: 500;
          color: #fff;
          text-decoration: none;
        }
        .malvern-mobile-main-nav :global(a:hover) {
          text-decoration: underline;
        }
        /* Desktop: horizontal grey nav links */
        .malvern-header-nav-desktop :global(.malvern-header-nav-wrapper a) {
          color: #3d4f54;
          font-size: 0.9375rem;
          font-weight: 500;
          text-decoration: none;
          white-space: nowrap;
        }
        .malvern-header-nav-desktop :global(.malvern-header-nav-wrapper a:hover) {
          color: #00333d;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};
