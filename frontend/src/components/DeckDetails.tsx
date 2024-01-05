import { MouseEventHandler, useState, FormEvent } from 'react';
import { type Deck } from '../../../backend/models/deckModel';
import { Link, useParams } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

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
    <div className="item-details">
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
              setError(null);
            }}>
              Cancel
            </button>
          </form>
        : <EditButton onClick={() => setIsEditing(true)} /> }
      <DeleteButton onClick={onDeckDelete} />
      { error?.error && <div className='error'>{error.error}</div> }
    </div>
  );
};

export default DeckDetails;
