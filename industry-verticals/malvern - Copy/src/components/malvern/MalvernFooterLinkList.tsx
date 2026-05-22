import React from 'react';
import { Link as ContentSdkLink, Text, LinkField, TextField } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

interface LinkListProps extends ComponentProps {
  fields: {
    data: {
      datasource: {
        children: {
          results: Array<{
            field: {
              link: LinkField;
            };
          }>;
        };
        field: {
          title: TextField;
        };
      };
    };
  };
}

const linkClassName =
  'text-sm font-normal !text-white no-underline transition-colors hover:!text-[#47bcd3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60';

const LinkListItem = ({
  index,
  total,
  field,
}: {
  index: number;
  total: number;
  field: LinkField;
}) => {
  const classNames = [
    `item${index}`,
    index % 2 === 0 ? 'odd' : 'even',
    index === 0 ? 'first' : '',
    index === total - 1 ? 'last' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li className={classNames}>
      <ContentSdkLink field={field} className={linkClassName} />
    </li>
  );
};

export const Default = ({ params, fields }: LinkListProps) => {
  const datasource = fields?.data?.datasource;
  const styles = `component malvern-footer-link-list ${params.styles || ''}`.trim();
  const id = params.RenderingIdentifier;

  const renderContent = () => {
    if (!datasource) {
      return <p className="text-sm text-white/50">Link list</p>;
    }

    const results = datasource.children?.results ?? [];
    const links = results
      .filter((element) => element?.field?.link)
      .map((element, index) => (
        <LinkListItem
          key={`${index}-${element.field?.link}`}
          index={index}
          total={results.length}
          field={element.field.link}
        />
      ));

    return (
      <div className="text-left">
        <Text
          tag="h4"
          field={datasource.field?.title}
          className="c-footer__subtitle relative mb-7 block pb-2 text-left text-base leading-tight font-bold text-white after:absolute after:bottom-1 after:left-0 after:h-px after:w-[15px] after:bg-[#3d7b87] after:content-[''] lg:text-lg"
        />
        <ul className="m-0 list-none space-y-2.5 p-0">{links}</ul>
      </div>
    );
  };

  return (
    <div className={styles} id={id}>
      <div className="component-content">{renderContent()}</div>
    </div>
  );
};
