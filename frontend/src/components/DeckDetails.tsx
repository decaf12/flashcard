import { MouseEventHandler, useState, FormEvent } from 'react';
import { type Deck } from '../../../backend/models/deckModel';
import { Link, useParams } from 'react-router-dom';

const DeckDetails = ({ deck, onDeckEdit, onDeckDelete }: 
  { deck: Deck, onDeckEdit: Function, onDeckDelete: MouseEventHandler<HTMLFormElement> }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(deck.deckName);
  const [draftName, setDraftName] = useState(deck.deckName);
  const { topicId } = useParams();
  const [error, setError] = useState(null as any);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const status = await onDeckEdit({ ...deck, deckName: draftName });
    setError(status);
    if (!status) {
      setName(draftName);
      setIsEditing(false);
    }
  };

  return (
    <div className="topic-details">
      { !isEditing
        ? <Link to={`/topics/${topicId}/decks/${deck._id}/cards`}>
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
      <span className='material-symbols-outlined' onClick={onDeckDelete}>delete</span>
      { error?.error && <div className='error'>{error.error}</div> }
    </div>
  );
};

export default DeckDetails;
