import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Loader2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: number;
}

interface GrainAnalysis {
  d10: number;
  d50: number;
  d90: number;
  mean: number;
  classification: 'fine' | 'medium' | 'coarse';
  confidence: number;
}

interface PDFExportProps {
  imageFile: File;
  location: LocationData;
  analysis: GrainAnalysis;
}

export const PDFExport: React.FC<PDFExportProps> = ({
  imageFile,
  location,
  analysis
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // Header
      pdf.setFontSize(24);
      pdf.setTextColor(33, 95, 168); // Primary color
      pdf.text('CoastalWatch Analysis Report', margin, yPosition);
      yPosition += 15;

      // Subtitle
      pdf.setFontSize(14);
      pdf.setTextColor(100, 100, 100);
      pdf.text('AI-Powered Beach Sediment Analysis', margin, yPosition);
      yPosition += 20;

      // Sample Information Section
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Sample Information', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      pdf.text(`Image: ${imageFile.name}`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Size: ${(imageFile.size / (1024 * 1024)).toFixed(2)} MB`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Analysis Date: ${new Date(location.timestamp).toLocaleString()}`, margin, yPosition);
      yPosition += 15;

      // Location Information Section
      pdf.setFontSize(16);
      pdf.text('Location Information', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      pdf.text(`Latitude: ${location.latitude.toFixed(6)}°`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Longitude: ${location.longitude.toFixed(6)}°`, margin, yPosition);
      yPosition += 6;
      if (location.accuracy) {
        pdf.text(`GPS Accuracy: ±${Math.round(location.accuracy)} meters`, margin, yPosition);
        yPosition += 6;
      }
      yPosition += 15;

      // Analysis Results Section
      pdf.setFontSize(16);
      pdf.text('Grain Size Analysis Results', margin, yPosition);
      yPosition += 10;

      // Classification
      pdf.setFontSize(14);
      pdf.setTextColor(33, 95, 168);
      pdf.text(`Classification: ${analysis.classification.toUpperCase()} SAND`, margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(12);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`Confidence: ${Math.round(analysis.confidence * 100)}%`, margin, yPosition);
      yPosition += 15;

      // Grain Size Metrics
      pdf.setFontSize(14);
      pdf.text('Grain Size Distribution Metrics', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      pdf.text(`D10 (10% finer): ${analysis.d10} mm`, margin, yPosition);
      yPosition += 6;
      pdf.text(`D50 (Median size): ${analysis.d50} mm`, margin, yPosition);
      yPosition += 6;
      pdf.text(`D90 (90% finer): ${analysis.d90} mm`, margin, yPosition);
      yPosition += 6;
      pdf.text(`Mean grain size: ${analysis.mean} mm`, margin, yPosition);
      yPosition += 15;

      // Environmental Context
      pdf.setFontSize(14);
      pdf.text('Environmental Context', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      let characteristics: string[] = [];
      
      if (analysis.classification === 'fine') {
        characteristics = [
          '• Typically found in low-energy environments',
          '• Associated with gentle wave action',
          '• Common in protected bays and estuaries'
        ];
      } else if (analysis.classification === 'medium') {
        characteristics = [
          '• Balanced energy environment',
          '• Moderate wave action and tidal influence',
          '• Common on open coast beaches'
        ];
      } else {
        characteristics = [
          '• High-energy environment',
          '• Strong wave action and currents',
          '• Often found near rocky coastlines'
        ];
      }

      characteristics.forEach(char => {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(char, margin, yPosition);
        yPosition += 6;
      });

      yPosition += 10;

      // Ecological Implications
      pdf.setFontSize(14);
      pdf.text('Ecological Implications', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      const implications = [
        '• Influences benthic community composition',
        '• Affects water filtration and retention',
        '• Important for nesting sea turtles and shorebirds',
        '• Indicator of coastal stability and erosion patterns'
      ];

      implications.forEach(impl => {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(impl, margin, yPosition);
        yPosition += 6;
      });

      // Try to capture and add the analysis results chart
      try {
        const resultsElement = document.getElementById('analysis-results');
        if (resultsElement) {
          const canvas = await html2canvas(resultsElement, {
            scale: 1,
            useCORS: true,
            backgroundColor: '#ffffff'
          });
          
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = pageWidth - (margin * 2);
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          // Add new page for the visual results
          pdf.addPage();
          pdf.setFontSize(16);
          pdf.text('Visual Analysis Results', margin, margin);
          
          if (imgHeight < pageHeight - 60) {
            pdf.addImage(imgData, 'PNG', margin, margin + 20, imgWidth, imgHeight);
          }
        }
      } catch (error) {
        console.warn('Could not capture visual results:', error);
      }

      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      const footerText = 'Generated by CoastalWatch - AI-Powered Coastal Monitoring Platform';
      const textWidth = pdf.getTextWidth(footerText);
      pdf.text(footerText, (pageWidth - textWidth) / 2, pageHeight - 10);

      // Generate filename
      const date = new Date().toISOString().split('T')[0];
      const coords = `${location.latitude.toFixed(3)}_${location.longitude.toFixed(3)}`;
      const filename = `CoastalWatch_Analysis_${coords}_${date}.pdf`;

      // Save the PDF
      pdf.save(filename);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-primary" />
          <span>Export Analysis Report</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Generate a comprehensive PDF report containing all analysis results, 
            location data, and environmental context for scientific documentation.
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">Report includes:</p>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                <li>• Sample information</li>
                <li>• GPS coordinates</li>
                <li>• Grain size metrics</li>
                <li>• Classification results</li>
              </ul>
            </div>
            <div>
              <p className="font-medium">Scientific data:</p>
              <ul className="mt-2 space-y-1 text-muted-foreground">
                <li>• Environmental context</li>
                <li>• Ecological implications</li>
                <li>• Visual analysis charts</li>
                <li>• Analysis timestamp</li>
              </ul>
            </div>
          </div>

          <Button
            onClick={generatePDF}
            disabled={isGenerating}
            className="w-full bg-gradient-ocean hover:shadow-ocean transition-all duration-300"
            size="lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download PDF Report
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};