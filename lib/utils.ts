import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import debounce from "lodash/debounce";
import axios from "axios";

// Define types for the airport result
interface Airport {
  name: string;
  city: string;
  country: string;
  iata: string;
  type: string;
  coordinates: number[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Define the debounced fetch function with proper types
export const fetchAirportsDebounced = debounce(
  async (
    query: string,
    setLocationResults: (results: Airport[]) => void, // Set the correct type for the results setter
    setLocationLoading: (loading: boolean) => void // Set the correct type for the loading setter
  ) => {
    if (!query) return;
    setLocationLoading(true);

    try {
      const url = `https://port-api.com/port/search/${encodeURIComponent(
        query
      )}`;
      const response = await axios.get<{ features: any[] }>(url); // Explicitly type the response
      const airports = response.data.features;

      const results: Airport[] = airports.map((airport) => ({
        name: airport.properties.name,
        city: airport.properties.municipality,
        country: airport.properties.country.name,
        iata: airport.properties.iata,
        type: airport.properties.type,
        coordinates: airport.geometry.coordinates,
      }));

      setLocationResults(results);
    } catch (error) {
      console.error("Failed to fetch airports:", error);
    }

    setLocationLoading(false);
  },
  300
);

// Other utility functions (no changes needed)
export function generateRandomPrice(from: string, to: string): number {
  let basePrice = 0;

  // Set base prices based on common routes using includes
  if (from.includes("London") && to.includes("Lagos")) {
    basePrice = 500;
  } else if (from.includes("New York") && to.includes("Lagos")) {
    basePrice = 600;
  } else if (from.includes("Paris") && to.includes("Lagos")) {
    basePrice = 450;
  } else if (from.includes("Berlin") && to.includes("Lagos")) {
    basePrice = 400;
  } else if (from.includes("Tokyo") && to.includes("Lagos")) {
    basePrice = 700; // Adding more routes (e.g., Tokyo to Lagos)
  } else if (from.includes("Dubai") && to.includes("Lagos")) {
    basePrice = 550; // Adding Dubai to Lagos route
  } else if (from.includes("Mumbai") && to.includes("Lagos")) {
    basePrice = 650; // Mumbai to Lagos route
  } else if (from.includes("Sydney") && to.includes("Lagos")) {
    basePrice = 800; // Sydney to Lagos route
  } else if (from.includes("Cairo") && to.includes("Lagos")) {
    basePrice = 350; // Cairo to Lagos route
  } else if (from.includes("Singapore") && to.includes("Lagos")) {
    basePrice = 750; // Singapore to Lagos route
  } else if (from.includes("Los Angeles") && to.includes("Lagos")) {
    basePrice = 650; // LA to Lagos route
  } else if (from.includes("Toronto") && to.includes("Lagos")) {
    basePrice = 700; // Toronto to Lagos route
  } else {
    basePrice = 300; // Default price for unspecified routes
  }

  // Simulate price fluctuations with a random factor
  const fluctuation = Math.random() * 200 - 100; // Random fluctuation between -100 and +100
  return Math.round(basePrice + fluctuation);
}

export function generateRandomFlightTime(from: string, to: string): number {
  let baseTime = 0;

  // Base flight times based on route using includes
  if (from.includes("London") && to.includes("Lagos")) {
    baseTime = 7; // 7 hours
  } else if (from.includes("New York") && to.includes("Lagos")) {
    baseTime = 10; // 10 hours
  } else if (from.includes("Paris") && to.includes("Lagos")) {
    baseTime = 6; // 6 hours
  } else if (from.includes("Berlin") && to.includes("Lagos")) {
    baseTime = 8; // 8 hours
  } else if (from.includes("Tokyo") && to.includes("Lagos")) {
    baseTime = 12; // Tokyo to Lagos flight time
  } else if (from.includes("Dubai") && to.includes("Lagos")) {
    baseTime = 8; // Dubai to Lagos flight time
  } else if (from.includes("Mumbai") && to.includes("Lagos")) {
    baseTime = 9; // Mumbai to Lagos flight time
  } else if (from.includes("Sydney") && to.includes("Lagos")) {
    baseTime = 20; // Sydney to Lagos flight time
  } else if (from.includes("Cairo") && to.includes("Lagos")) {
    baseTime = 4; // Cairo to Lagos flight time
  } else if (from.includes("Singapore") && to.includes("Lagos")) {
    baseTime = 13; // Singapore to Lagos flight time
  } else if (from.includes("Los Angeles") && to.includes("Lagos")) {
    baseTime = 14; // LA to Lagos flight time
  } else if (from.includes("Toronto") && to.includes("Lagos")) {
    baseTime = 11; // Toronto to Lagos flight time
  } else {
    // Randomize flight time if not a direct route
    baseTime = Math.floor(Math.random() * 15) + 3; // Between 3 and 15 hours
  }

  // Add some variation to flight time based on randomness (e.g., time of day, layovers)
  const variation = Math.random() * 2 - 1; // Fluctuates between -1 and +1 hours
  return Math.round(baseTime + variation);
}

export function formatPrice(price: number, currency: string = "USD"): string {
  // Use the Intl.NumberFormat API to format the price with the given currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(price);
}
