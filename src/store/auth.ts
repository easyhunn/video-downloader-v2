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
  },
  mutations: {
    setUser(state, { email, password }) {
      state.email = email;
      state.password = password;
    },
  },
  actions: {
    signIn(context, { email, password }) {
      // axios
      //   .post(
      //     `https://getvideo-api.vietlach.vn/auth/v1/token?grant_type=password&username=${email}&password=${password}`
      //   )
      //   .then((result) => {
      //     debugger;
      //     context.commit("setUser", { email, password });
      //     setCookie("email", email, 1);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      context.commit("setUser", { email, password });
      setCookie("email", email, 1);

      return true;
    },
    signOut(context) {
      context.commit("setUser", {});
      deleteCookie("email");
    },
    async signUp(context, { email, password }) {
      axios
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
  },
});
