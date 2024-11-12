// Import necessary components and utilities for the TicketsPage component.
// - EventsHeader: Component displaying the header for the events section.
// - TableInput: Component for rendering a table of tickets with various details.
// - UserProfile: Component showing user profile information or actions.
// - getCurrentUserTicket: Function for fetching the current user's tickets from the database.
// import EventsHeader from "@/components/(main)/EventsHeader";
import { TableInput } from "@/components/shared/TableInput";
import AvatarProfile from "@/components/Home/AvatarProfile";
// import { UserProfile } from "@/components/shared/UserProfile";
// import { getCurrentUserTicket } from "@/lib/actions/database.action";
import { Metadata } from "next";
import { fetchCurrentUserTicket } from "@/lib/actions/database.action";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";

// Define metadata for the page, including the title and description displayed in the browser tab and search engines.
export const metadata: Metadata = {
  title: "My Tickets | Ticketa",
  description: "View and manage your purchased flight tickets.",
};

// Define the default export of the TicketsPage function component.
// This component displays the user's tickets and provides functionality for viewing and managing them.
export default async function TicketsPage() {
  // Fetch the current user's tickets from the database.
  const { data } = await fetchCurrentUserTicket();

  // Render the TicketsPage component.
  return (
    <div className="bg-gray min-h-screen p-5 space-y-5">
      {/* Header section with the events header and user profile */}
      <div className="flex items-center justify-between">
        <div className="text-navyBlue">
          <Link href="/home" className="flex items-center space-x-2">
            <GoArrowLeft />
            <span>Back Home</span>
          </Link>
        </div>

        {/* Render the UserProfile component, possibly showing user profile information or actions */}
        <div className="w-[fit-content]">
          <AvatarProfile />
        </div>
      </div>

      {/* Page heading for the tickets section */}
      <h2 className="font-medium text-xl">Flight Tickets</h2>

      {/* Render the TableInput component to display a table of the user's tickets */}
      {/* The table will have headers for Ticket ID, Event Name, Status, Purchase Date, and Price */}
      <TableInput
        header={["Ticket ID", "From", "To", "Purchase Date", "Price"]}
        tickets={data} // Pass the fetched tickets data as a prop to the TableInput component
      />
    </div>
  );
}
