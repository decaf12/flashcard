import React, { PropsWithChildren, Reducer, createContext, useReducer } from 'react';
import { Topic } from '../../../backend/models/topicModel';

export const enum TopicListActionType {
  SET_TOPICS,
  CREATE_TOPIC,
  DELETE_TOPIC,
};

interface Action {
  type: TopicListActionType,
  payload: Topic[],
};

export const TopicListContext = createContext({
  topics: [] as Topic[],
  dispatch: ((_: Action) => {}) as React.Dispatch<Action>,
});

export const topicListReducer = ((topics: Topic[], action: Action): Topic[] => {
  switch (action.type) {
    case TopicListActionType.SET_TOPICS: {
      return action.payload as Topic[];
    }

    case TopicListActionType.CREATE_TOPIC: {
      return [action.payload[0], ...topics];
    }
    
    case TopicListActionType.DELETE_TOPIC: {
      return topics.filter((topic) => topic._id !== action.payload[0]._id);
    }

    default: {
      return topics;
    }
  }
}) as Reducer<Topic[], Action>;

export const TopicListContextProvider = ({ children }: PropsWithChildren) => {
  const [topics, dispatch] = useReducer<Reducer<Topic[], Action>>(topicListReducer, [] as Topic[]);

  return (
    <TopicListContext.Provider value={{ topics, dispatch }}>
      { children }
    </TopicListContext.Provider>
  );
};
