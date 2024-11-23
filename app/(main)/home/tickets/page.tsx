// Import the Tickets component from the specified path.
// This component is responsible for rendering the tickets page content.
import { Tickets } from "@/components/Home/Tickets";

// Import Suspense from React to handle loading states for the Tickets component.
import { Suspense } from "react";

// Define the Loading component which displays a loading message while the Tickets component is being loaded.
function Loading() {
  return <div>Loading...</div>; // This message appears while the Tickets component is loading.
}

// Define and export the TicketsPage function component which renders the tickets page.
export default function TicketsPage() {
  // Return the Tickets component wrapped in Suspense.
  // Suspense will show the "Loading..." message until the Tickets component has finished loading.
  return (
    <Suspense fallback={<Loading />}>
      {/* The Tickets component is rendered here once it's loaded. */}
      <Tickets />
    </Suspense>
  );
}
