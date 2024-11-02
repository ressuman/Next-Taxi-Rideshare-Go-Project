import { DestinationCoordinatesContext } from "@/context/destination-coordinates-context";
import { SourceCoordinatesContext } from "@/context/source-coordinates-context";
import { useContext, useEffect, useState } from "react";

interface AddressSuggestion {
  mapbox_id: string;
  full_address: string;
}

export default function AutocompleteAddress() {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const [addressList, setAddressList] = useState<AddressSuggestion[]>([]);
  const [sourceChange, setSourceChange] = useState<boolean>(false);
  const [destinationChange, setDestinationChange] = useState<boolean>(false);

  const { setSourceCoordinates } = useContext(SourceCoordinatesContext) ?? {};
  const { setDestinationCoordinates } =
    useContext(DestinationCoordinatesContext) ?? {};

  // Fetch address suggestions based on input change
  const fetchAddressList = async (query: string) => {
    try {
      if (!query) return;
      const res = await fetch(`/api/search-address?q=${query}`, {
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      setAddressList(result.suggestions || []);
    } catch (error) {
      console.error("Failed to fetch address list:", error);
    }
  };

  // Trigger address fetch only for the active input field
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (sourceChange) {
        fetchAddressList(source);
      } else if (destinationChange) {
        fetchAddressList(destination);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [source, destination, sourceChange, destinationChange]);

  const handleAddressClick = async (
    suggestion: AddressSuggestion,
    isSource: boolean
  ) => {
    if (isSource) {
      setSource(suggestion.full_address);
      setSourceChange(false);
    } else {
      setDestination(suggestion.full_address);
      setDestinationChange(false);
    }

    setAddressList([]);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_MAPBOX_BASE_RETRIEVE_URL}/${suggestion.mapbox_id}?session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_TOKEN}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN}`
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const result = await res.json();

      const coordinates = {
        lng: result.features[0].geometry.coordinates[0],
        lat: result.features[0].geometry.coordinates[1],
      };

      if (isSource && setSourceCoordinates) {
        setSourceCoordinates(coordinates);
      } else if (!isSource && setDestinationCoordinates) {
        setDestinationCoordinates(coordinates);
      }
    } catch (error) {
      console.error("Error fetching data from Mapbox:", error);
    }
  };

  return (
    <form className="mt-5">
      {/* Source Input */}
      <div className="relative">
        <label className="text-gray-400 text-[13px]" htmlFor="source">
          Where From?
        </label>
        <input
          type="text"
          name="source"
          id="source"
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300 text-[14px]"
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true);
          }}
        />

        {addressList.length > 0 && sourceChange && (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-20">
            {addressList.map((suggestion) => (
              <button
                type="button"
                key={suggestion.mapbox_id}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAddressClick(suggestion, true)}
              >
                {suggestion.full_address}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Destination Input */}
      <div className="relative">
        <label className="text-gray-400 text-[13px]" htmlFor="destination">
          Where To?
        </label>
        <input
          type="text"
          name="destination"
          id="destination"
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300 text-[14px]"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            setDestinationChange(true);
          }}
        />

        {addressList.length > 0 && destinationChange && (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
            {addressList.map((suggestion) => (
              <button
                type="button"
                key={suggestion.mapbox_id}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleAddressClick(suggestion, false)}
              >
                {suggestion.full_address}
              </button>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
