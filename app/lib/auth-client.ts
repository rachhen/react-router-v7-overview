import { createAuthClient } from "better-auth/react";

const VERCEL_URL = import.meta.env.VERCEL_URL;
export const authClient = createAuthClient({
  baseURL: VERCEL_URL ? `https://${VERCEL_URL}` : "http://localhost:5173", // the base url of your auth server
});
