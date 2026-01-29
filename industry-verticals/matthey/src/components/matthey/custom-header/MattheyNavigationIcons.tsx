import React, { JSX, useState } from 'react';
import { Search, Phone, X } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import { isParamEnabled } from '@/helpers/isParamEnabled';
import PreviewSearch from '../../non-sitecore/search/PreviewSearch';
import { PREVIEW_WIDGET_ID } from '@/constants/search';

export type MattheyHeaderIconsProps = ComponentProps & {
  fields: {
    PhoneLink?: {
      href?: string;
      text?: string;
    };
  };
  params: { [key: string]: string };
};

export const Default = (props: MattheyHeaderIconsProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const showPhoneIcon = !isParamEnabled(props.params.HidePhoneIcon);

  return (
    <>
      <div className={`component custom-header-icons ${props?.params?.styles?.trimEnd()}`} id={id}>
        <div className="flex items-center gap-3 p-4 lg:gap-5 [.component.custom-header_&]:justify-end [.component.custom-header_&]:px-0">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="hover:text-accent text-foreground p-2 transition-colors"
            aria-label="Search"
          >
            <Search className="size-5" />
          </button>

          {showPhoneIcon && props.fields?.PhoneLink?.href && (
            <a
              href={props.fields.PhoneLink.href}
              className="hover:text-accent text-foreground p-2 transition-colors"
              aria-label="Phone"
            >
              <Phone className="size-5" />
            </a>
          )}
        </div>
      </div>
      {isSearchOpen && (
        <div className="border-border bg-background absolute top-full right-0 left-0 z-50 border-b shadow-lg">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center gap-2">
              <PreviewSearch
                rfkId={PREVIEW_WIDGET_ID}
                isOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
              />

              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-foreground-muted hover:text-foreground p-3 transition-colors"
                aria-label="Close search"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Default as MattheyHeaderIcons };
