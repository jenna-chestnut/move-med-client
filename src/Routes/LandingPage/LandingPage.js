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

  return (
    <div className="LandingPage group">     

      <div className='item login'>
        <LoginForm onLoginSuccess={handleLoginSuccess}/>
      </div>

      <div className='item landing-page-descs-c'>
      <div className='item group l-p-d lp-clients'>
        <h2 className='small-item'>CLIENTS</h2>
        <div className='item-double group'>
        <p><i>Continue your care seamlessly.</i></p>
        <p>Access your home exercise program anywhere!</p>
        </div>
       </div>

       <div className='item group l-p-d lp-providers'>
       <h2 className='small-item'>PROVIDERS</h2>
       <div className='item-double group'>
        <p><i>Keep your clients up to date.</i></p>
        <p>View their feedback as they progress!</p>
        </div>
       </div>
      </div>
    </div>
  );
}

export default LandingPage;