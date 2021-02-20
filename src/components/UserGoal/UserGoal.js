import './UserGoal.css';
import { useState } from 'react';
import ClientsService from '../../Services/client-api-service';
import { setError } from '../../features/appError/appErrorSlice';

function UserGoal(props) {
  const [toEdit, editing] = useState(false);
  const { g, user_id, setGoal } = props;

  const updateGoal = async (ev) => {
    ev.preventDefault();
    const {goal} = ev.target;
    const newGoal = {goal_text : goal.value};

    try {
      const res = await ClientsService.updateClientGoal(newGoal, user_id);
      await setGoal(res.goal_text);
      await editing(false);
    }
    catch (err) { setError(err) }
  }

  const renderGoalView = () => {
    return toEdit 
    ? 
    <form className='goal-form' onSubmit={updateGoal}>
      <label htmlFor='goal-input'>Goal:</label>
      <textarea id='goal-input' name='goal' value={g} 
      onChange={(e) => setGoal(e.target.value)} required></textarea>
      <button type='submit'>Update</button>
    </form>
    :
    <><p className='user-view-goal'>Goal: {g}
    <button onClick={() => editing(true)}>Update Goal</button></p></>
  }

    return renderGoalView();
}

export default UserGoal;