import mutableFetch from './mutable-fetch';
import TokenService from './token-service';

const ClientsService = {
  getClients() {
    return mutableFetch('clients', null, {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
  },
  getClient(id) {
    return mutableFetch('clients', id, {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
  },
  getClientExercise(id) {
    return mutableFetch('client-mgmt/exercises', id, {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
  },
  updateClientGoal(newGoal, user_id) {
    newGoal = JSON.stringify(newGoal);
    return mutableFetch('client-mgmt/goal', user_id, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: newGoal
    })
  },
  updateClientExercise(newData, exc_id) {
    newData = JSON.stringify(newData);
    return mutableFetch('client-mgmt/exercises', exc_id, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: newData
    })
  },
  createClientExercise(newExc, client_id) {
    newExc = JSON.stringify(newExc);
    return mutableFetch('client-mgmt/exercises', client_id, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: newExc
    })
  }
}

export default ClientsService;