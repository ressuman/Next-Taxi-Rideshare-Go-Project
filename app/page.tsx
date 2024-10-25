import Booking from "@/components/Booking/booking";
import MapboxMap from "@/components/Map/mapbox-map";

export default function HomePage() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="">
          <Booking />
        </div>

        <div
          className="col-span-2
        "
        >
          <MapboxMap />
        </div>
      </div>
    </div>
  );
}
