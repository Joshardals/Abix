import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid lg:grid-cols-2">
      {/* <Header /> */}
      <section className="relative bg-[url('/airplane.jpg')] bg-cover bg-center p-5 max-lg:h-[30rem]">
        <div className="absolute bg-navyBlue inset-0 opacity-60" />
        <Link href="/" className="relative">
          {/* Main logo text */}
          <h1
            className="
            text-2xl font-extrabold text-white tracking-widest italic
          "
          >
            {/* Application name with styling */}
            abix
          </h1>
        </Link>
      </section>

      <main>{children}</main>
    </div>
  );
}
