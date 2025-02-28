const fs = require('fs');
const student_path = 'data/student_accounts/';
const question_list = JSON.parse(fs.readFileSync('data/questions.json'))["questionList"];

class Student {
	#id;
	#history;
	#researchers;
	constructor(id) {
		this.#id = id;
		this.#init();
	}

	/*
	Returns the student's id
	*/
	get id() {
		return this.#id;
	}

	/*
	Returns the student's list of researchers
	*/
	get researchers() {
		return this.#researchers;
	}

	/*
	Initializes a blank student history and a blank list of researchers
	*/
	#init() {
		this.#history = [];
		for (let i = 0; i < question_list.length; i++) {
			this.#history[i] = {question_number : question_list[i].question_number,
								prompts: [],
								responses : [],
								score : 0 };
		}
		this.#researchers = [];
	}

	/*
	Loads a student's information from a file
	*/
	load() {
		try {
			const student_info = JSON.parse(fs.readFileSync(student_path+this.#id+'.json'));
			this.#history = student_info.history;
			this.#researchers = student_info.researchers;
		} catch (error) {
			throw error;
		}
	}

	/*
	Saves a student's information to a file
	*/
	save() {
		try {
			fs.writeFileSync(student_path+this.#id+'.json', JSON.stringify({"history":this.#history, "researchers":this.#researchers}));
		} catch (error) {
			throw error;
		}
	}

	/*
	Returns the history index for a given question number
	Throws an error if the question number is invalid
	*/
	#historyIndex(question_number) {
		for (let i = 0; i < this.#history.length; i++) {
			if (this.#history[i].question_number == question_number) {
				return i;
			}
		}
		throw "Not a valid question number ";
	}

	/*
	Returns the student's score for a given question number
	Throws an error if the question number is invalid
	*/
	getScore(question_number) {
		try {
			return this.#history[this.#historyIndex(question_number)].score;
		} catch (error) {
			throw error + "received trying to get score.";
		}
	}

	/*
	Returns the student's plain text prompts for a given question number
	Throws an error if the question number is invalid
	*/
	getPrompts(question_number) {
		try {
			return this.#history[this.#historyIndex(question_number)].prompts;
		} catch (error) {
			throw error + "received trying to get prompts.";
		}
	}

	/*
	Returns the student's Ollama responses for a given question number
	Throws an error if the question number is invalid
	*/
	getResponses(question_number) {
		try {
			return this.#history[this.#historyIndex(question_number)].responses;
		} catch (error) {
			throw error + "received trying to get responses.";
		}
	}

	/*
	Sets the student's score for a given question number
	Throws an error if the question number is invalid
	*/
	setScore(question_number, score) {
		try {
			this.#history[this.#historyIndex(question_number)].score = score;
		} catch (error) {
			throw error + "received trying to set the score.";
		}
	}

	/*
	Adds a student's plain text prompt for a given question number
	Throws an error if the question number is invalid
	*/
	addPrompt(question_number, prompt) {
		try {
			this.#history[this.#historyIndex(question_number)].prompts.push(prompt);
		} catch (error) {
			throw error + "received trying to add a prompt.";
		}
	}

	/*
	Adds a student's Ollama response for a given question number
	Throws an error if the question number is invalid
	*/
	addResponse(question_number, response) {
		try {
			this.#history[this.#historyIndex(question_number)].responses.push(response);
		} catch (error) {
			throw error + "received trying to add a response.";
		}
	}

	/*
	Adds a researcher for the student
	*/
	addResearcher(researcher_id) {
		this.#researchers.push(researcher_id);
	}
}

module.exports = Student;
