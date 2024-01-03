import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Topics from './pages/Topics';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function App() {
  const { loggedInAs } = useAuthContext();
  console.log('User: ', loggedInAs);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path='/'
              element={loggedInAs ? <Topics /> : <Navigate to='login' />}
            />
            <Route
              path='/login'
              element={!loggedInAs ? <Login /> : <Navigate to='/' />}
            />
            <Route
              path='/signup'
              element={!loggedInAs ? <Signup /> : <Navigate to='/' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
