interface Coordinates {
  lng: number;
  lat: number;
}

export async function fetchCoordinates(
  mapboxId: string,
  sessionToken: string
): Promise<Coordinates | null> {
  try {
    const res = await fetch(
      `${MAPBOX_RETRIEVE_URL}${mapboxId}?session_token=${sessionToken}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );

    if (!res.ok) throw new Error("Failed to fetch coordinates");

    const result = await res.json();
    const coordinates = result.features[0].geometry.coordinates;
    return { lng: coordinates[0], lat: coordinates[1] };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null;
  }
}

export async function sourceAddress(
  item: Suggestion,
  setSource: React.Dispatch<React.SetStateAction<string>>,
  setSourceCoordinates: React.Dispatch<
    React.SetStateAction<Coordinates | null>
  >,
  sessionToken: string
) {
  setSource(item.full_address);
  const coordinates = await fetchCoordinates(item.mapbox_id, sessionToken);
  if (coordinates) setSourceCoordinates(coordinates);
}

export async function destinationAddress(
  item: Suggestion,
  setDestination: React.Dispatch<React.SetStateAction<string>>,
  setDestinationCoordinates: React.Dispatch<
    React.SetStateAction<Coordinates | null>
  >,
  sessionToken: string
) {
  setDestination(item.full_address);
  const coordinates = await fetchCoordinates(item.mapbox_id, sessionToken);
  if (coordinates) setDestinationCoordinates(coordinates);
}
