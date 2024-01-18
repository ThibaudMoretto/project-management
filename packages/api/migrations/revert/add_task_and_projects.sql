-- Revert project-management:add_task_and_projects from pg

BEGIN;

DROP TABLE IF EXISTS "tasks" CASCADE;

DROP TABLE IF EXISTS "projects" CASCADE;

COMMIT;
