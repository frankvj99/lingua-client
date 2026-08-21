import Link from "next/link";
import { auth0 } from "@/lib/auth0";

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
      />
    </svg>
  );
}

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
      <div className="space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">Hi, {session.user.name}!</h1>
          <p className="text-sm text-slate-500">Continue your language practice below.</p>
          <div className="flex justify-center gap-4 text-sm pt-1">
            <Link href="/dashboard" className="text-navy-800 hover:underline underline-offset-4">
              Dashboard
            </Link>
            <a href="/auth/logout" className="text-slate-500 hover:text-slate-900 underline-offset-4 hover:underline">
              Logout
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <Link
            href="/reading-exercise"
            className="group bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-navy-200 transition"
          >
            <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center mb-3">
              <BookIcon />
            </div>
            <span className="block text-xs text-slate-500">Reading</span>
            <span className="block text-navy-800 font-medium group-hover:underline underline-offset-4">Long Form</span>
          </Link>

          <Link
            href="/short-reading-exercise"
            className="group bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-navy-200 transition"
          >
            <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center mb-3">
              <BookIcon />
            </div>
            <span className="block text-xs text-slate-500">Reading</span>
            <span className="block text-navy-800 font-medium group-hover:underline underline-offset-4">Short Form</span>
          </Link>

          <Link
            href="/writing-exercise"
            className="group bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-navy-200 transition"
          >
            <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-800 flex items-center justify-center mb-3">
              <PencilIcon />
            </div>
            <span className="block text-xs text-slate-500">Writing</span>
            <span className="block text-navy-800 font-medium group-hover:underline underline-offset-4">Writing Exercise</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
