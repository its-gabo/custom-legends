import { integer, text, boolean, uuid } from "drizzle-orm/pg-core";
import { createTable } from "./schema";
import { games } from "./game.schema";
import { users } from "./auth.schema";
import { sql } from "drizzle-orm";

export const teams = createTable("teams", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  gameId: uuid("game_id")
    .notNull()
    .references(() => games.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  isWinner: boolean("is_winner")
    .$defaultFn(() => false)
    .notNull(),
});

export const teamPlayers = createTable("team_players", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  teamId: uuid("team_id")
    .notNull()
    .references(() => teams.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  champion: text("champion"),
  role: text("role"),
  kills: integer("kills").$defaultFn(() => 0),
  deaths: integer("deaths").$defaultFn(() => 0),
  assists: integer("assists").$defaultFn(() => 0),
  cs: integer("cs").$defaultFn(() => 0),
  gold: integer("gold").$defaultFn(() => 0),
  damageDealt: integer("damage_dealt").$defaultFn(() => 0),
  damageTaken: integer("damage_taken").$defaultFn(() => 0),
  visionScore: integer("vision_score").$defaultFn(() => 0),
});
