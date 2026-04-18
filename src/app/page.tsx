import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-2xl font-bold">Home</h1>

        <Link href="/" className="text-blue-600 underline">
          Reading Exercise
        </Link>

        <Link href="/writing-exercise" className="text-blue-600 underline">
          Writing Exercise
        </Link>
      </div>
    </main>
  );
}

