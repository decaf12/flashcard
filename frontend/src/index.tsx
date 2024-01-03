import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { TopicListContextProvider } from './context/TopicListContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TopicListContextProvider>
        <App />
      </TopicListContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);