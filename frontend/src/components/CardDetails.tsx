import { MouseEventHandler, useState, FormEvent } from 'react';
import { type Card } from '../../../backend/models/cardModel';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

const CardDetails = ({ card, onCardEdit, onCardDelete }: 
  { card: Card, onCardEdit: Function, onCardDelete: MouseEventHandler<HTMLFormElement> }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [draftQuestion, setDraftQuestion] = useState('');
  const [draftAnswer, setDraftAnswer] = useState('');
  const [error, setError] = useState(null as any);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCard = showQuestion ? { ...card, question: draftQuestion } : { ...card, answer: draftQuestion };
    const status = await onCardEdit(newCard);
    setError(status);
    if (!status) {
      if (showQuestion) {
        setDraftQuestion('');
      } else {
        setDraftAnswer('');
      }
      setIsEditing(false);
    }
  };

  return (
    <div className="item-details">
      <h4>{showQuestion ? card.question : card.answer}</h4>
      { isEditing
        ? <form className="create" onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder={`New ${showQuestion ? 'question' : 'answer'}`}
              onChange={(e) => {
                if (showQuestion) {
                  setDraftQuestion(e.target.value);
                } else {
                  setDraftAnswer(e.target.value);
                }
              }}
              value={showQuestion ? draftQuestion : draftAnswer}
            />
            <button>Save</button>
            <button onClick={(e) => {
              e.preventDefault();
              setIsEditing(false);
              setError(null);
            }}>
              Cancel
            </button>
          </form>
        : <EditButton onClick={() => setIsEditing(true)} /> }
      <DeleteButton onClick={onCardDelete} />
      { error?.error && <div className='error'>{error.error}</div> }
      <div>
        <span className='material-symbols-outlined' onClick={() => setShowQuestion(!showQuestion)}>Flip</span>
      </div>
    </div>
  );
};

export default CardDetails;
