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
    id: "",
    listSavedVideo: [],
  },
  mutations: {
    setUser(state, { email, password, token }) {
      state.email = email;
      state.password = password;
      state.token = token;
    },
    setListSavedVideos(state, listVideo) {
      state.listSavedVideo = listVideo;
    },
    deleteVideo(state, video) {
      if (video && video.id && video.source) {
        let index = state.listSavedVideo.findIndex(
          (x) => x.id == video.id && x.source == video.source
        );
        if (index >= 0) {
          state.listSavedVideo.splice(index, 1);
        }
      }
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
      context.commit("setUser", {});
      deleteCookie("email");
      deleteCookie("token");
    },
    async signUp(context, { email, password }) {
      let res = {
        success: false,
        message: "",
      };
      await axios
        .post("https://getvideo-api.vietlach.vn/auth/v1/signup", {
          email: email,
          password: password,
        })
        .then((result) => {
          res.success = true;
        })
        .catch((err) => {
          console.log(err);
          res.success = false;
          res.message = err?.response?.data?.message || "";
        });
      return res;
    },
    async getSavedVideos(context) {
      let url = "https://getvideo-api.vietlach.vn/api/v1/auth/video";
      let token = context.state.token || getCookie("token");
      let header = {
        headers: { Authorization: "Bearer " + token },
      };
      await axios
        .get(url, header)
        .then((res: any) => {
          if (res && res.data) {
            let reqRes = res.data;
            if (reqRes.data) {
              context.commit("setListSavedVideos", reqRes.data);
            }
          }
        })
        .catch(function(error) {
          // context.commit("handleError", "Can't find video.");
        })
        .finally(() => {});
    },
    /**
     * Lưu video
     * @param context
     * @param video
     */
    async addVideo(context, video) {
      let url = "https://getvideo-api.vietlach.vn/api/v1/auth/video";
      let token = context.state.token || getCookie("token");
      let header = {
        headers: { Authorization: "Bearer " + token },
      };
      let result = {
        isSuccess: false,
        message: "",
      };
      await axios
        .post(url, video, header)
        .then((res: any) => {
          if (res) {
            result.isSuccess = true;
          }
        })
        .catch(function(error) {
          result.isSuccess = false;
          result.message = error?.response?.data?.message || "";
        });
      return result;
    },
    async deleteVideo(context, video) {
      if (video && video.id) {
        context.commit("deleteVideo", video);
        let url = "https://getvideo-api.vietlach.vn/api/v1/auth/video";
        let token = context.state.token || getCookie("token");
        let header = {
          headers: { Authorization: "Bearer " + token },
        };
        await axios
          .delete(url, {
            headers: {
              Authorization: "Bearer " + token,
            },
            data: {
              source: video.source,
              id: video.id,
            },
          })
          .then((res: any) => {})
          .catch(function(error) {
            // context.commit("handleError", "Can't find video.");
            console.log("delete error");
          })
          .finally(() => {});
      }
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
    youtubeVideos(state) {
      return state.listSavedVideo.filter(
        (x) => x.source.toLowerCase() == "youtube".toLowerCase()
      );
    },
    tikTokVideos(state) {
      return state.listSavedVideo.filter(
        (x) => x.source.toLowerCase() == "tiktok".toLowerCase()
      );
    },
    facebookVideos(state) {
      return state.listSavedVideo.filter(
        (x) => x.source.toLowerCase() == "facebook".toLowerCase()
      );
    },
  },
});
