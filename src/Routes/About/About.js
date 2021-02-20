import { Link, useHistory } from 'react-router-dom';
import './About.css';
import computerAndPhone from '../../images/computer-and-phone.png';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import demoLogin from '../../Services/demo-login-service';
import { setUser } from '../../features/user/userSlice';
import { clearIdle } from '../../features/idle/idleSlice';
import IdleService from '../../Services/idle-service';
import TokenService from '../../Services/token-service';
import EffectService from '../../Services/app-effect-service';

function About() {
  let history = useHistory();
  const dispatch = useDispatch();
  const [error, setErr] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleDemo = async (ev, key) => {
    ev.preventDefault();
    setErr(null);
    setLoading(true);

    try {
      const loggedIn = await demoLogin(key);
       await setLoading(false);
       await dispatch(setUser(loggedIn));
       await dispatch(clearIdle());
       IdleService.registerIdleTimerResets()
       TokenService.queueCallbackBeforeExpiry(() => {
         EffectService.fetchRefreshToken()
       })
       history.push('/dashboard')
    }
      catch(err) {
        setLoading(false);
        setErr(err.error); 
      }
  }

  return (
    <div className="About">     
    <h2>About</h2>
    <div className='hero'>
    <h3>MoveMed was created with continuous movement in mind.</h3>
    </div>
    <div className='padded'>
    <p>How you move (and how often you move) can make all the difference in your wellness, especially when it's at the direction of a professional.</p>
    <p>As true as this is, it can be hard to remember what exercises you were given, or how often you should do them - and sometimes, when you're at home and something happens during an exercise - you can forget to mention it in your visit!</p>
    </div>

    <div className='group'>
    <div className='item group db-bg'>
    <p>With MoveMed, the communication between provider and client is not broken after leaving the office.</p>
    </div>
    <div className='item'>
    <img src={computerAndPhone} alt='computer and cellphone'/>
    </div>
    </div>
    
    <div className='padded'>
    <p>Providers can create exercises, and assign those exercises with unique details to a client. They can also assign a specific goal to the client - to help them stay motivated and on track. Clients can then view their goal and customized exercises anytime, without having to find a folded up paper or searching through their email.</p> 
    <p>Comments between providers and the client help add feedback in real time and maintain progress!</p>
    </div>

    <div role='alert'>
          {error && <p>{error}</p>}
    </div>

    <div className='fitness-background'>
    {
    loading ? 
    <h3>Loading...</h3>
    :
    <div className='buttons'>
    <button onClick={(e) => handleDemo(e, 'client')}>Client Demo</button>
    <Link className='homepage-link' to='/'>Go to homepage</Link>
    <button onClick={(e) => handleDemo(e, 'provider')}>Provider Demo</button>
    </div>
    }
    </div>
    </div>
  );
}

export default About;