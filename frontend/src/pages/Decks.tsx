import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { type Deck } from '../../../backend/models/deckModel';
import DeckListHttpRequest from '../httpRequests/decks';
import DeckDetails from '../components/DeckDetails';
import NewDeckForm from '../components/NewDeckForm';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Decks = () => {
  const { loggedInAs } = useAuthContext();
  const [decks, setDecks] = useState(null as Deck[] | null);
  const { topicId } = useParams();

  const updateDecks = useCallback(async () => {
    if (!topicId) {
      return;
    }

    try {
      const response = await DeckListHttpRequest.getAll(topicId);
      setDecks(response.data);
    } catch (e) {
      e instanceof Error && console.log(e);
    };
  }, [topicId]);

  const handleDeckAdd = async (deck: Deck) => {
    if (!topicId) {
      return;
    }

    try {
      const response = await DeckListHttpRequest.createDeck(topicId, deck);
      if (response.status === 200) {
        await updateDecks();
      } else {
        return { error: 'Add failed. '};
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data) {
        return err.response.data;
      }
    }
  };
  
  const handleDeckDelete = async (deck: Deck) => {
    if (!topicId) {
      return;
    }

    try {
      const response = await DeckListHttpRequest.deleteDeck(topicId, deck);
      if (response.status === 200) {
        await updateDecks();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log('Deletion failed');
    }
  }

  const handleDeckEdit = async (updatedDeck: Deck) => {
    if (!topicId) {
      return;
    }

    try {
      const response = await DeckListHttpRequest.updateDeck(topicId, updatedDeck);
      if (response.status === 200) {
        await updateDecks();
      } else {
        throw new Error();
      }
    } catch (err) {
      console.log('Edit failed');
    }
  };

  useEffect(() => {
    if (loggedInAs) {
      updateDecks();
    } else {
      setDecks([] as Deck[]);
    }
  }, [loggedInAs, updateDecks]);

  return (
    <div className="home">
      <div>
        <Link to='/'>
          Back to topics
        </Link>
      </div>
      <div className="topics">
        { decks === null
          ? 'Loading'
          : decks.length > 0
            ? decks.map((deck) => 
                <DeckDetails
                  key={deck._id}
                  deck={deck}
                  onDeckEdit={(updatedDeck: Deck) => {
                    if (updatedDeck._id !== deck._id) {
                      throw new Error('Edit failed.');
                    }
                    handleDeckEdit(updatedDeck);
                  }}
                  onDeckDelete={() => handleDeckDelete(deck)}
                />)
            : 'You have no decks. Add a few!'}
      </div>
      <NewDeckForm onDeckAdd={handleDeckAdd}/>
    </div>
  );
};

export default Decks;
