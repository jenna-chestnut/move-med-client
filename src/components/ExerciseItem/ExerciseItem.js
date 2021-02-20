import './ExerciseItem.css';
import Fade from 'react-reveal/Fade';
import { useState } from 'react';
import ExerciseVidAndImg from '../ExerciseVidAndImg/ExerciseVidAndImg';


function ExerciseItem(props) {
  const [details, showExtraDetails] = useState(false);
  const { ex, clientEx, list } = props;

  const itemClass = details 
  ? 'exercise-item details' : 'exercise-item';

    return (
      <div className={itemClass}>

        <Fade><div className='exercise-name' 
        onClick={() => showExtraDetails(true)}>
          <h4>{ex.exercise_name}</h4>
        </div></Fade>

        { details && <><hr/>
        <ExerciseVidAndImg 
        ex={ex}
        list={list}
        hide={() => showExtraDetails(false)}
        clientEx={clientEx}
        /></>}
         
      </div>
    );
}

export default ExerciseItem;