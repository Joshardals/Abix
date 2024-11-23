"use client"; // Indicates that this component will be executed on the client-side (browser).

import { ButtonInput } from "@/components/form/FormInput"; // Imports a custom button component used for user interaction.
import {
  createTicketInfo, // Function to create ticket information in the database after a successful payment.
} from "@/lib/actions/database.action"; // Imports functions that interact with the database.
import { formatPrice } from "@/lib/utils"; // Utility function to format price values for display.
import Link from "next/link"; // Imports the Link component from Next.js to handle navigation.
import { useSearchParams } from "next/navigation"; // Hook to access query parameters from the URL.
import { useEffect } from "react"; // Imports the useEffect hook to perform side effects after the component renders.
import { FaRegCircleCheck } from "react-icons/fa6"; // Imports a checkmark icon from React Icons for visual confirmation of success.

export default function PaymentSuccess() {
  // Retrieves query parameters from the URL, such as the amount, event names (from, to).
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount"); // Extracts the amount from the URL's query parameters.
  const from = searchParams.get("from"); // Extracts the event name (from) from the URL.
  const to = searchParams.get("to"); // Extracts the event name (to) from the URL.

  useEffect(() => {
    // Function to handle the completion of ticket processing after a successful payment.
    const completeTicketProcessing = async () => {
      if (amount && from && to) {
        try {
          // Calls the createTicketInfo function to save ticket information in the database.
          await createTicketInfo({
            from, // Event name (from) from the URL query parameter.
            to, // Event name (to) from the URL query parameter.
            price: Number(amount), // Converts the amount to a number for storage in the database.
          });
        } catch (error) {
          // Logs any unexpected errors that occur during the ticket creation process.
          console.log(`An unexpected error occurred: ${error}`);
        }
      }
    };

    // Calls the function to process the ticket information after payment is confirmed.
    completeTicketProcessing();
  }, [amount, from, to]); // The useEffect hook will run when the 'amount', 'from', or 'to' values change.

  return (
    <div className="flex items-center justify-center min-h-screen flex-col space-y-4 max-w-[50rem] mx-auto text-center p-5 ">
      {/* Container styles: centers content vertically and horizontally, adds spacing, limits width, centers text, and adds padding. */}
      <FaRegCircleCheck className="text-green-700 size-10" />{" "}
      {/* Success icon indicating successful payment, styled with a green color. */}
      <p className="font-semibold text-pretty">
        Payment Successful! 🎉 Thank you for your purchase. <br />
        You have successfully bought a ticket from <b>{from}</b> to <b>{to}</b>{" "}
        for <b>{formatPrice(Number(amount))}</b>. <br />
        We wish you a pleasant journey!
      </p>
      <Link href="/home">
        {/* Navigation button to go back to the events listing page */}
        <ButtonInput variant="abix" label="Back Home" />
      </Link>
    </div>
  );
}
