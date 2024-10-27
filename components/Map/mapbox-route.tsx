import { Layer, Source } from "react-map-gl";

export default function MapboxRoute({ coordinates }) {
  return (
    <Source
      data={{
        type: "Feature",
        geometry: { type: "LineString", coordinates: coordinates },
      }}
    >
      <Layer />
    </Source>
  );
}
