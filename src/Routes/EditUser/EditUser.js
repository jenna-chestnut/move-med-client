import { useEffect, useState } from 'react';
import AdminService from '../../Services/admin-api-service';
import { useParams } from 'react-router-dom';
import './EditUser.css';
import loadingImg from '../../images/Preloader_3.gif';

function EditUser() {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState(null);
  const [fullName, setFullName] = useState(null);

  let { userId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (!user) { 
            setLoading(true);
            const u = await AdminService.getUser(userId)
            await setUserName(u.user_name);
            await setFullName(u.full_name);
            setUser(u);
            setLoading(false);
        }
      } catch (err) { setError(err.message) };
    }
    getUser();
  })

  const handleSubmitData = async (ev, data, key, value) => {
    ev.preventDefault();
    let newData;

    if (!data) { newData = {[key] : value } }
    else {
      const { user_name, full_name } = ev.target;
      newData = { 
        user_name : user_name.value, 
        full_name : full_name.value 
      };
    }

    try {
      await AdminService.updateUserData(newData, userId);
      setUser(null);
    } 
    catch (err) { setError(err.error 
      ? err.message : err.error.message) }

  }

  const renderButton = (key) => {
    if (key === 'admin' ) {
      return <button className={key} onClick={(e) => {
        if (window.confirm('Are you SURE you want to change this users permissions? As an admin, they have access to all clients and providers.')) {
          handleSubmitData(e, null, 'is_admin', !user.is_admin)
          }}}>
        {user.is_admin ? 'Remove as' : 'Make'} {key}
      </button>
    }
    else {
      return <button className={key} onClick={(e) => {
        if (window.confirm('Are you SURE you want to change this users permissions? As a provider they have access to all clients.')) {
          handleSubmitData(e, null, 'is_provider', !user.is_provider)
          }}}>
        {user.is_provider ? 'Remove as' : 'Make'} {key}
      </button>
    }
  }

  const stillLoading = <div className='loading'><p>Loading..</p><img src={loadingImg} alt='loading'/></div>;


  return (
    <div className='EditUser'>
      <h2>Edit User</h2>
      {loading && stillLoading}
      {user && <form onSubmit={(e) => {handleSubmitData(e, true)}}>
      <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div>
          <label htmlFor='username-input'>
            Username
          </label>
          <input
            id='username-input'
            name='user_name'
            type='text'
            value={userName}
            onChange={(e) => {setUserName(e.target.value)}}
            required
          />
        </div>
        <div>
          <label htmlFor='full-name-input'>
            Full Name
          </label>
          <input
            id='full-name-input'
            name='full_name'
            type='text'
            value={fullName}
            onChange={(e) => {setFullName(e.target.value)}}
            required
          />
        </div>
        <button type='submit'>
          Update Info
        </button>
      </form>
      }
      <div className='permissions'>
      <h3> Permissions: </h3>
      {user && renderButton('admin')}{user && renderButton('provider')}
      </div>
    </div>
  );
}

export default EditUser;