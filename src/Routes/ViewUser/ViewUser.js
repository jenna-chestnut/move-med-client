import { useEffect, useState } from 'react';
import AdminService from '../../Services/admin-api-service';
import { useHistory, useParams } from 'react-router-dom';
import ClientsService from '../../Services/client-api-service';
import ExerciseItem from '../../components/ExerciseItem/ExerciseItem';
import { selectUser } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';
import './ViewUser.css';
import UserGoal from '../../components/UserGoal/UserGoal';
import ExerciseSelect from '../../components/ExerciseSelect/ExerciseSelect';
import { setError } from '../../features/appError/appErrorSlice';

function ViewUser() {
  const u = useSelector(selectUser); // to check permissions of logged in user
  const history = useHistory();
  const [user, setUser] = useState(null); // set get info of user to view
  const [goal, setGoal] = useState(null);

  let { userType, userId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        if (!user) { 
          if (userType === 'users') {
            const u = await AdminService.getUser(userId)
            setUser(u);
          }
        else {
          const u = await ClientsService.getClient(userId);
          console.log(u)
          setUser(u);
          setGoal(u.client.user_goal ? u.client.user_goal : 'Keep moving!');
          }
        }
      } catch (err) { setError(err) };
    }
    getUser();
  })

  const changeGoal = (newGoal) => {
    setGoal(newGoal);
  }

  const listClientExercises = () => {
    return user.clientExercises.map((e, idx) => {
      return <ExerciseItem ex={e} key={idx} list={true} clientEx={true}/>
    })
  }

  const handleView = () => {
      return !user.is_admin && !user.is_provider
      ?
      <>

      <div className={`item ${u.is_admin && 'admin-view-mb'}`}>
      <h2>{user.client.full_name}</h2>
      <UserGoal g={goal} setGoal={changeGoal} user_id={userId}/>
      </div>

      <div className={`item u-v-c ${u.is_admin && 'admin-view-client'}`}>
      <div className='assign-exercise'>
      <h3>Assign Exercise</h3>
      <ExerciseSelect client_id={user.client._id}/>
      </div>
      
      <h3 className='exercises-header'>Client Exercises</h3>
        {listClientExercises()}
      </div>
      </>
      :
      <div className={`item ${u.is_admin && 'admin-view-mb'}`}>
        <h2>{user.full_name}</h2>
        <p>Provider: {user.is_provider ? 'True' : 'False'}</p>
        <p>Admin: {user.is_admin ? 'True' : 'False'}</p>
      </div>
  }

  const editButton = () => {
    if (u.is_admin) {
      return <button className='edit-button' onClick={() => 
      {history.push(`/edit-user/${userId}`)}}>
              Edit User Info
            </button>
    }
  }

  const viewUserClass = `ViewUser ${userType} group`;

  return (
    <div className={viewUserClass}>
      {user && editButton()}
      {user && handleView()}
    </div>
  );
}

export default ViewUser;