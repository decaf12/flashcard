import { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTopicListContext } from '../hooks/useTopicListContext';
import { type Topic } from '../../../backend/models/topicModel';
import TopicListHttpRequest from '../httpRequests/topics';
import { TopicListActionType } from '../context/TopicListContext';

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

  return (
    <div className="home">
      <div className="workouts">
        { topics && topics.map((topic) => (
          <TopicDetails key={topic._id} topic={topic} updateTopicList={() => handleTopicDeletion(topic)} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Topics;
