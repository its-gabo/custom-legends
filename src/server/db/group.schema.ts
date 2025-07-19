import { text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createTable, id } from "./schema";
import { users } from "./auth.schema";

export const groups = createTable("groups", {
  ...id,
  name: text("name").notNull(),
  createdAt: timestamp("created_at")
    .$defaultFn(() => new Date())
    .notNull(),
});

export const groupUsers = createTable("group_users", {
  ...id,
  groupId: uuid("group_id")
    .references(() => groups.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  nickname: text("nickname"),
});
