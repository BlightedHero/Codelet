const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
const student_controller = require('./controllers/Student.controller.js');
const question_controller = require('./controllers/Question.controller.js');
app.use('/students', student_controller);
app.use('/questions', question_controller);
app.listen(PORT, () => { console.log(`Server started on port ${PORT}`)})

module.exports = app;
