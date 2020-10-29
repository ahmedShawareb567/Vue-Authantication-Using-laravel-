import axios from 'axios';
export default{
    namespaced: true,
    state: {
        token: null,
        user: null,
        role: null
    },
    getters:{
        authanticated(state){
            return state.token && state.user ? true : false;
        },
        getUser(state){
            return state.user;
        },
        getRole(state){
            return state.role;
        }
    },
    mutations: {
        SET_TOKEN(state, payload) {
            state.token = payload;
        },
        SET_USER(state, payload) {
            state.user = payload;
        },
        SET_ROLE(state, payload) {
            state.role = payload;
        },
    },
    actions: {
        async checkAuthanticated({commit, dispatch}, payload) {
            try{
                let response = await axios.post('/api/auth/login', payload);
                //COMMIT
                commit('SET_TOKEN', response.data.token);
                commit('SET_USER', response.data.user);
                commit('SET_ROLE', response.data.role);

                //DISPATCH
                dispatch('registeredFunc', response.date.token);
            }catch(e){}
        },
        async registeredFunc({state, commit}, token){
            if (token) {
                commit('SET_TOKEN', token);
            }
            if (!state.token) {
                return
            }
            try{
                let response = await axios.get('/api/auth/me');
                commit('SET_USER', response.data.user);
                commit('SET_ROLE', response.data.role);
            }catch(e){}
        },
        async signOut({commit}) {
            try{
                let response = await axios.get('/api/auth/logout');
                commit('SET_TOKEN', null);
                commit('SET_USER', null);
                commit('SET_ROLE', null);
            }catch(e) {}
        }
    },
};
