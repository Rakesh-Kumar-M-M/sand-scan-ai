import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { MapPin, Microscope, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-beach.jpg";

export const HeroSection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      // Simulate analysis process
      console.log("Analyzing:", selectedFile.name);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
      </div>

      <div className="relative container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-white">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                AI-Powered
                <span className="block bg-gradient-to-r from-accent to-warning bg-clip-text text-transparent">
                  Coastal Monitoring
                </span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Automated beach sediment analysis using advanced AI and citizen science 
                for sustainable coastal management and climate resilience.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Microscope className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Analysis</h3>
                  <p className="text-sm text-white/80">Grain size detection</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">GPS Mapping</h3>
                  <p className="text-sm text-white/80">Spatial analysis</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Predictions</h3>
                  <p className="text-sm text-white/80">Change detection</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Citizen Science</h3>
                  <p className="text-sm text-white/80">Community driven</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="shadow-ocean" asChild>
                <a href="/analysis">Start Analysis</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>

          {/* Upload Card */}
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-8 shadow-ocean border border-white/20">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Start Analysis</h2>
                <p className="text-muted-foreground">
                  Upload a sand image to get instant grain size analysis
                </p>
              </div>

              <FileUpload onFileSelect={handleFileSelect} />

              {selectedFile && (
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-sand rounded-lg border">
                    <h3 className="font-semibold mb-2">Analysis Preview</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Estimated Type</p>
                        <p className="font-medium">Medium Sand</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">D50 Size</p>
                        <p className="font-medium">~0.3mm</p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-ocean hover:shadow-ocean transition-all duration-300"
                    size="lg"
                    asChild
                  >
                    <a href="/analysis">Analyze with AI</a>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};