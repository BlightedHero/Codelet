import React from 'react';
import './response.css'

class UploadPromptButton extends React.Component {
  
  handleClick = () => {
      const { prompt } = this.props;
      const { snum } = this.props;
      const { qnum } = this.props;
      const { loader } = this.props;

      const OLLAMAPORT = 11434;
      const BACKENDPORT = 8080;
      const MODEL = "llama3"

      loader(true);
      
      fetch(`http://localhost:${OLLAMAPORT}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({model: MODEL, prompt: `Do not respond with anything but code, with no unnecessary graves, a single function that: ${prompt}`, stream: false}),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        
        fetch(`http://localhost:${BACKENDPORT}/students/${snum}/question/${qnum}/response`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({response: data.response}),
        })
        .then(response => response.text())
        .then(data => {
          console.log('Success: ', data);
          window.location.reload();
        })
        .catch((error => {console.log('Error: ', error)}))

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  render() {
      return (
        <div>
          <button className="submitButton" onClick={this.handleClick}>Submit Prompt</button>
        </div>
      );
  }
}

export default UploadPromptButton;