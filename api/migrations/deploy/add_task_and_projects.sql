-- Deploy project-management:add_task_and_projects to pg

BEGIN;

CREATE TABLE
  IF NOT EXISTS "projects" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW (),
    "updated_at" TIMESTAMPTZ
  );

CREATE TABLE
  IF NOT EXISTS "tasks" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "project_id" INT NOT NULL REFERENCES "projects" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW (),
    "updated_at" TIMESTAMPTZ
  );

COMMIT;
