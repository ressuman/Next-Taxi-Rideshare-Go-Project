import { DestinationCoordinatesContext } from "@/context/destination-coordinates-context";
import { SourceCoordinatesContext } from "@/context/source-coordinates-context";
import { useContext, useEffect, useState } from "react";

interface AddressSuggestion {
  mapbox_id: string;
  full_address: string;
}

export default function AutocompleteAddress() {
  // const [source, setSource] = useState<any>();
  // const [sourceChange, setSourceChange] = useState<any>(false);
  // const [destinationChange, setDestinationChange] = useState<any>(false);
  // const [addressList, setAddressList] = useState<any>([]);
  // const [destination, setDestination] = useState<any>();

  const [source, setSource] = useState<string>("");
  const [destination, setDestination] = useState<string>("");

  const [addressList, setAddressList] = useState<AddressSuggestion[]>([]);
  const [sourceChange, setSourceChange] = useState<boolean>(false);
  const [destinationChange, setDestinationChange] = useState<boolean>(false);
  //const [isSourceFetching, setIsSourceFetching] = useState<boolean>(false);
  //const [isDestinationFetching, setIsDestinationFetching] =
  useState<boolean>(false);

  const { setSourceCoordinates } = useContext(SourceCoordinatesContext) ?? {};
  const { setDestinationCoordinates } =
    useContext(DestinationCoordinatesContext) ?? {};

  // Fetch address suggestions based on input change
  const fetchAddressList = async (query: string) => {
    // //setAddressList([]);
    // const query = sourceChange ? source : destination;
    // const res = await fetch(`/api/search-address?q=${query}`, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });

    // const result = await res.json();
    // //setAddressList(result);
    // setAddressList(result.suggestions || []);
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

  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     getAddressList();
  //   }, 1000);
  //   return () => clearTimeout(delayDebounceFn);
  // }, [source, destination]);

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

  // // Debounce source and destination fetches independently
  // useEffect(() => {
  //   if (isSourceFetching) {
  //     const delayDebounceFn = setTimeout(() => {
  //       fetchAddressList(source);
  //       setIsSourceFetching(false);
  //     }, 1000);
  //     return () => clearTimeout(delayDebounceFn);
  //   }
  // }, [source, isSourceFetching]);

  // useEffect(() => {
  //   if (isDestinationFetching) {
  //     const delayDebounceFn = setTimeout(() => {
  //       fetchAddressList(destination);
  //       setIsDestinationFetching(false);
  //     }, 1000);
  //     return () => clearTimeout(delayDebounceFn);
  //   }
  // }, [destination, isDestinationFetching]);

  // const onSourceAddressClick = async (suggestion: any) => {
  //   setSource(suggestion.full_address);
  //   setAddressList([]);
  //   setSourceChange(false);
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_MAPBOX_BASE_RETRIEVE_URL}/${suggestion.mapbox_id}?session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_TOKEN}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN}`
  //     );

  //     if (!res.ok) {
  //       throw new Error(`HTTP error! status: ${res.status}`);
  //     }

  //     const result = await res.json();

  //     setSourceCoordinates({
  //       lng: result.features[0].geometry.coordinates[0],
  //       lat: result.features[0].geometry.coordinates[1],
  //     });
  //     console.log(result);
  //   } catch (error) {
  //     console.error("Error fetching data from Mapbox:", error);
  //   }
  // };

  // const onDestinationAddressClick = async (suggestion: any) => {
  //   setDestination(suggestion.full_address);
  //   setAddressList([]);
  //   setDestinationChange(false);
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_MAPBOX_BASE_RETRIEVE_URL}/${suggestion.mapbox_id}?session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_TOKEN}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN}`
  //     );

  //     if (!res.ok) {
  //       throw new Error(`HTTP error! status: ${res.status}`);
  //     }

  //     const result = await res.json();

  //     setDestinationCoordinates({
  //       lng: result.features[0].geometry.coordinates[0],
  //       lat: result.features[0].geometry.coordinates[1],
  //     });
  //     console.log(result);
  //   } catch (error) {
  //     console.error("Error fetching data from Mapbox:", error);
  //   }
  // };

  // const onAddressClick = async (
  //   suggestion: AddressSuggestion,
  //   setCoordinate: (coords: { lng: number; lat: number }) => void
  // ) => {
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_MAPBOX_BASE_RETRIEVE_URL}/${suggestion.mapbox_id}?session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_TOKEN}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN}`
  //     );

  //     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  //     const result = await res.json();
  //     const feature = result.features[0];
  //     if (!feature) throw new Error("No features found in the response");
  //     const [lng, lat] = feature.geometry.coordinates;

  //     setCoordinate({ lng, lat });
  //   } catch (error) {
  //     console.error("Error fetching coordinates from Mapbox:", error);
  //   }
  // };

  // Handle address selection and set coordinates accordingly
  // const handleAddressClick = async (
  //   suggestion: AddressSuggestion,
  //   isSource: boolean
  // ) => {
  //   const selectedAddress = suggestion.full_address;
  //   if (isSource) {
  //     setSource(selectedAddress);
  //   } else {
  //     setDestination(selectedAddress);
  //   }
  //   setAddressList([]);

  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_MAPBOX_BASE_RETRIEVE_URL}/${suggestion.mapbox_id}?session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_TOKEN}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN}`
  //     );
  //     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  //     const result = await res.json();

  //     const coordinates = {
  //       lng: result.features[0].geometry.coordinates[0],
  //       lat: result.features[0].geometry.coordinates[1],
  //     };

  //     if (isSource && setSourceCoordinates) {
  //       setSourceCoordinates(coordinates);
  //     } else if (!isSource && setDestinationCoordinates) {
  //       setDestinationCoordinates(coordinates);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data from Mapbox:", error);
  //   }
  // };

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

  // const handleAddressClick = async (
  //   suggestion: AddressSuggestion,
  //   isSource: boolean
  // ) => {
  //   const selectedAddress = isSource ? suggestion.full_address : destination;
  //   if (isSource) {
  //     setSource(selectedAddress);
  //   } else {
  //     setDestination(selectedAddress);
  //   }
  //   setAddressList([]);

  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_MAPBOX_BASE_RETRIEVE_URL}/${suggestion.mapbox_id}?session_token=${process.env.NEXT_PUBLIC_MAPBOX_SESSION_TOKEN}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_ACCESS_TOKEN}`
  //     );
  //     if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  //     const result = await res.json();

  //     const coordinates = {
  //       lng: result.features[0].geometry.coordinates[0],
  //       lat: result.features[0].geometry.coordinates[1],
  //     };

  //     if (isSource && setSourceCoordinates) {
  //       setSourceCoordinates(coordinates);
  //     } else if (!isSource && setDestinationCoordinates) {
  //       setDestinationCoordinates(coordinates);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data from Mapbox:", error);
  //   }
  // };

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
            //setIsSourceFetching(true);
            setSourceChange(true);
          }}
        />

        {/* {addressList?.suggestions && sourceChange && (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-20">
            {addressList?.suggestions.map((suggestion: any) => (
              <h2
                key={suggestion.mapbox_id}
                className="p-3 hover:bg-gray-100
                cursor-pointer"
                onClick={() => {
                  onSourceAddressClick(suggestion);
                }}
              >
                {suggestion.full_address}
              </h2>
            ))}
          </div>
        )} */}
        {addressList.length > 0 && sourceChange && (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-20">
            {addressList.map((suggestion) => (
              <button
                type="button"
                key={suggestion.mapbox_id}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                // onClick={() => {
                //   setSource(suggestion.full_address);
                //   setSourceChange(false);
                //   onAddressClick(suggestion, setSourceCoordinates);
                // }}
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
            //setIsDestinationFetching(true);
            setDestinationChange(true);
          }}
        />

        {/* {addressList?.suggestions && destinationChange && (
          <div
            className="shadow-md p-1 rounded-md
            absolute w-full bg-white"
          >
            {addressList?.suggestions.map((suggestion: any) => (
              <h2
                key={suggestion.mapbox_id}
                className="p-3 hover:bg-gray-100
                cursor-pointer"
                onClick={() => {
                  onDestinationAddressClick(suggestion);
                }}
              >
                {suggestion.full_address}
              </h2>
            ))}
          </div>
        )} */}
        {addressList.length > 0 && destinationChange && (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
            {addressList.map((suggestion) => (
              <button
                type="button"
                key={suggestion.mapbox_id}
                className="p-3 hover:bg-gray-100 cursor-pointer"
                // onClick={() => {
                //   setDestination(suggestion.full_address);
                //   setDestinationChange(false);
                //   onAddressClick(suggestion, setDestinationCoordinates);
                // }}
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
