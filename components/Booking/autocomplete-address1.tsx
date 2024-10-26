"use client";

import {
  AddressList,
  getAddressList,
  handleSelectSuggestion,
} from "@/utils/getAddress";
import { useEffect, useState } from "react";

// // Define types for Mapbox API response
// interface Suggestion {
//   mapbox_id: string;
//   full_address: string;
// }

// interface AddressList {
//   suggestions: Suggestion[];
// }

export default function AutocompleteAddress() {
  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [sourceSuggestions, setSourceSuggestions] =
    useState<AddressList | null>(null);
  const [destinationSuggestions, setDestinationSuggestions] =
    useState<AddressList | null>(null);
  const [sourceChange, setSourceChange] = useState<boolean>(false);
  const [destinationChange, setDestinationChange] = useState<boolean>(false);
  //const [addressList, setAddressList] = useState<AddressList | null>(null);

  // Fetch source suggestions
  useEffect(() => {
    const fetchAddress = setTimeout(async () => {
      if (source.trim()) {
        const result = await getAddressList(source);
        setSourceSuggestions(result);
      }
    }, 1000);

    return () => clearTimeout(fetchAddress);
  }, [source]);

  // Fetch destination suggestions
  useEffect(() => {
    const fetchAddress = setTimeout(async () => {
      if (destination.trim()) {
        const result = await getAddressList(destination);
        setDestinationSuggestions(result);
      }
    }, 1000);

    return () => clearTimeout(fetchAddress);
  }, [destination]);

  // async function getAddressList() {
  //   try {
  //     const res = await fetch(`/api/search-address?q=${source}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!res.ok) {
  //       throw new Error("Failed to fetch address suggestions");
  //     }

  //     const result: AddressList = await res.json();
  //     setAddressList(result);
  //   } catch (error) {
  //     console.error("Error fetching address suggestions:", error);
  //   }
  // }

  // const handleSelectSuggestion = (fullAddress: string, isSource: boolean) => {
  //   if (isSource) {
  //     setSource(fullAddress);
  //     setSourceChange(false);
  //   } else {
  //     setDestination(fullAddress);
  //     setDestinationChange(false);
  //   }
  //   setAddressList(null);
  // };

  return (
    <form className="mt-5">
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

        {sourceSuggestions?.suggestions?.length && sourceChange && (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-20">
            {sourceSuggestions?.suggestions.map((suggestion) => (
              <h2
                key={suggestion.mapbox_id}
                className="p-3 hover:bg-gray-100
                cursor-pointer"
                onClick={() =>
                  handleSelectSuggestion(
                    setSource,
                    setSourceSuggestions,
                    suggestion
                  )
                }
                // onClick={() => {
                //   setSource(suggestion.full_address);
                //   setAddressList([]);
                //   setSourceChange(false);
                // }}
                // onClick={() => {
                //   onSourceAddressClick(suggestion);
                // }}
              >
                {suggestion.full_address}
              </h2>
            ))}
          </div>
        )}
      </div>

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

        {destinationSuggestions?.suggestions?.length && destinationChange && (
          <div
            className="shadow-md p-1 rounded-md
            absolute w-full bg-white"
          >
            {destinationSuggestions?.suggestions.map((suggestion) => (
              <h2
                key={suggestion.mapbox_id}
                className="p-3 hover:bg-gray-100
                cursor-pointer"
                onClick={() =>
                  handleSelectSuggestion(
                    setDestination,
                    setDestinationSuggestions,
                    suggestion
                  )
                }
                // onClick={() => {
                //   setDestination(suggestion.full_address);
                //   setAddressList([]);
                //   setDestinationChange(false);
                // }}
                // onClick={() => {
                //   onSourceAddressClick(suggestion);
                // }}
              >
                {suggestion.full_address}
              </h2>
            ))}
          </div>
        )}
      </div>
    </form>
  );
}
