import Link from "next/link";
import { auth0 } from "@/lib/auth0";

export default async function Home() {
  // Check if user is authenticated
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-4 text-center">
        <a href="/auth/login?screen_hint=signup" className="bg-navy-800 text-white text-sm px-4 py-2 rounded-md hover:bg-navy-700 inline-block">
          Signup
        </a>
        <br />
        <a href="/auth/login" className="text-navy-800 hover:underline underline-offset-4 text-sm">
          Login
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      <div className="space-y-6 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">Home</h1>

        <p className="text-slate-500 text-sm">Logged in as {session.user.email}</p>

        <div className="bg-white border border-slate-200 rounded-lg p-5 text-left space-y-2">
          <h2 className="text-lg font-medium text-slate-900">User Profile</h2>
          <pre className="text-sm text-slate-700 whitespace-pre-wrap">
            {JSON.stringify(session.user.name, null, 2)}
          </pre>
        </div>

        <a href="/auth/logout" className="text-slate-500 hover:text-slate-900 underline-offset-4 hover:underline text-sm">
          Logout
        </a>

        <div className="flex justify-center gap-5 text-sm">
          <Link href="/dashboard" className="text-navy-800 hover:underline underline-offset-4">
            <strong>Dashboard</strong>
          </Link>             
          <Link href="/reading-exercise" className="text-navy-800 hover:underline underline-offset-4">
            Reading Exercise
          </Link>
          <Link href="/writing-exercise" className="text-navy-800 hover:underline underline-offset-4">
            Writing Exercise
          </Link>       
        </div>
      </div>
    </main>
  );
}

