// Import necessary components and utilities for the SuccessPage component.
// - PaymentSuccess: A component that displays a success message or information after a payment.
// - Suspense: A React component used to handle the loading state for components that are being dynamically loaded or need data fetching.
import PaymentSuccess from "@/components/Home/PaymentSuccess";
import { Suspense } from "react";

// Define a fallback component to be shown while the PaymentSuccess component is loading.
// This component is displayed temporarily until the PaymentSuccess component is fully loaded.
function Loading() {
  return <div>Loading...</div>;
}

// Define the default export of the SuccessPage function component.
// This component is responsible for rendering the payment success page.
export default function SuccessPage() {
  return (
    // Wrap the PaymentSuccess component with React's Suspense component.
    // Suspense allows you to handle the loading state for the PaymentSuccess component.
    // The fallback prop specifies what should be displayed while the component is loading.
    <Suspense fallback={<Loading />}>
      {/* Render the PaymentSuccess component */}
      <div className="bg-gray">
        <PaymentSuccess />
      </div>
    </Suspense>
  );
}
