import SosButton from "@/components/SosButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-3xl font-bold" style={{ color: "#00311E" }}>
        Khuluma
      </h1>
      <p className="text-gray-600 text-center max-w-sm">
        A safe, private space. Tap SOS if you need help right now.
      </p>
      <SosButton />
      <Link href="/resources" className="underline" style={{ color: "#00311E" }}>
        View support resources
      </Link>
      <Link href="/protection-order" className="underline" style={{ color: "#00311E" }}>
        Prepare for a protection order
      </Link>
    </main>
  );
}
