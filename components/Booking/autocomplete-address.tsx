import { useEffect, useState } from "react";

export default function AutocompleteAddress() {
  const [source, setSource] = useState<any>();
  const [sourceChange, setSourceChange] = useState<any>(false);
  const [destinationChange, setDestinationChange] = useState<any>(false);
  const [addressList, setAddressList] = useState<any>([]);
  const [destination, setDestination] = useState<any>();

  const getAddressList = async () => {
    setAddressList([]);
    const query = sourceChange ? source : destination;
    const res = await fetch("/api/search-address?q=" + query, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    setAddressList(result);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAddressList();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [source, destination]);

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

        {addressList?.suggestions && sourceChange && (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-20">
            {addressList?.suggestions.map((suggestion: any) => (
              <h2
                key={suggestion.mapbox_id}
                className="p-3 hover:bg-gray-100
                cursor-pointer"
                onClick={() => {
                  setSource(suggestion.full_address);
                  setAddressList([]);
                  setSourceChange(false);
                }}
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

        {addressList?.suggestions && destinationChange && (
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
                  setDestination(suggestion.full_address);
                  setAddressList([]);
                  setDestinationChange(false);
                }}
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
