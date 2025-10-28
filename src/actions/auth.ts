import { defineAction } from "astro:actions";
import { z } from "astro:schema";
const { auth: authLib } = await import("@/lib/auth");

const registrationSchema = z
  .object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const auth = {
  signup: defineAction({
    accept: "form",
    input: registrationSchema,
    handler: async (input) => {
      const data = await authLib.api
        .signUpEmail({
          body: {
            name: input.fullName,
            email: input.email,
            password: input.password,
          },
        })
        .catch((error) => {
          console.log(error);
        });

      return data;
    },
  }),
  signin: defineAction({
    accept: "form",
    input: signinSchema,
    handler: async (input) => {
      return input;
    },
  }),
};
