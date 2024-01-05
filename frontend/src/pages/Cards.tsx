import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Card } from '../../../backend/models/cardModel';
import axios from 'axios';
import CardListHttpRequest from '../httpRequests/cards';
import CardDetails from '../components/CardDetails';
import NewCardForm from '../components/NewCardForm';
import PrevButton from '../components/buttons/PrevButton';
import NextButton from '../components/buttons/NextButton';
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
        return { error: 'Add failed. '};
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        return err.response.data;
      }
    }
  };

  const handleCardEdit = async (updatedCard: Card) => {
    if (!topicId || !deckId) {
      return;
    }

    try {
      const response = await CardListHttpRequest.updateCard(topicId, deckId, updatedCard);
      if (response.status === 200) {
        await updateCards();
      } else {
        return { error: 'Edit failed. '};
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        return err.response.data;
      }
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

  useEffect(() => {
    if (loggedInAs) {
      updateCards();
    } else {
      setCards([] as Card[]);
    }
  }, [loggedInAs, updateCards]);

  return (
    <div className="home">
      <div className="topics">
        { cards === null
            ? 'Loading'
            : cards.length > 0
              ? <>
                  { cards.length > 1 && <>
                    <PrevButton onClick={goToPrevCard} />
                    <NextButton onClick={goToNextCard} />
                    </> }
                  { card && <CardDetails
                      key={card._id}
                      card={card}
                      onCardEdit={async (updatedCard: Card) => {
                        if (updatedCard._id !== card._id) {
                          throw new Error('Edit failed.');
                        }
                        return await handleCardEdit(updatedCard);
                      }}
                      onCardDelete={() => handleCardDelete(card)}
                    /> }
                </>
              : 'You have no cards. Add a few!'}
      </div>
      <div className='create'>
        <div>
          <Link to={`/topics/${topicId}/decks`}>
            Back to decks
          </Link>
        </div>
        <NewCardForm onCardAdd={handleCardAdd}/>
      </div>
    </div>
  );
};

export default Cards;
