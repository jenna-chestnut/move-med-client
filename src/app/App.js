import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import LandingPage from '../Routes/LandingPage/LandingPage';
import Dashboard from '../Routes/Dashboard/Dashboard';
import TokenService from '../Services/token-service';
import IdleService from '../Services/idle-service';
import EffectService from '../Services/app-effect-service';

function App() {

  useEffect(() => {
    EffectService.appEffect()
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
        <Route path='/dashboard' component={Dashboard}/>
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
