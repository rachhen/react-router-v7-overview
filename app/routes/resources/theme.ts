import { themeSessionResolver } from "~/utils/sessions.server";
import { isTheme } from "~/utils/theme";
import type { Route } from "./+types/theme";

export const action = async ({ request }: Route.ActionArgs) => {
  const session = await themeSessionResolver(request);
  const { theme } = await request.json();

  if (!theme) {
    return new Response(JSON.stringify({ success: true }), {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": await session.destroy(),
      },
    });
  }

  if (!isTheme(theme)) {
    return {
      success: false,
      message: `theme value of ${theme} is not a valid theme.`,
    };
  }

  session.setTheme(theme);
  return new Response(JSON.stringify({ success: true, theme }), {
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": await session.commit(),
    },
  });
};
