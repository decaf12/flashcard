import { MouseEventHandler, useState, FormEvent } from 'react';
import { type Topic } from '../../../backend/models/topicModel';
import { Link } from 'react-router-dom';

const TopicDetails = ({ topic, onTopicEdit, onTopicDeletion }: 
  { topic: Topic, onTopicEdit: Function, onTopicDeletion: MouseEventHandler<HTMLFormElement> }) => {
  console.log('TopicDetails component received topic: ', topic);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(topic.topicName);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onTopicEdit({ ...topic, topicName: name });
    setIsEditing(false);
  };

  return (
    <div className="topic-details">
      <Link to={`/${topic._id}/decks`}>
        <h4>{name}</h4>
      </Link>

      { isEditing
        ? <form className="create" onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='New name'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button>Save</button>
            <button onClick={(e) => {
              e.preventDefault();
              setIsEditing(false);
            }}>
              Cancel
            </button>
          </form>
        : <span className='material-symbols-outlined' onClick={() => setIsEditing(true)}>edit</span> }

      <span className='material-symbols-outlined' onClick={onTopicDeletion}>delete</span>
    </div>
  );
};

export default TopicDetails;
