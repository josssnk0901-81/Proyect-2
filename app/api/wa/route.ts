import {NextResponse} from "next/server";

// WhatsApp: redirige en el servidor. El número vive en WA_NUMBER (env),
// nunca en el bundle del cliente ni en el repo.
export function GET() {
  const number = process.env.WA_NUMBER;
  if (!number) {
    return new NextResponse("WhatsApp no configurado.", {status: 503});
  }
  return NextResponse.redirect(`https://wa.me/${number}`);
}
