import { useState, useTransition } from "react";
import { Form, Link, redirect } from "react-router";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { authClient } from "~/lib/auth-client";

export const meta = () => [
  { title: "Register" },
  { name: "description", content: "Register to your account" },
];

function RegisterPage() {
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    startTransition(async () => {
      const { error } = await authClient.signUp.email({
        email: data.email as string,
        password: data.password as string,
        name: data.name as string,
        image: (data.image as string) || "",
      });

      if (error) {
        setError(error.message);
      }

      redirect("/admin");
    });
  }

  return (
    <Card className="max-w-sm w-full">
      <CardHeader>
        <CardTitle className="text-3xl">Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Form method="post" onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              required
            />
          </div>
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
            {isPending ? "Loading..." : "Register"}
          </Button>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              viewTransition
              className="text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </Form>
      </CardContent>
    </Card>
  );
}

export default RegisterPage;
