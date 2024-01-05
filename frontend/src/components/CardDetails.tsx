import React, { MouseEventHandler, useState, FormEvent } from 'react';
import { type Card } from '../../../backend/models/cardModel';

const CardDetails = ({ card, onCardEdit, onCardDelete }: 
  { card: Card, onCardEdit: Function, onCardDelete: MouseEventHandler<HTMLFormElement> }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [text, setText] = useState(showQuestion ? card.question : card.answer);
  const [draftText, setDraftText] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newCard = showQuestion ? { ...card, question: draftText } : { ...card, answer: draftText };
    await onCardEdit(newCard);
    setText(draftText);
    setIsEditing(false);
  };

  return (
    <div className="topic-details">
      <h4>{text}</h4>
      { isEditing
        ? <form className="create" onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder={`New ${showQuestion ? 'question' : 'answer'}`}
              onChange={(e) => setDraftText(e.target.value)}
              value={draftText}
            />
            <button>Save</button>
            <button onClick={(e) => {
              e.preventDefault();
              setDraftText(text);
              setIsEditing(false);
            }}>
              Cancel
            </button>
          </form>
        : <span className='material-symbols-outlined' onClick={() => setIsEditing(true)}>edit</span> }

      <span className='material-symbols-outlined' onClick={onCardDelete}>delete</span>
      <div>
        <span className='material-symbols-outlined' onClick={() => setShowQuestion(!showQuestion)}>Flip</span>
      </div>
    </div>
  );
};

export default CardDetails;
