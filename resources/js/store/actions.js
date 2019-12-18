import axios from 'axios';
axios.interceptors.request.use(
    (config) => {
      let token = localStorage.getItem('token')
  
      if (token) {
        config.headers['Authorization'] = `Bearer ${ token }`
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
);
export default {
    async registerUser({commit, state}, user){
        let response = await axios.post('http://localhost/calendar/public/api/register', user)
        commit('SET_TOKEN', response.data.token)
        commit('SET_USER', response.data.user)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        return response;
    },
    async loginUser({commit, state}, user){
        let response = await axios.post('http://localhost/calendar/public/api/login', user)
        commit('SET_TOKEN', response.data.token)
        commit('SET_USER', response.data.user)
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        return response;
    },
    logoutUser({commit}){
        commit('REMOVE_TOKEN')
        commit('REMOVE_USER')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    },
}