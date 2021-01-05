import * as auth from "../app/modules/Auth/_redux/authRedux.js";

export default function setupAxios(axios, store) {
    axios.interceptors.request.use(
        config => {
            const {
                auth
            } = store.getState();

            /*if (authToken) {
              config.headers.Authorization = `Bearer ${authToken}`;
            }*/

            if (auth?.session_key !== undefined) {
                if (config.params === undefined)
                    config.params = {'sid': auth.session_key};
                else
                    config.params['sid'] = auth.session_key;
            }

            return config;
        },
        err => Promise.reject(err)
    );

    axios.interceptors.response.use(
        response => {
            const {data} = response;
            if (data?.status !== 'OK') {
                if (data?.data?.error === -401) {
                    store.dispatch(auth.actions.logout());
                }
                return Promise.reject(data?.message || 'Connection Error');
            }
            return data.data;
        },
        error => {
            if (error?.response?.status === 401) {
                store.dispatch(auth.actions.logout());
            }
            return Promise.reject(error);
        }
    );
}
