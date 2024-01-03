import React, { MouseEventHandler } from 'react';
import { type Topic } from '../../../backend/models/topicModel';
import TopicListHttpRequest from '../httpRequests/topics';

const TopicDetails = ({ topic, onTopicDeletion }: { topic: Topic, onTopicDeletion: Function }) => {
  console.log('TopicDetails component received topic: ', topic);
  const handleClick = (async (): Promise<void> => {
    try {
      const response = await TopicListHttpRequest.deleteTopic(topic);
      if (response.status === 200) {
        onTopicDeletion();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log(('Deletion failed'));
    }
  }) as MouseEventHandler<HTMLFormElement>;

  return (
    <div className="topic-details">
      <h4>{topic.topicName}</h4>
      <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  );
};

export default TopicDetails;
