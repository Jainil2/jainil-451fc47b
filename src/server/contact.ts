import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(10).max(2000),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // Log the inquiry server-side. Wire up email/storage later.
    console.log("[contact] new message", {
      name: data.name,
      email: data.email,
      length: data.message.length,
      at: new Date().toISOString(),
    });
    return { ok: true as const };
  });