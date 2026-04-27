'use client';

import { type JSX, useLayoutEffect, useMemo } from 'react';
import {
  TextField,
  Text,
  LinkField,
  Link as SitecoreLink,
  Placeholder,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { useMalvernTabbedExplorerApi } from './MalvernTabbedExplorerContext';

/**
 * MalvernTabExplorerTab
 * One logical tab: label (for strip via context), cards placeholder, per-tab footer CTA band.
 *
 * Tab order: taken from layout order in the section placeholder (each rendering `uid` → index).
 * Optional rendering param **TabIndex** overrides that when set to a non-negative integer.
 * Placeholder for cards: **malvern-tab-explorer-cards-{DynamicPlaceholderId}** on this rendering.
 */

interface Fields {
  TabLabel: TextField;
  FooterHeading: TextField;
  FooterCTAText: TextField;
  FooterCTALink: LinkField;
}

const defaultFields: Fields = {
  TabLabel: { value: 'Technologies' },
  FooterHeading: { value: 'Explore our full range of technologies' },
  FooterCTAText: { value: 'View all technologies' },
  FooterCTALink: { value: { href: '/technologies' } },
};

function parseOptionalTabIndex(params: Record<string, string | undefined>): number | null {
  const raw = params.TabIndex;
  if (raw === undefined || raw === '') return null;
  const n = Number.parseInt(String(raw), 10);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export type MalvernTabExplorerTabProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernTabExplorerTabProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = { ...defaultFields, ...(props.fields || {}) } as Fields;
  const ctx = useMalvernTabbedExplorerApi();
  const params = props.params as Record<string, string | undefined>;
  const explicitIndex = parseOptionalTabIndex(params);
  const rendering = props.rendering as { uid?: string; id?: string };
  const uid = rendering?.uid ?? rendering?.id ?? '';
  const fromLayout = uid ? ctx.getTabOrderIndex(uid) : null;
  const tabIndex =
    explicitIndex !== null
      ? explicitIndex
      : fromLayout !== null
        ? fromLayout
        : ctx.allocateSequentialTabIndex();

  const labelFingerprint = useMemo(
    () => String((fields.TabLabel?.value as string | undefined) ?? ''),
    [fields.TabLabel?.value]
  );

  useLayoutEffect(() => {
    ctx.registerTab(tabIndex, fields.TabLabel);
    return () => {
      ctx.unregisterTab(tabIndex);
    };
  }, [ctx.registerTab, ctx.unregisterTab, tabIndex, labelFingerprint, fields.TabLabel]);

  const dph = DynamicPlaceholderId ?? '';
  const phCards = `malvern-tab-explorer-cards-${dph}`;

  const panelId = `${ctx.baseId}-tabpanel-${tabIndex}`;
  const tabId = `${ctx.baseId}-tab-${tabIndex}`;
  const isActive = ctx.activeTab === tabIndex;

  return (
    <div
      className={`malvern-tab-explorer-tab component ${styles || ''} ${isActive ? '' : 'hidden'}`}
      data-rendering-id={id}
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      aria-hidden={!isActive}
      hidden={!isActive}
    >
      <div className="malvern-tab-explorer-scroll -mx-4 mb-10 overflow-x-auto overflow-y-visible px-4 pb-1 [scrollbar-gutter:stable] sm:mx-0 sm:mb-12 sm:overflow-x-visible sm:px-0 sm:pb-0">
        <div className="malvern-tab-explorer-grid flex w-max min-w-0 flex-nowrap justify-start gap-4 sm:w-full sm:flex-wrap sm:justify-center sm:gap-5 lg:gap-6">
          <Placeholder name={phCards} rendering={props.rendering} />
        </div>
      </div>

      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 bg-[#e8f4f8] py-8 lg:py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <Text
            tag="p"
            field={fields.FooterHeading}
            className="text-center text-lg leading-snug font-bold text-[#0a1f24] sm:text-left sm:text-xl"
          />
          <div className="flex shrink-0 justify-center sm:justify-end">
            <SitecoreLink
              field={fields.FooterCTALink}
              className="inline-flex items-center justify-center rounded-md bg-[#00A651] px-8 py-3 text-sm font-semibold whitespace-nowrap text-white no-underline transition-colors hover:bg-[#008f45]"
            >
              <Text tag="span" field={fields.FooterCTAText} className="inline" />
            </SitecoreLink>
          </div>
        </div>
      </div>

      <style jsx>{`
        .malvern-tab-explorer-grid > :global(*):not(:global(.malvern-tab-explorer-card)) {
          display: contents;
        }
        .malvern-tab-explorer-grid :global(.malvern-tab-explorer-card) {
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          min-width: 0;
          min-height: 0;
          align-self: stretch;
          flex: 0 0 min(85vw, 17.5rem);
          width: min(85vw, 17.5rem);
          max-width: min(85vw, 17.5rem);
        }
        @media (min-width: 640px) {
          .malvern-tab-explorer-grid :global(.malvern-tab-explorer-card) {
            flex: 0 0 calc((100% - 1.25rem) / 2);
            width: calc((100% - 1.25rem) / 2);
            max-width: calc((100% - 1.25rem) / 2);
          }
        }
        @media (min-width: 1024px) {
          .malvern-tab-explorer-grid :global(.malvern-tab-explorer-card) {
            flex: 0 0 calc((100% - 4.5rem) / 4);
            width: calc((100% - 4.5rem) / 4);
            max-width: calc((100% - 4.5rem) / 4);
          }
        }
      `}</style>
    </div>
  );
};
