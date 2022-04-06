import axios from "axios";


const appApi = axios.create({
    baseURL: 'https://yahoofinance-stocks1.p.rapidapi.com/',
  });

  const setRequestHeader = (config) => {
    
      config.headers[ 'x-rapidapi-host' ] = 'yahoofinance-stocks1.p.rapidapi.com';
      config.headers[ 'x-rapidapi-key' ] = '6bfd3bf9a0mshd637ef7ccc19913p1fe183jsn7b632bfd5cd0';
    return config;
  };

  appApi.interceptors.request.use(
    (config) => setRequestHeader(config),
    (error) => {
      Promise.reject(error);
    }
  );
  export { appApi };