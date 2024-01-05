import React, { FormEvent, FormEventHandler, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { Card } from '../../../backend/models/cardModel';

const NewCard = ({ onCardAdd }: { onCardAdd: Function }) => {
  const { loggedInAs } = useAuthContext();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null as any);

  const handleSubmit = (async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (loggedInAs === null) {
      setError({ error: 'You must be logged in.' });
      return;
    }

    if (question === '') {
      setError({ error: 'Provde a question.' });
      return;
    }

    if (answer === '') {
      setError({ error: 'Provde an answer.' });
      return;
    }

    const newCard = { question, answer } as Card;
    try {
      const status = await onCardAdd(newCard);
      console.log('NewCardForm status: ', status);
      setError(status);
      if (!status) {
        setQuestion('');
        setAnswer('');
      }
    } catch (err) {
      console.log('NewCardForm error: ', err);
      if (axios.isAxiosError(err) && err.response?.data) {
        setError(err.response.data);
      }
    }
  }) as FormEventHandler<HTMLFormElement>;

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Card</h3>
      <label>Question:</label>
      <input
        type='text'
        onChange={(e) => {
          setQuestion(e.target.value);
        }}
        value={question}
        className={error?.emptyFields?.includes('title') ? 'error' : ''}
      />
      <label>Answer:</label>
      <input
        type='text'
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
        value={answer}
        className={error?.emptyFields?.includes('title') ? 'error' : ''}
      />
      <button>Add Card</button>
      {error?.error && <div className='error'>{error.error}</div>}
    </form>
  );
};

export default NewCard;
