import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { setUser, selectUser, clearUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import LandingPage from '../Routes/LandingPage/LandingPage';
import Dashboard from '../Routes/Dashboard/Dashboard';
import TokenService from '../Services/token-service';
import IdleService from '../Services/idle-service';
import appEffect from '../Services/app-effect-service';
import PrivateRoute from '../Routes/PrivateRoute/PrivateRoute';
import ViewUser from '../Routes/ViewUser/ViewUser';
import ViewExercise from '../Routes/ViewExercise/ViewExercise';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const checkUser = async () => {
    try {
      if (TokenService.hasAuthToken()) {
      const loggedIn = await TokenService.parseAuthToken(); 
      if (!loggedIn) return;
      else if (loggedIn.exp < 
        Math.floor(new Date().getTime() / 1000)) {
        TokenService.clearAuthToken();
        dispatch(clearUser());
      }
      else if (loggedIn === user) return;
      else {
      dispatch(setUser(loggedIn));
      await appEffect();
        }
      }
    } catch(err) { console.log(err) };
  }

  useEffect(() => {
    const f = async () => { await checkUser(); }
    f();
    return () => {
      IdleService.unRegisterIdleResets()
      TokenService.clearCallbackBeforeExpiry()
    }
  })

  return (
    <div className="App">
      <Header/>

      <main>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <PrivateRoute path='/view/exercise/:userType/:exerciseId' component={ViewExercise}/>
        <PrivateRoute path='/view/:userType/:userId' 
        restricted={true} component={ViewUser}/>
      

      {
        // landing page - public 
        // (conditionally render login form on landing page! vs button to dashboard (if logged in))
        // 'about' page (w/ contact me form) - public
        // dashboard
        // view single exercise
        // view client
        // create account
        // create exercise
        // assign exercise
      }
      </Switch>
      </main>

      <Footer/>
    </div>
  );
}

export default App;
