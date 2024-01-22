CREATE TABLE "tasks" (
    "id" serial primary key,
    "User" varchar(80) not null,
    "Task" varchar(120) not null,
    "Completed" BOOLEAN DEFAULT false 
);

INSERT INTO "tasks" ("User", "Task", "Completed")
VALUES ('Ashleigh', 'Code App', false);