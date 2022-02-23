CREATE TABLE "word_to_guess"("id" serial PRIMARY KEY, "word" VARCHAR(5), "definition" VARCHAR(500));
CREATE TABLE "guess_list" ("id" serial PRIMARY KEY, "guess" VARCHAR(5));
CREATE TABLE "record" ("id" serial PRIMARY KEY, "place" INTEGER);
