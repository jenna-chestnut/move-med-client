import TokenService from '../Services/token-service';
import IdleService from '../Services/idle-service';
import AuthApiService from './auth-api-service'

const fetchRefreshToken = async() => {
  try {
    const res = await AuthApiService.refreshToken();
    await TokenService.saveAuthToken(res.authToken);
  }
      catch(err) {
        console.log('err handle:', err)
      }

  TokenService.queueCallbackBeforeExpiry(() => {
    fetchRefreshToken();
  })
}

const appEffect = () => {
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(fetchRefreshToken);
    }
  }



export default appEffect;