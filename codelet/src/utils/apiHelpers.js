// apiHelpers.js

const apiURL = 'http://localhost:8080';

export async function fetchTopics(callback) {
	const url = apiURL+'/questions/topics';
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		});
		if (!response.ok) {
			throw new Error('Failed to fetch topics: '+await response.json());
		}
		const topics = await response.json();
		callback(topics);
	} catch (error) {
		throw error;
	}
};

export async function fetchTitle(question, callback) {
	const url = apiURL+'/questions/'+question+'/title';
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		});
		if (!response.ok) {
			throw new Error('Failed to fetch title of question '+question+': '+await response.json());
		}
		const title = await response.json();
		callback(title);
	} catch (error) {
		throw error;
	}
};

export async function fetchScore(student_id, question, callback) {
	const url = apiURL+'/students/'+student_id+'/question/'+question+'/score';
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		});
		if (!response.ok) {
			throw new Error('Failed to fetch score on question '+question+'for '+student_id+': '+await response.json());
		}
		const score = await response.json();
		callback(score);
	} catch (error) {
		throw error;
	}
};

export async function fetchQuestions(topic, callback) {
	const url = apiURL+'/questions/'+topic;
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		});
		if (!response.ok) {
			throw new Error('Failed to fetch questions in '+topic+': '+await response.json());
		}
		const questions = await response.json();
		callback(questions);
	} catch (error) {
		throw error;
	}
};

export async function fetchCode(question_number, callback) {
	const url = apiURL+'/questions/'+question_number+'/code';
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		});
		if (!response.ok) {
			throw new Error('Failed to fetch code for question '+question_number+': '+await response.json());
		}
		const code = await response.json();
		callback(code);
	} catch (error) {
		throw error;
	}
};

export async function fetchResult(student_id, question_number, res) {
	const url = apiURL+'/questions/'+question_number+'/result';
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({response: res, student_id: student_id})
		});
		if (!response.ok) {
			throw new Error('Failed to fetch results: '+await response.status);
		}
		const result = await response.json();
		return result;
	} catch (error) {
		throw error;
	}
};

export async function sendPrompt(student_id, question_number, prompt) {
	const url = apiURL+'/students/'+student_id+'/question/'+question_number+'/prompt';
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({prompt: prompt})
		});
		if (!response.ok) {
			throw new Error('Failed to update prompts: '+await response.status);
		}
	} catch (error) {
		throw error;
	}
};

export async function sendResponse(student_id, question_number, res) {
	const url = apiURL+'/students/'+student_id+'/question/'+question_number+'/response';
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({response: res})
		});
		if (!response.ok) {
			throw new Error('Failed to update responses: '+await response.status);
		}
	} catch (error) {
		throw error;
	}
};
