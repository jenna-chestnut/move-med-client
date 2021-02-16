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

const logoutBecauseIdle = (func) => {
  TokenService.clearAuthToken();
  TokenService.clearCallbackBeforeExpiry();
  IdleService.unRegisterIdleResets();
  console.log('running this function now')
  func();
}

const appEffect = (func) => {
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets();
      IdleService.setIdleCallback(() => logoutBecauseIdle(func))
      TokenService.queueCallbackBeforeExpiry(fetchRefreshToken);
    }
  }



export default appEffect;