import { Link } from 'react-router-dom';
import TokenService from '../../Services/token-service';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUser } from '../../features/user/userSlice';
import './Header.css';
import IdleService from '../../Services/idle-service';
import { clearExercises } from '../../features/exercises/exerciseSlice';
import { clearUsers } from '../../features/admin/adminSlice';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  const handleLogoutClick = async () => {
    try {
    await TokenService.clearAuthToken();
    await TokenService.clearCallbackBeforeExpiry()
    await IdleService.unRegisterIdleResets()
    dispatch(clearUser());
    dispatch(clearExercises());
    dispatch(clearUsers());
    }
    catch (err) { console.log(err) }
  }

  const renderLogoutLink = () => {
    return (
      <div className='logged-in-nav'>
        <span>
          {user.full_name}
        </span>
        <nav>
          <Link
            onClick={handleLogoutClick}
            to='/'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

    return (
      <header className="h-group">
        <div className='item'>
        <h1 className='item'>
          <Link to='/'>
            MoveMed
          </Link>
          </h1>
          <p>Your movement medicine.</p>
        </div>

        { user.user_name && renderLogoutLink() }
      </header>
    );
}

export default Header;