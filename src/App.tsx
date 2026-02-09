import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import EditPdf from "./pages/EditPdf";
import EditDocx from "./pages/EditDocx";
import MergePdf from "./pages/MergePdf";
import MergeDocx from "./pages/MergeDocx";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/edit-pdf" element={<EditPdf />} />
            <Route path="/edit-docx" element={<EditDocx />} />
            <Route path="/merge-pdf" element={<MergePdf />} />
            <Route path="/merge-docx" element={<MergeDocx />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
