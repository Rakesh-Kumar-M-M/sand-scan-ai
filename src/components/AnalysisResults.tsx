import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Microscope, MapPin, Calendar, Camera } from 'lucide-react';

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

interface AnalysisResultsProps {
  imageFile: File;
  location: LocationData;
  analysis: GrainAnalysis;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  imageFile,
  location,
  analysis
}) => {
  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case 'fine': return 'bg-blue-500';
      case 'medium': return 'bg-yellow-500';
      case 'coarse': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatCoordinate = (coord: number) => {
    return coord.toFixed(6);
  };

  return (
    <div className="space-y-6" id="analysis-results">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Microscope className="h-5 w-5 text-primary" />
            <span>Sand Grain Analysis Results</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Camera className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Sample Image</span>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-sm font-mono">{imageFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(imageFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>

            {/* Location Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Location</span>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg space-y-1">
                <p className="text-sm font-mono">
                  {formatCoordinate(location.latitude)}, {formatCoordinate(location.longitude)}
                </p>
                {location.placeName && (
                  <p className="text-sm">{location.placeName}</p>
                )}
                {location.accuracy && (
                  <Badge variant="outline" className="text-xs">
                    ±{Math.round(location.accuracy)}m accuracy
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Analyzed on {formatDate(location.timestamp)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grain Size Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Grain Size Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Classification */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-3 p-4 bg-gradient-sand rounded-lg border">
                <div className={`w-4 h-4 rounded-full ${getClassificationColor(analysis.classification)}`} />
                <div>
                  <p className="font-semibold text-lg capitalize">{analysis.classification} Sand</p>
                  <p className="text-sm text-muted-foreground">
                    Classification Confidence: {Math.round(analysis.confidence * 100)}%
                  </p>
                </div>
              </div>
            </div>

            {/* Grain Size Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-card border rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{analysis.d10}</p>
                <p className="text-sm text-muted-foreground">D10 (mm)</p>
                <p className="text-xs text-muted-foreground mt-1">10% finer</p>
              </div>
              
              <div className="p-4 bg-card border rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{analysis.d50}</p>
                <p className="text-sm text-muted-foreground">D50 (mm)</p>
                <p className="text-xs text-muted-foreground mt-1">Median size</p>
              </div>
              
              <div className="p-4 bg-card border rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{analysis.d90}</p>
                <p className="text-sm text-muted-foreground">D90 (mm)</p>
                <p className="text-xs text-muted-foreground mt-1">90% finer</p>
              </div>
              
              <div className="p-4 bg-card border rounded-lg text-center">
                <p className="text-2xl font-bold text-primary">{analysis.mean}</p>
                <p className="text-sm text-muted-foreground">Mean (mm)</p>
                <p className="text-xs text-muted-foreground mt-1">Average size</p>
              </div>
            </div>

            {/* Confidence Indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analysis Confidence</span>
                <span>{Math.round(analysis.confidence * 100)}%</span>
              </div>
              <Progress value={analysis.confidence * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Context */}
      <Card>
        <CardHeader>
          <CardTitle>Environmental Context</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Beach Type Characteristics</h4>
              <div className="text-sm space-y-2">
                {analysis.classification === 'fine' && (
                  <>
                    <p>• Typically found in low-energy environments</p>
                    <p>• Associated with gentle wave action</p>
                    <p>• Common in protected bays and estuaries</p>
                  </>
                )}
                {analysis.classification === 'medium' && (
                  <>
                    <p>• Balanced energy environment</p>
                    <p>• Moderate wave action and tidal influence</p>
                    <p>• Common on open coast beaches</p>
                  </>
                )}
                {analysis.classification === 'coarse' && (
                  <>
                    <p>• High-energy environment</p>
                    <p>• Strong wave action and currents</p>
                    <p>• Often found near rocky coastlines</p>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Ecological Implications</h4>
              <div className="text-sm space-y-2">
                <p>• Influences benthic community composition</p>
                <p>• Affects water filtration and retention</p>
                <p>• Important for nesting sea turtles and shorebirds</p>
                <p>• Indicator of coastal stability and erosion patterns</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};