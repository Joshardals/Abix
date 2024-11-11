"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonInput } from "@/components/form/FormInput";
import { GoArrowLeft } from "react-icons/go";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Ticket } from "@/typings";

export function Tickets() {
  const searchTicket = useSearchParams();
  const from = searchTicket.get("from");
  const to = searchTicket.get("to");
  const date = searchTicket.get("date");
  const amount = searchTicket.get("amount");
  const price = searchTicket.get("price");
  const flightTime = searchTicket.get("flightTime");

  // Initialize tickets state with the proper type
  const [tickets, setTickets] = useState<Ticket[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Mock fetching tickets data for demonstration
  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      // Replace this with actual data fetch logic
      setTickets([
        {
          id: 1,
          from,
          to,
          date,
          amount,
          price,
          flightTime,
        },
        // Add more tickets here
      ]);
      setLoading(false);
    }, 1500);
  }, [from, to, date, amount]);

  return (
    <div className="">
      {/* Header Section */}
      <div className="fixed text-gray top-5 left-5  maxCenter">
        <Link href="/home" className="flex items-center space-x-2">
          <GoArrowLeft />
          <span>Back Home</span>
        </Link>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-32 text-gray">
          <div className="text-lg">Loading tickets...</div>
        </div>
      ) : (
        <div className="px-5 flex items-center justify-center min-h-screen">
          {/* Ticket Cards */}
          {tickets?.map((ticket: Ticket) => (
            <div
              key={ticket.id}
              className="ring-1 ring-black/10 rounded-lg p-4 bg-gray max-w-lg shadow-md shadow-gray"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-gray-600 text-sm">{`Date: ${ticket.date}`}</div>
                <div className="text-gray-600 text-sm">
                  {/* Convert price to number, and handle null or invalid values */}
                  {ticket.price
                    ? formatPrice(Number(ticket.price))
                    : "Price not available"}
                </div>
              </div>
              <div className="text-lg font-medium">{`${ticket.from} ➔ ${ticket.to}`}</div>
              <div className="text-sm text-gray-500">{`Duration: ${ticket.flightTime} hours`}</div>
              <div className="mt-4">
                <ButtonInput
                  variant="abix"
                  label="Book Now"
                  loading={loading}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
