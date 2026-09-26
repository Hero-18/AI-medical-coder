/**
 * ICD-11 Scalable Data Types
 * Designed for handling 10,000+ codes efficiently
 */

export type ICD11CodeType = 'chapter' | 'block' | 'category' | 'code';

// Minimal index entry for fast lookups (small memory footprint)
export interface ICD11IndexEntry {
  code: string;
  name: string;
  chapter: string;
  codeType: ICD11CodeType;
  parentCode?: string;
}

// Full entry with all clinical data (loaded on demand)
export interface ICD11Entry extends ICD11IndexEntry {
  foundationUri?: string;
  chapterTitle: string;
  block: string;
  blockRange?: string;
  category: string;
  definition: string;
  inclusions?: string[];
  exclusions?: string[];
  codingNotes?: string[];
  causes: string[];
  symptoms: string[];
  prevention: string[];
  precautions: string[];
  management: string[];
  synonyms?: string[];
  indexTerms?: string[];
}

// Chapter metadata
export interface ICD11Chapter {
  code: string;
  title: string;
  range: string;
  entryCount?: number;
}

// Search/filter parameters
export interface ICD11SearchParams {
  query?: string;
  chapter?: string;
  codeType?: ICD11CodeType;
  parentCode?: string;
  limit?: number;
  offset?: number;
}

// Paginated response
export interface ICD11PaginatedResult {
  items: ICD11Entry[];
  total: number;
  limit: number;
  offset: number;
  hasMore: boolean;
}

// Index statistics
export interface ICD11IndexStats {
  totalCodes: number;
  byChapter: Record<string, number>;
  byCodeType: Record<ICD11CodeType, number>;
  lastUpdated: string;
}
