import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './AssignExercise.css';
import ExercisesService from '../../Services/exercise-api-service';
import ClientsService from '../../Services/client-api-service';
import { selectUser } from '../../features/user/userSlice';
import ClientSelect from '../../components/ClientSelect/ClientSelect';
import { clearUsers } from '../../features/admin/adminSlice';
import ExerciseVidAndImg from '../../components/ExerciseVidAndImg/ExerciseVidAndImg';

function AssignExercise() {
  const u = useSelector(selectUser);
  const history = useHistory();
  let { clientId, exerciseId } = useParams();
  const exc_id = parseInt(exerciseId);
  const [error, setError] = useState(null);
  const [ex, setEx] = useState(null);
  const [client, setClient] = useState(null);
  const [settingClient, setSetting] = useState(false);
  const [frequency, setFreq] = useState(null);
  const [duration, setDuration] = useState(null);
  const [add_note, setNote] = useState(null); 

  useEffect(() => {
    const getData = async () => {
      try {
        if (!ex || (settingClient && !client.id)) {
        const exercise = await ExercisesService.getExercise(exc_id);

        if (clientId !== 'unset' || settingClient) {
          const id = clientId !== 'unset' 
          ? clientId : client;

          const c = await ClientsService.getClient(parseInt(id))

          await setClient(c.client);
          await setSetting(false);
        }
        await setEx(exercise);
        }
      }
       catch (err) { setError(err) };
      }
    getData();
  })

  const updateClientData = (id) => {
    setClient(id);
    setSetting(true);
  }

  const handleSubmit = async(ev) => {
    ev.preventDefault();
    let newExInfo = { 
      frequency, 
      duration,
      user_id: client ? client.id : null,
      exercise_id: exc_id,
      provider_id: u.id  
    };
    for (const [key, value] of Object.entries(newExInfo)) { if (!value) setError(`${key} must have a value to submit new exercise`); }

    if ( add_note ) {newExInfo['add_note'] = add_note}
    
    try {
      await ClientsService.createClientExercise(newExInfo, newExInfo.user_id);
      await clearUsers();
      await history.push(`/view/clients/${newExInfo.user_id}`)
    }
    catch (err) { setError(err.message) };
  }

  return (
    <div className='AssignExercise'>
      <h2>Assign Exercise</h2>
      {ex && 
      <h3>{ex.exercise_name}</h3>}

      <span> Assigning to: </span>
      { client ? <><b>{client.full_name}</b>
        {clientId === 'unset'
        ?
        <button className='change-client-button' onClick={() => setClient(null)}>
          Change Client
        </button> : ''}</>
      :
      <ClientSelect admin={u.is_admin} setClient={updateClientData}/>
      }
      
      {ex && 
      <><form onSubmit={handleSubmit}>
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <label htmlFor='frequency'>Assign exercise for:</label>
      <input type='text' id='frequency' name='frequency' defaultValue={frequency} 
      onChange={(e) => setFreq(e.target.value)} required></input>

      <label htmlFor='duration'>times every:</label>
      <input type='text' id='duration' name='duration' defaultValue={duration} 
      onChange={(e) => setDuration(e.target.value)} required></input>

      <label htmlFor='add_note'>Add note:</label>
      <input type='text' id='add_note' name='add_note' defaultValue={add_note} 
      onChange={(e) => setNote(e.target.value)} required></input>

      <button type='submit'>Assign</button>
      </form>
      
      <ExerciseVidAndImg ex={ex}/>
    </>
    }
    </div>
  );
}

export default AssignExercise;