import { useState } from "react";
import { UploadZone } from "@/components/UploadZone";
import { MacOSWindow } from "@/components/MacOSWindow";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { motion } from "framer-motion";
import mammoth from "mammoth";

export default function EditDocx() {
  const [file, setFile] = useState<File | null>(null);
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleFiles = async (files: File[]) => {
    const f = files[0];
    if (!f) return;
    setFile(f);
    setLoading(true);

    try {
      const arrayBuffer = await f.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setHtmlContent(result.value);
    } catch {
      setHtmlContent("<p>Error reading file. Please try a different DOCX.</p>");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setHtmlContent("");
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Edit DOCX</h1>
        <p className="text-muted-foreground mb-8">
          Open and edit Word documents directly in your browser
        </p>
      </motion.div>

      {!file ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <UploadZone
            accept=".docx"
            onFiles={handleFiles}
            label="Upload a DOCX file"
            sublabel="Drag & drop your Word document here or click to browse · Max 50MB"
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <MacOSWindow title={file.name}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1" />
              <Button variant="outline" size="sm" className="rounded-lg" onClick={handleReset}>
                Upload New
              </Button>
              <Button size="sm" className="rounded-lg">
                <Download className="w-4 h-4 mr-1" /> Download
              </Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Processing document...
              </div>
            ) : (
              <div
                className="prose prose-sm max-w-none bg-card rounded-xl border border-border p-8 min-h-[500px]"
                contentEditable
                suppressContentEditableWarning
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            )}
          </MacOSWindow>
        </motion.div>
      )}
    </div>
  );
}
