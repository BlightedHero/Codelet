// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import SignIn from './components/LandingPage/SignIn';
import UserCreation from './components/LandingPage/CreateAccount';
import StudentHome from './components/StudentHome/StudentHome';
import TestResultsPage from './components/TestResults/TestResultsPage';
import Response from './components/ResponsePage/response.js';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<UserCreation />} />
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/students/:student_id/Home" element={<StudentHome/>} />
        <Route path="/students/:student_id/question/:question_number" element={<Response/>} />
        //<Route path="/Student/INSERT_ID/Question/Results" element={<TestResultsPage/>} />   {/* TODO: Change this route*/}
      </Routes>
    </Router>
  );
}

export default App;
