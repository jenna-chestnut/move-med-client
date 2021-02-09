import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';

function Dashboard() {
  const user = useSelector(selectUser);

  return (
    <div className="dashboard group">
      <div className='item'>
        Hello, {user.name.split(' ')[0]}!
      </div>
      <div className='item'>
       
      </div>
    </div>
  );
}

export default Dashboard;