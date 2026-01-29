import React, { JSX } from 'react';
import { ComponentProps } from '@/lib/component-props';
import { Placeholder } from '@sitecore-content-sdk/nextjs';

export type MattheyHeaderProps = ComponentProps & {
  params: { [key: string]: string };
};

export const Default = (props: MattheyHeaderProps): JSX.Element => {
  const { styles, RenderingIdentifier: id, DynamicPlaceholderId } = props.params;

  return (
    <div className={`component custom-header bg-background ${styles}`} id={id}>
      {/* Top Bar - Logo and Utility Icons */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container flex items-center justify-between gap-3 py-3 lg:gap-5">
          <div className="flex-[1_1]">
            <Placeholder
              name={`matthey-header-logo-${DynamicPlaceholderId}`}
              rendering={props.rendering}
            />
          </div>
          <div className="flex flex-[1_1] justify-end">
            <Placeholder
              name={`matthey-header-icons-${DynamicPlaceholderId}`}
              rendering={props.rendering}
            />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="flex-[1_1]">
        <Placeholder
          name={`matthey-header-nav-${DynamicPlaceholderId}`}
          rendering={props.rendering}
        />
      </div>
    </div>
  );
};

export { Default as MattheyHeader };
