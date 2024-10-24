export interface Suggestion {
  mapbox_id: string;
  full_address: string;
}

export interface AddressList {
  suggestions: Suggestion[];
}

export async function getAddressList(
  query: string
): Promise<AddressList | null> {
  try {
    const res = await fetch(`/api/search-address?q=${query}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch address suggestions");
    }

    const result: AddressList = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching address suggestions:", error);
    return null;
  }
}

export function handleSelectSuggestion(
  setFieldValue: React.Dispatch<React.SetStateAction<string>>,
  setAddressList: React.Dispatch<React.SetStateAction<AddressList | null>>,
  suggestion: Suggestion
) {
  setFieldValue(suggestion.full_address);
  setAddressList(null);
}
