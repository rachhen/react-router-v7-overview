import type { ActionFunction, SessionStorage } from "react-router";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export const themes: Array<Theme> = Object.values(Theme);

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && themes.includes(value as Theme);
}

type ThemeSession = {
  getTheme: () => Theme | null;
  setTheme: (theme: Theme) => void;
  commit: () => Promise<string>;
  destroy: () => Promise<string>;
};

export type ThemeSessionResolver = (request: Request) => Promise<ThemeSession>;

export const createThemeSessionResolver = (
  cookieThemeSession: SessionStorage
): ThemeSessionResolver => {
  const resolver = async (request: Request): Promise<ThemeSession> => {
    const session = await cookieThemeSession.getSession(
      request.headers.get("Cookie")
    );

    return {
      getTheme: () => {
        const themeValue = session.get("theme");
        return isTheme(themeValue) ? themeValue : null;
      },
      setTheme: (theme: Theme) => session.set("theme", theme),
      commit: () => cookieThemeSession.commitSession(session),
      destroy: () => cookieThemeSession.destroySession(session),
    };
  };

  return resolver;
};

export const createThemeAction = (
  themeSessionResolver: ThemeSessionResolver
): ActionFunction => {
  const action: ActionFunction = async ({ request }) => {
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

  return action;
};
