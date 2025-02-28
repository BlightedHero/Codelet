import React from "react";
import { useNavigate } from 'react-router-dom';
import './HomeButton.css'

function HomeButton({ student_id }) {
    const navigate = useNavigate();
    return (
        <button
            className={'HomeButton'}
            onClick={() => navigate('/students/'+student_id+'/Home')}>
            Home
        </button>
    )
}

export default HomeButton;