import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { selectUser } from '../../features/user/userSlice';
import { useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
import ExercisesService from '../../Services/exercise-api-service';
import CommentsService from '../../Services/comments-api-service';
import ClientsService from '../../Services/client-api-service';

function ViewExercise() {
  const u = useSelector(selectUser);
  const history = useHistory();
  const [ex, setExercise] = useState(null);
  const [comments, setComments] = useState(null);

  let { userType, exerciseId } = useParams();
  const id = parseInt(exerciseId);

  useEffect(() => {
    const getData = async () => {
      if (!ex || ex.id !== id) {
      try {
        let ex;
        if (userType === 'client'
        && (u.is_admin || u.is_provider)) {
        ex = await ClientsService.getClientExercise(id);
        }
        else {
        ex = await ExercisesService.getExercise(id);
        }
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
    const videoURL = `https://www.youtube.com/embed/${ex.videourl}`

    return <Fade>
    <h2>{ex.exercise_name}</h2>
    {ex.frequency &&
      <p>Frequency: {ex.frequency}x every {ex.duration}</p>}
    <div className='group'>
    <div className='item'>
    <img src={ex.imgurl} alt='exercise example' /></div>

    <div className='item'>
    <iframe className='exc-vid' width="560" title={ex.exercise_name} height="315" src={videoURL} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
    </div>
    {comments && <ul>{listComments()}</ul>}
    </Fade>
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
    <div className='ViewExercise'>
      {ex && editButton()}
      {ex && handleView()}
    </div>
  );
}

export default ViewExercise;