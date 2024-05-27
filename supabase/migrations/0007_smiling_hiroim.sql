ALTER TABLE "subtask" DROP CONSTRAINT "subtask_task_id_task_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subtask" ADD CONSTRAINT "subtask_task_id_task_id_fk" FOREIGN KEY ("task_id") REFERENCES "public"."task"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
