import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowWidth: 0,
    errorDialog: false,
    status: "",
    menus: [],
    token: localStorage.getItem("token") || "",
    username: "",
    loading: false,
    refreshPageDataCallback: null,
    defaultRefreshPageDataCallback: () => {
      window.location.reload();
      history.go(0);
    }
  },
  mutations: {
    window_width(state, payload) {
      state.windowWidth = payload;
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, payload) {
      state.status = "success";
      state.token = payload.token;
      state.username = payload.username;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    set_loading(state, payload) {
      state.loading = payload;
    },
    set_refresh_page_data_callback(state, callback) {
      state.refreshPageDataCallback = callback;
    },
    restore_page_data_callback(state) {
      state.refreshPageDataCallback = state.defaultRefreshPageDataCallback;
    },
    set_error_dialog(state, val) {
      console.log('дилог епта ' + val)
      state.errorDialog = val
    },
    set_menus(state, payload) {
      state.menus = payload
    }
  },
  actions: {
    setWindowWidth(context, val) {
      context.commit("window_width", val);
    },
    setErrorDialog(context, val) {
      context.commit("set_error_dialog", val);
    },
    setLoading: function(context, value) {
      context.commit("set_loading", value);
    },
    setMenus(context, value) {
      context.commit('set_menus', value)
    },
    getMenus(context) {
      return new Promise((resolve, reject) => {
        axios({
          url: process.env.NODE_ENV === "production" ? "/api/mainMenu/menu" : "http://localhost:8081/api/mainMenu/menu",
          method: "POST",
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
          }
        })
            .then(response => {
              context.commit('set_menus', response.data);
              resolve(response);
            })
            .catch(err => {
              reject(err);
            });
      })
    },
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url:
            process.env.NODE_ENV === "production"
              ? "/auth/login"
              : "http://localhost:8081/auth/login",
          data: user,
          method: "POST"
        })
          .then(resp => {
            if (resp.data.resultCode === "FAIL") {
              throw resp.data.message;
            }
            const token = resp.data.message;
            let base64Url = token.split(".")[1];
            let decodedValue = JSON.parse(window.atob(base64Url));
            console.log(decodedValue);

            localStorage.setItem("token", token);
            Vue.prototype.$http.defaults.headers.common["Authorization"] =
              "Bearer " + token;

            let u = decodedValue.username;
            this.commit("auth_success", {
              token: token,
              username: u
            });

            resolve(resp);
          })
          .catch(err => {
            this.commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        commit("logout");
        localStorage.removeItem("token");
        delete Vue.prototype.$http.defaults.headers.common["Authorization"];
        resolve();
      });
    },
    setRefreshCallback(context, callback) {
      context.commit("set_refresh_page_data_callback", callback);
    },
    restoreRefreshCallback(context) {
      context.commit("restore_page_data_callback");
    }
  },
  getters: {
    windowWidth: state => state.windowWidth,
    modalWidth: state => {
      let dw = (700 / state.windowWidth) * 90;
      if (state.windowWidth > 1280) return "30vw";
      else if (state.windowWidth < 700) return "90vw";
      else return Math.round(dw) + "vw";
    },
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    username: state => state.username,
    loading: state => state.loading,
    pageRefreshCallback: state => state.refreshPageDataCallback,
    errorDialog: state => state.errorDialog,
    acceptedMenus: state => state.menus
  }
});
