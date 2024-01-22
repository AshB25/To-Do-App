const express = require('express');
const app = express();
const todoRouter = require('./routes/todo.router');
const PORT = process.env.PORT || 5001;
const bodyParser = require('body-parser');

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for axios requests
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/api/todo', todoRouter);

/** ---------- START SERVER ---------- **/
app.listen(PORT,  () => {
    console.log('Listening on port: ', PORT);
});