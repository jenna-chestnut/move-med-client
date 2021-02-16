import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminDashView from '../../components/AdminDashView/AdminDashView';
import { selectUser } from '../../features/user/userSlice';
import { setExercises, selectExercises } from '../../features/exercises/exerciseSlice';
import ExercisesService from '../../Services/exercise-api-service';
import ProviderDashView from '../../components/ProviderDashView/ProviderDashView';
import ClientDashView from '../../components/ClientDashView/ClientDashView';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import { setError } from '../../features/appError/appErrorSlice';

function Dashboard() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const exercises = useSelector(selectExercises)

  useEffect(() => {
    const getExercises = async () => {
      try {
        if (!exercises.length && !exercises.goal) {
        const ex = await ExercisesService.getExercises();
        await dispatch(setExercises(ex));
        }
      } catch (err) { setError(err) };
    }
    getExercises();
  })

  const userDash = () => {
    if (user.is_admin) 
      return <AdminDashView/>

    else if (user.is_provider) 
      return <ProviderDashView/>

    else return <ClientDashView/>
  }

  const createExerciseButton = (
  <Link to='/create-exercise' className='create-ex'>Create Exercise</Link>
  )

  return (
    <div className="dashboard">
      <div className='dash-name'>
        <h2>Hello, {user.name.split(' ')[0]}!</h2>
      </div>
       {(user.is_admin || user.is_provider) && createExerciseButton}
       { userDash() }
    </div>
  );
}

export default Dashboard;