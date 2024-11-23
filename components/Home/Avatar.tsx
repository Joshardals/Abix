"use client"; // Ensures this file runs on the client side.

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import necessary dropdown menu components.
import { signOutUser } from "@/lib/actions/auth.action"; // Import the function to sign out the user.
import Link from "next/link"; // Import Link for client-side navigation.

export default function Avatar({ initials }: { initials: string }) {
  // Function to handle user logout.
  const handleLogout = async () => {
    try {
      await signOutUser(); // Call the function to sign out the user.
    } catch (error) {
      console.log(`Error logging out: ${error}`); // Log any unexpected errors.
    }
  };

  return (
    <DropdownMenu>
      {/* Trigger for the dropdown menu. */}
      <DropdownMenuTrigger className="rounded-full">
        {/* Avatar display, showing the user's initials in a circular button. */}
        <div className="text-navyBlue relative bg-yellow hover:bg-yellow/70 size-9 cursor-pointer flex items-center justify-center rounded-full hover-effects">
          {initials}
        </div>
      </DropdownMenuTrigger>

      {/* Content of the dropdown menu. */}
      <DropdownMenuContent>
        {/* Menu item linking to "My Tickets" page. */}
        <DropdownMenuItem>
          <Link href="/home/my-tickets">My Tickets</Link>
        </DropdownMenuItem>

        {/* Logout menu item that triggers the logout function. */}
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Logout
          {/* DropdownMenuItem component for the logout action, triggering handleLogout function on click. */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
