import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import loadingImg from '../../images/Preloader_3.gif';
import { useHistory } from 'react-router-dom';
import AuthApiService from '../../Services/auth-api-service';
import { selectUsers, setUsers } from '../../features/admin/adminSlice';

function CreateUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const users = useSelector(selectUsers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user_name, setUserName] = useState(null);
  const [full_name, setFullName] = useState(null);
  const [password, setPass] = useState(null);
  const [passwordConfirm, setPassConf] = useState(null);
  const [is_admin, setAdmin] = useState(false);
  const [is_provider, setProvider] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);

    try {
      const newUser = { user_name, full_name, password, passwordConfirm, is_admin, is_provider };
      if (password !== passwordConfirm) setError('Passwords do not match')

      for (const [key, value] of Object.entries(newUser)) {
        if (!value) setError(`${key} must have a value`);
      }

      const res = await AuthApiService.postUser(newUser);
      await dispatch(setUsers([...users, res]));
      await setLoading(false);
      await history.push('/dashboard');
    }
    catch (err) { setLoading(false); setError(err); }
  }

  const stillLoading = <div className='loading'><p>Loading..</p><img src={loadingImg} alt='loading'/></div>;

  return ( loading ? 
    stillLoading : 
    <div className="CreateAccount">
        <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
      <div role='alert'>
          {error && <p>{error}</p>}
        </div>

      <label htmlFor='full_name'>Full name:</label>
      <input type='text' id='full_name' name='full_name' 
      onChange={(e) => setFullName(e.target.value)} required></input>

      <label htmlFor='user_name'>User name:</label>
      <input type='text' id='user_name' name='user_name' 
      onChange={(e) => setUserName(e.target.value)} required></input>

      <label htmlFor='password'>Password:</label>
      <input type='password' id='password' name='password' 
      onChange={(e) => setPass(e.target.value)} required></input>

      <label htmlFor='password-confirm'>Confirm password:</label>
      <input type='password' id='password-confirm' name='password-confirm' 
      onChange={(e) => setPassConf(e.target.value)} required></input>

      <label htmlFor='admin'>Admin:</label>
      <input type='checkbox' id='admin' name='admin'
      onChange={(e) => {
        if (!is_admin) {
        if (window.confirm('Are you sure? As an admin this account will have access to all users.'))
        setAdmin(true)
        } else setAdmin(false);
      }}></input>

      <label htmlFor='provider'>Provider:</label>
      <input type='checkbox' id='provider' name='provider'
      onChange={(e) => {
        if (!is_provider) {
          if (window.confirm('Are you sure? As a provider this account will have access to all clients.'))
          setProvider(true)
          } else setProvider(false);
      }}></input>

      <button type='submit'>Create Account</button>
      </form>
    </div>
  );
}

export default CreateUser;