/**
 * React hooks for ICD-11 data access
 * Provides easy-to-use hooks with loading states
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  ICD11Entry, 
  ICD11Chapter, 
  ICD11PaginatedResult, 
  ICD11IndexStats,
  ICD11SearchParams 
} from '@/data/icd11-types';
import { 
  initializeICD11, 
  isICD11Loaded,
  searchICD11,
  getICD11Entry,
  getICD11Chapters,
  getICD11Stats,
  getICD11Children,
} from '@/data/icd11-loader';
import { icd11Index } from '@/data/icd11-index';

/**
 * Hook to ensure ICD-11 data is loaded
 */
export function useICD11Init() {
  const [isLoading, setIsLoading] = useState(!isICD11Loaded());
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    if (isICD11Loaded()) {
      setIsLoading(false);
      return;
    }
    
    initializeICD11()
      .then(() => setIsLoading(false))
      .catch(err => {
        setError(err);
        setIsLoading(false);
      });
  }, []);
  
  return { isLoading, error, isReady: !isLoading && !error };
}

/**
 * Hook for searching ICD-11 codes with debouncing
 */
export function useICD11Search(params: ICD11SearchParams, debounceMs = 300) {
  const [result, setResult] = useState<ICD11PaginatedResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const { isReady } = useICD11Init();
  
  useEffect(() => {
    if (!isReady) return;
    
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const searchResult = icd11Index.search(params);
        setResult(searchResult);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }, params.query ? debounceMs : 0);
    
    return () => clearTimeout(timeoutId);
  }, [isReady, params.query, params.chapter, params.codeType, params.limit, params.offset, debounceMs]);
  
  return { result, isLoading, error };
}

/**
 * Hook for getting a single ICD-11 entry
 */
export function useICD11Entry(code: string | undefined) {
  const [entry, setEntry] = useState<ICD11Entry | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  
  const { isReady } = useICD11Init();
  
  useEffect(() => {
    if (!isReady || !code) {
      setIsLoading(false);
      return;
    }
    
    setEntry(icd11Index.get(code));
    setIsLoading(false);
  }, [isReady, code]);
  
  return { entry, isLoading };
}

/**
 * Hook for getting all chapters
 */
export function useICD11Chapters() {
  const [chapters, setChapters] = useState<ICD11Chapter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { isReady } = useICD11Init();
  
  useEffect(() => {
    if (!isReady) return;
    
    setChapters(icd11Index.getChapters());
    setIsLoading(false);
  }, [isReady]);
  
  return { chapters, isLoading };
}

/**
 * Hook for getting children of a parent code
 */
export function useICD11Children(parentCode: string | undefined) {
  const [children, setChildren] = useState<ICD11Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { isReady } = useICD11Init();
  
  useEffect(() => {
    if (!isReady || !parentCode) {
      setChildren([]);
      setIsLoading(false);
      return;
    }
    
    setChildren(icd11Index.getChildren(parentCode));
    setIsLoading(false);
  }, [isReady, parentCode]);
  
  return { children, isLoading };
}

/**
 * Hook for getting index statistics
 */
export function useICD11Stats() {
  const [stats, setStats] = useState<ICD11IndexStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { isReady } = useICD11Init();
  
  useEffect(() => {
    if (!isReady) return;
    
    setStats(icd11Index.getStats());
    setIsLoading(false);
  }, [isReady]);
  
  return { stats, isLoading };
}

/**
 * Hook for paginated browsing with load-more functionality
 */
export function useICD11Paginated(params: Omit<ICD11SearchParams, 'offset'>) {
  const [items, setItems] = useState<ICD11Entry[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const { isReady } = useICD11Init();
  const limit = params.limit || 20;
  
  // Reset when params change
  useEffect(() => {
    setItems([]);
    setOffset(0);
    setHasMore(true);
    setTotal(0);
  }, [params.query, params.chapter, params.codeType]);
  
  // Load initial page
  useEffect(() => {
    if (!isReady) return;
    
    setIsLoading(true);
    const result = icd11Index.search({ ...params, limit, offset: 0 });
    setItems(result.items);
    setTotal(result.total);
    setHasMore(result.hasMore);
    setOffset(limit);
    setIsLoading(false);
  }, [isReady, params.query, params.chapter, params.codeType, limit]);
  
  const loadMore = useCallback(() => {
    if (!isReady || isLoading || !hasMore) return;
    
    setIsLoading(true);
    const result = icd11Index.search({ ...params, limit, offset });
    setItems(prev => [...prev, ...result.items]);
    setHasMore(result.hasMore);
    setOffset(prev => prev + limit);
    setIsLoading(false);
  }, [isReady, isLoading, hasMore, params, limit, offset]);
  
  return { items, total, hasMore, isLoading, loadMore };
}
