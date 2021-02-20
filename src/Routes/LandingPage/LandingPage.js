import LoginForm from "../../components/LoginForm/LoginForm";
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import { useDispatch } from "react-redux";
import IdleService from "../../Services/idle-service";
import TokenService from "../../Services/token-service";
import { clearIdle } from "../../features/idle/idleSlice";
import EffectService from '../../Services/app-effect-service';

function LandingPage() {
  let dispatch = useDispatch();
  let history = useHistory();

  const handleLoginSuccess = async () => {
    await dispatch (clearIdle());
    await IdleService.registerIdleTimerResets()
    await TokenService.queueCallbackBeforeExpiry(() => {
      EffectService.fetchRefreshToken();
    })
    history.push('/dashboard')
  }

  return (
    <div className="LandingPage group">     

      <div className='item login'>
        <LoginForm onLoginSuccess={handleLoginSuccess}/>
      </div>

      <div className='item landing-page-descs-c'>
      <div className='item group l-p-d lp-clients'>
        <div className='small-item'>
        <h2>CLIENTS</h2>
        </div>
        <div className='item-double group'>
        <p><i>Continue your care seamlessly.</i></p>
        <p>Access your home exercise program anywhere!</p>
        </div>
       </div>

       <div className='item group l-p-d lp-providers'>
       <div className='small-item'>
       <h2>PROVIDERS</h2>
       </div>
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