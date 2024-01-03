import { TopicListContext } from '../context/TopicListContext';
import { useContext } from 'react';

export const useTopicListContext = () => {
    const context = useContext(TopicListContext);

    if (!context) {
        throw Error('useTopicListContext must be used inside a TopicListContextProvider.');
    }

    return context;
};
