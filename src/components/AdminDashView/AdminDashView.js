import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers, setUsers } from '../../features/admin/adminSlice';
import { selectExercises } from '../../features/exercises/exerciseSlice';
import './AdminDashView.css';
import loadingImg from '../../images/Preloader_3.gif';
import AdminService from '../../Services/admin-api-service';
import ExerciseItem from '../ExerciseItem/ExerciseItem';
import UserItem from '../UserItem/UserItem';
import { setError } from '../../features/appError/appErrorSlice';


function AdminDashView() {
  const users = useSelector(selectUsers);
  const exercises = useSelector(selectExercises)
  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      try {
        if (!users.length) {
        const u = await AdminService.getUsers();
        await dispatch(setUsers(u));
        }
      } catch (err) { setError(err) };
    }

    getUsers();
  })

  const stillLoading = <div className='loading'><p>Loading..</p><img src={loadingImg} alt='loading'/></div>;

  const renderProviders = () => {
    return users
    ?
    users.map((u, idx) => {
      return u.is_provider 
      ? <UserItem key={`U${idx}`} u={u}/> : '';
    })
    : 
    stillLoading;
  }

  const renderClients = () => {
    return users
    ? 
    users.map((u, idx) => {
     return !u.is_provider && !u.is_admin
     ? <UserItem key={`U${idx}`} u={u}/> : '';
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
    : 
    stillLoading;
  }

    return (
      <div className="AdminDashView">
        <span className='admin-note'>(Admin)</span>
        <div className='group'>
        <div className='item dash-item'>
        <h3 className='providers-header'>Providers</h3> 
        {renderProviders()}
        </div>

        <div className='item dash-item'>
        <h3 className='clients-header'>Clients</h3> 
        {renderClients()}
        </div>
        </div>

        <div className='admin-exercises'>
        <h3 className='exercises-header'>Exercises</h3> 
        {renderExercises()}
        </div>
      </div>
    );
}

export default AdminDashView;