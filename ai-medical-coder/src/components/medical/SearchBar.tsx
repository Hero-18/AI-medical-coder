import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useICD11Search } from "@/hooks/use-icd11";
import type { ICD11Entry } from "@/data/icd11-types";

interface SearchBarProps {
  onSelect: (entry: ICD11Entry) => void;
  placeholder?: string;
}

export function SearchBar({ onSelect, placeholder = "Search diseases, symptoms, or ICD-11 codes..." }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use the scalable search hook with debouncing
  const { result, isLoading } = useICD11Search(
    { query: query.trim(), limit: 10 },
    200
  );

  const results = result?.items || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setIsOpen(false);
      return;
    }
    if (results.length > 0 || !isLoading) {
      setIsOpen(true);
    }
  }, [query, results.length, isLoading]);

  const handleSelect = (entry: ICD11Entry) => {
    onSelect(entry);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-12 pr-12 h-14 text-base rounded-2xl border-2 focus:border-primary bg-card shadow-md"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
              inputRef.current?.focus();
            }}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border border-border shadow-lg overflow-hidden z-50"
          >
            <div className="max-h-96 overflow-y-auto">
              {results.map((entry, index) => (
                <motion.button
                  key={entry.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleSelect(entry)}
                  className="w-full px-4 py-3 text-left hover:bg-accent transition-colors border-b border-border/50 last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                          {entry.code}
                        </span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {entry.codeType}
                        </span>
                        <span className="font-medium text-foreground truncate">
                          {entry.name}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {entry.definition}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
            {result && result.total > results.length && (
              <div className="px-4 py-2 text-xs text-center text-muted-foreground border-t border-border bg-muted/50">
                Showing {results.length} of {result.total.toLocaleString()} results
              </div>
            )}
          </motion.div>
        )}

        {isOpen && query && results.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border border-border shadow-lg p-6 text-center z-50"
          >
            <p className="text-muted-foreground">
              ICD-11 code not available in dataset
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Try searching with different keywords
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
