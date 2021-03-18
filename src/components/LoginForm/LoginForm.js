import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import AuthApiService from '../../Services/auth-api-service'
import { setUser } from '../../features/user/userSlice';
import TokenService from '../../Services/token-service';
import loadingImg from '../../images/Preloader_3.gif';
import './LoginForm.css';
import demoLogin from '../../Services/demo-login-service';


function LoginForm(props) {
  const dispatch = useDispatch();
  const [error, setErr] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async ev => {
    ev.preventDefault();
    const { username, password } = ev.target;

    setErr(null);
    setLoading(true);

    try {

      const res = await AuthApiService.postLogin({
        user_name: username.value,
        password: password.value,
      });

       username.value = '';
       password.value = '';

       TokenService.saveAuthToken(res.authToken);
       const loggedIn = TokenService.parseAuthToken();

       await setLoading(false);
       await dispatch(setUser(loggedIn));
       props.onLoginSuccess();
    }
      catch(err) {
        setLoading(false);
        setErr(err.message); 
      }
  }


  const handleDemo = async (ev, key) => {
    ev.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const loggedIn = await demoLogin(key);
       await setLoading(false);
       await dispatch(setUser(loggedIn));
       props.onLoginSuccess();
    }
      catch(err) {
        setLoading(false);
        setErr(err.error); 
      }
  }


    return (
      loading 
      ?
      <div className='loading'><h3>L o a d i n g . . .</h3><img src={loadingImg} alt='loading'/></div>
      :
      <>
      <form
        className='LoginForm'
        onSubmit={handleSubmit}
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <label htmlFor='login-username-input'>
            Username
          </label>
          <input
            id='login-username-input'
            name='username'
            type='text'
            required
          />
        </div>
        <div>
          <label htmlFor='login-password-input'>
            Password
          </label>
          <input
            id='login-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <button type='submit'>
          Log In
        </button>
        <br/>
        <button className='demo' onClick={(e) => handleDemo(e, 'client')}>Client Demo</button>
        <button className='demo' onClick={(e) => handleDemo(e, 'provider')}>Provider Demo</button>
      </form>
      </>
    )
}

export default LoginForm
