import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUpload } from '@/components/ui/file-upload';
import { LocationPicker } from '@/components/LocationPicker';
import { AnalysisResults } from '@/components/AnalysisResults';
import { PDFExport } from '@/components/PDFExport';
import { Microscope, MapPin, FileText, Sparkles } from 'lucide-react';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: number;
  placeName?: string;
}

interface GrainAnalysis {
  d10: number;
  d50: number;
  d90: number;
  mean: number;
  classification: 'fine' | 'medium' | 'coarse';
  confidence: number;
}

export const SandAnalysisForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [analysis, setAnalysis] = useState<GrainAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  // Mock analysis function - replace with actual AI model integration
  const performAnalysis = async () => {
    if (!selectedFile || !selectedLocation) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock analysis results - replace with actual AI model output
    const mockAnalysis: GrainAnalysis = {
      d10: 0.15,
      d50: 0.35,
      d90: 0.68,
      mean: 0.38,
      classification: 'medium',
      confidence: 0.92
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    setActiveTab('results');
  };

  const canAnalyze = selectedFile && selectedLocation;
  const canExport = analysis && selectedFile && selectedLocation;

  return (
    <div className="min-h-screen bg-gradient-sand py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold">Sand Grain Analysis</h1>
            <p className="text-xl text-muted-foreground">
              Upload your beach sand image, set location, and get instant AI-powered analysis
            </p>
          </div>

          {/* Analysis Form */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="upload" className="flex items-center space-x-2">
                <Microscope className="h-4 w-4" />
                <span className="hidden sm:inline">Upload</span>
              </TabsTrigger>
              <TabsTrigger value="location" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Location</span>
              </TabsTrigger>
              <TabsTrigger value="results" disabled={!analysis} className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Results</span>
              </TabsTrigger>
              <TabsTrigger value="export" disabled={!canExport} className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Export</span>
              </TabsTrigger>
            </TabsList>

            {/* Upload Tab */}
            <TabsContent value="upload" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Sand Sample Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <FileUpload onFileSelect={(file) => {
                    setSelectedFile(file);
                    try {
                      const url = URL.createObjectURL(file);
                      setImagePreviewUrl((prev) => {
                        if (prev) URL.revokeObjectURL(prev);
                        return url;
                      });
                    } catch {}
                  }} />
                  
                  {selectedFile && (
                    <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                      <p className="text-success font-medium">✓ Image uploaded successfully!</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Next, select the location where this sample was collected.
                      </p>
                      {imagePreviewUrl && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                          <div className="sm:col-span-2">
                            <img src={imagePreviewUrl} alt="Uploaded preview" className="max-h-56 rounded-md border object-contain bg-muted/30 w-full" />
                          </div>
                          <div className="space-y-2">
                            <Button 
                              onClick={() => setActiveTab('location')}
                              className="w-full"
                              size="sm"
                            >
                              Set Location →
                            </Button>
                            <a href={imagePreviewUrl} target="_blank" rel="noreferrer" className="text-xs underline text-primary">View full size</a>
                          </div>
                        </div>
                      )}
                      <Button 
                        onClick={() => setActiveTab('location')}
                        className="mt-3"
                        size="sm"
                      >
                        Set Location →
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="space-y-6">
              <LocationPicker 
                onLocationSelect={setSelectedLocation}
                selectedLocation={selectedLocation}
                markerImageUrl={imagePreviewUrl || undefined}
              />
              
              {selectedLocation && selectedFile && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center space-x-4">
                        <div className="flex items-center space-x-2 text-success">
                          <Microscope className="h-5 w-5" />
                          <span className="font-medium">Image Ready</span>
                        </div>
                        <div className="flex items-center space-x-2 text-success">
                          <MapPin className="h-5 w-5" />
                          <span className="font-medium">Location Set</span>
                        </div>
                      </div>
                      
                      <Button
                        onClick={performAnalysis}
                        disabled={isAnalyzing}
                        size="lg"
                        className="bg-gradient-ocean hover:shadow-ocean transition-all duration-300"
                      >
                        {isAnalyzing ? (
                          <>
                            <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                            Analyzing with AI...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-4 w-4 mr-2" />
                            Start AI Analysis
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              {!selectedFile && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-3">
                      <p className="text-sm text-muted-foreground">Please upload a sample image first.</p>
                      <Button onClick={() => setActiveTab('upload')} variant="outline" size="sm">Go to Upload</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-6">
              {analysis && selectedFile && selectedLocation && (
                <AnalysisResults
                  imageFile={selectedFile}
                  location={selectedLocation}
                  analysis={analysis}
                />
              )}
              
              {analysis && (
                <div className="text-center">
                  <Button
                    onClick={() => setActiveTab('export')}
                    size="lg"
                    variant="outline"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Export PDF Report
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Export Tab */}
            <TabsContent value="export" className="space-y-6">
              {canExport && (
                <PDFExport
                  imageFile={selectedFile!}
                  location={selectedLocation!}
                  analysis={analysis!}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};