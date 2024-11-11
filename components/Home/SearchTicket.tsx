"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaPlaneDeparture } from "react-icons/fa6";
import { RiArrowUpDownLine } from "react-icons/ri";
import { ButtonInput } from "../form/FormInput";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "../ui/input";
import { useClickOutside } from "@/lib/hooks";

import { format } from "date-fns"; // For date formatting
import { useRouter } from "next/navigation";
import {
  fetchAirportsDebounced,
  generateRandomFlightTime,
  generateRandomPrice,
} from "@/lib/utils";

export function SearchTicket() {
  const [fromState, setFromState] = useState(false);
  const [toState, setToState] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // States to store selected airports
  const [fromLocation, setFromLocation] = useState("London, United Kingdom");
  const [toLocation, setToLocation] = useState("Lagos, Nigeria");

  // New states for amount and date
  const [amount, setAmount] = useState(1);
  const [date, setDate] = useState<Date | null>(new Date());
  const [dateState, setDateState] = useState(false);
  const [amountState, setAmountState] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Check if each field is selected
    if (!fromLocation || !toLocation || !amount || !date) {
      alert(
        "Please select a 'From' location, 'To' location, departure date, and number of people before submitting."
      );
      return; // Prevent form submission
    }

    // If all fields are filled, proceed with form submission
    setLoading(true);

    // Generate random price and flight time
    const randomPrice = generateRandomPrice(fromLocation, toLocation);
    const randomFlightTime = generateRandomFlightTime(fromLocation, toLocation);

    const queryParams = new URLSearchParams({
      from: fromLocation,
      to: toLocation,
      date: date ? format(date, "yyyy-MM-dd") : "",
      amount: amount.toString(),
      price: randomPrice.toString(),
      flightTime: randomFlightTime.toString(), // Flight time in hours
    });

    // Simulate loading for 2 seconds before redirecting
    setTimeout(() => {
      // Redirect after 2 seconds
      router.push(`/home/tickets?${queryParams.toString()}`);
      setLoading(false); // Optionally stop the loading state after redirect
    }, 2000);
  }
  function toggleFrom() {
    setFromState((prevState) => !prevState);
    setToState(false);
    setDateState(false);
    setAmountState(false);
  }

  function toggleTo() {
    setToState((prevState) => !prevState);
    setFromState(false);
    setDateState(false);
    setAmountState(false);
  }

  function toggleDate() {
    setDateState((prevState) => !prevState);
    setFromState(false);
    setToState(false);
    setAmountState(false);
  }

  function toggleAmount() {
    setAmountState((prevState) => !prevState);
    setFromState(false);
    setToState(false);
    setDateState(false);
  }

  const divRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(divRef, () => {
    setTimeout(() => {
      setFromState(false);
      setToState(false);
      setDateState(false);
      setAmountState(false);
    }, 50); // Adjust the timeout as needed for smooth UX
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
            destination={fromLocation}
            isOpen={fromState}
            onClick={toggleFrom}
            onSelect={(location) => setFromLocation(location)}
          />
          <div className="bg-black w-[fit-content] text-gray rounded-xl p-3 shadow-md shadow-black/50 absolute right-4 top-[1.9rem]">
            <RiArrowUpDownLine className="size-5" />
          </div>
          <LocationInput
            label="To"
            destination={toLocation}
            isOpen={toState}
            onClick={toggleTo}
            onSelect={(location) => setToLocation(location)}
          />
        </div>

        <div className="grid grid-cols-2 space-x-4">
          <DateSelector
            label="Departure Date"
            date={date}
            isOpen={dateState}
            onClick={toggleDate}
            onDateSelect={(selectedDate) => setDate(selectedDate)}
          />
          <AmountSelector
            label="Amount"
            amount={amount}
            isOpen={amountState}
            onClick={toggleAmount}
            onAmountSelect={(selectedAmount) => setAmount(selectedAmount)}
          />
        </div>

        <ButtonInput variant="abix" label="Search Ticket" loading={loading} />
      </form>
    </div>
  );
}

// Define a type for the airport object
interface Airport {
  name: string;
  city: string;
  country: string;
}

