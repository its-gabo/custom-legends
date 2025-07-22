CREATE TABLE "custom-legends_games" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid NOT NULL,
	"started_at" timestamp NOT NULL,
	"ended_at" timestamp,
	"game_type" text
);
--> statement-breakpoint
CREATE TABLE "custom-legends_group_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"group_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"nickname" text
);
--> statement-breakpoint
CREATE TABLE "custom-legends_groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "custom-legends_team_players" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"team_id" uuid NOT NULL,
	"user_id" text NOT NULL,
	"champion" text,
	"role" text,
	"kills" integer,
	"deaths" integer,
	"assists" integer,
	"cs" integer,
	"gold" integer,
	"damage_dealt" integer,
	"damage_taken" integer,
	"vision_score" integer
);
--> statement-breakpoint
CREATE TABLE "custom-legends_teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"game_id" uuid NOT NULL,
	"name" text NOT NULL,
	"is_winner" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "custom-legends_games" ADD CONSTRAINT "custom-legends_games_group_id_custom-legends_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."custom-legends_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom-legends_group_users" ADD CONSTRAINT "custom-legends_group_users_group_id_custom-legends_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."custom-legends_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom-legends_group_users" ADD CONSTRAINT "custom-legends_group_users_user_id_custom-legends_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."custom-legends_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom-legends_team_players" ADD CONSTRAINT "custom-legends_team_players_team_id_custom-legends_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."custom-legends_teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom-legends_team_players" ADD CONSTRAINT "custom-legends_team_players_user_id_custom-legends_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."custom-legends_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom-legends_teams" ADD CONSTRAINT "custom-legends_teams_game_id_custom-legends_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."custom-legends_games"("id") ON DELETE cascade ON UPDATE no action;