import React, { FormEvent, FormEventHandler, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { Deck } from '../../../backend/models/deckModel';

const NewDeck = ({ onDeckAdd }: { onDeckAdd: Function }) => {
  const { loggedInAs } = useAuthContext();

  const [name, setName] = useState('');
  const [error, setError] = useState(null as any);

  const handleSubmit = (async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (loggedInAs === null) {
      const notLoggedIn = { error: 'You must be logged in.' };
      setError(notLoggedIn);
      return;
    }

    const newDeck = { deckName: name } as Deck;
    try {
      onDeckAdd(newDeck);
      setName('');
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        setError(err.response.data);
      }
    }
  }) as FormEventHandler<HTMLFormElement>;

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Deck</h3>
      <label>Name:</label>
      <input
        type='text'
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        className={error?.emptyFields?.includes('title') ? 'error' : ''}
      />
      <button>Add Deck</button>
      {error?.error && <div className='error'>{error.error}</div>}
    </form>
  );
};

export default NewDeck;
