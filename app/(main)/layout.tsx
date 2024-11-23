// Import necessary modules and components for the HomeLayout component.
// - getCurrentUser: Function to fetch the current authenticated user from the server.
// - Metadata: Type for defining metadata of the page (used in Next.js).
// - redirect: Function to handle redirection within Next.js applications.
import { getCurrentUser } from "@/lib/actions/auth.action";
import { Metadata } from "next";
import { redirect } from "next/navigation";

// Define metadata for the page, including the title and description shown in the browser tab and search engines.
export const metadata: Metadata = {
  title: "Abix - Home", // Title of the page, displayed in the browser tab.
  description:
    "Welcome to Abix! Book your flights easily and embark on your next adventure with ease.",
};

// Define the default export of the HomeLayout function component.
// This component represents the layout for the home page, checking user authentication before rendering.
export default async function HomeLayout({
  // Destructure the "children" property from the props (input parameters) passed to this component.
  // The "children" here refers to any content or other components that will be nested inside this layout.
  children,
}: Readonly<{
  // Define that "children" must be of type React.ReactNode, which means any valid React element (e.g., text, HTML tags, or other components).
  children: React.ReactNode;
}>) {
  // Fetch the current user from the server using the getCurrentUser function.
  // This function is assumed to check the authentication status of the user.
  const user = await getCurrentUser();

  // If no user is authenticated (user is null or undefined), redirect the user to the home page.
  // This helps in ensuring that only authenticated users can access the content of this layout.
  if (!user) redirect("/");

  // Return the main content of the page wrapped inside a <main> tag.
  // The children prop is used here to render any nested content or components within this layout.
  return (
    <main>
      <div>{children}</div>
    </main>
  );
}
