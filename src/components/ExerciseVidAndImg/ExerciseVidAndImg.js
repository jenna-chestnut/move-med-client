import { Link } from 'react-router-dom';
import './ExerciseVidAndImg.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';


function ExerciseVidAndImg(props) {
  const { ex, hide, list, clientEx } = props;
  const u = useSelector(selectUser);

    const videoURL = `https://www.youtube.com/embed/${ex.videourl}`

    const video = <iframe className='exc-vid' width="95%" title={ex.exercise_name} height="315" src={videoURL} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    const details = () => {
      if (list) {
        return clientEx 
        ? 
        <p><b>Frequency: {ex.frequency}x every {ex.duration}</b> 
        {' | '}<Link to={`/view/exercise/client/${
           !u.is_admin && !u.is_provider ? ex.exercise_id : ex.id}`}> Open</Link> </p>
        : 
        <><Link to={`/view/exercise/admin/${ex.id}`}> Open</Link> | <Link to={`/assign-exercise/${ex.id}/unset`}> Assign</Link></> 
      }
      else {
        return clientEx
        ?
          <div className='c-ve-d'><p>Frequency: {ex.frequency}x every {ex.duration}</p>
            {ex.add_note ? <p>Notes: {ex.add_note}</p> : ''}</div>
        :
          ''
      }
    }

    return <div className='ex-vid-and-img'>

    { hide && <button className='close-ex' 
    onClick={() => hide()}> Close</button> }

    {details()}

    <div className='group'>
      <div className='item'>
        <img src={ex.imgurl} alt='exercise example' />
      </div>

      <div className='item'>
        {video}
      </div>
    </div>
  </div>;
}

export default ExerciseVidAndImg;