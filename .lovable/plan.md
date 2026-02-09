

# DocFlow — Document Utility Platform

A macOS-inspired document editing and merging platform with frosted glass UI, sidebar navigation, and client-side file processing.

## Design System
- **macOS aesthetic**: Frosted glass (backdrop-blur) panels, rounded corners, subtle shadows, SF-style typography
- **Sidebar navigation** with tool icons, collapsible to mini mode
- **Neutral gray palette** with accent colors per tool category
- **Smooth animations** and transitions throughout
- **System-like UI**: Window-chrome-style headers, pill buttons, segmented controls

## Pages & Features

### 1. Landing / Home Page
- Hero section with a bold tagline and animated document visuals
- Tool grid showing the 4 core tools as macOS-style cards with icons
- "How it works" section (3 steps: Upload → Edit → Download)
- Privacy & security callout (auto-delete, no storage, encrypted)
- Footer with links

### 2. Edit PDF Tool
- Drag-and-drop upload zone with file picker fallback
- PDF rendered in a preview panel using pdf-lib for client-side manipulation
- Click-to-select text regions for inline editing
- Floating toolbar (undo, redo, save)
- Download button generates the edited PDF client-side
- Note: Basic text editing only — complex layouts will show a warning

### 3. Edit DOCX Tool
- Upload zone for .docx files
- Parse DOCX to editable HTML view using mammoth.js
- Rich text editing for paragraphs, headings, tables, lists
- Side-by-side or stacked preview
- Download reconstructed DOCX file

### 4. Merge PDF Tool
- Multi-file upload area
- Draggable file/page cards to reorder
- Page count and size info per file
- "Merge" button combines PDFs client-side using pdf-lib
- Progress indicator and download

### 5. Merge DOCX Tool
- Multi-file upload for .docx files
- Draggable document cards to reorder
- Option toggle: insert page breaks between documents
- Merge and download combined DOCX

### 6. Common UX Elements
- File lifecycle bar showing upload → process → preview → download → auto-delete status
- Toast notifications for success/error states
- Max file size indicator (50 MB)
- Responsive layout (desktop-first, functional on tablet)

## Technical Approach
- All processing happens **client-side in the browser** (no server needed for MVP)
- Libraries: `pdf-lib` for PDF manipulation, `mammoth.js` for DOCX→HTML, `docx` for DOCX generation
- Files are held in memory only — never uploaded to any server
- Auto-clear from memory on session end or timeout

