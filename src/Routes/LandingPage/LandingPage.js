import LoginForm from "../../components/LoginForm/LoginForm";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIdle } from '../../features/idle/idleSlice';
import './LandingPage.css';
import { selectUser } from "../../features/user/userSlice";

function LandingPage() {
  const user = useSelector(selectUser);
  const idle = useSelector(selectIdle);
  let history = useHistory();

  const handleLoginSuccess = () => {
    history.push('/dashboard')
  }

  const renderLoginForm = () => {
    console.log(idle);
    if (user.user_name && !idle) {
      return <div className='item dash-button'>
              <button onClick={() => history.push('/dashboard')}>
                Dashboard
              </button></div>
    }
    else return <div className='item login'>
      <LoginForm onLoginSuccess={handleLoginSuccess}/>
            </div>
  }

  return (
    <div className="landing-page group">     

        {renderLoginForm()}

      <div className='item'>
      <div className='item'>
        <h2>CLIENTS</h2>
        <p>Continue your care seamlessly.</p>
        <p>Access your home exercise program anywhere!</p>
       </div>
       <div className='item'>
       <h2>PROVIDERS</h2>
        <p>Keep your clients up to date.</p>
        <p>View their feedback as they progress!</p>
       </div>
      </div>
    </div>
  );
}

export default LandingPage;