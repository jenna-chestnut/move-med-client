import { useState } from 'react';
import { useDispatch } from 'react-redux';
import loadingImg from '../../images/Preloader_3.gif';
import ExercisesService from '../../Services/exercise-api-service';
import { clearExercises } from '../../features/exercises/exerciseSlice';
import { useHistory } from 'react-router-dom';
import './CreateExercise.css';

function CreateExercise() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exercise_name, setExName] = useState(null);
  const [imgurl, setImgURL] = useState(null);
  const [videourl, setVidURL] = useState(null);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);

    try {
      const newEx = { exercise_name, imgurl, videourl }

      for (const [key, value] of Object.entries(newEx)) {
        if (!value) setError(`${key} must have a value`);
      }
      
      await ExercisesService.createExercise(newEx);
      await setLoading(false);
      await dispatch(clearExercises());
      await history.push('/dashboard');
    }
    catch (err) { setLoading(false); setError(err.message); }
  }

  const stillLoading = <div className='loading'><p>Loading..</p><img src={loadingImg} alt='loading'/></div>;

  return ( loading ? 
    stillLoading : 
    <div className="CreateExercise">
        <h2>Create Exercise</h2>
      <form onSubmit={handleSubmit}>
      <div role='alert'>
          {error && <p>{error}</p>}
        </div>

      <div><label htmlFor='exercise_name'>Exercise name:</label>
      <input type='text' id='exercise_name' name='exercise_name' defaultValue={exercise_name} 
      onChange={(e) => setExName(e.target.value)} required></input></div>

      <div><label htmlFor='imgurl'>Image URL:</label>
      <input type='text' id='imgurl' name='imgurl' defaultValue={imgurl} 
      onChange={(e) => setImgURL(e.target.value)} required></input></div>

      <div><label htmlFor='videourl'>Youtube Video ID:</label>
      <input type='text' id='videourl' name='videourl' defaultValue={videourl} 
      onChange={(e) => setVidURL(e.target.value)} required></input></div>

      <button type='submit'>Create Exercise</button>
      </form>
    </div>
  );
}

export default CreateExercise;