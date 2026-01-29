'use client';

import React, { JSX, useEffect, useState } from 'react';
import { TextField, Text, ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';

type Fields = {
  Label: TextField;
  ApiUrl: TextField;
};

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

type SharePriceData = {
  symbol: string;
  currency: string;
  regularMarketPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
  marketTimeISO: string;
};

const DEFAULT_FIELDS: Fields = {
  Label: { value: 'Share Price' },
  ApiUrl: { value: '/api/share-price' },
};

function formatPrice(price: number): string {
  return price.toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatChange(change: number): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}`;
}

function formatChangePercent(percent: number): string {
  const sign = percent >= 0 ? '+' : '';
  return `(${sign}${percent.toFixed(2)}%)`;
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export const Default = (props: ComponentProps): JSX.Element => {
  const fields = props.fields || DEFAULT_FIELDS;
  const id = props.rendering?.uid;
  const apiUrl = (fields.ApiUrl?.value as string) || DEFAULT_FIELDS.ApiUrl.value;

  const [data, setData] = useState<SharePriceData | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl as string);
        if (response.ok) {
          const json = await response.json();
          setData(json);
        }
      } catch (error) {
        console.error('Failed to fetch share price:', error);
      }
    }

    fetchData();

    // Refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  if (!data) {
    return (
      <div className="h-full bg-[#1e22aa] p-6" key={id}>
        <p className="mb-2 text-sm text-white/70">
          <Text field={fields.Label} />
        </p>
        <div className="animate-pulse">
          <div className="mb-2 h-8 w-32 rounded bg-white/20" />
          <div className="h-4 w-24 rounded bg-white/20" />
        </div>
      </div>
    );
  }

  const isNegative = data.change < 0;

  return (
    <div className="h-full bg-[#1e22aa] p-6" key={id}>
      <p className="mb-2 text-sm text-white/70">
        <Text field={fields.Label} />
      </p>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-2xl font-light text-white md:text-3xl">
          {formatPrice(data.regularMarketPrice)}
        </span>
        <span className="text-xs text-white/70">{data.currency}</span>
        <span className={`text-sm ${isNegative ? 'text-[#e8b4c8]' : 'text-green-300'}`}>
          {formatChange(data.change)} {formatChangePercent(data.changePercent)}
        </span>
      </div>
      <p className="mt-1 text-sm text-white/70">{formatDate(data.marketTimeISO)}</p>
    </div>
  );
};

export default Default;
