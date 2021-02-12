import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { selectUser } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';
import ExercisesService from '../../Services/exercise-api-service';
import CommentsService from '../../Services/comments-api-service';
import ClientsService from '../../Services/client-api-service';

function ViewExercise() {
  const u = useSelector(selectUser);
  const history = useHistory();
  const [exercise, setExercise] = useState(null);
  const [comments, setComments] = useState(null);

  let { userType, exerciseId } = useParams();
  const id = parseInt(exerciseId);

  console.log(userType)

  useEffect(() => {
    const getData = async () => {
      if (!exercise || exercise.id !== id) {
        console.log(exercise, id)
      try {
        let ex;
        if (userType === 'client'
        && (u.is_admin || u.is_provider)) {
        ex = await ClientsService.getClientExercise(id);
        console.log(ex)
        // ex = ex.exercises;
        }
        else {
        ex = await ExercisesService.getExercise(id);
        }

        console.log(ex)
        const c = await CommentsService.getComments(id);
        await setExercise(ex); await setComments(c);
        }
       catch (err) { console.log(err) };
      }
    }
    getData();
  })

  const listComments = () => {
    return comments.map((el, idx) => {
      return <li>{el.comment_text}</li>
    })
  }

  const handleView = () => {
      if (exercise.frequency) {
      return <>
      <p>{exercise.exercise_name}</p>
      <p>{exercise.frequency}</p>
      <p>{exercise.duration}</p>
      {comments && listComments()}
      </>
      }
      else {
      return <>
        <p>{exercise.exercise_name}</p>
      </>
      }
  }

  const editButton = () => {
    if (u.is_admin || u.is_provider) {
      return <button onClick={() => 
      {history.push(`/edit/exercise/${userType === 'client'
      ? `${id}/client`: id}`)}}>
              Edit Exercise
            </button>
    }
  }

  return (
    <div className='ViewExercise group'>
      {exercise && editButton()}
      {exercise && handleView()}
    </div>
  );
}

export default ViewExercise;