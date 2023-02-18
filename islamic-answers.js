import React, { useState } from 'react';
import axios from 'axios';

function IslamicAnswer() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  const hadith = 'Exchange gifts with one another, for they remove ill feelings from the hearts.';
  const sourceUrl = 'https://sunnah.com/tirmidhi/27/15';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(apiUrl, {
      prompt: `Question: ${question}\nAnswer:`,
      max_tokens: 1000,
      n: 1,
      stop: 'Answer:',
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      }
    });
    const answerText = response.data.choices[0].text.trim();
    const fullAnswer = `${answerText}\n\n${hadith}\n${sourceUrl}`;
    setAnswer(fullAnswer);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {answer && <p>{answer}</p>}
    </div>
  );
}

export default IslamicAnswer;