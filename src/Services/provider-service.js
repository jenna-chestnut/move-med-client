import mutableFetch from './mutable-fetch';

const ClientsService = {
  getClients() {
    return mutableFetch('clients')
  },
  createAccount(name) {
    name = JSON.stringify({name : name});
    return mutableFetch('clients', null, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: name
    })
  }
}

export default ClientsService;