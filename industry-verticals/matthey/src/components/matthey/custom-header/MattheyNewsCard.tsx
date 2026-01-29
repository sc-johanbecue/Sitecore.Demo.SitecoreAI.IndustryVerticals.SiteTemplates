import React, { JSX } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  TextField,
  Text,
  ComponentParams,
  ComponentRendering,
  GetComponentServerProps,
} from '@sitecore-content-sdk/nextjs';
import { GraphQLRequestClient } from '@sitecore-content-sdk/nextjs/client';
import scConfig from 'sitecore.config';

type Fields = {
  Label: TextField;
  Title: TextField;
  PublicationDate: TextField;
};

type ItemUrlData = {
  itemUrl: string | null;
};

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
} & ItemUrlData;

const DEFAULT_FIELDS: Fields = {
  Label: { value: 'News' },
  Title: { value: 'Half year results for the six months ended 30th September 2025' },
  PublicationDate: { value: '2025-09-30T00:00:00Z' },
};

const ITEM_URL_QUERY = `
  query($datasource: String!, $language: String!) {
    item(path: $datasource, language: $language) {
      url {
        path
      }
      displayName
    }
  }
`;

type ItemUrlQueryResult = {
  item: {
    url: {
      path: string;
    } | null;
    displayName: string;
  } | null;
};

export const getComponentServerProps: GetComponentServerProps = async (rendering, layoutData) => {
  if (!rendering.dataSource) {
    return { itemUrl: null };
  }

  const graphqlEndpoint = `https://${scConfig.api.local.apiHost}/sitecore/api/graph/edge`;
  const graphQLClient = new GraphQLRequestClient(graphqlEndpoint, {
    apiKey: scConfig.api.local.apiKey,
  });

  const result = await graphQLClient.request<ItemUrlQueryResult>(ITEM_URL_QUERY, {
    datasource: rendering.dataSource,
    language: layoutData?.sitecore?.context?.language || 'en',
  });

  return {
    itemUrl: result?.item?.url?.path || null,
  };
};

export const Default = (props: ComponentProps): JSX.Element => {
  const fields = props.fields || DEFAULT_FIELDS;
  const id = props.rendering?.uid;
  const itemUrl = props.itemUrl || '#';

  return (
    <article className="flex h-full flex-col bg-[#1e22aa] p-6" key={id}>
      <p className="mb-2 text-base font-bold text-white">
        <Text field={fields.Label} />
      </p>
      <h3 className="mb-4 grow text-sm leading-relaxed text-white">
        <Text field={fields.Title} />
      </h3>
      <Link
        href={itemUrl}
        className="mt-auto inline-flex items-center self-end text-white transition-colors hover:text-white/80"
        aria-label="Read more"
      >
        <ArrowRight className="h-5 w-5" />
      </Link>
    </article>
  );
};

export default Default;
