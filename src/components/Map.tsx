import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Navigation } from 'lucide-react';

// Replace with your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic3ViaGFtLTYyOSIsImEiOiJjbTV4ZTVib20wMzk1Mm1zZzl0bDFmaGdpIn0.g9p7af7i2ZJXxJd1IocuGg';

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.006, 40.7128], // NYC coordinates
      zoom: 12
    });

    // Add directions control
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      alternatives: true,
      controls: {
        inputs: true,
        instructions: true,
        profileSwitcher: true
      }
    });

    map.current.addControl(directions, 'top-left');
    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="absolute inset-0" />
      
      <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-2">
          <Navigation className="text-blue-500" />
          <h1 className="text-lg font-semibold">Navigation</h1>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Enter your start and destination points in the search boxes to get directions
        </p>
      </div>
    </div>
  );
}