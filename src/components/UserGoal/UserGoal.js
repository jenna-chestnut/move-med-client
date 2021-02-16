import './UserGoal.css';
import { useState } from 'react';
import ClientsService from '../../Services/client-api-service';

function UserGoal(props) {
  const [toEdit, editing] = useState(false);
  const { g, user_id, setGoal } = props;

  const updateGoal = async (ev) => {
    ev.preventDefault();
    const {goal} = ev.target;
    const newGoal = {goal_text : goal.value};

    try {
      const res = await ClientsService.updateClientGoal(newGoal, user_id);
      console.log(res);
      await setGoal(res.goal_text);
      await editing(false);
    }
    catch (err) { console.log(err) }
  }

  const renderGoalView = () => {
    return toEdit 
    ? 
    <form onSubmit={updateGoal}>
      <label htmlFor='goal-input'>Goal:</label>
      <input type='text' id='goal-input' name='goal' value={g} 
      onChange={(e) => setGoal(e.target.value)} required></input>
      <button type='submit'>Update</button>
    </form>
    :
    <><p>Goal: {g}</p>
    <button onClick={() => editing(true)}>Update Goal</button></>
  }

    return renderGoalView();
}

export default UserGoal;