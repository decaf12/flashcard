import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { type Topic } from '../../../backend/models/topicModel';
import TopicListHttpRequest from '../httpRequests/topics';
import TopicDetails from '../components/TopicDetails';
import NewTopicForm from '../components/NewTopicForm';
import { useParams } from 'react-router-dom';

const Decks = () => {
  const { loggedInAs } = useAuthContext();
  const [decks, setDecks] = useState([] as Topic[]);
  const { topicId } = useParams();

  const updateDecks = async () => {
    try {
      const response = await TopicListHttpRequest.getAll();
      console.log('Topic component received response: ', response);
      setDecks(response.data);
    } catch (e) {
      e instanceof Error && console.log(e);
    };
  };

  const handleTopicDeletion = async (topic: Topic) => {
    try {
      const response = await TopicListHttpRequest.deleteTopic(topic);
      if (response.status === 200) {
        await updateDecks();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log('Deletion failed');
    }
  }

  useEffect(() => {
    if (loggedInAs) {
      updateDecks();
    } else {
      setDecks([] as Topic[]);
    }
  }, [loggedInAs]);

  console.log('Topic page logged in as: ', loggedInAs);
  console.log('Topic list: ', decks);

  return (
    <div className="home">
      <div className="topics">
        {/* { decks.length > 0 && decks.map((topic) => 
          <TopicDetails
            key={topic._id}
            topic={topic}
            onTopicDeletion={() => handleTopicDeletion(topic)}
          />)} */}
      </div>
      <NewTopicForm />
    </div>
  );
};

export default Decks;
