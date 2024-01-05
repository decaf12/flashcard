import React, { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { logout } = useLogout();
  const { loggedInAs } = useAuthContext();

  return (
    <header>
      <div className="container">
        <Link to='/'>
          <h1>Flashcards</h1>
        </Link>
        <nav>
          { loggedInAs && (
            <div>
              <span>{loggedInAs}</span>
              <button onClick={logout}>Log out</button>
            </div>)}

          { !loggedInAs && (
            <div>
              <Link to='/login'>Log in</Link>
              <Link to='/signup'>Sign up</Link>
            </div>)}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
