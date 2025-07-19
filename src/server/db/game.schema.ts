import { text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createTable, id } from "./schema";
import { groups } from "./group.schema";

export const games = createTable("games", {
  ...id,
  groupId: uuid("group_id")
    .references(() => groups.id, { onDelete: "cascade" })
    .notNull(),
  startedAt: timestamp("started_at").notNull(),
  endedAt: timestamp("ended_at"),
  gameType: text("game_type"),
});
