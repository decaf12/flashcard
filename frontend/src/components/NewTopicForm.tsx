import { FormEvent, FormEventHandler, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { Topic } from '../../../backend/models/topicModel';

const NewTopic = ({ onTopicAdd }: { onTopicAdd: Function }) => {
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
  
    const newTopic = { topicName: name } as Topic;

    try {
      await onTopicAdd(newTopic);
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
      <h3>Add a New Topic</h3>
      <label>Name:</label>
      <input
        type='text'
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        className={error?.emptyFields?.includes('title') ? 'error' : ''}
      />
      <button>Add Workout</button>
      {error?.error && <div className='error'>{error.error}</div>}
    </form>
  );
};

export default NewTopic;
