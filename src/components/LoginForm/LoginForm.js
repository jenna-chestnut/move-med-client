import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import AuthApiService from '../../Services/auth-api-service'
import { setUser } from '../../features/user/userSlice';
import TokenService from '../../Services/token-service';
import loadingImg from '../../images/Preloader_3.gif';
import IdleService from '../../Services/idle-service';
import EffectService from '../../Services/app-effect-service';

function LoginForm(props) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const handleSubmit = async ev => {
    ev.preventDefault();
    const { username, password } = ev.target;

    setError(null);
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

       await dispatch(setUser(loggedIn));
       setLoading(false);
       IdleService.registerIdleTimerResets()
       TokenService.queueCallbackBeforeExpiry(() => {
         EffectService.fetchRefreshToken()
       })
       props.onLoginSuccess();
    }
      catch(err) {
        setError(err.message); 
      }
  }
    return (
      loading 
      ?
      <div className='loading'><p>Loading..</p><img src={loadingImg} alt='loading'/></div>
      :
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
          Login
        </button>
      </form>
    )
}

export default LoginForm
