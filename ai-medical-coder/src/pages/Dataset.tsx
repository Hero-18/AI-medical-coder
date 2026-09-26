import { motion } from "framer-motion";
import { 
  Database, 
  FileJson, 
  Download, 
  ExternalLink,
  Table,
  Code,
  BarChart3,
  Layers,
  Loader2
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useICD11Init, useICD11Stats } from "@/hooks/use-icd11";
import { icd11Index } from "@/data/icd11-index";
import { exportICD11AsJSON } from "@/data/icd11-loader";

const datasetFields = [
  { name: "code", type: "string", description: "ICD-11 classification code (e.g., '1A00', 'BA00.Z')" },
  { name: "foundationUri", type: "string", description: "WHO Foundation URI for API lookup" },
  { name: "chapter", type: "string", description: "Chapter number (01-26, V, X)" },
  { name: "chapterTitle", type: "string", description: "Full chapter name" },
  { name: "block", type: "string", description: "Block within chapter grouping" },
  { name: "blockRange", type: "string", description: "Code range for block (e.g., '1A00-1A4Z')" },
  { name: "category", type: "string", description: "Category within block" },
  { name: "parentCode", type: "string", description: "Parent code for hierarchy" },
  { name: "codeType", type: "enum", description: "Hierarchy level: chapter | block | category | code" },
  { name: "name", type: "string", description: "Official disease/condition name" },
  { name: "definition", type: "string", description: "Official ICD-11 definition" },
  { name: "inclusions", type: "array", description: "'Includes' notes for coding" },
  { name: "exclusions", type: "array", description: "'Excludes' notes (code-if-applicable)" },
  { name: "codingNotes", type: "array", description: "Coding guidance notes" },
  { name: "causes", type: "array", description: "Common causes and risk factors" },
  { name: "symptoms", type: "array", description: "Clinical symptoms and manifestations" },
  { name: "prevention", type: "array", description: "Preventive measures" },
  { name: "precautions", type: "array", description: "Precautionary guidelines" },
  { name: "management", type: "array", description: "General management approaches" },
  { name: "synonyms", type: "array", description: "Alternative names for search" },
  { name: "indexTerms", type: "array", description: "Additional search index terms" }
];

const methodology = [
  {
    step: 1,
    title: "Data Collection",
    description: "ICD-11 codes and descriptions sourced from WHO classification database and Kaggle datasets."
  },
  {
    step: 2,
    title: "Data Preprocessing",
    description: "Cleaning, normalization, and structuring of medical terminology for consistent embedding generation."
  },
  {
    step: 3,
    title: "Embedding Generation",
    description: "Using all-MiniLM-L6-v2 to create 384-dimensional semantic embeddings for each entry."
  },
  {
    step: 4,
    title: "Vector Index Creation",
    description: "FAISS index built for efficient Top-K nearest neighbor search on embeddings."
  },
  {
    step: 5,
    title: "Model Integration",
    description: "SLM fine-tuned on medical data for structured output generation from retrieved context."
  }
];

export default function Dataset() {
  const { isLoading, isReady } = useICD11Init();
  const { stats } = useICD11Stats();

  const handleDownload = async () => {
    const json = await exportICD11AsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'icd11-dataset.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const chapterCount = stats ? Object.keys(stats.byChapter).length : 0;
  const totalCodes = stats?.totalCodes || 0;
  const fieldCount = datasetFields.length;

  return (
    <Layout>
      {/* Header */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Database className="w-4 h-4" />
              Scalable Dataset
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              ICD-11 Dataset Information
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Optimized for handling tens of thousands of codes with lazy loading, indexing, and pagination.
            </p>
            <Button onClick={handleDownload} disabled={!isReady}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Export JSON
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Dataset Stats */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-elevated p-6 text-center"
            >
              <div className="text-3xl font-bold text-primary mb-1">
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : totalCodes.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Codes</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-elevated p-6 text-center"
            >
              <div className="text-3xl font-bold text-primary mb-1">{chapterCount}</div>
              <div className="text-sm text-muted-foreground">Chapters</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card-elevated p-6 text-center"
            >
              <div className="text-3xl font-bold text-primary mb-1">{fieldCount}</div>
              <div className="text-sm text-muted-foreground">Data Fields</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card-elevated p-6 text-center"
            >
              <div className="text-3xl font-bold text-primary mb-1">
                <Layers className="w-6 h-6 mx-auto" />
              </div>
              <div className="text-sm text-muted-foreground">Indexed & Paginated</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dataset Schema */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <Table className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Dataset Schema</h2>
            </div>
            <p className="text-muted-foreground">
              Each ICD-11 entry contains the following structured fields:
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-elevated overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold">Field</th>
                    <th className="text-left px-6 py-4 font-semibold">Type</th>
                    <th className="text-left px-6 py-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {datasetFields.map((field, index) => (
                    <tr key={field.name} className="border-t border-border">
                      <td className="px-6 py-4">
                        <code className="text-sm bg-muted px-2 py-1 rounded">{field.name}</code>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">{field.type}</span>
                      </td>
                      <td className="px-6 py-4 text-sm">{field.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Methodology Pipeline</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our RAG-based approach combines semantic retrieval with SLM inference for accurate, grounded medical coding.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-6">
            {methodology.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated p-6 flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Data */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-2">
              <Code className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Sample Data Structure</h2>
            </div>
            <p className="text-muted-foreground">
              Example JSON entry from the dataset:
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-elevated p-6 overflow-x-auto"
          >
            {isReady && icd11Index.size > 0 ? (
              <pre className="text-sm">
                <code className="text-foreground">
{JSON.stringify(icd11Index.getAllEntries()[0], null, 2)}
                </code>
              </pre>
            ) : (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Data Sources</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our dataset is compiled from authoritative medical classification sources.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.a
              href="https://icd.who.int/browse11"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-elevated-hover p-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">WHO ICD-11 Browser</h3>
                <p className="text-sm text-muted-foreground">Official WHO classification database</p>
              </div>
            </motion.a>

            <motion.a
              href="https://www.kaggle.com/datasets"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-elevated-hover p-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <Database className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Kaggle Datasets</h3>
                <p className="text-sm text-muted-foreground">Medical coding datasets</p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
