import React, { useState } from "react";
import QuestionList from "./QuestionList";
import './StudentHome.css'
import { useParams } from "react-router-dom";

const apiURL = 'http://localhost:8080';

async function fetchUsername(student_id, callback) {
	try {
		const response = await fetch(apiURL+'/students/'+student_id, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		});
		if (!response.ok) {
			throw new Error('Failed to fetch student username: '+response.status);
		}
		const username = await response.json();
		callback(username.username);
	} catch (error) {
		console.error('Error', error);
	}
};

function StudentHome() {

	const {student_id} = useParams();
	const [username, setUsername] = useState('');

	fetchUsername(student_id, setUsername);
	return (
        <div id="student-home">
            <h1 id="question-list-header">
                {'Welcome, '+username}
            </h1>
            <QuestionList student_id={student_id}/>
        </div>
	);
};

export default StudentHome;
