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
  }
}

export default ClientsService;