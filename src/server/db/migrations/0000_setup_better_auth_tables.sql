CREATE TABLE "custom-legends_accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "custom-legends_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "custom-legends_sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "custom-legends_users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "custom-legends_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "custom-legends_verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "custom-legends_accounts" ADD CONSTRAINT "custom-legends_accounts_user_id_custom-legends_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."custom-legends_users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom-legends_sessions" ADD CONSTRAINT "custom-legends_sessions_user_id_custom-legends_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."custom-legends_users"("id") ON DELETE cascade ON UPDATE no action;