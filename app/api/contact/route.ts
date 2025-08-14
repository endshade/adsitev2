export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), { status: 400 })
    }
    // In a real app, send this to your email provider or CRM here.
    // Keeping it simple in this demo:
    console.log("[CONTACT] New inquiry:", { name, email, message })
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }), { status: 500 })
  }
}
