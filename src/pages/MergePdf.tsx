import { useState, useCallback } from "react";
import { UploadZone } from "@/components/UploadZone";
import { MacOSWindow } from "@/components/MacOSWindow";
import { Button } from "@/components/ui/button";
import { Download, GripVertical, X, Loader2 } from "lucide-react";
import { motion, Reorder } from "framer-motion";
import { PDFDocument } from "pdf-lib";
import { toast } from "@/hooks/use-toast";

interface PdfFile {
  id: string;
  file: File;
  name: string;
  size: string;
}

export default function MergePdf() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [merging, setMerging] = useState(false);

  const handleFiles = useCallback((newFiles: File[]) => {
    const pdfFiles = newFiles.map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(2) + " MB",
    }));
    setFiles((prev) => [...prev, ...pdfFiles]);
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of files) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();
      URL.revokeObjectURL(url);

      toast({ title: "PDFs merged successfully!", description: "Your download has started." });
    } catch {
      toast({ title: "Merge failed", description: "Please check your PDF files and try again.", variant: "destructive" });
    } finally {
      setMerging(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Merge PDF</h1>
        <p className="text-muted-foreground mb-8">
          Combine multiple PDFs into one — drag to reorder
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <UploadZone
          accept=".pdf"
          multiple
          onFiles={handleFiles}
          label="Upload PDF files"
          sublabel="Drag & drop multiple PDFs or click to browse · Max 50MB each"
        />
      </motion.div>

      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6"
        >
          <MacOSWindow title={`${files.length} files selected`}>
            <Reorder.Group axis="y" values={files} onReorder={setFiles} className="space-y-2">
              {files.map((pdfFile) => (
                <Reorder.Item
                  key={pdfFile.id}
                  value={pdfFile}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-grab active:cursor-grabbing"
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {pdfFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{pdfFile.size}</p>
                  </div>
                  <button
                    onClick={() => removeFile(pdfFile.id)}
                    className="p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                {files.length} file{files.length !== 1 && "s"} ready to merge
              </p>
              <Button
                onClick={handleMerge}
                disabled={files.length < 2 || merging}
                className="rounded-lg"
              >
                {merging ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                {merging ? "Merging..." : "Merge & Download"}
              </Button>
            </div>
          </MacOSWindow>
        </motion.div>
      )}
    </div>
  );
}
