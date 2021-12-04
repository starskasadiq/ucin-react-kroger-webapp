import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext)
  const isLoggedIn = authCtx.isLoggedIn
  const history = useHistory()

  const logoutHandler = () => {
    authCtx.logout()
    history.replace('/')
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Thunder Buddies</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>
          }
          {isLoggedIn &&
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          }
          {isLoggedIn &&
          <li>
            <Link to='/data'>Search Data</Link>
          </li>
          }
          {isLoggedIn &&
          <li>
            <Link to='/load'>Load Data</Link>
          </li>
          }
          {isLoggedIn &&
          <li>
            <Link to='/analyze'>Analyze Data</Link>
          </li>
          }
          {isLoggedIn && 
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
