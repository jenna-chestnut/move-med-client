import './ExerciseSelect.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectExercises, setExercises } from '../../features/exercises/exerciseSlice';
import { useEffect, useState } from 'react';
import ExercisesService from '../../Services/exercise-api-service';
import { useHistory } from 'react-router-dom';
import { setError } from '../../features/appError/appErrorSlice';

function ExerciseSelect(props) {
  const exercises = useSelector(selectExercises);
  const dispatch = useDispatch();
  const history = useHistory();
  const { client_id } = props;
  const [exId, setExId] = useState(null);

  useEffect(() => {
    const getClients = async () => {
      try {
        if (!exercises.length) {
        const e = await ExercisesService.getExercises()
        
        await dispatch(setExercises(e));
        }
      } catch (err) { setError(err) };
    }
    getClients();
  })

  const renderOptions = () => {
   const options = exercises ? exercises.map((el, idx) => {
    return <option key={`exO${idx}`} value={el._id}>
      { el.exercise_name }
    </option>
   }) : '';

   return (
    <select name='exercises' id='exercises' onChange={(e) => setExId(e.target.value) }>
      <option key='fake-item' value='not!'>Select Exercise..</option>
      {options}
    </select>
   )
  }

    return exercises &&
    <form onSubmit={(e) => { 
      if (exId && exId !== 'not!') 
        history.push(`/assign-exercise/${exId}/${client_id}`) 
      }}>
      {renderOptions()}
    <button type='submit'>Assign</button>
    </form>
}

export default ExerciseSelect;