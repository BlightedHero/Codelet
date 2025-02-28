function TestResults({ question_num }) {
    // TODO: replace stub test results with results from API call to retrieve tests for given question
    const test_results = [
        {test_name: "Test 1", pass: false},
        {test_name: "Test 2", pass: true}
    ]

    let overall_score = test_results.filter(result => {return result.pass}).length / test_results.length * 100

    return(
        <div className="test-results">
            <p>{`Test results: ${overall_score} %`}</p>
            <table>
                {test_results.map((result) => (
                        <tr>
                            <td>
                                {result.test_name}
                            </td>
                            <td>
                                {result.pass ? "Pass" : "Fail"}
                            </td>
                        </tr>
                    ))}
            </table>
        </div>
        );
}

export default TestResults;