import { Link } from 'react-router-dom';
import './ExerciseItem.css';
import Fade from 'react-reveal/Fade';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';


function ExerciseItem(props) {
  const [details, showExtraDetails] = useState(false);
  const { ex } = props;
  const u = useSelector(selectUser);

  const renderDetails = () => {
    const videoURL = `https://www.youtube.com/embed/${ex.videourl}`

    const exItem = <Fade>

      <button className='close-ex' 
      onClick={() => showExtraDetails(false)}> Close</button>

      { props.client 
        ? 
        <p><b>Frequency: {ex.frequency}x every {ex.duration}</b> 
        {' | '}<Link to={`/view/exercise/client/${
           !u.is_admin && !u.is_provider ? ex.exercise_id : ex.id}`}> Open</Link> </p>
        : 
        <><Link to={`/view/exercise/admin/${ex.id}`}> Open</Link> | <Link to={`/assign-exercise/${ex.id}/unset`}> Assign</Link></> 
      }

    <div className='group'>
    <div className='item'>
    <img src={ex.imgurl} alt='exercise example' /></div>

    <div className='item'>
    <iframe className='exc-vid' width="560" title={ex.exercise_name} height="315" src={videoURL} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
    </div>
    </Fade>

    return exItem;
  }

  const itemClass = details 
  ? 'exercise-item details' : 'exercise-item';

    return (
      <div className={itemClass}>

        <Fade><div className='exercise-name' 
        onClick={() => showExtraDetails(true)}>
          <h4>{ex.exercise_name}</h4>
        </div></Fade>

        { details && <><hr/>{renderDetails()}</> }
         
      </div>
    );
}

export default ExerciseItem;