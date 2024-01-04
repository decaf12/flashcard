import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Topics from './pages/Topics';
import Decks from './pages/Decks';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const { loggedInAs } = useAuthContext();
  console.log(`Logged in as ${loggedInAs}.`);

  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className="pages">
          <Routes>
            <Route
              path='/'
              element={loggedInAs ? <Topics /> : <Navigate to='/login' />}
            />
            <Route
              path='/login'
              element={!loggedInAs ? <Login /> : <Navigate to='/' />}
            />
            <Route
              path='/signup'
              element={!loggedInAs ? <Signup /> : <Navigate to='/' />}
            />
            <Route
              path='/topics/:topicId/decks'
              element={loggedInAs ? <Decks /> : <Navigate to='/login' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
