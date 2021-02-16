import config from '../config'

const mutableFetch = (endpoint, params, method, deleting) => {
  params = params ? params : '';
  method = method ? method : { method: 'GET' }

    return fetch(`${config.API_ENDPOINT}/${endpoint}/${params}`, method)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : deleting ? '' : res.json()
      )
}

export default mutableFetch;