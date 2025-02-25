
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
      style: "mapbox://styles/mapbox/light-v11",
      center: [-74.5, 40],
      zoom: 2,
    });

    // Add heatmap data
    map.current.on("load", () => {
      map.current?.addSource("scans", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [-74.006, 40.7128], // New York
              },
              properties: {
                weight: 1,
              },
            },
            // Add more points as needed
          ],
        },
      });

      map.current?.addLayer({
        id: "scans-heat",
        type: "heatmap",
        source: "scans",
        maxzoom: 15,
        paint: {
          "heatmap-weight": ["get", "weight"],
          "heatmap-intensity": ["interpolate", ["linear"], ["zoom"], 0, 1, 9, 3],
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(0, 0, 0, 0)",
            0.2,
            "rgb(221,221,221)",
            0.4,
            "rgb(189,189,189)",
            0.6,
            "rgb(158,158,158)",
            0.8,
            "rgb(117,117,117)",
            1,
            "rgb(97,97,97)",
          ],
          "heatmap-radius": ["interpolate", ["linear"], ["zoom"], 0, 2, 9, 20],
          "heatmap-opacity": 0.8,
        },
      });
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
