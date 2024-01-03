import { flashcardHttpRequestBase } from '../http-common';
import { type AxiosResponse } from 'axios';
import { type Topic } from '../../../backend/models/topicModel';

class TopicListHttpRequest {
  getAll(): Promise<AxiosResponse<Topic[], any>> {

    return flashcardHttpRequestBase().get<Topic[]>('/topics');
  }

  createTopic(data: Topic) {
    return flashcardHttpRequestBase().post('/topics', data);
  }

  updateTopic(data: Topic) {
    return flashcardHttpRequestBase().patch(`/topics/${data._id}`);
  }

  deleteTopic(data: Topic) {
    return flashcardHttpRequestBase().delete(`/topics/${data._id}`);
  }
}

const service = new TopicListHttpRequest();
export default service;
