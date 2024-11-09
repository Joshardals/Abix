"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaPlaneDeparture } from "react-icons/fa6";
import { RiArrowUpDownLine } from "react-icons/ri";
import { ButtonInput } from "../form/FormInput";
import { FormEvent, useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "../ui/input";
import { useClickOutside } from "@/lib/hooks";
import debounce from "lodash/debounce";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import axios from "axios";


export function SearchTicket() {
  const [fromState, setFromState] = useState(false);
  const [toState, setToState] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
  }

  function toggleFrom() {
    setFromState(!fromState);
    setToState(false);
  }

  function toggleTo() {
    setToState(!toState);
    setFromState(false);
  }

  const divRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(divRef, () => {
    setFromState(false);
    setToState(false);
  });

  return (
    <div ref={divRef}>
      <form
        onSubmit={handleSubmit}
        className="bg-gray text-navyBlue rounded-2xl p-4 space-y-4 text-sm"
      >
        <div className="space-y-4 relative">
          <LocationInput
            label="From"
            destination="London, United Kingdom"
            isOpen={fromState}
            onClick={toggleFrom}
          />
          <div className="bg-black w-[fit-content] text-gray rounded-xl p-3 shadow-md shadow-black/50 absolute right-4 top-[1.9rem]">
            <RiArrowUpDownLine className="size-5" />
          </div>
          <LocationInput
            label="To"
            destination="Lagos, Nigeria"
            isOpen={toState}
            onClick={toggleTo}
          />
        </div>

        <div className="grid grid-cols-2 space-x-4">
          <Select label="Departure Date" value="Tue, 2 Apr" />
          <Select label="Amount" value="2 People" />
        </div>

        <ButtonInput variant="abix" label="Search Ticket" loading={loading} />
      </form>
    </div>
  );
}

export function LocationInput({
  label,
  destination,
  isOpen,
  onClick,
}: {
  label: string;
  destination: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationResults, setLocationResults] = useState<any[]>([]);

  // Fetch airports from OpenFlights
  const fetchAirports = debounce(async (query: string) => {
    if (!query) return;
    setLocationLoading(true);
    try {
      // OpenFlights API URL
      const url = `https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.json`;

      // Fetch data from OpenFlights airport JSON
      const response = await axios.get(url);
      const airports = response.data;

      // Filter airports by search query (name or city match)
      const results = airports.filter((airport: any) => {
        const airportName = airport.name.toLowerCase();
        const airportCity = airport.city.toLowerCase();
        return (
          airportName.includes(query.toLowerCase()) ||
          airportCity.includes(query.toLowerCase())
        );
      });

      setLocationResults(results);
    } catch (error) {
      console.error("Failed to fetch airports:", error);
    }
    setLocationLoading(false);
  }, 300);

  useEffect(() => {
    fetchAirports(searchTerm);
  }, [searchTerm]);

  const divRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(divRef, () => {
    onClick();
  });

  return (
    <div
      className="relative ring-1 ring-black/10 p-2 rounded-lg space-y-1 cursor-pointer"
      onClick={onClick}
    >
      <span className="opacity-50">{label}</span>
      <div className="font-medium">{destination}</div>

      <div
        className={`cursor-default absolute left-0 z-10 bg-gray shadow-md ring-1 ring-black/10 w-full rounded-lg space-y-2 hover-effects ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-b border-b-black/10">
          <div className="absolute top-0 left-0 h-full px-2 rounded-lg flex items-center">
            {locationLoading ? (
              <AiOutlineLoading3Quarters className="size-4 opacity-50 animate-spin" />
            ) : (
              <IoSearch className="size-5 opacity-50 " />
            )}
          </div>
          <Input
            placeholder={label}
            type="text"
            className="focus-visible:ring-0 text-sm pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="px-[0.6rem] pb-2 text-black/50">
          <p className="mb-4">Recent searches</p>
          <ul className="space-y-1 max-h-40 overflow-auto">
            {locationResults.length > 0 ? (
              locationResults.map((airport, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <FaPlaneDeparture />
                  <span>
                    {airport.name}, {airport.city}, {airport.country}
                  </span>
                </li>
              ))
            ) : (
              <p>No results found</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
function Select({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="ring-1 ring-black/10 p-2 rounded-lg space-y-1 cursor-pointer">
      <span className="opacity-50">{label}</span>
      <div className="flex justify-between items-center">
        <div className="font-medium">{value}</div>
        <MdOutlineKeyboardArrowDown className="size-5" />
      </div>
    </div>
  );
}
