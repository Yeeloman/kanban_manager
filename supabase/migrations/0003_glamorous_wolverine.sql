CREATE TABLE IF NOT EXISTS "columns" (
	"id" serial PRIMARY KEY NOT NULL,
	"column_name" text NOT NULL,
	"board_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dashboard" (
	"id" serial PRIMARY KEY NOT NULL,
	"board_name" varchar(255) NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "dashboard_board_name_unique" UNIQUE("board_name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "columns" ADD CONSTRAINT "columns_board_id_dashboard_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."dashboard"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dashboard" ADD CONSTRAINT "dashboard_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
