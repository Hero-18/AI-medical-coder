import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchICD11, type ICD11Entry } from "@/data/icd11-sample";
import { DiseaseCard } from "@/components/medical/DiseaseCard";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  entry?: ICD11Entry;
  isError?: boolean;
}

const initialMessages: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content: "Hello! I'm your AI Medical Coding Assistant. I can help you find ICD-11 codes and provide information about diseases, symptoms, causes, and preventive measures. Try asking me about a disease or describing symptoms!"
  }
];

const suggestedQueries = [
  "Diabetes",
  "Malaria",
  "Hypertension",
  "Pneumonia?"
];

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processQuery = (query: string): { response: string; entry?: ICD11Entry } => {
    const results = searchICD11(query);
    
    if (results.length === 0) {
      return {
        response: "ICD-11 code not available in dataset. I couldn't find a matching entry for your query. Please try searching with different keywords or check the ICD-11 Explorer for available codes."
      };
    }

    const entry = results[0];
    return {
      response: `I found information about **${entry.name}** (ICD-11 Code: **${entry.code}**). Here are the details:`,
      entry
    };
  };

  const handleSend = async (queryText?: string) => {
    const text = queryText || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

    const { response, entry } = processQuery(text);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      entry
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              AI Chat Interface
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Medical Coding Assistant
            </h1>
            <p className="text-muted-foreground">
              Ask about diseases, symptoms, or ICD-11 codes
            </p>
          </motion.div>

          {/* Chat Container */}
          <div className="card-elevated min-h-[600px] flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index === messages.length - 1 ? 0 : 0 }}
                    className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                    )}
                    
                    <div className={`max-w-[85%] ${message.role === "user" ? "order-first" : ""}`}>
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : message.isError
                            ? "bg-destructive/10 text-destructive border border-destructive/20"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm sm:text-base whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      
                      {message.entry && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="mt-4"
                        >
                          <DiseaseCard entry={message.entry} />
                        </motion.div>
                      )}
                    </div>

                    {message.role === "user" && (
                      <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-secondary-foreground" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Analyzing your query...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Queries (show only at start) */}
            {messages.length === 1 && (
              <div className="px-4 sm:px-6 pb-4">
                <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQueries.map((query) => (
                    <button
                      key={query}
                      onClick={() => handleSend(query)}
                      className="px-3 py-1.5 text-sm rounded-lg bg-muted hover:bg-accent transition-colors"
                    >
                      {query}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t border-border p-4 sm:p-6">
              <div className="flex gap-3">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about a disease or symptoms..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className="h-11 w-11"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                This is for educational purposes only. Consult healthcare professionals for medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
