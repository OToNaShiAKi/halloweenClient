import axios from "axios";
import store from "./../store/";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "/halloween/"
    : "http://hustmaths.top:8121/";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (request) => {
    store.commit("Progress", true);
    return request;
  },
  (error) => {
    store.commit("Notify", error.message);
    throw error;
  }
);

axios.interceptors.response.use(
  (response) => {
    if (response.data.status == 200) {
      store.commit("Progress", false);
      return response.data.data;
    } else throw response.data;
  },
  (error) => {
    store.commit("Progress", false);
    store.commit("Notify", error.message);
    throw error;
  }
);

export default axios;
