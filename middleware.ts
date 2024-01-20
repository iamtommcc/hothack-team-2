import { NextResponse, type NextRequest } from "next/server";
import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs'

export async function middleware(request: NextRequest) {
  try {
    // fn will run before routes are called
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req: request, res }); // ensures the session won't expired when user is logged in
    await supabase.auth.getSession(); // will update the cookies 

    return res;
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
