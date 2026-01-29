'use client';

import React, { useState, useRef } from 'react';
import { Link, TextField, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { ChevronDown, ChevronRight, ArrowLeft, X } from 'lucide-react';
import HamburgerIcon from '@/components/non-sitecore/HamburgerIcon';
import { useClickAway } from '@/hooks/useClickAway';
import { useStopResponsiveTransition } from '@/hooks/useStopResponsiveTransition';
import { extractMediaUrl } from '@/helpers/extractMediaUrl';
import {
  getLinkContent,
  getLinkField,
  isNavLevel,
  isNavRootItem,
  prepareFields,
} from '@/helpers/navHelpers';
import clsx from 'clsx';

export interface NavItemFields {
  Id: string;
  DisplayName: string;
  Title: TextField;
  NavigationTitle: TextField;
  Href: string;
  Querystring: string;
  Children?: Array<NavItemFields>;
  Styles: string[];
}

interface NavigationListItemProps {
  fields: NavItemFields;
  handleClick: (event?: React.MouseEvent<HTMLElement>) => void;
  logoSrc?: string;
  isMobile?: boolean;
  onBack?: () => void;
  level?: number;
}

export interface MattheyHeaderNavigationProps extends ComponentProps {
  fields: Record<string, NavItemFields>;
}

const NavigationListItem: React.FC<NavigationListItemProps> = ({
  fields,
  handleClick,
  logoSrc,
  isMobile = false,
  level = 0,
}) => {
  const { page } = useSitecore();
  const [isActive, setIsActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const dropdownRef = useRef<HTMLLIElement>(null);
  useClickAway(dropdownRef, () => setIsActive(false));

  const isRootItem = isNavRootItem(fields);
  const isTopLevelPage = isNavLevel(fields, 1);

  const hasChildren = !!fields.Children?.length;
  const isLogoRootItem = isRootItem && logoSrc;
  const hasDropdownMenu = hasChildren && isTopLevelPage && !isMobile;
  const hasMobileSubmenu = hasChildren && isMobile;

  const clickHandler = (event: React.MouseEvent<HTMLElement>) => {
    handleClick(event);
    setIsActive(false);
    if (isMobile && hasMobileSubmenu) {
      setIsExpanded(true);
    }
  };

  const children = hasChildren
    ? fields.Children!.map((child) => (
        <NavigationListItem
          key={child.Id}
          fields={child}
          handleClick={clickHandler}
          isMobile={isMobile}
          level={level + 1}
        />
      ))
    : null;

  // Mobile submenu view
  if (isMobile && isExpanded && hasChildren) {
    return (
      <li className="flex flex-col">
        <div className="flex items-center gap-2 px-4 py-3 text-sm text-blue-300">
          <button
            onClick={() => setIsExpanded(false)}
            className="flex items-center justify-center"
            aria-label="Back"
          >
            <ArrowLeft className="size-4" />
          </button>
          <span>{getLinkContent(fields, logoSrc)}</span>
        </div>
        <ul className="flex flex-col border-t border-blue-400/20">{children}</ul>
      </li>
    );
  }

  // Mobile menu item
  if (isMobile) {
    return (
      <li className="border-b border-blue-400/20">
        <div className="flex items-center justify-between px-4 py-4">
          <Link
            field={getLinkField(fields)}
            editable={page.mode.isEditing}
            onClick={clickHandler}
            className="font-medium text-white transition-colors hover:text-blue-200"
          >
            {getLinkContent(fields, logoSrc)}
          </Link>
          {hasMobileSubmenu && <ChevronRight className="size-5 text-white" />}
        </div>
        {isExpanded && hasChildren && <ul className="flex flex-col bg-blue-900/50">{children}</ul>}
      </li>
    );
  }

  // Desktop menu item
  return (
    <li
      ref={dropdownRef}
      tabIndex={0}
      role="menuitem"
      className={clsx(
        fields?.Styles?.join(' '),
        'relative flex flex-col gap-x-8 gap-y-4 xl:gap-x-14',
        isRootItem && 'lg:flex-row',
        isLogoRootItem && 'shrink-0 max-lg:hidden'
      )}
    >
      <div className="flex items-center justify-center gap-1">
        <Link
          field={getLinkField(fields)}
          editable={page.mode.isEditing}
          onClick={clickHandler}
          className={clsx(
            'whitespace-nowrap transition-colors hover:text-blue-200',
            isTopLevelPage && 'font-medium text-white',
            isActive && isTopLevelPage && 'text-blue-200'
          )}
        >
          {getLinkContent(fields, logoSrc)}
        </Link>
        {hasDropdownMenu && (
          <button
            type="button"
            aria-label="Toggle submenu"
            aria-haspopup="true"
            aria-expanded={isActive}
            className="flex h-6 w-6 cursor-pointer items-center justify-center"
            onClick={() => setIsActive((a) => !a)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsActive((a) => !a);
              }
            }}
          >
            <ChevronDown
              className={clsx(
                'size-4 text-white transition-transform duration-300',
                isActive && 'rotate-180'
              )}
            />
          </button>
        )}
      </div>
      {hasChildren && (
        <ul
          role="menu"
          className={clsx(
            'flex flex-col items-center gap-x-8 gap-y-4 xl:gap-x-14',
            isRootItem && 'lg:flex-row',
            hasDropdownMenu &&
              clsx(
                'z-110 text-base',
                'lg:absolute lg:top-full lg:left-1/2 lg:-translate-x-1/2 lg:p-8 lg:transition-all lg:duration-300',
                'lg:max-w-300 lg:min-w-225 lg:rounded-lg lg:bg-white lg:shadow-xl',
                isActive
                  ? 'lg:grid lg:grid-cols-5 lg:items-start lg:gap-8'
                  : 'lg:pointer-events-none lg:hidden lg:translate-y-2 lg:scale-95 lg:opacity-0'
              )
          )}
        >
          {hasDropdownMenu && isActive
            ? fields.Children!.map((child) => (
                <li key={child.Id} className="flex w-full flex-col gap-2">
                  <Link
                    field={getLinkField(child)}
                    editable={page.mode.isEditing}
                    onClick={clickHandler}
                    className="mb-2 text-sm font-semibold text-gray-800 transition-colors hover:text-blue-600"
                  >
                    {getLinkContent(child, logoSrc)}
                  </Link>
                  {child.Children && (
                    <ul className="flex flex-col gap-1">
                      {child.Children.map((grandchild) => (
                        <li key={grandchild.Id}>
                          <Link
                            field={getLinkField(grandchild)}
                            editable={page.mode.isEditing}
                            onClick={clickHandler}
                            className="text-sm text-gray-600 transition-colors hover:text-blue-600"
                          >
                            {getLinkContent(grandchild, logoSrc)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))
            : children}
        </ul>
      )}
    </li>
  );
};

export const Default = ({ params, fields }: MattheyHeaderNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, setMobileSubmenu] = useState<NavItemFields | null>(null);
  const { page } = useSitecore();
  const { styles, RenderingIdentifier: id, Logo: logoImage } = params;

  useStopResponsiveTransition();

  if (!Object.values(fields).some((v) => !!v)) {
    return (
      <div className={`component custom-header-navigation ${styles}`} id={id}>
        <div className="component-content">[Custom Header Navigation]</div>
      </div>
    );
  }

  const handleToggleMenu = (event?: React.MouseEvent<HTMLElement>, forceState?: boolean) => {
    if (event && page.mode.isEditing) {
      event.preventDefault();
    }
    setIsMenuOpen(forceState ?? !isMenuOpen);
    if (forceState === false) {
      setMobileSubmenu(null);
    }
  };

  const preparedFields = prepareFields(fields, true);
  const rootItem = Object.values(preparedFields).find((item) => isNavRootItem(item));
  const logoSrc = extractMediaUrl(logoImage);
  const hasLogoRootItem = rootItem && logoSrc;

  const navigationItems = Object.values(preparedFields)
    .filter((item): item is NavItemFields => !!item)
    .map((item) => (
      <NavigationListItem
        key={item.Id}
        fields={item}
        handleClick={(event) => handleToggleMenu(event, false)}
        logoSrc={logoSrc}
        isMobile={false}
      />
    ));

  const mobileNavigationItems = Object.values(preparedFields)
    .filter((item): item is NavItemFields => !!item)
    .map((item) => (
      <NavigationListItem
        key={item.Id}
        fields={item}
        handleClick={(event) => handleToggleMenu(event, false)}
        logoSrc={logoSrc}
        isMobile={true}
        onBack={() => setMobileSubmenu(null)}
      />
    ));

  return (
    <div className={`component custom-header-navigation ${styles}`} id={id}>
      {/* Mobile Header Bar */}
      <div className="relative z-150 container flex items-center justify-between bg-white py-4 lg:hidden">
        {hasLogoRootItem && (
          <Link
            field={getLinkField(rootItem!)}
            editable={page.mode.isEditing}
            className="navigation-mobile-trigger"
          >
            {getLinkContent(rootItem!, logoSrc)}
          </Link>
        )}
        <HamburgerIcon
          isOpen={isMenuOpen}
          onClick={handleToggleMenu}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggleMenu();
            }
          }}
          className="navigation-mobile-trigger"
        />
      </div>

      {/* Desktop Navigation Bar */}
      <nav className="hidden bg-blue-900 lg:block">
        <ul
          role="menubar"
          className="container flex flex-col items-center justify-center gap-x-8 gap-y-4 py-4 text-lg lg:flex-row xl:gap-x-16"
        >
          {navigationItems}
        </ul>
      </nav>

      {/* Mobile Menu Overlay */}
      <nav
        className={clsx(
          'z-100 flex bg-blue-900 duration-300 lg:hidden',
          'fixed inset-0 flex-col',
          !isMenuOpen && '-translate-y-full opacity-0'
        )}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between bg-white px-4 py-4 lg:hidden">
          {hasLogoRootItem && (
            <Link
              field={getLinkField(rootItem!)}
              editable={page.mode.isEditing}
              className="text-xl font-bold text-blue-900"
            >
              {getLinkContent(rootItem!, logoSrc)}
            </Link>
          )}
          <button
            onClick={() => handleToggleMenu(undefined, false)}
            className="p-2 text-blue-900"
            aria-label="Close menu"
          >
            <X className="size-6" />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <ul role="menubar" className="flex flex-1 flex-col overflow-y-auto">
          {mobileNavigationItems}
        </ul>
      </nav>
    </div>
  );
};
