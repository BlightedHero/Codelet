import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { fetchCode, fetchScore, fetchTitle } from '../../utils/apiHelpers.js';
import { generateResponse } from '../Ollama.js';
import HomeButton from '../HomeButton.js';
import { useNavigate } from 'react-router-dom';

import { CodeBlock, dracula} from 'react-code-blocks';

import './response.css';

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
};

function Response() {
	const {student_id, question_number} = useParams();
	const [code, setCode] = useState('');
	const [prompt, setPrompt] = useState('');
	const [res, setResponse] = useState('');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [title, setTitle] = useState('???');
	const [score, setScore] = useState(0);

	const navigate = useNavigate();

	const handleChange = (event) => {
		setPrompt(event.target.value);
	};

	const handleClick = async(event) => {
		event.preventDefault();
		setLoading(true);
		try {
			const result = await generateResponse(student_id, question_number, prompt);
			setResponse(result);
			setMessage('');
		} catch (error) {
			setMessage(error.message);
		} finally {
			setLoading(false);
		}
	};

	try {
    	useEffect(() => {
    		fetchScore(student_id, question_number, setScore);
	    	if (score === 100) {
    			fetchTitle(question_number, setTitle);
    		} else {
    			setTitle('???');
    		}
    		fetchCode(question_number, setCode);
		}, [student_id, question_number, score, res]);
	} catch (error) {
		console.log('Error:', error);
	}

	if (loading) {
    	return (
      		<div className="App">
        		<header className='App-header'>
          			Loading...
        		</header>
      		</div>
    	);
    }

	return (
		<header className="App-header">
			<HomeButton student_id={student_id}/>

			{title}

			<Grid container spacing={0} alignContent={'center'}>
				<Grid xs={12} padding={1} item={true}>
					<Box sx={{boxShadow: 3, borderRadius: 2, backgroundColor: '#BB9AB1'}}>
						<CodeBlock text={code} language={'python'} showLineNumber={false} theme={dracula}/>
					</Box>
				</Grid>

				<Grid xs={6} padding={1} item={true}>
					<Box>
						<TextField
						id="filled-multiline-static"
						label="Answer"
						multiline
						rows={14}
						variant="outlined"
						fullWidth
						value={prompt}
						onChange={handleChange}
						sx={{boxShadow: 3, borderRadius: 2, backgroundColor: '#CEB6C7'}}/>
					</Box>
				</Grid>

				<Grid xs={6} padding={1} item={true}>
					<Box height={355} sx={{boxShadow: 3, borderRadius: 2, backgroundColor: '#CEB6C7'}}>
						<div style={{ whiteSpace: 'pre-wrap', textAlign: 'left'}}>
							<Typography padding={1}>
								{res}
							</Typography>
						</div>
					</Box>
				</Grid>
			</Grid>

			<div>
				<button className="submitButton" onClick={handleClick}>
					Submit Prompt
				</button>
				{'  '}
				<button className="nextButton" onClick={() => navigate('/students/'+student_id+'/question/'+ (Number(question_number) + 1))}>
					Next Question
				</button>
			</div>

			{message && <p>{message}</p>}
		</header>
	);
};

export default Response;
