import { MouseEventHandler } from 'react';
import { type Topic } from '../../../backend/models/topicModel';

const TopicDetails = ({ topic, onTopicDeletion }: { topic: Topic, onTopicDeletion: MouseEventHandler<HTMLFormElement> }) => {
  console.log('TopicDetails component received topic: ', topic);

  return (
    <div className="topic-details">
      <h4>{topic.topicName}</h4>
      <span className='material-symbols-outlined' onClick={onTopicDeletion}>delete</span>
    </div>
  );
};

export default TopicDetails;
