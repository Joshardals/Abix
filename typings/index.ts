// Define types for the airport result
export interface Country {
  code: string;
  name: string;
  continent: string;
  wikipedia: string;
}

export interface Region {
  code: string;
  local_code: string;
  name: string;
  wikipedia: string;
}

export interface MatchRelevance {
  code: number | null;
  country: number | null;
  levenshtein: number;
  ts_rank: number;
  trgm_similarity: number | null;
  skipped_chunks: number;
}

export interface Properties {
  id: number;
  country: Country;
  name: string;
  source: string;
  distance: number | null;
  match_relevance: MatchRelevance;
  match_level: number;
  region: Region;
  elevation: number;
  functions: string[];
  gps_code: string;
  home_link: string | null;
  iata: string;
  local_code: string | null;
  municipality: string;
  type: string;
  wikipedia: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface AirportFeature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface ApiResponse {
  type: string;
  features: AirportFeature[];
}

// Define types for the airport result
export interface Airport {
  name: string;
  city: string;
  country: string;
  iata: string;
  type: string;
  coordinates: number[];
}

// Define a TypeScript interface for the ticket structure
export interface Ticket {
  id: number;
  from: string | null;
  to: string | null;
  date: string | null;
  amount: string | null;
  price: string | null;
  flightTime: string | null;
}
