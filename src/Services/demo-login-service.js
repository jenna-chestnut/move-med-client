import AuthApiService from "./auth-api-service";
import TokenService from "./token-service";

const demoLogin = async (key) => {
   const isClient = key === 'client';

   const credentials = {
     user_name: isClient ? 'SalemtheDog' : 'TheFizzicyst',
     password: isClient ? 'illcatchthattail' : 'whoami'
   }

    try {
      const res = await AuthApiService.postLogin(credentials);

       TokenService.saveAuthToken(res.authToken);
       const loggedIn = TokenService.parseAuthToken();

       console.log(loggedIn)

       return loggedIn;
    }
      catch(err) {
        throw new Error(err.message) 
    }
}

export default demoLogin;