import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Loader2, AlertCircle } from 'lucide-react';
import { Geolocation } from '@capacitor/geolocation';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: number;
}

interface LocationPickerProps {
  onLocationSelect: (location: LocationData) => void;
  selectedLocation?: LocationData | null;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelect,
  selectedLocation
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);

  // Initialize map when mapbox token is available
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [0, 20], // Default center
      zoom: 2,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add click handler for manual location selection
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      const locationData: LocationData = {
        latitude: lat,
        longitude: lng,
        timestamp: Date.now()
      };
      
      updateMarker(lng, lat);
      onLocationSelect(locationData);
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, onLocationSelect]);

  // Update marker position
  const updateMarker = (lng: number, lat: number) => {
    if (!map.current) return;

    if (marker.current) {
      marker.current.remove();
    }

    marker.current = new mapboxgl.Marker({
      color: '#0ea5e9',
      scale: 1.2
    })
      .setLngLat([lng, lat])
      .addTo(map.current);

    map.current.flyTo({
      center: [lng, lat],
      zoom: 15,
      duration: 1500
    });
  };

  // Get current GPS location
  const getCurrentLocation = async () => {
    setLoading(true);
    setError('');

    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });

      const locationData: LocationData = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        accuracy: coordinates.coords.accuracy,
        timestamp: coordinates.timestamp
      };

      setCurrentLocation(locationData);
      onLocationSelect(locationData);

      if (map.current) {
        updateMarker(locationData.longitude, locationData.latitude);
      }
    } catch (err) {
      setError('Unable to get current location. Please select manually on the map.');
      console.error('Geolocation error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update marker when selectedLocation changes
  useEffect(() => {
    if (selectedLocation && map.current) {
      updateMarker(selectedLocation.longitude, selectedLocation.latitude);
    }
  }, [selectedLocation]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span>Location Selection</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Mapbox Token Input */}
        {!mapboxToken && (
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
              <div className="space-y-3 flex-1">
                <p className="text-sm">
                  To use the interactive map, please enter your Mapbox public token:
                </p>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter Mapbox public token"
                    className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-sm"
                    onChange={(e) => setMapboxToken(e.target.value)}
                  />
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open('https://mapbox.com/', '_blank')}
                  >
                    Get Token
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GPS Location Button */}
        <div className="flex space-x-2">
          <Button
            onClick={getCurrentLocation}
            disabled={loading}
            className="flex-1 bg-gradient-ocean hover:shadow-ocean transition-all duration-300"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Navigation className="h-4 w-4 mr-2" />
            )}
            Use Current Location
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Map Container */}
        {mapboxToken && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Click on the map to select a location manually
            </p>
            <div 
              ref={mapContainer} 
              className="w-full h-64 rounded-lg border shadow-gentle"
            />
          </div>
        )}

        {/* Selected Location Info */}
        {selectedLocation && (
          <div className="p-4 bg-gradient-sand rounded-lg border">
            <h4 className="font-semibold mb-2 flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Selected Location</span>
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Latitude</p>
                <p className="font-mono">{selectedLocation.latitude.toFixed(6)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Longitude</p>
                <p className="font-mono">{selectedLocation.longitude.toFixed(6)}</p>
              </div>
              {selectedLocation.accuracy && (
                <div className="col-span-2">
                  <p className="text-muted-foreground">Accuracy</p>
                  <Badge variant="outline" className="text-xs">
                    ±{Math.round(selectedLocation.accuracy)}m
                  </Badge>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};