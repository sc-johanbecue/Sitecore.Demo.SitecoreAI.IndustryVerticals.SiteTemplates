'use client';

import { type JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  TextField,
  Text,
  Placeholder,
  type ComponentRendering,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import {
  MalvernTabbedExplorerContext,
  type MalvernTabbedExplorerApi,
} from './MalvernTabbedExplorerContext';

function buildTabOrderIndexByUid(
  rendering: ComponentRendering,
  placeholderKey: string
): Map<string, number> {
  const map = new Map<string, number>();
  const raw = rendering as ComponentRendering & {
    placeholders?: Record<string, Array<{ uid?: string; id?: string; componentName?: string }>>;
  };
  const list = raw.placeholders?.[placeholderKey];
  if (!Array.isArray(list)) return map;

  let i = 0;
  for (const item of list) {
    if (item?.componentName === 'MalvernTabExplorerTab') {
      const key = item.uid ?? item.id;
      if (key) map.set(key, i);
      i++;
    }
  }
  return map;
}

/**
 * MalvernTabbedExplorerSection
 * Section title + tab strip (labels come from child MalvernTabExplorerTab via context) +
 * one placeholder for tab components. Each tab owns its cards placeholder and footer CTA copy.
 */

interface Fields {
  Title: TextField;
}

const defaultFields: Fields = {
  Title: { value: 'Browse our range of award winning technologies' },
};

export type MalvernTabbedExplorerSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: MalvernTabbedExplorerSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles, DynamicPlaceholderId } = props.params;
  const fields = { ...defaultFields, ...(props.fields || {}) } as Fields;

  const baseId = id || 'malvern-tabbed-explorer';
  const dph = DynamicPlaceholderId ?? '';
  const phTabs = `malvern-tabbed-explorer-tabs-${dph}`;

  const tabOrderIndexByUid = useMemo(
    () => buildTabOrderIndexByUid(props.rendering, phTabs),
    [props.rendering, phTabs]
  );

  const getTabOrderIndex = useCallback(
    (renderingUid: string): number | null => {
      if (!renderingUid) return null;
      return tabOrderIndexByUid.get(renderingUid) ?? null;
    },
    [tabOrderIndexByUid]
  );

  const seqRef = useRef(0);
  seqRef.current = 0;
  const allocateSequentialTabIndex = useCallback(() => seqRef.current++, []);

  const [activeTab, setActiveTab] = useState(0);
  const [tabLabels, setTabLabels] = useState<Record<number, TextField>>({});

  const registerTab = useCallback((tabIndex: number, label: TextField) => {
    setTabLabels((prev) => {
      const prevVal = prev[tabIndex]?.value;
      const nextVal = label?.value;
      if (prevVal === nextVal) return prev;
      return { ...prev, [tabIndex]: label };
    });
  }, []);

  const unregisterTab = useCallback((tabIndex: number) => {
    setTabLabels((prev) => {
      if (!(tabIndex in prev)) return prev;
      const next = { ...prev };
      delete next[tabIndex];
      return next;
    });
  }, []);

  const tabButtons = useMemo(
    () =>
      Object.keys(tabLabels)
        .map((k) => Number(k))
        .filter((n) => Number.isFinite(n))
        .sort((a, b) => a - b)
        .map((index) => ({ index, label: tabLabels[index]! })),
    [tabLabels]
  );

  useEffect(() => {
    const keys = tabButtons.map((b) => b.index);
    if (keys.length === 0) return;
    if (!keys.includes(activeTab)) {
      setActiveTab(keys[0]!);
    }
  }, [tabButtons, activeTab]);

  const contextValue = useMemo<MalvernTabbedExplorerApi>(
    () => ({
      activeTab,
      setActiveTab,
      registerTab,
      unregisterTab,
      getTabOrderIndex,
      allocateSequentialTabIndex,
      baseId,
    }),
    [activeTab, registerTab, unregisterTab, getTabOrderIndex, allocateSequentialTabIndex, baseId]
  );

  return (
    <section
      className={`component malvern-tabbed-explorer-section bg-white py-12 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <MalvernTabbedExplorerContext.Provider value={contextValue}>
        <div className="mx-auto max-w-7xl px-4">
          <Text
            tag="h2"
            field={fields.Title}
            className="mb-8 text-left text-2xl font-bold text-[#0a1f24] lg:mb-10 lg:text-3xl"
          />

          <div
            className="mb-6 flex flex-wrap justify-start gap-8 border-b border-gray-200 lg:mb-8 lg:gap-10"
            role="tablist"
            aria-label="Product explorer categories"
          >
            {tabButtons.map(({ index, label }) => (
              <button
                key={index}
                type="button"
                role="tab"
                id={`${baseId}-tab-${index}`}
                aria-selected={activeTab === index}
                aria-controls={`${baseId}-tabpanel-${index}`}
                onClick={() => setActiveTab(index)}
                className={`shrink-0 border-b-[3px] pb-3 text-sm font-semibold transition-colors lg:text-base ${
                  activeTab === index
                    ? 'border-[#005eb8] text-[#005eb8]'
                    : 'border-transparent text-[#0f2940] hover:text-[#005eb8]'
                }`}
              >
                <Text tag="span" field={label} className="inline" />
              </button>
            ))}
          </div>

          <Placeholder name={phTabs} rendering={props.rendering} />
        </div>
      </MalvernTabbedExplorerContext.Provider>
    </section>
  );
};
