import { Navigation } from "@/components/Navigation";
import { SandAnalysisForm } from "@/components/SandAnalysisForm";
import { Footer } from "@/components/Footer";

const AnalysisPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <SandAnalysisForm />
      <Footer />
    </div>
  );
};

export default AnalysisPage;