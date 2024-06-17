import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    // .url()
    // .regex(
    //   /[a-zA-Z]+:\/\/[a-zA-Z]+:[a-zA-Z0-9@,!?-_\/\.#&+*]+@[a-zA-Z0-9]+:[0-9]+\/[a-zA-Z]+\?schema=[a-zA-Z]+/
    // ),
    AUTH_SECRET: z.string(),
    AUTH_GITHUB_SECRET: z.string(),
    AUTH_GITHUB_ID: z.string(),
  },
  client: {},
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    AUTH_SECRET: process.env.NEXTAUTH_SECRET,
    AUTH_GITHUB_SECRET: process.env.GITHUB_SECRET,
    AUTH_GITHUB_ID: process.env.GITHUB_ID,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});
