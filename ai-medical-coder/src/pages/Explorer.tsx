import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, ChevronDown, BookOpen, Loader2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DiseaseCard } from "@/components/medical/DiseaseCard";
import { useICD11Init, useICD11Search, useICD11Chapters } from "@/hooks/use-icd11";
import type { ICD11Entry } from "@/data/icd11-types";

export default function Explorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<ICD11Entry | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 20;

  const { isLoading: isInitializing, isReady } = useICD11Init();
  const { chapters } = useICD11Chapters();

  // Search params with memoization to prevent unnecessary re-renders
  const searchParams = useMemo(() => ({
    query: searchQuery,
    chapter: selectedChapter || undefined,
    limit: pageSize,
    offset: page * pageSize,
  }), [searchQuery, selectedChapter, page]);

  const { result, isLoading: isSearching } = useICD11Search(searchParams);

  const filteredData = result?.items || [];
  const total = result?.total || 0;
  const hasMore = result?.hasMore || false;
  const isLoading = isInitializing || isSearching;

  // Reset page when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(0);
  };

  const handleChapterChange = (chapter: string | null) => {
    setSelectedChapter(chapter);
    setPage(0);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            ICD-11 Code Database
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            ICD-11 Explorer
          </h1>
          <p className="text-muted-foreground">
            Browse and search the ICD-11 classification database
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar / Filters */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-elevated p-4 sticky top-24"
            >
              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder="Search codes, diseases..."
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Chapter Filter */}
              <div>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center justify-between w-full text-sm font-medium mb-2"
                >
                  <span className="flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter by Chapter
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden max-h-64 overflow-y-auto"
                    >
                      <Button
                        variant={selectedChapter === null ? "secondary" : "ghost"}
                        size="sm"
                        onClick={() => handleChapterChange(null)}
                        className="w-full justify-start text-left"
                      >
                        All Chapters
                      </Button>
                      {chapters.map((chapter) => (
                        <Button
                          key={chapter.code}
                          variant={selectedChapter === chapter.code ? "secondary" : "ghost"}
                          size="sm"
                          onClick={() => handleChapterChange(chapter.code)}
                          className="w-full justify-start text-left text-xs"
                        >
                          <span className="truncate">{chapter.code}: {chapter.title}</span>
                          {chapter.entryCount !== undefined && (
                            <span className="ml-auto text-muted-foreground">({chapter.entryCount})</span>
                          )}
                        </Button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    <>
                      Showing <span className="font-medium text-foreground">{filteredData.length}</span> of{" "}
                      <span className="font-medium text-foreground">{total.toLocaleString()}</span> entries
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {selectedEntry ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => setSelectedEntry(null)}
                  className="mb-4"
                >
                  ← Back to list
                </Button>
                <DiseaseCard entry={selectedEntry} />
              </motion.div>
            ) : (
              <div className="space-y-4">
                {!isReady ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <>
                    {filteredData.map((entry, index) => (
                      <motion.button
                        key={entry.code}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(index * 0.03, 0.3) }}
                        onClick={() => setSelectedEntry(entry)}
                        className="w-full text-left card-elevated-hover p-5"
                      >
                        <div className="flex items-start gap-4">
                          <div className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                            {entry.code}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg mb-1">{entry.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {entry.definition}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                                {entry.codeType}
                              </span>
                              <span className="text-xs px-2 py-1 rounded-md bg-accent text-accent-foreground">
                                {entry.category}
                              </span>
                              {entry.symptoms.length > 0 && (
                                <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                                  {entry.symptoms.length} symptoms
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.button>
                    ))}

                    {/* Pagination */}
                    {total > pageSize && (
                      <div className="flex items-center justify-center gap-4 pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setPage(p => Math.max(0, p - 1))}
                          disabled={page === 0 || isLoading}
                        >
                          Previous
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          Page {page + 1} of {Math.ceil(total / pageSize)}
                        </span>
                        <Button
                          variant="outline"
                          onClick={() => setPage(p => p + 1)}
                          disabled={!hasMore || isLoading}
                        >
                          Next
                        </Button>
                      </div>
                    )}

                    {filteredData.length === 0 && !isLoading && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                      >
                        <p className="text-muted-foreground">No matching entries found</p>
                        <Button
                          variant="link"
                          onClick={() => {
                            handleSearchChange("");
                            handleChapterChange(null);
                          }}
                        >
                          Clear filters
                        </Button>
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
