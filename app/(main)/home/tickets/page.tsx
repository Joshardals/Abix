import { Tickets } from "@/components/Home/Tickets";
import { Suspense } from "react";

function Loading() {
  return <div>Loading...</div>;
}

export default function TicketsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Tickets />
    </Suspense>
  );
}
