/**
 * ICD-11 Data Loader
 * Handles lazy loading and initialization of ICD-11 data
 * Supports future expansion to external JSON files or APIs
 */

import { ICD11Entry, ICD11Chapter } from './icd11-types';
import { icd11Index } from './icd11-index';
import { icd11Data, ICD11_CHAPTERS } from './icd11-sample';

// Loading state management
let loadingPromise: Promise<void> | null = null;
let isLoaded = false;

/**
 * Initialize the ICD-11 index with data
 * Call this once at app startup or when data is first needed
 */
export async function initializeICD11(): Promise<void> {
  if (isLoaded) return;
  
  if (loadingPromise) {
    return loadingPromise;
  }
  
  loadingPromise = (async () => {
    try {
      // In production, this could fetch from:
      // - Static JSON files (chunked by chapter)
      // - Backend API
      // - IndexedDB cache
      
      await icd11Index.initialize(icd11Data, ICD11_CHAPTERS);
      isLoaded = true;
    } catch (error) {
      console.error('[ICD11Loader] Failed to initialize:', error);
      loadingPromise = null;
      throw error;
    }
  })();
  
  return loadingPromise;
}

/**
 * Get the ICD-11 index (ensures initialization)
 */
export async function getICD11Index() {
  await initializeICD11();
  return icd11Index;
}

/**
 * Search ICD-11 codes with auto-initialization
 */
export async function searchICD11(query: string, options?: {
  chapter?: string;
  limit?: number;
  offset?: number;
}) {
  await initializeICD11();
  return icd11Index.search({
    query,
    ...options,
  });
}

/**
 * Get a single entry by code
 */
export async function getICD11Entry(code: string): Promise<ICD11Entry | undefined> {
  await initializeICD11();
  return icd11Index.get(code);
}

/**
 * Get all chapters with entry counts
 */
export async function getICD11Chapters(): Promise<ICD11Chapter[]> {
  await initializeICD11();
  return icd11Index.getChapters();
}

/**
 * Get entries by chapter with pagination
 */
export async function getICD11ByChapter(chapter: string, limit = 50, offset = 0) {
  await initializeICD11();
  return icd11Index.search({ chapter, limit, offset });
}

/**
 * Get children of a parent code
 */
export async function getICD11Children(parentCode: string) {
  await initializeICD11();
  return icd11Index.getChildren(parentCode);
}

/**
 * Get index statistics
 */
export async function getICD11Stats() {
  await initializeICD11();
  return icd11Index.getStats();
}

/**
 * Check if data is loaded
 */
export function isICD11Loaded(): boolean {
  return isLoaded;
}

/**
 * Export all data as JSON (for download/backup)
 */
export async function exportICD11AsJSON(): Promise<string> {
  await initializeICD11();
  const entries = icd11Index.getAllEntries();
  return JSON.stringify({
    version: '11.0',
    exportDate: new Date().toISOString(),
    chapters: ICD11_CHAPTERS,
    entries,
  }, null, 2);
}
