import { Link } from 'react-router-dom';
import TokenService from '../../Services/token-service';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectUser } from '../../features/user/userSlice';
import './Header.css';
import IdleService from '../../Services/idle-service';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  const handleLogoutClick = async () => {
    try {
    await TokenService.clearAuthToken();
    await TokenService.clearCallbackBeforeExpiry()
    await IdleService.unRegisterIdleResets()
    dispatch(clearUser());
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

  // const renderLoginLink = () => {
  //   return (
  //     <nav>
  //       <Link to='/login'>Login</Link>
  //       {' '}
  //       <Link to='/register'>Sign up</Link>
  //     </nav>
  //   )
  // }

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

        { TokenService.hasAuthToken()
          ? renderLogoutLink()
          : '' }
      </header>
    );
}

export default Header;