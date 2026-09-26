import { motion } from "framer-motion";
import { 
  Brain, 
  Database, 
  Zap, 
  Shield, 
  Users, 
  BookOpen,
  Target,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const objectives = [
  "Predict accurate ICD-11 codes from disease names or symptom descriptions",
  "Provide comprehensive disease information including causes, symptoms, and prevention",
  "Avoid hallucination through strict dataset validation",
  "Deliver fast, low-latency inference suitable for clinical workflows"
];

const teamMembers = [
  { name: "Project Lead", role: "Medical Informatics & AI Research" },
  { name: "AI Developer", role: "SLM Training & RAG Implementation" },
  { name: "Backend Developer", role: "FastAPI & Vector Search" },
  { name: "Frontend Developer", role: "React & User Experience" }
];

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              About the Project
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              AI-Powered Medical Coding for{" "}
              <span className="text-gradient">Modern Healthcare</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A second-year academic project demonstrating the application of Small Language Models 
              and Retrieval-Augmented Generation in medical informatics.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Project Objectives</h2>
            </div>
            <div className="space-y-4">
              {objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-lg">{objective}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why SLM Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Small Language Models?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We chose SLMs over LLMs for domain-specific medical coding based on these key advantages:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card-elevated p-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-success" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Low Computational Cost</h3>
              <p className="text-muted-foreground text-sm">
                SLMs like MiniLM and DistilBERT require significantly less GPU memory and can run on standard hardware, making deployment accessible and cost-effective.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="card-elevated p-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Faster Inference</h3>
              <p className="text-muted-foreground text-sm">
                With fewer parameters, SLMs deliver responses in milliseconds rather than seconds, essential for real-time clinical decision support systems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="card-elevated p-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Domain-Specific Accuracy</h3>
              <p className="text-muted-foreground text-sm">
                Fine-tuned on ICD-11 data, our SLM achieves higher accuracy for medical coding tasks than general-purpose LLMs, with reduced hallucination risk.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">System Architecture</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our RAG-based architecture combines semantic search with SLM inference for accurate, grounded responses.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card-elevated p-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center">
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold">User Query</h4>
                <p className="text-sm text-muted-foreground">Disease or symptoms</p>
              </div>
              
              <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
              
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h4 className="font-semibold">Embedding</h4>
                <p className="text-sm text-muted-foreground">all-MiniLM-L6-v2</p>
              </div>
              
              <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
              
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-3">
                  <Database className="w-8 h-8 text-accent-foreground" />
                </div>
                <h4 className="font-semibold">FAISS Retrieval</h4>
                <p className="text-sm text-muted-foreground">Top-5 semantic match</p>
              </div>
              
              <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
              
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-8 h-8 text-success" />
                </div>
                <h4 className="font-semibold">SLM Output</h4>
                <p className="text-sm text-muted-foreground">Structured response</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-muted-foreground mb-8">
              Try the AI assistant or browse the ICD-11 database.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/chat">
                <Button variant="hero" size="lg">
                  Try AI Assistant
                </Button>
              </Link>
              <Link to="/dataset">
                <Button variant="outline" size="lg">
                  View Dataset Info
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
