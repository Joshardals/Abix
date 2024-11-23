// Import necessary components and utilities for the SuccessPage component.
// - PaymentSuccess: A component that displays a success message or information after a payment.
// - Suspense: A React component used to handle the loading state for components that are being dynamically loaded or need data fetching.
import PaymentSuccess from "@/components/Home/PaymentSuccess"; // PaymentSuccess component to show the success message.
import { Suspense } from "react"; // Suspense component to handle the loading state of dynamically loaded components.

// Define a fallback component to be shown while the PaymentSuccess component is loading.
// This component will appear temporarily until PaymentSuccess is fully loaded and ready.
function Loading() {
  return <div>Loading...</div>; // Show "Loading..." while waiting for the PaymentSuccess component to load.
}

// Define the default export of the SuccessPage function component.
// This function component represents the success page that will show after a successful payment.
export default function SuccessPage() {
  return (
    // Wrap the PaymentSuccess component with React's Suspense component.
    // Suspense helps in showing a loading state while the PaymentSuccess component is still being loaded.
    // The fallback prop specifies what should be displayed (the Loading component) while the PaymentSuccess component is loading.
    <Suspense fallback={<Loading />}>
      {/* Render the PaymentSuccess component inside the Suspense wrapper */}
      <div className="bg-gray"> {/* Page background styling */}
        <PaymentSuccess /> {/* The actual success message/component that is displayed after payment */}
      </div>
    </Suspense>
  );
}
