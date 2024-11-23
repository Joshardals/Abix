// Import necessary components for the homepage layout
import { Logo } from "@/components/shared/Logo";
import { SearchTicket } from "@/components/Home/SearchTicket";
import AvatarProfile from "@/components/Home/AvatarProfile";

// Define the Homepage component as an async function
export default async function Homepage() {
  return (
    <main className="relative bg-[url('/hero.jpg')] bg-cover min-h-screen">
      {/* Background overlay for the hero image */}
      <div className="absolute bg-black inset-0 opacity-60" />

      {/* Fixed header section with Logo and AvatarProfile */}
      <div className="md:fixed md:left-0 md:right-0 p-5 maxCenter flex items-center justify-between">
        <div>
          <Logo />
        </div>
        <AvatarProfile />
      </div>

      {/* Main content section */}
      <section className="max-w-[1024px] mx-auto px-5">
        <section className="relative text-gray flex flex-col justify-center min-h-screen">
          {/* Grid layout for text and SearchTicket component */}
          <div className="grid md:grid-cols-2 gap-5 items-center max-md:space-y-20">
            <div className="space-y-8">
              {/* Heading and subheading */}
              <div className="text-4xl max-md:text-3xl flex flex-col space-y-2 max-md:text-center">
                <span>Fly Beyond Limits:</span>
                <span>Abix Flight Booking</span>
                <span>Experience</span>
              </div>

              {/* Description text */}
              <p className="font-light text-sm max-w-md max-md:mx-auto max-md:text-center">
                Experience limitless travel possibilities with Abix&apos;s
                innovative flight booking platform. Start your journey today!
              </p>
            </div>

            {/* SearchTicket component */}
            <SearchTicket />
          </div>
        </section>
      </section>
    </main>
  );
}
