import './EditExerciseForm.css';
import { useState, useEffect } from 'react';
import ExercisesService from '../../Services/exercise-api-service';
import ClientsService from '../../Services/client-api-service';
import loadingImg from '../../images/Preloader_3.gif';

function EditExerciseForm(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [exercise_name, setExName] = useState(null);
  const [videourl, setVidURL] = useState(null);
  const [imgurl, setImgURL] = useState(null);
  const [frequency, setFreq] = useState(null);
  const [duration, setDuration] = useState(null);
  const [add_note, setNote] = useState(null); 
  const { e = {}, userType, setExc, setEdit } = props;

  useEffect(() => {
    if (!imgurl && !add_note) {
    setExName(e.exercise_name);
    setVidURL(e.videourl);
    setImgURL(e.imgurl);
    setFreq(e.frequency);
    setDuration(e.duration);
    setNote(e.add_note);
    }
  }, [imgurl, add_note, e])

  const updateExercise = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    const newExInfo = { exercise_name, videourl, imgurl, frequency, duration, add_note };
    let toSend = {};

    for (const [key, value] of Object.entries(newExInfo)) { if (value) toSend[key] = value; }

    try {
      if (userType === 'admin') {
        await ExercisesService.updateExercise(toSend, e._id);
      }  
      else {
        await ClientsService.updateClientExercise(toSend, e._id);
      }
      await setExc(null); await setEdit(false);
      await setLoading(false);
    }
    catch (err) {  setLoading(false); setError(err.message) }
  }

  const stillLoading = <div className='loading'><p>Loading..</p><img src={loadingImg} alt='loading'/></div>;

  const renderEditForm = () => {
    const inputFields = userType === 'admin' 
    ? 
      <>
      <div><label htmlFor='exercise_name'>Exercise name:</label>
      <input type='text' id='exercise_name' name='exercise_name' defaultValue={exercise_name} 
      onChange={(e) => setExName(e.target.value)} required></input></div>

      <div><label htmlFor='imgurl'>Image URL:</label>
      <input type='text' id='imgurl' name='imgurl' defaultValue={imgurl} 
      onChange={(e) => setImgURL(e.target.value)} required></input></div>

      <div><label htmlFor='videourl'>Youtube Video ID:</label>
      <input type='text' id='videourl' name='videourl' defaultValue={videourl} 
      onChange={(e) => setVidURL(e.target.value)} required></input></div>
     </>
    :
      <>
      <div><label htmlFor='frequency'>Assign exercise for:</label>
      <input type='text' id='frequency' name='frequency' defaultValue={frequency} 
      onChange={(e) => setFreq(e.target.value)} required></input></div>

      <div><label htmlFor='duration'>times every:</label>
      <input type='text' id='duration' name='duration' defaultValue={duration} 
      onChange={(e) => setDuration(e.target.value)} required></input></div>

      <div className='add-ex-note'><label htmlFor='add_note'>Add note:</label>
      <textarea id='add_note' name='add_note' defaultValue={add_note} 
      onChange={(e) => setNote(e.target.value)} required></textarea></div></>;

    return imgurl || add_note ?
    <div className='EditExerciseForm'>
    <form onSubmit={updateExercise}>
    <div role='alert'>
          {error && <p>{error}</p>}
        </div>
      {inputFields}
      <button type='submit'>Update</button>
    </form></div> : '';
  }
  return loading ? 
  stillLoading : renderEditForm();
}

export default EditExerciseForm;