import { useState, useRef, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory()
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const usernameInputRef = useRef()

const authCtx = useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value 
    const enteredPassword = passwordInputRef.current.value

    setIsLoading(true)
    let url;
    if(isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYzzubL39NJVVS6ishlutAQU5MpElrED0'
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYzzubL39NJVVS6ishlutAQU5MpElrED0'      
    }

    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        setIsLoading(false)
        if(response.ok) {
          return response.json()
        } else {
          return response.json().then(data => {
            let errorMessage = 'AuthenticationFailed'
            if(data && data.error && data.error.message){
              errorMessage = data.error.message
            }
            throw new Error(errorMessage)
          })
        }
      }).then(data => {
        // console.log(data)
        authCtx.login(data.idToken)
        history.replace('/')
      }).catch(error => {
        alert(error.message)
      })

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        {!isLogin && <div className={classes.control}>
          <label htmlFor='username'>Your Username</label>
          <input type='text' id='username' required ref={usernameInputRef} />
        </div>
        }
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
