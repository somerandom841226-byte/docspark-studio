import { useCallback, useState, useRef } from "react";
import { Upload, File } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  label: string;
  sublabel?: string;
  maxSizeMB?: number;
}

export function UploadZone({
  accept,
  multiple = false,
  onFiles,
  label,
  sublabel,
  maxSizeMB = 50,
}: UploadZoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList) return;
      const files = Array.from(fileList).filter(
        (f) => f.size <= maxSizeMB * 1024 * 1024
      );
      if (files.length > 0) onFiles(files);
    },
    [onFiles, maxSizeMB]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  return (
    <div
      className={cn(
        "upload-zone group",
        dragOver && "drag-over border-primary/50 bg-primary/5"
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
          <Upload className="w-7 h-7 text-primary" />
        </div>
        <div>
          <p className="text-lg font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground mt-1">
            {sublabel || `Drag & drop or click to browse · Max ${maxSizeMB}MB`}
          </p>
        </div>
      </div>
    </div>
  );
}
