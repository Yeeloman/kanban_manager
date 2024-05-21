import { lucia } from "@/server/auth.server";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle = (async ({ event, resolve }) => {
  //* Get the session id from the cookies
  const sessionId = event.cookies.get(lucia.sessionCookieName);

  //* if theres no session ID resolve after setting user and session to null
  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;

    if (event.url.pathname.startsWith('/p')) {
      throw redirect(303, '/login')
    }
    return await resolve(event);
  }

  //* if there is a session validate it
  const { session, user } = await lucia.validateSession(sessionId);

  ///* if the session is fresh create a new session cookie
  if (session?.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);

    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: "/",
      ...sessionCookie.attributes
    })
  }

  //* if the session is not valid create a blank session cookie to delete the one in the browser
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();

    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: "/",
      ...sessionCookie.attributes
    })
  }
  //* redirect the user if he tries to go to login page while he is logged in
  if (session && event.url.pathname === "/login") {
    throw redirect(303, `/p/${user.username}`)
  }

  event.locals.user = user;
  event.locals.session = session;

  const response = await resolve(event);
  return response;

}) satisfies Handle;
