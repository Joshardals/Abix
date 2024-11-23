// Importing necessary stuff for this page
// 'Metadata' is used to define page information like title and description
import { Metadata } from "next";

// Importing the SignupForm component, which will display the sign-up form
import { SignupForm } from "@/components/form/SignupForm";

// Adding metadata for this page (like its title and description for SEO and browser tabs)
export const metadata: Metadata = {
  title: "Sign Up | Abix", // The title that shows up in the browser tab
  // This describes the page (useful for search engines and social sharing)
  description:
    "Create your Abix account and start booking travel tickets—sign up now to easily explore destinations, book tickets, and manage your bookings.",
};

// The main function that renders this "Sign Up" page
export default function SignupPage() {
  return (
    <main className="maxCenter py-10 px-5 contentCenter w-full bg-gray">
      {/* The main wrapper (container) for the entire page */}
      {/* maxCenter and other classes are likely utility styles for centering and spacing */}

      {/* Section at the top of the page with the title and description */}
      <div className="mb-8 text-center">
        {/* The main heading of the page */}
        <h2 className="text-xl max-md:text-lg font-bold">
          Create an Account {/* Telling the user they are signing up */}
        </h2>

        {/* A short sentence inviting the user to join Abix */}
        <p className="text-pretty opacity-70">
          Join Abix and start booking your tickets effortlessly!
        </p>
      </div>

      {/* The signup form goes here */}
      {/* SignupForm is a separate component that shows fields like "Name", "Email", and "Password" */}
      <SignupForm />
    </main>
  );
}
