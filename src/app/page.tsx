import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 justify-center px-6">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="w-full max-w-5xl">Home</h1>

        <Link href="/reading-exercise" className="text-blue-600 underline">
          Reading Exercise
        </Link>

        <Link href="/writing-exercise" className="text-blue-600 underline">
          Writing Exercise
        </Link>
      </div>
    </main>
  );
}

