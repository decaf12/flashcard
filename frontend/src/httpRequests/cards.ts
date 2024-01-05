import { flashcardHttpRequestBase } from '../http-common';
import { type AxiosResponse } from 'axios';
import { type Card } from '../../../backend/models/cardModel';

class CardListHttpRequest {
  getAll(topicId: string, deckId: string): Promise<AxiosResponse<Card[], any>> {
    return flashcardHttpRequestBase().get<Card[]>(`/topics/${topicId}/decks/${deckId}/cards`);
  }

  createCard(topicId: string, deckId: string, data: Card) {
    return flashcardHttpRequestBase().post(`/topics/${topicId}/decks/${deckId}/cards`, data);
  }

  updateCard(topicId: string, deckId: string, data: Card) {
    return flashcardHttpRequestBase().patch(`/topics/${topicId}/decks/${deckId}/cards/${data._id}`, data);
  }

  deleteCard(topicId: string, deckId: string, data: Card) {
    return flashcardHttpRequestBase().delete(`/topics/${topicId}/decks/${deckId}/cards/${data._id}`);
  }
}

const service = new CardListHttpRequest();
export default service;
