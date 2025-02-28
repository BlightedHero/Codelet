import {sendPrompt, sendResponse, fetchResult} from '../utils/apiHelpers.js';

function modifyPrompt(prompt) {
	return 'Write a function called "foo" in JavaScript that does the following: '+prompt+'\n Include only the function and any necessary imports as if this were a JavaScript file. Do not include any additional text.';
};

async function fetchResponse(student_id, question_number, prompt) {
	try {
		const response = await fetch('http://localhost:11434/api/generate', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({model: 'llama3', prompt: prompt, stream: false})
		});
		if (!response.ok) {
			throw new Error('Failed to generate response: '+await response.status);
		}
		const result = await response.json();
		return result['response'];
	} catch (error) {
		throw error;
	}
};

export async function generateResponse(student_id, question_number, prompt) {
	const modifiedPrompt = modifyPrompt(prompt);
	const response = await fetchResponse(student_id, question_number, modifiedPrompt);
	const tests = await fetchResult(student_id, question_number, response);
	await sendPrompt(student_id, question_number, prompt);
	await sendResponse(student_id, question_number, response);
	return tests;
};
