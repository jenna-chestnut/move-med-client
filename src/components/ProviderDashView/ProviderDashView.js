import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers, setUsers } from '../../features/admin/adminSlice';
import { selectExercises } from '../../features/exercises/exerciseSlice';
import './ProviderDashView.css';
import loadingImg from '../../images/Preloader_3.gif';
import ClientsService from '../../Services/client-api-service';
import ExerciseItem from '../ExerciseItem/ExerciseItem';
import UserItem from '../UserItem/UserItem';
import { setError } from '../../features/appError/appErrorSlice';


function ProviderDashView() {
  const users = useSelector(selectUsers);
  const exercises = useSelector(selectExercises)
  const dispatch = useDispatch();

  useEffect(() => {
    const getClients = async () => {
      try {
        if (!users.length) {
        const c = await ClientsService.getClients();
        await dispatch(setUsers(c));
        }
      } catch (err) { setError(err) };
    }

    getClients();
  })

  const stillLoading = <div className='loading'><p>Loading..</p><img src={loadingImg} alt='loading'/></div>;

  const renderClients = () => {
    return users
    ?
    users.map((u, idx) => {
      return !u.is_provider && !u.is_Provider 
      ? <UserItem key={`U${idx}`} u={u}/> : '' 
    })
    :
    stillLoading;
  }

  const renderExercises = () => {
    return exercises
    ?
    exercises.map((e, idx) => {
      return <ExerciseItem ex={e} key={idx}/> 
    })
    : stillLoading;
  }

    return (
      <div className="ProviderDashView group">
        <div className='item'>
          <h3 className='exercise-header'>Exercises</h3> 
          {renderExercises()}
          </div>
        <div className='item'>
          <h3 className='clients-header'>Clients</h3>
          {renderClients()}
          </div>
      </div>
    );
}

export default ProviderDashView;