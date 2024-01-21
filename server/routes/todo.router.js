const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM "tasks" ORDER BY "id" ASC;`;
    pool
    .query(sqlText)
    .then((result) => {
        console.log('GET FROM DATABASE', result);
        res.send(result.rows);
    })
    .catch((err) => {
        console.log('ERROR', err);
        res.sendStatus(500);
    });
});

// POST
router.post('/', (req, res) => {
    const toDo = req.body;
    const sqlText = 'INSERT INTO "tasks" ("User", "Task", "Completed") VALUES ($1, $2, $3)'; 
    pool
    .query(sqlText, [toDo.User, toDo.Task, toDo.Completed])
    .then((results) => {
        console.log('add task info to database', toDo);
        res.sendStatus(201);
    })
    .catch((err) => {
        console.log('Error making query ${sqlText}', err);
        res.sendStatus(500);
    })
})

// PUT
router.put('/:id', (req, res) => {
    const toDoId = req.params.id;
    const queryText = `UPDATE "tasks" SET "Completed" = 'No' WHERE "id" = $1;`;
    pool
    .query(queryText, [toDoId])
    .then((response) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log(err);
        res.sendStatus(500);
    })
})
// DELETE

module.exports = router;
