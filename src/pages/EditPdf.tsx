import { useState } from "react";
import { UploadZone } from "@/components/UploadZone";
import { MacOSWindow } from "@/components/MacOSWindow";
import { Button } from "@/components/ui/button";
import { Download, Undo2, Redo2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function EditPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleFiles = (files: File[]) => {
    const f = files[0];
    if (f) {
      setFile(f);
      setPdfUrl(URL.createObjectURL(f));
    }
  };

  const handleReset = () => {
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setFile(null);
    setPdfUrl(null);
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Edit PDF</h1>
        <p className="text-muted-foreground mb-8">
          Edit text directly in your PDF files — no conversion needed
        </p>
      </motion.div>

      {!file ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <UploadZone
            accept=".pdf"
            onFiles={handleFiles}
            label="Upload a PDF file"
            sublabel="Drag & drop your PDF here or click to browse · Max 50MB"
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
              <Button variant="outline" size="sm" className="rounded-lg">
                <Undo2 className="w-4 h-4 mr-1" /> Undo
              </Button>
              <Button variant="outline" size="sm" className="rounded-lg">
                <Redo2 className="w-4 h-4 mr-1" /> Redo
              </Button>
              <div className="flex-1" />
              <Button variant="outline" size="sm" className="rounded-lg" onClick={handleReset}>
                Upload New
              </Button>
              <Button size="sm" className="rounded-lg">
                <Download className="w-4 h-4 mr-1" /> Download
              </Button>
            </div>

            <div className="bg-muted/30 rounded-xl p-4 mb-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <strong className="text-foreground">Note:</strong> Basic text editing is supported.
                Complex layouts with overlapping elements may not render perfectly.
                Scanned PDFs require OCR (coming in Phase 2).
              </div>
            </div>

            {pdfUrl && (
              <div className="rounded-xl overflow-hidden border border-border bg-card">
                <iframe
                  src={pdfUrl}
                  className="w-full h-[600px]"
                  title="PDF Preview"
                />
              </div>
            )}
          </MacOSWindow>
        </motion.div>
      )}
    </div>
  );
}
