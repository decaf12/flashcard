import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTopicListContext } from '../hooks/useTopicListContext';
import { type Topic } from '../../../backend/models/topicModel';
import TopicListHttpRequest from '../httpRequests/topics';
import { TopicListActionType } from '../context/TopicListContext';
import TopicDetails from '../components/TopicDetails';
import NewTopicForm from '../components/NewTopicForm';

const Topics = () => {
  const { loggedInAs } = useAuthContext();
  const { topics, dispatch: dispatchTopicList } = useTopicListContext();

  const handleTopicDeletion = (topic: Topic) => {
    dispatchTopicList({
      type: TopicListActionType.DELETE_TOPIC,
      payload: [topic],
    });
  }

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await TopicListHttpRequest.getAll();
        console.log('Topic component received response: ', response);
        dispatchTopicList({
          type: TopicListActionType.SET_TOPICS,
          payload: response.data,
        });
      } catch (e) {
        e instanceof Error && console.log(e);
      };
    };

    if (loggedInAs) {
      fetchTopics();
    }
  }, [loggedInAs, dispatchTopicList]);

  console.log('Topic page logged in as: ', loggedInAs);
  console.log('Topic list: ', topics);

  return (
    <div className="home">
      <div className="topics">
        { topics.length > 0 && topics.map((topic) => 
          <TopicDetails key={topic._id} topic={topic} onTopicDeletion={() => handleTopicDeletion(topic)} />)}
      </div>
      <NewTopicForm />
    </div>
  );
};

export default Topics;
