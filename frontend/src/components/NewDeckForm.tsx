import { FormEvent, FormEventHandler, useState } from 'react';
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
      setError({ error: 'You must be logged in.' });
      return;
    }

    if (name === '') {
      setError({ error: 'Provde a name.' });
      return;
    }

    const newDeck = { deckName: name } as Deck;
    try {
      const status = await onDeckAdd(newDeck);
      setError(status);
      if (!status) {
        setName('');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        setError(err.response.data);
      }
    }
  }) as FormEventHandler<HTMLFormElement>;

  return (
    <form onSubmit={handleSubmit}>
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
