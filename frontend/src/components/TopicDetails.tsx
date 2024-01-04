import { MouseEventHandler, useState, FormEvent } from 'react';
import { type Topic } from '../../../backend/models/topicModel';
import { Link } from 'react-router-dom';

const TopicDetails = ({ topic, onTopicEdit, onTopicDelete: onTopicDeletion }: 
  { topic: Topic, onTopicEdit: Function, onTopicDelete: MouseEventHandler<HTMLFormElement> }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(topic.topicName);
  const [draftName, setDraftName] = useState(topic.topicName);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onTopicEdit({ ...topic, topicName: draftName });
    setName(draftName);
    setIsEditing(false);
  };

  return (
    <div className="topic-details">
      { !isEditing
        ? <Link to={`/topics/${topic._id}/decks`}>
            <h4>{name}</h4>
          </Link>
        : <h4>{name}</h4> }

      { isEditing
        ? <form className="create" onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='New name'
              onChange={(e) => setDraftName(e.target.value)}
              value={draftName}
            />
            <button>Save</button>
            <button onClick={(e) => {
              e.preventDefault();
              setDraftName(name);
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
