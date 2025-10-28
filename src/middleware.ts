import { defineMiddleware } from "astro:middleware";
import { auth } from "./lib/auth";

import { APP_URL } from "./lib/constant";

export const onRequest = defineMiddleware(async (context, next) => {
  if (!context.url.pathname.startsWith("/admin")) {
    return next();
  }

  const isAuthed = await auth.api.getSession({
    headers: context.request.headers,
  });

  console.log("isAuthed:", isAuthed);

  if (isAuthed) {
    context.locals.user = isAuthed.user;
    context.locals.session = isAuthed.session;
  } else {
    context.locals.user = null;
    context.locals.session = null;

    return context.rewrite(
      new Request(`${APP_URL}/auth/signin`, {
        headers: {
          "x-redirect-to": context.url.pathname,
        },
      })
    );
  }

  return next();
});
