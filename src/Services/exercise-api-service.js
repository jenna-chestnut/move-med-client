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
  },
  updateExercise(newData, exc_id) {
    newData = JSON.stringify(newData);
    return mutableFetch('exercises', exc_id, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: newData
    })
  }
}

export default ExercisesService;