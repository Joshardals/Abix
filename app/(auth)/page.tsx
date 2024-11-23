// Importing the LoginForm component from the "form" folder inside "components".
// The '@' symbol is a shortcut to the root of the project.
import { LoginForm } from "@/components/form/LoginForm";

// Importing the getCurrentUser function from the "auth.action" file in the "lib/actions" folder.
// This function is used to check if the user is already logged in.
// import { getCurrentUser } from "@/lib/actions/auth.action";

// Importing the Metadata type from "next" library to define page metadata (title and description).
import { Metadata } from "next";

// Importing the redirect function from "next/navigation".
// This function is used to send the user to a different page automatically if needed.
// import { redirect } from "next/navigation";

// Define page metadata (title and description) using the Metadata type.
// This helps search engines and browsers understand what the page is about.
export const metadata: Metadata = {
  title: "Login | Abix", // Title for the page (appears in the browser tab).
  description:
    "Log in to your Abix account to access and book travel tickets with ease. Securely manage your bookings and explore new destinations.", // Description for SEO and social sharing.
};

// Define and export the LoginPage function, which will display the login page for the app.
// This function is "asynchronous" because it might need to fetch data (e.g., check if a user is logged in).
export default async function LoginPage() {
  // Check if the user is already logged in.
  //   const user = await getCurrentUser();

  // If the user is logged in, redirect them to the home page.
  //   if (user) redirect("/home");

  // Return the JSX (HTML-like code) for this page to be displayed in the browser.
  return (
    // The main section of the page with some padding and background color.
    <main className="py-10 px-5 contentCenter maxCenter contentCenter w-full bg-gray">
      {/* This div contains the welcome message */}
      <div className="mb-8 text-center">
        {/* Page heading, welcoming the user to Abix */}
        <h2 className="text-xl max-md:text-lg font-bold">Welcome to Abix</h2>
        
        {/* Description text that explains the purpose of the login page */}
        <p className="text-pretty opacity-70">
          Your gateway to seamless ticket bookings—log in to explore and manage
          your trips.
        </p>
      </div>

      {/* The LoginForm component, which will display the actual login form */}
      <LoginForm />
    </main>
  );
}
