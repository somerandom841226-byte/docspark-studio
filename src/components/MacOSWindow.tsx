import { cn } from "@/lib/utils";

interface MacOSWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function MacOSWindow({ title, children, className }: MacOSWindowProps) {
  return (
    <div className={cn("macos-window", className)}>
      <div className="macos-titlebar">
        <div className="flex gap-1.5">
          <div className="macos-dot bg-destructive/80" />
          <div className="macos-dot bg-yellow-400/80" />
          <div className="macos-dot bg-tool-merge/80" />
        </div>
        {title && (
          <span className="text-xs font-medium text-muted-foreground mx-auto pr-10">
            {title}
          </span>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
