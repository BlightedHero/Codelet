import TestResults from "./TestResults";

function TestResultsPage({question_num}) {
    
    return(<div id={`test-results-question-${question_num}`}>
        <TestResults question_num={question_num}/>
    </div>);
}

export default TestResultsPage;