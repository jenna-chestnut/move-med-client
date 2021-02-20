import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectUser } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';
import './ViewExercise.css';
import ExercisesService from '../../Services/exercise-api-service';
import CommentsService from '../../Services/comments-api-service';
import ClientsService from '../../Services/client-api-service';
import EditExerciseForm from '../../components/EditExerciseForm/EditExerciseForm';
import CommentsSection from '../../components/CommentsSection/CommentsSection';
import { setError } from '../../features/appError/appErrorSlice';
import ExerciseVidAndImg from '../../components/ExerciseVidAndImg/ExerciseVidAndImg';
import Fade from 'react-reveal/Fade';


function ViewExercise() {
  const u = useSelector(selectUser);
  const [editing, setEditing] = useState(false);
  const [ex, setExercise] = useState(null);
  const [comments, setComments] = useState(null);

  let { userType, exerciseId } = useParams();
  const id = parseInt(exerciseId);

  useEffect(() => {
    const getData = async () => {
      if (!ex || (ex.exercise_id && !comments)) {
      try {
        let ex;
        if (userType === 'client' && (u.is_admin || u.is_provider)) {
        ex = await ClientsService.getClientExercise(id);
        }
        else {
          ex = await ExercisesService.getExercise(id);
        }
        if (ex.exercise_id) {
          const c = await CommentsService.getComments(ex.id);
          await setComments(c);
        }
        await setExercise(ex);
        }
       catch (err) { setError(err.message) };
      }
    }
    getData();
  })

  const handleView = () => {
    return <Fade>
    <ExerciseVidAndImg clientEx={ex.frequency ? true : false}
    ex={ex}/>
    { 
      comments ? <CommentsSection comments={comments}
      exc_id={ex.id} setComments={(d) => setComments(d)}/> 
      : ''
    }
    </Fade>
  }

  const editButton = () => {
    if ((u.is_admin || u.is_provider) && !editing) {
      return <button className='edit-button' onClick={() => 
        {setEditing(true)}}>
              Edit Exercise
            </button>
    }
  }

  return (
    <div className='ViewExercise'>
       <h2>{ex ? ex.exercise_name : ''}</h2>
      {editing && <EditExerciseForm e={ex} userType={userType} setExc={setExercise} setEdit={setEditing}/>}
      {ex && editButton()}
      {ex && handleView()}
    </div>
  );
}

export default ViewExercise;