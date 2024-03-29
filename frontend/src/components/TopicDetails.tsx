import { MouseEventHandler, useState, FormEvent } from 'react';
import { type Topic } from '../../../backend/models/topicModel';
import DeleteButton from './buttons/DeleteButton';
import EditButton from './buttons/EditButton';
import { Link } from 'react-router-dom';

const TopicDetails = ({ topic, onTopicEdit, onTopicDelete }: 
  { topic: Topic, onTopicEdit: Function, onTopicDelete: MouseEventHandler<HTMLFormElement> }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(topic.topicName);
  const [draftName, setDraftName] = useState(topic.topicName);
  const [error, setError] = useState(null as any);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = await onTopicEdit({ ...topic, topicName: draftName });
    setError(status);
    if (!status) {
      setName(draftName);
      setIsEditing(false);
    }
  };

  return (
    <div className="item-details">
      { !isEditing
        ? <Link to={`/topics/${topic._id}/decks`} state={ topic }>
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
                setError(null);
              }}>
                Cancel
              </button>
            </form>
          : <EditButton onClick={() => setIsEditing(true)} /> }
        <DeleteButton onClick={onTopicDelete} />
      { error?.error && <div className='error'>{error.error}</div> }
    </div>
  );
};

export default TopicDetails;
