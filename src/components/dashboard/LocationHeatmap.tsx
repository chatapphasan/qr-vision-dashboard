
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

interface LocationHeatmapProps {
  isLoading: boolean;
}

const LocationHeatmap = ({ isLoading }: LocationHeatmapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState("");

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || isLoading) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11", // Changed to dark style for better visualization
      center: [0, 20], // Centered more globally
      zoom: 1.5, // Zoomed out to show more of the world
      projection: 'mercator'
    });

    // Add heatmap data
    map.current.on("load", () => {
      // Sample data representing scans from different locations
      const heatmapData = {
        type: "FeatureCollection",
        features: [
          // Americas
          { type: "Feature", geometry: { type: "Point", coordinates: [-74.006, 40.7128] }, properties: { weight: 10 } }, // New York
          { type: "Feature", geometry: { type: "Point", coordinates: [-118.2437, 34.0522] }, properties: { weight: 8 } }, // Los Angeles
          { type: "Feature", geometry: { type: "Point", coordinates: [-79.3832, 43.6532] }, properties: { weight: 6 } }, // Toronto
          { type: "Feature", geometry: { type: "Point", coordinates: [-46.6333, -23.5505] }, properties: { weight: 7 } }, // São Paulo

          // Europe
          { type: "Feature", geometry: { type: "Point", coordinates: [-0.1276, 51.5074] }, properties: { weight: 9 } }, // London
          { type: "Feature", geometry: { type: "Point", coordinates: [2.3522, 48.8566] }, properties: { weight: 8 } }, // Paris
          { type: "Feature", geometry: { type: "Point", coordinates: [13.4050, 52.5200] }, properties: { weight: 7 } }, // Berlin

          // Asia
          { type: "Feature", geometry: { type: "Point", coordinates: [139.6917, 35.6895] }, properties: { weight: 9 } }, // Tokyo
          { type: "Feature", geometry: { type: "Point", coordinates: [121.4737, 31.2304] }, properties: { weight: 8 } }, // Shanghai
          { type: "Feature", geometry: { type: "Point", coordinates: [103.8198, 1.3521] }, properties: { weight: 6 } }, // Singapore
          { type: "Feature", geometry: { type: "Point", coordinates: [77.2090, 28.6139] }, properties: { weight: 7 } }, // New Delhi

          // Australia
          { type: "Feature", geometry: { type: "Point", coordinates: [151.2093, -33.8688] }, properties: { weight: 6 } }, // Sydney
        ]
      };

      map.current?.addSource("scans", {
        type: "geojson",
        data: heatmapData
      });

      map.current?.addLayer({
        id: "scans-heat",
        type: "heatmap",
        source: "scans",
        maxzoom: 15,
        paint: {
          // Increase the heatmap weight based on frequency of points
          "heatmap-weight": ["interpolate", ["linear"], ["get", "weight"], 0, 0, 10, 1],
          
          // Increase the heatmap color weight by zoom level
          "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
          
          // Color ramp for heatmap.
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0, "rgba(33,102,172,0)",
            0.2, "rgb(103,169,207)",
            0.4, "rgb(209,229,240)",
            0.6, "rgb(253,219,199)",
            0.8, "rgb(239,138,98)",
            1, "rgb(178,24,43)"
          ],
          
          // Adjust the heatmap radius by zoom level
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 4, 9, 30],
          
          // Transition from heatmap to circle layer by zoom level
          "heatmap-opacity": ["interpolate", ["linear"], ["zoom"], 7, 1, 9, 0]
        }
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
    });

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, isLoading]);

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  return (
    <div className="space-y-4">
      {!mapboxToken && (
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Enter your Mapbox token to view the heatmap:</p>
          <Input
            type="text"
            placeholder="pk.eyJ1..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
          />
        </div>
      )}
      <div ref={mapContainer} className="h-[300px] w-full rounded-lg overflow-hidden" />
    </div>
  );
};

export default LocationHeatmap;
