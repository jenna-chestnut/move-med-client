const mutableFetch = (endpoint, params, method) => {
  params = params ? params : '';
  method = method ? method : { method: 'GET' }

    return fetch(`https://thawing-chamber-52839.herokuapp.com/api/${endpoint}/${params}`, method)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
}

export default mutableFetch;