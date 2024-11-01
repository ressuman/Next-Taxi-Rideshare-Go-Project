import { Layer, Source } from "react-map-gl";

interface MapboxRouteProps {
  readonly coordinates: number[][];
}

export default function MapboxRoute({ coordinates }: MapboxRouteProps) {
  return (
    <Source
      type="geojson"
      data={{
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
      }}
    >
      <Layer
        type="line"
        layout={{
          "line-join": "round",
          "line-cap": "square",
        }}
        paint={{
          "line-color": "#0462d4",
          "line-width": 4,
        }}
      />
    </Source>
  );
}
