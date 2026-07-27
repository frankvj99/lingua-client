import Link from "next/link";
import { auth0 } from "@/lib/auth0";

function getInitial(name?: string | null, email?: string | null): string {
  const source = name?.trim() || email?.trim();
  return source ? source.charAt(0).toUpperCase() : "?";
}

export default async function NavBar() {
  const session = await auth0.getSession();

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight text-navy-900">
            MyApp
          </Link>

          <div className="flex items-center gap-5">
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

            {session && (
              <Link
                href="/profile"
                title={session.user.name ?? session.user.email}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-navy-100 text-navy-800 text-sm font-medium hover:ring-2 hover:ring-navy-300 hover:ring-offset-2 transition"
              >
                {getInitial(session.user.name, session.user.email)}
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
