CREATE DATABASE todosdb;

CREATE TABLE task (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  text VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false,
  user_id INTEGER NOT NULL REFERENCES "user"(id)
);

CREATE TABLE "user" (
  id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(100),
  google_id VARCHAR(255) UNIQUE
);