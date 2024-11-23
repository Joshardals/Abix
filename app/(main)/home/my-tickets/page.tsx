// Import necessary components and utilities for the TicketsPage component.
// These are the components and functions we will use in this page:
import { TableInput } from "@/components/shared/TableInput"; // TableInput: Displays a table with the user's ticket details.
import AvatarProfile from "@/components/Home/AvatarProfile"; // AvatarProfile: Shows the user's profile picture and information.
import { Metadata } from "next"; // Metadata: Used to set the title and description of the page.
import { fetchCurrentUserTicket } from "@/lib/actions/database.action"; // fetchCurrentUserTicket: Function to fetch the user's tickets from the database.
import Link from "next/link"; // Link: Used for navigation within the app.
import { GoArrowLeft } from "react-icons/go"; // GoArrowLeft: A left arrow icon used for going back to the home page.

// Define metadata for the page, including the title and description displayed in the browser tab and search engines.
export const metadata: Metadata = {
  title: "My Tickets | Ticketa", // Title for the page that will appear in the browser tab.
  description: "View and manage your purchased flight tickets.", // Description for SEO and social media sharing.
};

// Define the default export of the TicketsPage function component.
// This function displays the user's tickets and provides functionality for viewing and managing them.
export default async function TicketsPage() {
  // Fetch the current user's tickets from the database using the fetchCurrentUserTicket function.
  // The data will be passed into the table to display the ticket information.
  const { data } = await fetchCurrentUserTicket();

  // Render the TicketsPage component which will display the user's tickets.
  return (
    <div className="bg-gray min-h-screen p-5 space-y-5">
      {/* The header section, which includes a back button and user profile */}
      <div className="flex items-center justify-between">
        {/* Back button that navigates the user to the home page */}
        <div className="text-navyBlue">
          <Link href="/home" className="flex items-center space-x-2">
            <GoArrowLeft /> {/* Left arrow icon for the back button */}
            <span>Back Home</span>
          </Link>
        </div>

        {/* The AvatarProfile component displays the user's profile */}
        <div className="w-[fit-content]">
          <AvatarProfile /> {/* Profile picture and user-related info */}
        </div>
      </div>

      {/* Page heading for the tickets section */}
      <h2 className="font-medium text-xl">Flight Tickets</h2>

      {/* Render the TableInput component to display the user's tickets in a table format */}
      {/* The table will show columns for Ticket ID, From, To, Purchase Date, and Price */}
      <TableInput
        header={["Ticket ID", "From", "To", "Purchase Date", "Price"]} // The headers of the table
        tickets={data} // Pass the fetched tickets data as a prop to the TableInput component to display in the table
      />
    </div>
  );
}
