import { Metadata } from "next";
import { SignupForm } from "@/components/form/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up | Abix",
  description:
    "Create your Abix account and start booking travel tickets—sign up now to easily explore destinations, book tickets, and manage your bookings.",
};

export default function SignupPage() {
  return (
    <main className=" maxCenter py-10 px-5 contentCenter w-full">
      {/* Container div for the page header and description */}
      <div className="mb-8 text-center">
        {/* Page heading for account creation */}
        <h2 className="text-xl max-md:text-lg font-bold">Create an Account</h2>
        {/* Description text encouraging users to join */}
        <p className="text-pretty opacity-70">
          Join Abix and start booking your tickets effortlessly!
        </p>
      </div>

      {/* Render the SignupForm component which includes the registration form for new users */}
      <SignupForm />
    </main>
  );
}
