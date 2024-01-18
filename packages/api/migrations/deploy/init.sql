-- Deploy project-management:init to pg
BEGIN;

CREATE TABLE
  IF NOT EXISTS "token" (
    "id" SERIAL PRIMARY KEY,
    "token" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW (),
    "updated_at" TIMESTAMPTZ
  );

CREATE TABLE
  "locales" (
    "id" SERIAL PRIMARY KEY,
    "code" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW (),
    "updated_at" TIMESTAMPTZ
  );

INSERT INTO
  "locales" ("code", "name")
VALUES
  ('en', 'English'),
  ('fr', 'Français');

CREATE TABLE
  "account_roles" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW (),
    "updated_at" TIMESTAMPTZ
  );

INSERT INTO
  "account_roles" ("name")
VALUES
  ('user'),
  ('admin');

CREATE TABLE
  "accounts" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT,
    "password" TEXT,
    "email" TEXT NOT NULL UNIQUE,
    "is_active" BOOLEAN NOT NULL DEFAULT FALSE,
    "account_role_id" INT NOT NULL REFERENCES "account_roles" ("id") ON DELETE CASCADE,
    "locale_id" INT NOT NULL REFERENCES "locales" ("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW (),
    "updated_at" TIMESTAMPTZ
  );

INSERT INTO
  "accounts" (
    "name",
    "email",
    "password",
    "account_role_id",
    "locale_id",
    "is_active"
  )
VALUES
  (
    'admin',
    'admin@admin.fr',
    '$2b$10$cUudsJM6QGbxGEftUQQNJOySgBt6kc3JiibxqAfafgCpYVSMlEEpS',
    2,
    1,
    TRUE
  );


COMMIT;