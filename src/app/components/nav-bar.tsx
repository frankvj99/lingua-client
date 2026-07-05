import Link from "next/link";

export default function NavBar() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight text-navy-900">
            MyApp
          </Link>

          <ul className="flex items-center space-x-5 text-sm">
            <li>
              <Link
                href="/dashboard"
                className="text-slate-500 hover:text-slate-900 underline-offset-4 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-slate-500"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/reading-exercise"
                className="text-slate-500 hover:text-slate-900 underline-offset-4 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-slate-500"
              >
                Reading Exercise
              </Link>
            </li>
            <li>
              <Link
                href="/writing-exercise"
                className="text-slate-500 hover:text-slate-900 underline-offset-4 hover:underline focus:outline-2 focus:outline-offset-2 focus:outline-slate-500"
              >
                Writing Exercise
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
