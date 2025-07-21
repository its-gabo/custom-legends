import { sql } from "drizzle-orm";
import { text, timestamp, uuid } from "drizzle-orm/pg-core";

import { groups } from "./group.schema";
import { createTable } from "./schema";

export const games = createTable("games", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  groupId: uuid("group_id")
    .references(() => groups.id, { onDelete: "cascade" })
    .notNull(),
  startedAt: timestamp("started_at").notNull(),
  endedAt: timestamp("ended_at"),
  gameType: text("game_type"),
});
