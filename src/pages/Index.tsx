import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText,
  FilePlus,
  Layers,
  FileStack,
  Upload,
  Edit3,
  Download,
  Shield,
  Lock,
  Trash2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MacOSWindow } from "@/components/MacOSWindow";

const tools = [
  {
    title: "Edit PDF",
    description: "Edit text directly in your PDFs without breaking the layout",
    icon: FileText,
    color: "bg-tool-pdf/10 text-tool-pdf",
    href: "/edit-pdf",
  },
  {
    title: "Edit DOCX",
    description: "Open and edit Word documents right in your browser",
    icon: FilePlus,
    color: "bg-tool-docx/10 text-tool-docx",
    href: "/edit-docx",
  },
  {
    title: "Merge PDF",
    description: "Combine multiple PDFs into one with drag-and-drop ordering",
    icon: Layers,
    color: "bg-tool-merge/10 text-tool-merge",
    href: "/merge-pdf",
  },
  {
    title: "Merge DOCX",
    description: "Join multiple Word files while preserving formatting",
    icon: FileStack,
    color: "bg-tool-merge/10 text-tool-merge",
    href: "/merge-docx",
  },
];

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description: "Drag & drop your files — they never leave your browser",
  },
  {
    icon: Edit3,
    title: "Edit or Merge",
    description: "Make changes with our intuitive inline editor",
  },
  {
    icon: Download,
    title: "Download",
    description: "Get your processed file instantly, then it auto-deletes",
  },
];

const privacy = [
  {
    icon: Shield,
    title: "100% Client-Side",
    description: "Files are processed entirely in your browser",
  },
  {
    icon: Lock,
    title: "No Server Upload",
    description: "Your documents are never sent to any server",
  },
  {
    icon: Trash2,
    title: "Auto-Delete",
    description: "Files are cleared from memory when you close the tab",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative px-6 pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-tool-merge/5 pointer-events-none" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              100% private · runs in your browser
            </div>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.1]"
          >
            Edit & merge documents
            <br />
            <span className="bg-gradient-to-r from-primary to-tool-merge bg-clip-text text-transparent">
              effortlessly
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance"
          >
            PDF & DOCX editing and merging — all client-side, no uploads, no signups.
            Your files never leave your device.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4 justify-center"
          >
            <Button asChild size="lg" className="rounded-full px-8 h-12 text-base">
              <Link to="/edit-pdf">
                Get Started <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 text-base"
            >
              <a href="#tools">View Tools</a>
            </Button>
          </motion.div>

          {/* Floating preview window */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 max-w-3xl mx-auto"
          >
            <MacOSWindow title="DocFlow — Edit PDF" className="shadow-2xl">
              <div className="flex gap-4">
                <div className="flex-1 h-40 rounded-xl bg-muted/50 flex items-center justify-center">
                  <div className="space-y-2 w-3/4">
                    <div className="h-3 rounded-full bg-foreground/10 w-full" />
                    <div className="h-3 rounded-full bg-foreground/10 w-5/6" />
                    <div className="h-3 rounded-full bg-foreground/10 w-4/6" />
                    <div className="h-3 rounded-full bg-primary/20 w-3/6" />
                    <div className="h-3 rounded-full bg-foreground/10 w-full" />
                    <div className="h-3 rounded-full bg-foreground/10 w-2/3" />
                  </div>
                </div>
                <div className="w-48 space-y-3">
                  <div className="h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                    Edit Mode
                  </div>
                  <div className="h-8 rounded-lg bg-muted flex items-center px-3 text-xs text-muted-foreground">
                    Font: Helvetica
                  </div>
                  <div className="h-8 rounded-lg bg-muted flex items-center px-3 text-xs text-muted-foreground">
                    Size: 12pt
                  </div>
                </div>
              </div>
            </MacOSWindow>
          </motion.div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Powerful tools, zero complexity
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Pick a tool, upload your file, and you're done.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={tool.href}
                  className="block glass-card p-6 tool-card-hover group"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center shrink-0`}
                    >
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {tool.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all mt-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              How it works
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Three simple steps. No signups, no installs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary mb-1">
                  Step {i + 1}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            {...fadeUp}
            viewport={{ once: true }}
            whileInView="animate"
            initial="initial"
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Your privacy comes first
            </h2>
            <p className="mt-3 text-muted-foreground text-lg">
              Everything happens locally. We can't see your files because they never reach us.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {privacy.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-tool-merge/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-tool-merge" />
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-border/50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">DocFlow</span>
            <span className="text-xs text-muted-foreground">
              — Document tools that respect your privacy
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            All processing happens in your browser · No data is sent to any server
          </div>
        </div>
      </footer>
    </div>
  );
}
