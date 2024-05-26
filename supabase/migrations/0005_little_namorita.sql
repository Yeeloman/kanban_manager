DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('TODO', 'DOING', 'DONE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subtask" (
	"id" serial PRIMARY KEY NOT NULL,
	"done" boolean DEFAULT false,
	"task_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '',
	"status" "status" DEFAULT 'TODO',
	"category_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "columns" RENAME TO "category";--> statement-breakpoint
ALTER TABLE "dashboard" ADD COLUMN "active" boolean DEFAULT false;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subtask" ADD CONSTRAINT "subtask_task_id_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."task"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
