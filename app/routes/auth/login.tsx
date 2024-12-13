import { useActionState } from "react";
import { Link } from "react-router";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authClient } from "~/lib/auth-client";

export const meta = () => [
  { title: "Login" },
  { name: "description", content: "Login to your account" },
];

function LoginPage() {
  const [error, submitAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const data = Object.fromEntries(formData);
      const { error } = await authClient.signIn.email({
        email: data.email as string,
        password: data.password as string,
        callbackURL: "/admin",
      });

      if (error) {
        return error.message;
      }

      return null;
    },
    null
  );

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-3xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          method="post"
          action={submitAction}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Loading..." : "Login"}
          </Button>
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginPage;
