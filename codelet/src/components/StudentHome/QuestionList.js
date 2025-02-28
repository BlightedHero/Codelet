import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Collapsible from 'react-collapsible';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { fetchTopics, fetchQuestions, fetchTitle, fetchScore } from '../../utils/apiHelpers.js';

function Question({ student_id, question }) {
	const [score, setScore] = useState(0);
	const [title, setTitle] = useState('???');

	const navigate = useNavigate();
	try {
		useEffect(() => {
			fetchScore(student_id, question, setScore);

			if (score === 100) {
				fetchTitle(question, setTitle);
			}
		}, [student_id, question, score]);
	} catch (error) {
		console.log('Error:', error);
	}
	return (
		<>
			<td>
				<button
					className={'QuestionButton'}
					onClick={() => navigate('/students/'+student_id+'/question/'+question)}>
					{title}
				</button>
			</td>
			<td>
				{score+'%'}
			</td>
		</>
	);
};

function TopicSection({ student_id, topic }) {
	const [isOpened, setOpened] = useState(false);
	const [questions, setQuestions] = useState([]);
	try {
		useEffect(() => {
			fetchQuestions(topic, setQuestions);
		}, [topic]);
	} catch (error) {
		console.log('Error: ', error);
	}
	return (
		<Collapsible
			trigger={topic}
			triggerSibling={isOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}
			onOpening={ () => { setOpened(true);
								try {
									fetchQuestions(topic, setQuestions);
								} catch (error) {
									console.log('Error: ', error);
								} } }
			onClosing={ () => { setOpened(false); } }>

			<table className="question-list-table">
				<tbody>
					{questions.map((question) => (
						<tr key={question}>
							<Question student_id = {student_id} question = {question} />
						</tr>
					))}
				</tbody>
			</table>
		</Collapsible>
	);
};

function QuestionList({ student_id }) {
	const [topics, setTopics] = useState([]);
	try {
		useEffect(() => {
			fetchTopics(setTopics);
		}, []);
	} catch (error) {
		console.log('Error: ', error);
	}
	return (
		<div id="question-list">
			{topics.map((topic) => (
				<div key = {topic}>
					<TopicSection student_id = {student_id} topic = {topic} />
				</div>
			))}
		</div>
	);
};

export default QuestionList;
