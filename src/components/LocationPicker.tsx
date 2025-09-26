import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { Geolocation } from '@capacitor/geolocation';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: number;
  placeName?: string;
}

interface LocationPickerProps {
  onLocationSelect: (location: LocationData | null) => void;
  selectedLocation?: LocationData | null;
  markerImageUrl?: string;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({
  onLocationSelect,
  selectedLocation,
  markerImageUrl
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Layer | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainer.current) return;
    if (mapRef.current) return;

    mapRef.current = L.map(mapContainer.current, {
      center: [20, 0],
      zoom: 2,
      minZoom: 2,
      maxZoom: 18,
      worldCopyJump: false,
      zoomControl: false,
      wheelPxPerZoomLevel: 60,
      wheelDebounceTime: 20,
      zoomSnap: 0.25,
      zoomDelta: 1,
      touchZoom: 'center',
      tap: true,
      attributionControl: false
    });

    // Add zoom control top-right for better reachability
    L.control.zoom({ position: 'topright' }).addTo(mapRef.current);
    // No attribution or scale controls for a clean map view

    // Single, attractive world map (Carto Voyager), no wrap
    const cartoUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
    L.tileLayer(cartoUrl, { noWrap: true }).addTo(mapRef.current);

    const bounds = L.latLngBounds(L.latLng(-85, -180), L.latLng(85, 180));
    mapRef.current.setMaxBounds(bounds);
    mapRef.current.setView([20, 0], 2, { animate: true });

    mapRef.current.on('click', async (e: any) => {
      const { lat, lng } = e.latlng;
      await setMarkerAndReverseGeocode(lng, lat);
    });

    // Keyboard navigation for accessibility
    mapRef.current.keyboard.enable();
  }, []);

  const createMarkerLayer = useCallback((lat: number, lng: number): L.Layer => {
    if (markerImageUrl) {
      const size = 56;
      const html = `<div style="width:${size}px;height:${size}px;border-radius:50%;overflow:hidden;border:2px solid #ffffff;box-shadow:0 2px 8px rgba(0,0,0,0.3);background:#eee;display:flex;align-items:center;justify-content:center;">
        <img src="${markerImageUrl}" alt="marker" style="width:100%;height:100%;object-fit:cover;" />
      </div>`;
      const icon = L.divIcon({
        html,
        className: 'cw-img-marker',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });
      return L.marker([lat, lng], { icon });
    }
    return L.circleMarker([lat, lng], {
      radius: 8,
      color: '#0ea5e9',
      weight: 2,
      fill: true,
      fillOpacity: 0.8
    });
  }, [markerImageUrl]);

  const setMarkerAndReverseGeocode = useCallback(async (lng: number, lat: number) => {
    if (!mapRef.current) return;

    if (markerRef.current) {
      markerRef.current.remove();
    }

    markerRef.current = createMarkerLayer(lat, lng).addTo(mapRef.current);
    mapRef.current.setView([lat, lng], 15);

    let placeName: string | undefined;
    try {
      const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      const data = await resp.json();
      placeName = data?.display_name;
    } catch (err) {
      console.warn('Reverse geocoding failed', err);
    }

    const locationData: LocationData = {
      latitude: lat,
      longitude: lng,
      timestamp: Date.now(),
      placeName
    };
    onLocationSelect(locationData);
  }, [onLocationSelect, createMarkerLayer]);

  // Get current GPS location
  const getCurrentLocation = async () => {
    setLoading(true);
    setError('');
    try {
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });
      await setMarkerAndReverseGeocode(
        coordinates.coords.longitude,
        coordinates.coords.latitude
      );
    } catch (err) {
      setError('Unable to get current location. Please select manually on the map.');
      console.error('Geolocation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const setMarkerOnly = useCallback((lng: number, lat: number) => {
    if (!mapRef.current) return;
    if (markerRef.current) {
      markerRef.current.remove();
    }
    markerRef.current = createMarkerLayer(lat, lng).addTo(mapRef.current);
    mapRef.current.setView([lat, lng], 15);
  }, [createMarkerLayer]);

  // Update marker when selectedLocation changes externally (no reverse geocode to prevent shake)
  useEffect(() => {
    if (selectedLocation && mapRef.current) {
      setMarkerOnly(selectedLocation.longitude, selectedLocation.latitude);
    }
  }, [selectedLocation, setMarkerOnly]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-primary" />
          <span>Location Selection</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* No API key required for Leaflet + OSM */}

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
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Click on the map to select a location manually
          </p>
          <div 
            ref={mapContainer} 
            className="w-full h-80 rounded-lg border shadow-gentle"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="space-x-2">
              <Button size="sm" variant="outline" onClick={() => mapRef.current?.flyTo([20, 0], 2, { duration: 0.6 })}>World View</Button>
              <Button size="sm" variant="outline" onClick={() => {
                if (markerRef.current && mapRef.current) {
                  const ll = (markerRef.current as any).getLatLng?.();
                  if (ll) mapRef.current.flyTo([ll.lat, ll.lng], 15, { duration: 0.6 });
                }
              }}>Go to Marker</Button>
              <Button size="sm" variant="outline" onClick={() => {
                if (markerRef.current) {
                  markerRef.current.remove();
                  markerRef.current = null;
                }
                onLocationSelect(null);
                mapRef.current?.flyTo([20, 0], 2, { duration: 0.6 });
              }}>Reset Location</Button>
              <Button size="sm" onClick={() => mapRef.current?.zoomIn(1, { animate: true })}>Zoom In</Button>
              <Button size="sm" onClick={() => mapRef.current?.zoomOut(1, { animate: true })}>Zoom Out</Button>
            </div>
            <span>Use mouse wheel, pinch, or + / - to zoom</span>
          </div>
        </div>

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
              {selectedLocation.placeName && (
                <div className="col-span-2">
                  <p className="text-muted-foreground">Place</p>
                  <p className="font-medium">{selectedLocation.placeName}</p>
                </div>
              )}
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