import { motion } from "framer-motion";
import { 
  Stethoscope, 
  AlertTriangle, 
  Shield, 
  Heart, 
  Activity,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileCode,
  Layers,
  Info,
  XCircle
} from "lucide-react";
import { useState } from "react";
import type { ICD11Entry } from "@/data/icd11-types";
import { Button } from "@/components/ui/button";

interface DiseaseCardProps {
  entry: ICD11Entry;
  onClose?: () => void;
}

interface InfoSectionProps {
  title: string;
  icon: React.ReactNode;
  items: string[];
  colorClass: string;
  delay?: number;
}

function InfoSection({ title, icon, items, colorClass, delay = 0 }: InfoSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`rounded-xl border p-4 ${colorClass}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          {icon}
          <h4 className="font-semibold">{title}</h4>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {isExpanded && (
        <motion.ul
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 space-y-2"
        >
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0 opacity-60" />
              <span>{item}</span>
            </li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}

export function DiseaseCard({ entry, onClose }: DiseaseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="card-elevated p-6 space-y-6"
    >
      {/* Header with ICD-11 Hierarchy */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          {/* ICD-11 Code Badge */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              <FileCode className="w-3.5 h-3.5 mr-1.5" />
              {entry.code}
            </span>
            <span className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">
              {entry.codeType.toUpperCase()}
            </span>
            {entry.parentCode && (
              <span className="text-xs text-muted-foreground">
                Parent: <code className="bg-muted px-1 rounded">{entry.parentCode}</code>
              </span>
            )}
          </div>
          
          {/* Disease Name */}
          <h2 className="text-2xl font-bold text-foreground">{entry.name}</h2>
          
          {/* ICD-11 Hierarchy Path */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Chapter {entry.chapter}:</span>
            <span className="text-foreground">{entry.chapterTitle}</span>
          </div>
          
          {/* Block and Category */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs px-2 py-1 rounded-md bg-accent text-accent-foreground">
              {entry.block}
            </span>
            {entry.blockRange && (
              <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                Range: {entry.blockRange}
              </span>
            )}
            <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
              {entry.category}
            </span>
          </div>
        </div>
        
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        )}
      </div>

      {/* Definition (replaces description) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-muted/50 rounded-xl p-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <h4 className="font-semibold">Definition</h4>
        </div>
        <p className="text-muted-foreground">{entry.definition}</p>
      </motion.div>

      {/* Inclusions and Exclusions (ICD-11 specific) */}
      {(entry.inclusions?.length || entry.exclusions?.length) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entry.inclusions && entry.inclusions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl border border-success/20 bg-success/5 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-success" />
                <h4 className="font-semibold text-success">Includes</h4>
              </div>
              <ul className="space-y-1">
                {entry.inclusions.map((item, index) => (
                  <li key={index} className="text-sm text-muted-foreground">• {item}</li>
                ))}
              </ul>
            </motion.div>
          )}
          
          {entry.exclusions && entry.exclusions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl border border-destructive/20 bg-destructive/5 p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-4 h-4 text-destructive" />
                <h4 className="font-semibold text-destructive">Excludes</h4>
              </div>
              <ul className="space-y-1">
                {entry.exclusions.map((item, index) => (
                  <li key={index} className="text-sm text-muted-foreground">• {item}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      )}

      {/* Coding Notes (if available) */}
      {entry.codingNotes && entry.codingNotes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="rounded-xl border border-primary/20 bg-primary/5 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <FileCode className="w-4 h-4 text-primary" />
            <h4 className="font-semibold text-primary">Coding Notes</h4>
          </div>
          <ul className="space-y-1">
            {entry.codingNotes.map((note, index) => (
              <li key={index} className="text-sm text-muted-foreground">• {note}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Synonyms and Index Terms */}
      {(entry.synonyms?.length || entry.indexTerms?.length) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {entry.synonyms?.map((synonym, index) => (
            <span key={`syn-${index}`} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
              {synonym}
            </span>
          ))}
          {entry.indexTerms?.map((term, index) => (
            <span key={`term-${index}`} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
              {term}
            </span>
          ))}
        </motion.div>
      )}

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoSection
          title="Common Causes"
          icon={<AlertTriangle className="w-4 h-4 text-warning" />}
          items={entry.causes}
          colorClass="bg-warning/5 border-warning/20 text-warning-foreground"
          delay={0.2}
        />
        
        <InfoSection
          title="Symptoms"
          icon={<Activity className="w-4 h-4 text-destructive" />}
          items={entry.symptoms}
          colorClass="bg-destructive/5 border-destructive/20 text-destructive"
          delay={0.25}
        />
        
        <InfoSection
          title="Prevention Methods"
          icon={<Shield className="w-4 h-4 text-success" />}
          items={entry.prevention}
          colorClass="bg-success/5 border-success/20 text-success"
          delay={0.3}
        />
        
        <InfoSection
          title="Precautions"
          icon={<Stethoscope className="w-4 h-4 text-primary" />}
          items={entry.precautions}
          colorClass="bg-primary/5 border-primary/20 text-primary"
          delay={0.35}
        />
      </div>

      {/* Management */}
      <InfoSection
        title="General Management"
        icon={<Heart className="w-4 h-4 text-accent-foreground" />}
        items={entry.management}
        colorClass="bg-accent border-accent-foreground/20 text-accent-foreground"
        delay={0.4}
      />

      {/* Foundation URI (for developers/API reference) */}
      {entry.foundationUri && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="text-xs text-muted-foreground border-t border-border pt-4"
        >
          <span className="font-medium">WHO Foundation URI: </span>
          <code className="bg-muted px-1 py-0.5 rounded break-all">{entry.foundationUri}</code>
        </motion.div>
      )}

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-warning/10 border border-warning/30 rounded-lg p-4 text-sm text-warning-foreground"
      >
        <strong>Medical Disclaimer:</strong> This information is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
      </motion.div>
    </motion.div>
  );
}
