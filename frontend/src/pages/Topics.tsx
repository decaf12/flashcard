import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { type Topic } from '../../../backend/models/topicModel';
import TopicListHttpRequest from '../httpRequests/topics';
import TopicDetails from '../components/TopicDetails';
import NewTopicForm from '../components/NewTopicForm';
import axios from 'axios';

const Topics = () => {
  const { loggedInAs } = useAuthContext();
  const [topics, setTopics] = useState(null as Topic[] | null);

  const updateTopics = async () => {
    try {
      const response = await TopicListHttpRequest.getAll();
      setTopics(response.data);
    } catch (e) {
      e instanceof Error && console.log(e);
    };
  };

  const handleTopicAdd = async (newTopic: Topic) => {
    try {
      const response = await TopicListHttpRequest.createTopic(newTopic);
      if (response.status === 200) {
        await updateTopics();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log('Add failed');
    }
  };

  const handleTopicDelete = async (topic: Topic) => {
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
  };

  const handleTopicEdit = async (updatedTopic: Topic) => {
    try {
      const response = await TopicListHttpRequest.updateTopic(updatedTopic);
      if (response.status === 200) {
        await updateTopics();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log('Edit failed');
    }
  };

  useEffect(() => {
    if (loggedInAs) {
      updateTopics();
    } else {
      setTopics([] as Topic[]);
    }
  }, [loggedInAs]);

  return (
    <div className="home">
      <div className="topics">
        { topics === null
            ? 'Loading'
            : topics.length > 0
              ? topics.map((topic) => 
                <TopicDetails
                  key={topic._id}
                  topic={topic}
                  onTopicEdit={(updatedTopic: Topic) => {
                    if (updatedTopic._id !== topic._id) {
                      throw new Error('Edit failed.');
                    }
                    handleTopicEdit(updatedTopic);
                  }}
                  onTopicDelete={() => handleTopicDelete(topic)}
                />)
              : 'You have no topics. Add a few!'}
      </div>
      <NewTopicForm onTopicAdd={handleTopicAdd}/>
    </div>
  );
};

export default Topics;
