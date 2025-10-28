"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { actions, isInputError } from "astro:actions";
import { navigate } from "astro:transitions/client";
import { Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import type { email } from "better-auth";

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<{ [key: string]: string[] }>();

  async function signin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const { data, error } = await actions.auth.signin(formData);

    if (isInputError(error)) {
      setSubmitting(false);
      setError(error.fields);
      return;
    }

    await authClient.signIn.email({
      email: data?.email as string,
      password: data?.password as string,
      callbackURL: "/admin",
    });
  }

  return (
    <div className={cn("flex flex-col gap-6 w-[325px]", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={signin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="me@example.com"
                  required
                  aria-invalid={error?.email ? "true" : "false"}
                  name="email"
                />
                <FieldError>
                  {error?.email ? error.email.join(", ") : null}
                </FieldError>
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  name="password"
                  aria-invalid={error?.password ? "true" : "false"}
                />
                <FieldError>
                  {error?.password ? error.password.join(", ") : null}
                </FieldError>
              </Field>
              <Field>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/auth/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
