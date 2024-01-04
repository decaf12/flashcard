import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { type Topic } from '../../../backend/models/topicModel';
import TopicListHttpRequest from '../httpRequests/topics';
import TopicDetails from '../components/TopicDetails';
import NewTopicForm from '../components/NewTopicForm';

const Topics = () => {
  const { loggedInAs } = useAuthContext();
  const [topics, setTopics] = useState([] as Topic[]);

  const updateTopics = async () => {
    try {
      const response = await TopicListHttpRequest.getAll();
      console.log('Topic component received response: ', response);
      setTopics(response.data);
    } catch (e) {
      e instanceof Error && console.log(e);
    };
  };

  const handleTopicDeletion = async (topic: Topic) => {
    try {
      const response = await TopicListHttpRequest.deleteTopic(topic);
      if (response.status === 200) {
        await updateTopics();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log('Deletion failed');
    }
  }

  useEffect(() => {
    if (loggedInAs) {
      updateTopics();
    } else {
      setTopics([] as Topic[]);
    }
  }, [loggedInAs]);

  console.log('Topic page logged in as: ', loggedInAs);
  console.log('Topic list: ', topics);

  return (
    <div className="home">
      <div className="topics">
        { topics.length > 0 && topics.map((topic) => 
          <TopicDetails
            key={topic._id}
            topic={topic}
            onTopicDeletion={() => handleTopicDeletion(topic)}
          />)}
      </div>
      <NewTopicForm />
    </div>
  );
};

export default Topics;
