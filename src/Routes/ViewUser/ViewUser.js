import { useEffect, useState } from 'react';
import AdminService from '../../Services/admin-api-service';
import { useHistory, useParams } from 'react-router-dom';
import ClientsService from '../../Services/client-api-service';
import ExerciseItem from '../../components/ExerciseItem/ExerciseItem';
import { selectUser } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';

function ViewUser() {
  const u = useSelector(selectUser); // to check permissions of logged in user
  const history = useHistory();
  const [user, setUser] = useState(null); // set get info of user to view

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
          setUser(u);
          }
        }
      } catch (err) { console.log(err) };
    }
    getUser();
  })

  const listClientExercises = () => {
    return user ?
    user.clientExercises.map((e, idx) => {
      return <ExerciseItem ex={e} key={idx} client={true}/>
    }) : '';
  }

  const handleView = () => {
      if (user) {
      return !user.is_admin && !user.is_provider
      ?
      <>
      <p>{user.client.full_name}</p>
      <p>{user.clientGoal.goal_text}</p>
      {listClientExercises()}
      </>
      :
      <p>
        <p>{user.full_name}</p>
        <p>Provider: {user.is_provider ? 'True' : 'False'}</p>
        <p>Admin: {user.is_admin ? 'True' : 'False'}</p>
      </p>
      }
  }

  const editButton = () => {
    if (u.is_admin) {
      return <button onClick={() => 
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