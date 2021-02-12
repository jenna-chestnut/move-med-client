import mutableFetch from './mutable-fetch';
import TokenService from './token-service';

const AdminService = {
  getUsers() {
    return mutableFetch('users', null, {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
  },
  getUser(id) {
    return mutableFetch('users', id, {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })
  }
}

export default AdminService;