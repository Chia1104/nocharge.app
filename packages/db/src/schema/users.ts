import type { InferSelectModel } from "drizzle-orm";
import { boolean, text, timestamp } from "drizzle-orm/pg-core";

import { pgTable } from "./table";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: boolean("email_verified"),
  image: text("image"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export type User = InferSelectModel<typeof users>;
