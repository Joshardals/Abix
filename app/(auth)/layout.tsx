// Importing the Logo component to display the app's logo
import { Logo } from "@/components/shared/Logo";

// The AuthLayout function creates a layout for authentication pages (like login or signup)
// It takes 'children' as a prop, which represents whatever content is passed inside this layout
export default function AuthLayout({
  children, // The content (or components) that will be displayed inside the layout
}: Readonly<{
  children: React.ReactNode; // The type of 'children' (React components or HTML elements)
}>) {
  return (
    // Main container divided into two sections (a grid with two columns on large screens)
    <div className="grid lg:grid-cols-2">
      {/* Section for the image and logo (left side on large screens) */}
      <section className="relative bg-[url('/airplane.jpg')] bg-cover bg-center p-5 max-lg:h-[30rem]">
        {/* Semi-transparent black overlay on top of the background image */}
        <div className="absolute bg-black inset-0 opacity-60" />
        {/* App logo displayed on top of the image */}
        <Logo />
      </section>

      {/* Section for the main content (like a login or signup form) */}
      <main>{children}</main>
    </div>
  );
}
