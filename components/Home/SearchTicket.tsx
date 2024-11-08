"use client";

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { RiArrowUpDownLine } from "react-icons/ri";
import { ButtonInput } from "../form/FormInput";
import { FormEvent, useState } from "react";

export function SearchTicket() {
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray text-navyBlue rounded-2xl p-4 space-y-4 text-sm"
    >
      <div className="space-y-4 relative">
        <LocationInput label="From" destination="London, United kingdom" />
        <div className="bg-black w-[fit-content] text-gray rounded-xl p-3 shadow-md shadow-black/50 absolute right-4 top-[1.9rem]">
          <RiArrowUpDownLine className="size-5" />
        </div>
        <LocationInput label="To" destination="Lagos, Nigeria" />
      </div>

      <div className="grid grid-cols-2 space-x-4">
        <Select label="Departure Date" value="Tue, 2 Apr" />
        <Select label="Amount" value="2 People" />
      </div>

      <ButtonInput variant="abix" label="Search Ticket" loading={loading} />
    </form>
  );
}

function LocationInput({
  label,
  destination,
}: {
  label: string;
  destination: string;
}) {
  return (
    <div className="ring-1 ring-black/10 p-2 rounded-lg space-y-1 cursor-pointer">
      <span className="opacity-50">{label}</span>
      <div className="font-medium">{destination}</div>
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
