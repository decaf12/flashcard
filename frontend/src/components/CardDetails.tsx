import React, { MouseEventHandler, useState, FormEvent } from 'react';
import { type Card } from '../../../backend/models/cardModel';
import DeleteButton from './buttons/DeleteButton';
import EditButton from './buttons/EditButton';
import FlipButton from './buttons/FlipButton';

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
      { showQuestion 
        ? <h4><span>Question: </span>{card.question}</h4>
        : <h4><span>Answer: </span>{card.answer}</h4> }
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
      { !isEditing && <FlipButton onClick={() => setShowQuestion(!showQuestion)} /> }
      <DeleteButton onClick={onCardDelete} />
      { error?.error && <div className='error'>{error.error}</div> }
    </div>
  );
};

export default CardDetails;
