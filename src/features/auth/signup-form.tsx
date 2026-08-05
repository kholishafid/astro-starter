"use client";

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

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<{ [key: string]: string[] }>();

  async function signin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const { error } = await actions.auth.signup(formData);

    if (isInputError(error)) {
      setSubmitting(false);
      setError(error.fields);
      return;
    }

    navigate("/auth/signin");
  }
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={signin}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Fill in your name"
                name="fullName"
                required
                aria-invalid={error?.fullName ? "true" : "false"}
              />
              <FieldError>
                {error?.fullName ? error.fullName.join(", ") : null}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="me@example.com"
                name="email"
                required
              />
              <FieldError>
                {error?.email ? error.email.join(", ") : null}
              </FieldError>
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" required />
              <FieldError>
                {error?.password ? error.password.join(", ") : null}
              </FieldError>
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
              />
              <FieldError>
                {error?.confirmPassword
                  ? error.confirmPassword.join(", ")
                  : null}
              </FieldError>
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
                <Button variant="outline" type="button" disabled={submitting}>
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/auth/signin">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
