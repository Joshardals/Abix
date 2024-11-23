// Import the CheckoutContainer component from the specified path.
// This component is used to render the checkout page of the application.
import { CheckoutContainer } from "@/components/Home/CheckoutContainer";

// Import the Metadata type from "next" to define metadata for the page.
// Metadata is important for SEO (Search Engine Optimization) as it helps with setting page title and description.
import { Metadata } from "next";

// Import the Suspense component from React to handle loading states for asynchronous components.
import { Suspense } from "react";

// Define the metadata for the checkout page.
// Metadata includes information like the title and description that search engines and the browser use for SEO.
export const metadata: Metadata = {
  title: "Abix | Checkout", // The title shown in the browser tab and search results.
  description: "Complete your purchase and secure your ticket.", // Description displayed in search results or shared links.
};

// Define the Loading component, which shows a "Loading..." message while waiting for the CheckoutContainer to load.
function Loading() {
  return <div>Loading...</div>; // This is what users will see while the checkout page is loading.
}

// Define the main Checkoutpage component which is exported as the default for this file.
// This is the function that will render the checkout page content.
export default function Checkoutpage() {
  // Return the CheckoutContainer component wrapped in Suspense.
  // Suspense is used here to handle the loading state of the CheckoutContainer component.
  // If CheckoutContainer is still loading, it will display the "Loading..." message from the Loading component.
  return (
    <Suspense fallback={<Loading />}>
      {/* CheckoutContainer will render the main checkout page content. */}
      <CheckoutContainer />
    </Suspense>
  );
}
