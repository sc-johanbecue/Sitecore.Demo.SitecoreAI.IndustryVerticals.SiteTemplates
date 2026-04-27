'use client';

import { createContext, useContext } from 'react';
import type { TextField } from '@sitecore-content-sdk/nextjs';

/**
 * Shared state between MalvernTabbedExplorerSection (tab strip) and MalvernTabExplorerTab (panels).
 */

export type MalvernTabbedExplorerApi = {
  activeTab: number;
  setActiveTab: (index: number) => void;
  registerTab: (tabIndex: number, label: TextField) => void;
  unregisterTab: (tabIndex: number) => void;
  /**
   * Layout order of MalvernTabExplorerTab renderings in the tabs placeholder (0-based).
   * Returns null when the parent layout snapshot has no entry (common in EE / partial trees).
   */
  getTabOrderIndex: (renderingUid: string) => number | null;
  /**
   * Stable 0..n-1 index for this render pass when layout order is unknown.
   * Call once per tab during render; resets at the start of each MalvernTabbedExplorerSection render.
   */
  allocateSequentialTabIndex: () => number;
  baseId: string;
};

export const MalvernTabbedExplorerContext = createContext<MalvernTabbedExplorerApi | null>(null);

export function useMalvernTabbedExplorerApi(): MalvernTabbedExplorerApi {
  const v = useContext(MalvernTabbedExplorerContext);
  if (!v) {
    throw new Error('MalvernTabExplorerTab must be rendered inside MalvernTabbedExplorerSection.');
  }
  return v;
}
