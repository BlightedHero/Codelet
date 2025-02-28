const express = require('express');
const router = express.Router();
const fs = require('fs');
const { spawn, exec } = require('child_process');
const question_file = 'data/questions.json';

/*
GET/questions
Retrieves a list of all question numbers
*/
router.get('', (req, res) => {
	try {
		const questions = JSON.parse(fs.readFileSync(question_file));
		const question_numbers = questions["questionList"].map((question) => question.question_number);
		res.json(question_numbers);
	} catch (error) {
		res.status(500).json(error);
	}
});

/*
GET/questions/topics
Retrieves a list of all topics
*/
router.get('/topics', (req, res) => {
	try {
		const questions = JSON.parse(fs.readFileSync(question_file));
		const question_topics = questions['questionList'].map((question) => question.topic).filter((topic, index, arr) => arr.indexOf(topic) == index);
		res.json(question_topics);
	} catch (error) {
		res.status(500).json(error);
	}
});

/*
GET/questions/{topic}
Retrieves a list of question numbers belonging to a topic
*/
router.get('/:topic', (req, res) => {
	const q_topic = req.params.topic;
	try {
		const questions = JSON.parse(fs.readFileSync(question_file));
		const question_numbers = questions['questionList'].filter((question) => question.topic == q_topic).map((question) => question.question_number);
		res.json(question_numbers);
	} catch (error) {
		res.status(500).json(error);
	}
});

/*
GET/questions/{question_number}/code
Retrieves the code of a specified question
*/
router.get('/:question_number/code', (req, res) => {
	const question_number = req.params.question_number;
	const questions = JSON.parse(fs.readFileSync(question_file));
	try {
		const code = questions["questionList"].find((question) => question.question_number == question_number).code;
		res.json(code);
	} catch (error) {
		res.status(500).json(error);
	}
});

/*
GET/questions/{question_number}/title
Retrieves the name of a specified question
*/
router.get('/:question_number/title', (req, res) => {
	const question_number = req.params.question_number;
	try {
		const questions = JSON.parse(fs.readFileSync(question_file));
		const title = questions["questionList"].find((question) => question.question_number == question_number).title;
		res.json(title);
	} catch (error) {
		res.status(500).json(error);
	}
});

/*
GET/questions/{question_number}/topic
Retrieves the topic of a specified question
*/
router.get('/:question_number/topic', (req, res) => {
	const question_number = req.params.question_number;
	try {
		const questions = JSON.parse(fs.readFileSync(question_file));
		const topic = questions["questionList"].find((question) => question.question_number == question_number).topic;
		res.json(topic);
	} catch (error) {
		res.status(500).json(error);
	}
});

/*
GET/questions/{question_number}/flags
Retrieves the number of flags of a specified question
*/
router.get('/:question_number/flags', (req, res) => {
	const question_number = req.params.question_number;
	try {
		const questions = JSON.parse(fs.readFileSync(question_file));
		const flag_count = questions["questionList"].find((question) => question.question_number == question_number).flags;
		res.json(flag_count);
	} catch (error) {
		res.status(500).json(error);
	}
});

/*
POST/questions/{question_number}/result
Test the generated code for the specified question
*/
router.post('/:question_number/result', (req, res) => {
	const question_number = req.params.question_number;
	const questions = JSON.parse(fs.readFileSync(question_file));
	const response = req.body.response;
	const student_id = req.body.student_id;

	var result = '';
	var error = '';
	try {
		const testFile = questions["questionList"].find((question) => question.question_number == question_number).test;
		const cmdOne = 'mkdir -p data/tmp'+student_id;
		const cmdTwo = 'cp ./data/tests/'+testFile+' ./data/tmp'+student_id+'/'+testFile;
		console.log(testFile);
		exec(cmdOne+' && '+cmdTwo, (error, stdout, stderr) => {
			if (error) {
				console.log('error exec');
				throw new Error(error.message);
			}

			if (stderr) {
				console.log('stderr exec');
				throw new Error(stderr);
			}
			const echo = spawn('echo', [response+'\n module.exports = { foo };']);
			const tee = spawn('tee', ['./data/tmp'+student_id+'/function.js']);

			echo.stdout.pipe(tee.stdin);

			echo.on('error', (error) => {
				console.log('error echo');
				throw new Error(error);
			});

			tee.on('error', (error) => {
				console.log('error tee');
				throw new Error(error);
			});

			tee.on('close', (close) => {
				console.log(close);
				if (close == 0) {
					const testFunction = spawn('mocha', ['--diff', 'false', '--full-trace', 'false', './data/tmp'+student_id+'/'+testFile]);

					testFunction.stdout.on('data', (data) => {
						result += data.toString();
					});

					testFunction.stderr.on('data', (data) => {
						error += data.toString();
					});

					testFunction.on('error', (error) => {
						console.log('error testing');
						throw new Error(error);
					});

					testFunction.on('close', (code) => {
						console.log('test closed with code: '+code);
						console.log('result = '+result);
						console.log('error = '+error);
						res.json(result);
					});
				} else {
					throw new Error('Failed to Write Function');
				}
			});
		});
	} catch (error) {
		res.status(500).json(error);
	}
});

/*
PUT/questions/{question_number}/flag
Increments the flag of a specified question
*/
router.put('/:question_number/flag', (req, res) => {
	const question_number = req.params.question_number;
	try {
		const questions = JSON.parse(fs.readFileSync(question_file));
		const index = questions["questionList"].findIndex((question) => question.question_number == question_number);
		questions["questionList"][index].flags++;
		fs.writeFileSync(question_file, JSON.stringify(questions));
		res.json(questions["questionList"][index].flags);
	} catch (error) {
		res.status(500).json(error);
	}
});


module.exports = router;
