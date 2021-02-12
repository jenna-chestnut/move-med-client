import mutableFetch from './mutable-fetch';
import TokenService from './token-service';

const ExercisesService = {
  getExercises() {
    return mutableFetch('exercises', null, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
  },
  getExercise(id) {
    return mutableFetch('exercises', id, {
      headers: {
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
  },
  createExercise(newExercise) {
    newExercise = JSON.stringify(newExercise);
    return mutableFetch('exercises', null, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: newExercise
    })
  }
}

export default ExercisesService;