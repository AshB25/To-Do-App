CREATE TABLE "tasks" (
    "id" serial primary key,
    "User" varchar(80) not null,
    "Task" varchar(120) not null,
    "Completed" varchar(20) 
);

INSERT INTO "tasks" ("User", "Task", "Completed")
VALUES ('Ashleigh', 'Code App', 'No');