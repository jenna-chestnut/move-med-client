import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { selectUser } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';
import './ViewExercise.css';
import Fade from 'react-reveal/Fade';
import ExercisesService from '../../Services/exercise-api-service';
import CommentsService from '../../Services/comments-api-service';
import ClientsService from '../../Services/client-api-service';
import EditExerciseForm from '../../components/EditExerciseForm/EditExerciseForm';
import CommentsSection from '../../components/CommentsSection/CommentsSection';


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
       catch (err) { console.log(err) };
      }
    }
    getData();
  })

  const handleView = () => {
    const videoURL = `https://www.youtube.com/embed/${ex.videourl}`

    return <><Fade>
    <h2>{ex.exercise_name}</h2>
    {ex.frequency 
    ? <p>Frequency: {ex.frequency}x every {ex.duration}</p> : ''}
    {ex.add_note ? <p>Notes: {ex.add_note}</p> : ''}
    <div className='group'>
    <div className='item'>
    <img src={ex.imgurl} alt='exercise example' /></div>

    <div className='item'>
    <iframe className='exc-vid' width="560" title={ex.exercise_name} height="315" src={videoURL} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
    </div></Fade>
    { 
      comments ? <CommentsSection comments={comments}
      exc_id={ex.id} setComments={(d) => setComments(d)}/> 
      : ''
    }
    </>
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
      {editing && <EditExerciseForm e={ex} userType={userType} setExc={setExercise} setEdit={setEditing}/>}
      {ex && editButton()}
      {ex && handleView()}
    </div>
  );
}

export default ViewExercise;