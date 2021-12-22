import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

//cache
function setCookie(name, value, exp_days) {
  var d = new Date();
  d.setTime(d.getTime() + exp_days * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
function getCookie(name) {
  var cname = name + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(cname) == 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}
function deleteCookie(name) {
  var d = new Date();
  d.setTime(d.getTime() - 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = name + "=;" + expires + ";path=/";
}

export const Auth = new Vuex.Store({
  state: {
    email: "",
    password: "",
    token: "",
    listSavedVideo: [],
  },
  mutations: {
    setUser(state, { email, password, token }) {
      state.email = email;
      state.password = password;
      state.token = token;
    },
  },
  actions: {
    async signIn(context, { email, password }) {
      let isLoginSuccess = false;
      await axios
        .post(
          `https://getvideo-api.vietlach.vn/auth/v1/token?grant_type=password&username=${email}&password=${password}`
        )
        .then((result: any) => {
          if (result.data) {
            var token = result.data.access_token;
            context.commit("setUser", { email, password, token });
            setCookie("email", email, 1);
            setCookie("token", token, 1);
            isLoginSuccess = true;
          }
        })
        .catch((err) => {
          console.log(err);
          isLoginSuccess = false;
        })
        .finally(() => {});
      // context.commit("index/setSuccessStatus", false);
      // setCookie("email", email, 1);

      return isLoginSuccess;
    },
    signOut(context) {
      context.commit("index/setLoadingStatus", true);
      context.commit("setUser", {});
      deleteCookie("email");
      context.commit("index/setLoadingStatus", false);
    },
    async signUp(context, { email, password }) {
      await axios
        .post("https://getvideo-api.vietlach.vn/auth/v1/signup", {
          email: email,
          password: password,
        })
        .then((result) => {
          return result;
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    },
    async getSavedVideos(context) {
      let url = "https://getvideo-api.vietlach.vn/api/v1/auth/video";
      let token = context.state.token || getCookie("token");
      let header = {
        headers: { Authorization: "Bearer " + context.state.token },
      };
      await axios
        .get(url, header)
        .then((res: any) => {
          if (res && res.data) {
            let reqRes = res.data;
            if (reqRes.status == 1 && reqRes.data) {
              context.commit("setListSavedVideos", reqRes.data);
            }
          }
        })
        .catch(function(error) {
          // context.commit("handleError", "Can't find video.");
        })
        .finally(() => {});
    },
  },
  getters: {
    userInfo(state) {
      return {
        email: state.email,
        password: state.password,
      };
    },
    loginStatus(state) {
      state.email = getCookie("email");
      return state.email;
    },
    savedVideos(state) {
      return state.listSavedVideo;
    },
  },
});
