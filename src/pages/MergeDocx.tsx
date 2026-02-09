import { useState, useCallback } from "react";
import { UploadZone } from "@/components/UploadZone";
import { MacOSWindow } from "@/components/MacOSWindow";
import { Button } from "@/components/ui/button";
import { Download, GripVertical, X, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion, Reorder } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface DocxFile {
  id: string;
  file: File;
  name: string;
  size: string;
}

export default function MergeDocx() {
  const [files, setFiles] = useState<DocxFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [pageBreaks, setPageBreaks] = useState(true);

  const handleFiles = useCallback((newFiles: File[]) => {
    const docxFiles = newFiles.map((f) => ({
      id: crypto.randomUUID(),
      file: f,
      name: f.name,
      size: (f.size / 1024 / 1024).toFixed(2) + " MB",
    }));
    setFiles((prev) => [...prev, ...docxFiles]);
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleMerge = async () => {
    if (files.length < 2) return;
    setMerging(true);

    try {
      // For MVP, concatenate the raw DOCX content
      // Full implementation would use the docx library for proper merge
      toast({
        title: "DOCX merge coming soon",
        description: "Full DOCX merging with formatting preservation is being implemented.",
      });
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Merge DOCX</h1>
        <p className="text-muted-foreground mb-8">
          Combine multiple Word documents while preserving formatting
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <UploadZone
          accept=".docx"
          multiple
          onFiles={handleFiles}
          label="Upload DOCX files"
          sublabel="Drag & drop multiple Word documents or click to browse · Max 50MB each"
        />
      </motion.div>

      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6"
        >
          <MacOSWindow title={`${files.length} documents selected`}>
            <Reorder.Group axis="y" values={files} onReorder={setFiles} className="space-y-2">
              {files.map((docxFile) => (
                <Reorder.Item
                  key={docxFile.id}
                  value={docxFile}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-grab active:cursor-grabbing"
                >
                  <GripVertical className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {docxFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{docxFile.size}</p>
                  </div>
                  <button
                    onClick={() => removeFile(docxFile.id)}
                    className="p-1 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </Reorder.Item>
              ))}
            </Reorder.Group>

            <div className="mt-6 pt-4 border-t border-border/50 space-y-4">
              <div className="flex items-center gap-3">
                <Switch
                  id="page-breaks"
                  checked={pageBreaks}
                  onCheckedChange={setPageBreaks}
                />
                <Label htmlFor="page-breaks" className="text-sm">
                  Insert page breaks between documents
                </Label>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  {files.length} document{files.length !== 1 && "s"} ready to merge
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
            </div>
          </MacOSWindow>
        </motion.div>
      )}
    </div>
  );
}
