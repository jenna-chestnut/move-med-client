import { Link } from 'react-router-dom';
import './ExerciseItem.css';
import Fade from 'react-reveal/Fade';
import { useState } from 'react';

function ExerciseItem(props) {
  const [details, showExtraDetails] = useState(false);
  const { ex } = props;

  const renderDetails = () => {
    const videoURL = `https://www.youtube.com/embed/${ex.videourl}`

    const exItem = <Fade>
      { props.client 
        ? <p>Frequency: {ex.frequency}x every {ex.duration}
        {' | '}<Link to={`/view/exercise/client/${ex.id}`}> Open</Link> </p>
        : <><Link to={`/view/exercise/admin/${ex.id}`}> Open</Link> | <Link to={`/assign/exercise/${ex.id}`}> Assign</Link></> }
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
        <Fade><div className='exercise-name' onClick={() => showExtraDetails(true)}>
          <h4>{ex.exercise_name}</h4>
        </div></Fade>
        { details &&
         <><hr/>{renderDetails()}
         <button onClick={() => showExtraDetails(false)}> Close</button></> }
      </div>
    );
}

export default ExerciseItem;