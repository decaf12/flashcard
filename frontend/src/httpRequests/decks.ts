import { flashcardHttpRequestBase } from '../http-common';
import { type AxiosResponse } from 'axios';
import { type Deck } from '../../../backend/models/deckModel';

class DeckListHttpRequest {
  getAll(topicId: string): Promise<AxiosResponse<Deck[], any>> {
    return flashcardHttpRequestBase().get<Deck[]>(`/topics/${topicId}/decks`);
  }

  createDeck(topicId: string, data: Deck) {
    return flashcardHttpRequestBase().post(`/topics/${topicId}/decks`, data);
  }

  updateDeck(topicId: string, data: Deck) {
    return flashcardHttpRequestBase().patch(`/topics/${topicId}/decks/${data._id}`, data);
  }

  deleteDeck(topicId: string, data: Deck) {
    return flashcardHttpRequestBase().delete(`/topics/${topicId}/decks/${data._id}`);
  }
}

const service = new DeckListHttpRequest();
export default service;
