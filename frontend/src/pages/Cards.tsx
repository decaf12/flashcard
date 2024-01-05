import React, { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Card } from '../../../backend/models/cardModel';
import CardListHttpRequest from '../httpRequests/cards';
import CardDetails from '../components/CardDetails';
import NewCardForm from '../components/NewCardForm';
import { Link, useParams } from 'react-router-dom';

const Cards = () => {
  const { loggedInAs } = useAuthContext();
  const [cards, setCards] = useState(null as Card[] | null);
  const [cardIndex, setCardIndex] = useState(0);
  const { topicId, deckId } = useParams();
  const card = cards === null ? null : cards[cardIndex];

  const goToPrevCard = () => {
    if (cards === null || cards.length === 0) {
      return;
    }

    const newIndex = cardIndex === 0 ? cards.length - 1 : cardIndex - 1;
    setCardIndex(newIndex);
  };

  const goToNextCard = () => {
    if (cards === null || cards.length === 0) {
      return;
    }

    const newIndex = cardIndex === cards.length - 1 ? 0 : cardIndex + 1;
    setCardIndex(newIndex);
  };

  const updateCards = useCallback(async () => {
    if (!topicId || !deckId) {
      return;
    }

    try {
      const response = await CardListHttpRequest.getAll(topicId, deckId);
      setCards(response.data);
    } catch (e) {
      e instanceof Error && console.log(e);
    };
  }, [topicId, deckId]);

  const handleCardAdd = async (card: Card) => {
    if (!topicId || !deckId) {
      return;
    }

    try {
      const response = await CardListHttpRequest.createCard(topicId, deckId, card);
      if (response.status === 200) {
        await updateCards();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log('Add failed');
    }
  };
  
  const handleCardDelete = async (card: Card) => {
    if (!topicId || !deckId) {
      return;
    }

    try {
      const response = await CardListHttpRequest.deleteCard(topicId, deckId, card);
      if (response.status === 200) {
        await updateCards();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log('Deletion failed');
    }
  }

  const handleCardEdit = async (updatedCard: Card) => {
    if (!topicId || !deckId) {
      return;
    }

    try {
      const response = await CardListHttpRequest.updateCard(topicId, deckId, updatedCard);
      if (response.status === 200) {
        await updateCards();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log('Edit failed');
    }
  };

  useEffect(() => {
    if (loggedInAs) {
      updateCards();
    } else {
      setCards([] as Card[]);
    }
  }, [loggedInAs, updateCards]);

  return (
    <div className="home">
      <div>
        <Link to={`/topics/${topicId}/decks`}>
          Back to decks
        </Link>
      </div>
      <div className="topics">
        { cards === null
            ? 'Loading'
            : cards.length > 0
              ? <>
                  { cards.length > 1 && <span onClick={goToPrevCard}>Prev</span> }
                  { card && <CardDetails
                      key={card._id}
                      card={card}
                      onCardEdit={(updatedCard: Card) => {
                        if (updatedCard._id !== card._id) {
                          throw new Error('Edit failed.');
                        }
                        handleCardEdit(updatedCard);
                      }}
                      onCardDelete={() => handleCardDelete(card)}
                    /> }
                    { cards.length > 1 && <span onClick={goToNextCard}>Next</span> }
                </> 
              : 'You have no cards. Add a few!'}
      </div>
      <NewCardForm onCardAdd={(newCard: Card) => {
        handleCardAdd(newCard);
      }}/>
    </div>
  );
};

export default Cards;
