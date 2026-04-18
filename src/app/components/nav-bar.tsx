import Link from "next/link";

export default function NavBar() {
  return (
    <header className="border-b">
      <nav className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <div className="font-bold">
          <Link href="/">MyApp</Link>
        </div>

        <div className="flex gap-4">
          <Link href="/" className="hover:underline">
            Reading Exercise
          </Link>
          <Link href="/writing-exercise" className="hover:underline">
            Writing Exercise
          </Link>
        </div>
      </nav>
    </header>
  );
}
