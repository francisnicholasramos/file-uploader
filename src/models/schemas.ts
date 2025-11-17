import * as z from "zod";
import prisma from "../db/prismaClient";

export const SignUpSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, {message: "Username must be at least 3 to 30 characters."})
    .max(30, {message: "Username max characters is 30."})
    .superRefine(async (value, ctx) => {
    
      if (!isNaN(Number(value))) {
          ctx.addIssue({
              code: "custom",
              message: "Username must be a text."
          })
      }

      const user = await prisma.user.findUnique({ where: {username: value} })
      if (user) {
          ctx.addIssue({
              code: "custom",
              message: "User already exists."
          })
      }
    }),

  password: z
    .string()
    .trim()
    .min(8, {message: "Password must be at least 8 characters."})
    .max(254, {message: "Password max characters is 254."})

});

