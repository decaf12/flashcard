import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { type Topic } from '../../../backend/models/topicModel';
import TopicListHttpRequest from '../httpRequests/topics';

const Topics = () => {
  const { loggedInAs } = useAuthContext();
  const [topicList, setTopicList] = useState([] as Topic[]);

  const handleTopicDeletion = (id: string) => {
    setTopicList(topicList.filter((topic) => topic._id !== id));
  }

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await TopicListHttpRequest.getAll();
        setTopicList(response.data);
      } catch (e) {
        e instanceof Error && console.log(e);
      };
    };

    if (loggedInAs) {
      fetchTopics();
    }
  }, [loggedInAs]);

  return (
    <div className="home">
      <div className="workouts">
        { topicList && topicList.map((topic) => (
          <TopicDetails key={topic._id} topic={topic} updateTopicList={() => handleTopicDeletion(topic._id)} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Topics;
