import { SearchTicket } from "@/components/Home/SearchTicket";
import { Logo } from "@/components/shared/Logo";

export const metadata = {
  title: "Abix - Home",
  description:
    "Welcome to Abix! Book your flights easily and embark on your next adventure with ease.",
};

export default function Homepage() {
  return (
    <main className="relative bg-[url('/hero.jpg')] bg-cover min-h-screen">
      <div className="absolute bg-black inset-0 opacity-60" />
      <div className="md:fixed md:left-0 md:right-0 p-5 maxCenter">
        <div>
          <Logo />
        </div>
      </div>
      <section className="max-w-[1024px] mx-auto px-5">
        <section className="relative text-gray flex flex-col justify-center min-h-screen">
          <div className="grid md:grid-cols-2 gap-5 items-center max-md:space-y-20">
            <div className="space-y-8">
              <div className="text-4xl flex flex-col space-y-2 max-md:text-center">
                <span> Fly Beyond Limits:</span>
                <span>Abix Flight Booking</span>
                <span>Experience</span>
              </div>

              <p className="font-light text-sm max-w-md max-md:mx-auto max-md:text-center">
                Experience limitless travel possibilities with Abix&apos;s innovative
                flight booking platform. Start your journey today!
              </p>
            </div>

            <SearchTicket />
          </div>
        </section>
      </section>
    </main>
  );
}
