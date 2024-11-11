"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutUser } from "@/lib/actions/auth.action";

export default function Avatar({ initials }: { initials: string }) {
  const handleLogout = async () => {
    try {
      await signOutUser(); // Call the function to sign out the user.
    } catch (error) {
      console.log(`Error logging out: ${error}`); // Log any unexpected errors.
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <div className="text-navyBlue relative bg-yellow hover:bg-yellow/70 size-9 cursor-pointer flex items-center justify-center rounded-full hover-effects">
          {initials}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Logout
          {/* DropdownMenuItem component for the logout action, triggering handleLogout function on click. */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
