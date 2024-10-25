"use client";

//import { Map } from "react-map-gl";
import Map from "react-map-gl";

export default function MapboxMap() {
  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Map</h2>
      <div className="rounded-lg overflow-hidden">
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN}
          initialViewState={{
            longitude: -0.186964,
            latitude: 5.603717,
            zoom: 14,
          }}
          style={{ width: "100%", height: 520, borderRadius: 10 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        />
      </div>
    </div>
  );
}
