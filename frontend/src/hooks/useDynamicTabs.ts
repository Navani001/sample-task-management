'use client';

import { useState, useCallback } from 'react';
import type { TabItem } from '@/component/tab';

interface UseDynamicTabsReturn {
  tabs: TabItem[];
  selectedKey: string | undefined;
  setSelectedKey: (key: string) => void;
  clearTabs: () => void;
}

export const useDynamicTabs = (initialTabs: TabItem[] = [], initialSelectedKey?: string): UseDynamicTabsReturn => {
  const [tabs, setTabs] = useState<TabItem[]>(initialTabs);
  const [selectedKey, setSelectedKey] = useState<string | undefined>(initialSelectedKey);
  const clearTabs = useCallback(() => {
    setTabs([]);
    setSelectedKey(undefined);
  }, []);

  return {
    tabs,
    selectedKey,
    setSelectedKey,
    clearTabs,
  };
};