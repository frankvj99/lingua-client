if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

import { auth0 } from "@/lib/auth0";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:5219";

// const ROUTE_MAP: Record<string, string> = {
//   "reading/random-exercise": "Reading/GetRandomReadingExercise",
//   "reading/feedback": "Reading/ProvideFeedbackOnIncorrectAnswers",
//   // "writing/edit-writing-sample": "Writing/EditWritingSample",
//   // "writing/revise-writing-sample": "Writing/ReviseWritingSample",
//   // "writing/suggest-improvement-for-writing-sample": "Writing/SuggestImprovementsForWritingSample",
//   // "writing/edit-and-revise-writing-sample": "Writing/EditAndReviseWritingSample",
//   // "writing/edit-revise-and-suggest-improvements-for-writing-sample": "Writing/EditReviseAndSuggestImprovementsForWritingSample",
//   // "writing/get-2nd-round-writing-feedback": "Writing/Get2ndRoundWritingFeedback",  
// };

// function buildTargetUrl(path: string[], search: string) {
//   const join = path.join("/");
//   const mappedPath = ROUTE_MAP[key] ?? key;
//   return `${API_BASE_URL}/api/${mappedPath}${search}`;
// }

async function forwardRequest(
  request: Request,
  params: Promise<{ path: string[] }>
) {
  const { path } = await params;
  const { search } = new URL(request.url, "http://localhost:3000");
  const joinedPath = path.join("/");
  const targetUrl = `${API_BASE_URL}/api/${joinedPath}${search}`;

  // console.log(`🔀 Proxying ${request.method} → ${targetUrl}`);

  try {
    const session = await auth0.getAccessToken();
    const token = session?.token;
    // console.log("Auth0 session:", session);
    // console.log("Token:", token);

    const headers = new Headers();
    headers.set("Content-Type", "application/json");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const options: RequestInit = {
      method: request.method,
      headers,
    };

    if (request.method !== "GET" && request.method !== "HEAD") {
      options.body = await request.text();
    }

    // console.log("Headers being sent:", Object.fromEntries(headers.entries()));
    const upstream = await fetch(targetUrl, options);
    const text = await upstream.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Non-JSON response from upstream:", text);
      data = { message: text || `Upstream returned ${upstream.status}` };
    }

    return Response.json(data, { status: upstream.status });

  } catch (err) {
    console.error("BFF proxy error:", err);
    return Response.json({ error: "BFF proxy failure", details: String(err) }, { status: 502 });
  }
}

// The areguments for the params below are constructed by Next.js from the path segments.
export async function GET(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  return forwardRequest(req, params);
}

export async function POST(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  return forwardRequest(req, params);
}

export async function PUT(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  return forwardRequest(req, params);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  return forwardRequest(req, params);
}

export async function DELETE(req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  return forwardRequest(req, params);
}