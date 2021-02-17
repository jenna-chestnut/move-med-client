import { Link } from 'react-router-dom';
import TokenService from '../../Services/token-service';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUser } from '../../features/user/userSlice';
import './Header.css';
import IdleService from '../../Services/idle-service';
import { clearExercises } from '../../features/exercises/exerciseSlice';
import { clearUsers } from '../../features/admin/adminSlice';
import { setError } from '../../features/appError/appErrorSlice';

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
    catch (err) { setError(err) }
  }

  const renderLinks = () => {
    return (
      <div className='logged-in-nav'>
        <span>
          {user.name}
        </span>
        <nav>

          { user.is_admin && 
          <Link
            to='/create-account'>
            Create Account
          </Link> }

          { (user.is_admin || user.is_provider) && 
          <Link
            to='/create-exercise'>
            Create Exercise
          </Link> }

          <Link
            onClick={handleLogoutClick}
            to='/'>
            Logout
          </Link>

        </nav>
      </div>
    )
  }

  const regularNav = 
    <nav className='reg-nav'>
      <Link to='/about'>
        About
      </Link>
    </nav>

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

        { user.user_name ? renderLinks() : regularNav}

      </header>
    );
}

export default Header;