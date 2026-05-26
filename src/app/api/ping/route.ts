export async function GET() {
  console.log("PING ROUTE HIT");

  return Response.json({
    ok: true
  });
}
