import Link from "next/link";
import { auth0 } from "@/lib/auth0";

export default async function Home() {
  // Check if user is authenticated
  const session = await auth0.getSession();

  if (!session) {
    return (
      <>
        {/* Redirects to Auth0 to sign up */}
        <a href="/auth/login?screen_hint=signup">Signup</a>
        <br />
        {/* Redirects to Auth0 to log in */}
        <a href="/auth/login">Login</a>
      </>
    );
  }

  return (
    <main className="flex flex-1 justify-center px-6">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="w-full max-w-5xl">Home</h1>

          <p>Logged in as {session.user.email}</p>

          {/* Display user info (name, email, etc.) */}
          <h1>User Profile</h1>
          <pre>{JSON.stringify(session.user.name, null, 2)}</pre>

          {/* Ends the session and redirects to Auth0 to log out */}
          <a href="/auth/logout">Logout</a>

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

