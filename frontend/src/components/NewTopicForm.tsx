import React, { FormEvent, FormEventHandler, useState } from 'react';
import TopicListHttpRequest from '../httpRequests/topics';
import axios from 'axios';
import { useTopicListContext } from '../hooks/useTopicListContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Topic } from '../../../backend/models/topicModel';
import { TopicListActionType } from '../context/TopicListContext';

const NewTopic = () => {
  const { dispatch } = useTopicListContext();
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

    const newTopic = { topicName: name } as Topic;
    try {
      const response = await TopicListHttpRequest.createTopic(newTopic);
      const json = response.data;
      if (response.status === 200) {
        setName('');
        setError(null);
        dispatch({ type: TopicListActionType.CREATE_TOPIC, payload: [json] });
        console.log(`New workout added: ${json}.`);
      } else {
        setError(json);
      }
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
      <button>Add Topic</button>
      {error?.error && <div className='error'>{error.error}</div>}
    </form>
  );
};

export default NewTopic;
