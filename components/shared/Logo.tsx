import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="relative">
      {/* Main logo text */}
      <h1
        className="
      text-2xl max-md:text-xl font-extrabold text-gray tracking-widest italic
    "
      >
        {/* Application name with styling */}
        abix
      </h1>
    </Link>
  );
}
