/**
 * ICD-11 Search Index
 * Provides fast lookups using in-memory indexes
 * Designed for scalability with 10,000+ codes
 */

import { 
  ICD11Entry, 
  ICD11IndexEntry, 
  ICD11Chapter,
  ICD11SearchParams, 
  ICD11PaginatedResult,
  ICD11IndexStats,
  ICD11CodeType
} from './icd11-types';

class ICD11Index {
  // Primary data store
  private entries: Map<string, ICD11Entry> = new Map();
  
  // Indexes for fast lookups
  private byChapter: Map<string, Set<string>> = new Map();
  private byCodeType: Map<ICD11CodeType, Set<string>> = new Map();
  private byParent: Map<string, Set<string>> = new Map();
  private byBlock: Map<string, Set<string>> = new Map();
  
  // Search index (lowercase name/synonyms -> codes)
  private searchIndex: Map<string, Set<string>> = new Map();
  
  // Metadata
  private chapters: ICD11Chapter[] = [];
  private initialized = false;
  private stats: ICD11IndexStats | null = null;

  /**
   * Initialize the index with data
   */
  async initialize(data: ICD11Entry[], chapters: ICD11Chapter[]): Promise<void> {
    if (this.initialized) return;
    
    console.log(`[ICD11Index] Initializing with ${data.length} entries...`);
    const startTime = performance.now();
    
    this.chapters = chapters;
    
    // Process entries in batches for better performance
    const BATCH_SIZE = 500;
    for (let i = 0; i < data.length; i += BATCH_SIZE) {
      const batch = data.slice(i, i + BATCH_SIZE);
      this.processBatch(batch);
      
      // Yield to main thread periodically
      if (i % 2000 === 0 && i > 0) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
    
    this.buildStats();
    this.initialized = true;
    
    const elapsed = performance.now() - startTime;
    console.log(`[ICD11Index] Initialized in ${elapsed.toFixed(2)}ms`);
  }

  private processBatch(entries: ICD11Entry[]): void {
    for (const entry of entries) {
      // Store the entry
      this.entries.set(entry.code, entry);
      
      // Index by chapter
      if (!this.byChapter.has(entry.chapter)) {
        this.byChapter.set(entry.chapter, new Set());
      }
      this.byChapter.get(entry.chapter)!.add(entry.code);
      
      // Index by code type
      if (!this.byCodeType.has(entry.codeType)) {
        this.byCodeType.set(entry.codeType, new Set());
      }
      this.byCodeType.get(entry.codeType)!.add(entry.code);
      
      // Index by parent
      if (entry.parentCode) {
        if (!this.byParent.has(entry.parentCode)) {
          this.byParent.set(entry.parentCode, new Set());
        }
        this.byParent.get(entry.parentCode)!.add(entry.code);
      }
      
      // Index by block
      if (!this.byBlock.has(entry.block)) {
        this.byBlock.set(entry.block, new Set());
      }
      this.byBlock.get(entry.block)!.add(entry.code);
      
      // Build search index
      this.indexForSearch(entry);
    }
  }

  private indexForSearch(entry: ICD11Entry): void {
    const terms: string[] = [];
    
    // Add name tokens
    terms.push(...this.tokenize(entry.name));
    
    // Add code (exact match)
    terms.push(entry.code.toLowerCase());
    
    // Add synonyms
    if (entry.synonyms) {
      for (const syn of entry.synonyms) {
        terms.push(...this.tokenize(syn));
      }
    }
    
    // Add index terms
    if (entry.indexTerms) {
      for (const term of entry.indexTerms) {
        terms.push(...this.tokenize(term));
      }
    }
    
    // Add to search index
    for (const term of terms) {
      if (term.length < 2) continue;
      if (!this.searchIndex.has(term)) {
        this.searchIndex.set(term, new Set());
      }
      this.searchIndex.get(term)!.add(entry.code);
    }
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(t => t.length >= 2);
  }

  private buildStats(): void {
    const byChapter: Record<string, number> = {};
    for (const [chapter, codes] of this.byChapter) {
      byChapter[chapter] = codes.size;
    }
    
    const byCodeType: Record<ICD11CodeType, number> = {
      chapter: this.byCodeType.get('chapter')?.size || 0,
      block: this.byCodeType.get('block')?.size || 0,
      category: this.byCodeType.get('category')?.size || 0,
      code: this.byCodeType.get('code')?.size || 0,
    };
    
    this.stats = {
      totalCodes: this.entries.size,
      byChapter,
      byCodeType,
      lastUpdated: new Date().toISOString(),
    };
  }

  /**
   * Get a single entry by code
   */
  get(code: string): ICD11Entry | undefined {
    return this.entries.get(code);
  }

  /**
   * Check if a code exists
   */
  has(code: string): boolean {
    return this.entries.has(code);
  }

  /**
   * Get all children of a code
   */
  getChildren(parentCode: string): ICD11Entry[] {
    const childCodes = this.byParent.get(parentCode);
    if (!childCodes) return [];
    return Array.from(childCodes).map(code => this.entries.get(code)!);
  }

  /**
   * Get all entries in a chapter
   */
  getByChapter(chapter: string, limit?: number, offset = 0): ICD11Entry[] {
    const codes = this.byChapter.get(chapter);
    if (!codes) return [];
    
    const codeArray = Array.from(codes);
    const sliced = limit 
      ? codeArray.slice(offset, offset + limit)
      : codeArray.slice(offset);
    
    return sliced.map(code => this.entries.get(code)!);
  }

  /**
   * Get all entries in a block
   */
  getByBlock(block: string): ICD11Entry[] {
    const codes = this.byBlock.get(block);
    if (!codes) return [];
    return Array.from(codes).map(code => this.entries.get(code)!);
  }

  /**
   * Search entries with pagination
   */
  search(params: ICD11SearchParams): ICD11PaginatedResult {
    const { query, chapter, codeType, parentCode, limit = 20, offset = 0 } = params;
    
    let candidateCodes: Set<string> | null = null;
    
    // Apply filters
    if (chapter) {
      candidateCodes = this.byChapter.get(chapter) || new Set();
    }
    
    if (codeType) {
      const typeCodes = this.byCodeType.get(codeType) || new Set();
      if (candidateCodes) {
        candidateCodes = new Set([...candidateCodes].filter(c => typeCodes.has(c)));
      } else {
        candidateCodes = typeCodes;
      }
    }
    
    if (parentCode) {
      const childCodes = this.byParent.get(parentCode) || new Set();
      if (candidateCodes) {
        candidateCodes = new Set([...candidateCodes].filter(c => childCodes.has(c)));
      } else {
        candidateCodes = childCodes;
      }
    }
    
    // Apply text search
    if (query && query.trim()) {
      const searchResults = this.textSearch(query);
      if (candidateCodes) {
        candidateCodes = new Set([...candidateCodes].filter(c => searchResults.has(c)));
      } else {
        candidateCodes = searchResults;
      }
    }
    
    // If no filters, use all entries
    if (!candidateCodes) {
      candidateCodes = new Set(this.entries.keys());
    }
    
    // Convert to array and sort
    const sortedCodes = Array.from(candidateCodes).sort();
    const total = sortedCodes.length;
    
    // Apply pagination
    const paginatedCodes = sortedCodes.slice(offset, offset + limit);
    const items = paginatedCodes.map(code => this.entries.get(code)!);
    
    return {
      items,
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    };
  }

  private textSearch(query: string): Set<string> {
    const terms = this.tokenize(query);
    if (terms.length === 0) return new Set();
    
    // Get matches for first term
    let results: Set<string> | null = null;
    
    for (const term of terms) {
      const termMatches = new Set<string>();
      
      // Exact match
      const exactMatches = this.searchIndex.get(term);
      if (exactMatches) {
        for (const code of exactMatches) {
          termMatches.add(code);
        }
      }
      
      // Prefix match (for partial queries)
      if (term.length >= 3) {
        for (const [indexTerm, codes] of this.searchIndex) {
          if (indexTerm.startsWith(term)) {
            for (const code of codes) {
              termMatches.add(code);
            }
          }
        }
      }
      
      // Intersect with previous results (AND logic)
      if (results === null) {
        results = termMatches;
      } else {
        results = new Set([...results].filter(c => termMatches.has(c)));
      }
    }
    
    return results || new Set();
  }

  /**
   * Get index statistics
   */
  getStats(): ICD11IndexStats | null {
    return this.stats;
  }

  /**
   * Get all chapters with entry counts
   */
  getChapters(): ICD11Chapter[] {
    return this.chapters.map(ch => ({
      ...ch,
      entryCount: this.byChapter.get(ch.code)?.size || 0,
    }));
  }

  /**
   * Get unique blocks in a chapter
   */
  getBlocks(chapter: string): string[] {
    const blocks = new Set<string>();
    const chapterCodes = this.byChapter.get(chapter);
    if (!chapterCodes) return [];
    
    for (const code of chapterCodes) {
      const entry = this.entries.get(code);
      if (entry) blocks.add(entry.block);
    }
    
    return Array.from(blocks).sort();
  }

  /**
   * Get all entries as array (for export/compatibility)
   */
  getAllEntries(): ICD11Entry[] {
    return Array.from(this.entries.values());
  }

  /**
   * Get entry count
   */
  get size(): number {
    return this.entries.size;
  }

  /**
   * Check if initialized
   */
  get isInitialized(): boolean {
    return this.initialized;
  }
}

// Singleton instance
export const icd11Index = new ICD11Index();