export function LocationInput({
  label,
  destination,
  isOpen,
  onClick,
  onSelect,
}: {
  label: string;
  destination: string;
  isOpen: boolean;
  onClick: () => void;
  onSelect: (location: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationResults, setLocationResults] = useState<Airport[]>([]); // Use the Airport type here

  useEffect(() => {
    fetchAirportsDebounced(searchTerm, setLocationResults, setLocationLoading);
  }, [searchTerm]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const divRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(divRef, onClick);

  const loadingIcon = useMemo(
    () =>
      locationLoading ? (
        <AiOutlineLoading3Quarters className="size-4 opacity-50 animate-spin" />
      ) : (
        <IoSearch className="size-5 opacity-50" />
      ),
    [locationLoading]
  );

  const resultsList = useMemo(
    () => (
      <ul className="max-h-40 overflow-auto">
        {locationResults.length > 0 ? (
          locationResults.map((airport, index) => (
            <li
              key={index}
              className="flex items-center space-x-2 hover:bg-black/10 cursor-pointer px-3 py-2"
              onClick={() => {
                onSelect(
                  `${airport.name}, ${airport.city}, ${airport.country}`
                );
                onClick(); // Close the dropdown after selecting
              }}
            >
              <FaPlaneDeparture />
              <span>
                {airport.name}, {airport.city}, {airport.country}
              </span>
            </li>
          ))
        ) : (
          <p className="px-3">No results found</p>
        )}
      </ul>
    ),
    [locationResults, onSelect, onClick]
  );

  return (
    <div
      className="relative ring-1 ring-black/10 p-2 rounded-lg space-y-1 cursor-pointer"
      onClick={onClick}
    >
      <span className="opacity-50">{label}</span>
      <div className="font-medium truncate max-w-[14rem]">{destination}</div>

      {isOpen && (
        <div
          ref={divRef}
          className="cursor-default absolute left-0 z-10 bg-gray shadow-md ring-1 ring-black/10 w-full rounded-lg space-y-2 opacity-100 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative border-b border-b-black/10">
            <div className="absolute top-0 left-0 h-full px-2 rounded-lg flex items-center">
              {loadingIcon}
            </div>
            <Input
              placeholder={label}
              type="text"
              className="focus-visible:ring-0 text-sm pl-8"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="pb-2 text-black/50">
            <p className="mb-4 px-3">Recent searches</p>
            {resultsList}
          </div>
        </div>
      )}
    </div>
  );
}

function DateSelector({
  label,
  date,
  isOpen,
  onClick,
  onDateSelect,
}: {
  label: string;
  date: Date | null;
  isOpen: boolean;
  onClick: () => void;
  onDateSelect: (date: Date) => void;
}) {
  const divRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(divRef, onClick);

  return (
    <div
      className="relative ring-1 ring-black/10 p-2 rounded-lg space-y-1 cursor-pointer"
      onClick={onClick}
    >
      <span className="opacity-50">{label}</span>
      <div className="flex justify-between items-center">
        <div className="font-medium">
          {date ? format(date, "E, d MMM") : "Select Date"}
        </div>
        <MdOutlineKeyboardArrowDown className="size-5" />
      </div>

      {isOpen && (
        <div
          ref={divRef}
          className="absolute z-10 bg-gray shadow-md ring-1 ring-black/10 w-full rounded-lg p-4 mt-1"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            title="date"
            type="date"
            className="w-full p-2 ring-1 ring-black/10 rounded-lg bg-gray outline-none"
            onChange={(e) => onDateSelect(new Date(e.target.value))}
          />
        </div>
      )}
    </div>
  );
}

function AmountSelector({
  label,
  amount,
  isOpen,
  onClick,
  onAmountSelect,
}: {
  label: string;
  amount: number;
  isOpen: boolean;
  onClick: () => void;
  onAmountSelect: (amount: number) => void;
}) {
  const divRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(divRef, onClick);

  return (
    <div
      className="relative ring-1 ring-black/10 p-2 rounded-lg space-y-1 cursor-pointer"
      onClick={onClick}
    >
      <span className="opacity-50">{label}</span>
      <div className="flex justify-between items-center">
        <div className="font-medium">
          {amount} {amount > 1 ? "People" : "Person"}
        </div>
        <MdOutlineKeyboardArrowDown className="size-5" />
      </div>

      {isOpen && (
        <div
          ref={divRef}
          className="absolute z-10 bg-gray shadow-md ring-1 ring-black/10 w-full rounded-lg p-4 mt-1"
        >
          <ul>
            {[1, 2, 3, 4].map((num) => (
              <li
                key={num}
                className="cursor-pointer py-2 hover:bg-gray-100"
                onClick={() => onAmountSelect(num)}
              >
                {num} {num > 1 ? "People" : "Person"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
