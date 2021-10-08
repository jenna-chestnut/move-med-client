import { useSelector } from 'react-redux';
import { selectExercises } from '../../features/exercises/exerciseSlice';
import './ClientDashView.css';
import loadingImg from '../../images/Preloader_3.gif';
import ExerciseItem from '../ExerciseItem/ExerciseItem';


function ClientDashView() {
  const ex = useSelector(selectExercises)

  const renderExercises = () => {
    return ex.exercises 
    ?  ex.exercises.map((e, idx) => {
      return <ExerciseItem ex={e} list={true} clientEx={true} key={idx}/> 
    })
    :
    <div className='loading'><p>Loading..</p><img src={loadingImg} alt='loading'/></div>
  }
  
    return (
      <div className='ClientDashView'>
        <span className='clientdash-goal'>
         { ex.goal ? `Goal: ${ex.goal}` : '' }
        </span>
        <div className='client-exercises'>
        <h2 className='exercises-header'>Your Exercises</h2> 
        {renderExercises()}
        </div>
      </div>
    );
}

export default ClientDashView;