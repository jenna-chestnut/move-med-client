import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom'
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
import EditUser from '../Routes/EditUser/EditUser';
import AssignExercise from '../Routes/AssignExercise/AssignExercise';
import NotFound from '../Routes/NotFound/NotFound';
import { setIdle } from '../features/idle/idleSlice';
import { setError, selectError } from '../features/appError/appErrorSlice';
import CreateExercise from '../Routes/CreateExercise/CreateExercise';
import CreateUser from '../Routes/CreateUser/CreateUser';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectError);
  const history = useHistory();

  const setI = async () => {
    await dispatch(setIdle());
    await history.push('/');
  }

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
      await appEffect(setI);
        }
      }
    } catch(err) { dispatch(setError(err.message)) };
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

      { error && <div className='appError'><p>{ error }</p></div> }

      <main>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <PrivateRoute path='/view/exercise/:userType/:exerciseId' component={ViewExercise}/>
        <PrivateRoute path='/view/:userType/:userId' 
        restricted={true} component={ViewUser}/>
        <PrivateRoute path='/edit-user/:userId' 
        admin={true} component={EditUser}/>
        <PrivateRoute path='/assign-exercise/:exerciseId/:clientId' 
        restricted={true} component={AssignExercise}/>
        <PrivateRoute path='/create-exercise' 
        restricted={true} component={CreateExercise}/>
        <PrivateRoute path='/create-account' 
        admin={true} component={CreateUser}/>

        <Route component={NotFound}/>
      {
        // 'about' page (w/ contact me form) - public
        // create account
      }
      </Switch>
      </main>

      <Footer/>
    </div>
  );
}

export default App;
