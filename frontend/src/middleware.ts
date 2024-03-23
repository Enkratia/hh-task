import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// nextjs выцепляет имя контейнера вместо hostname в docker production (использовать вместо req.url + заменять req.nextUrl.hostname | port)
import { FRONTEND_URL } from "./utils/constants";

export async function middleware(req: NextRequest) {
  req.nextUrl.hostname = new URL(FRONTEND_URL).hostname;
  req.nextUrl.port = new URL(FRONTEND_URL).port;

  return NextResponse.next();
}

// Get only real pages
export const config = {
  matcher: "/((?!api|_next|static|public|icon.ico).*)",
};
