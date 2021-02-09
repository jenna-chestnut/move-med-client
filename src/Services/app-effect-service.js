import TokenService from '../Services/token-service';
import IdleService from '../Services/idle-service';
import AuthApiService from './auth-api-service';

const EffectService = {
  fetchRefreshToken: async() => {
    try {
      const res = await AuthApiService.refreshToken();
          TokenService.saveAuthToken(res.authToken)
          TokenService.queueCallbackBeforeExpiry(() => {
            this()
          })
        }
        catch(err) {
          console.log(err)
        }
  },
  appEffect() {
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken()
      });
    }
  }
}


export default EffectService;