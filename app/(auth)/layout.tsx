import { Logo } from "@/components/shared/Logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid lg:grid-cols-2">
      {/* <Header /> */}
      <section className="relative bg-[url('/airplane.jpg')] bg-cover bg-center p-5 max-lg:h-[30rem]">
        <div className="absolute bg-black inset-0 opacity-60" />
        <Logo />
      </section>

      <main>{children}</main>
    </div>
  );
}
