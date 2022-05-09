CREATE TABLE "word_to_guess"("id" serial PRIMARY KEY, "word" VARCHAR(5));
CREATE TABLE "guess_list" ("id" serial PRIMARY KEY, "guess" VARCHAR(5));
CREATE TABLE "record" ("id" serial PRIMARY KEY, "game_id" INTEGER, "round" INTEGER, "win" BOOLEAN, UNIQUE("game_id"));

INSERT INTO "guess_list" ("guess") VALUES (''),(''),(''),(''),(''),('');