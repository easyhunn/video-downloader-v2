import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Video from "@/model/video";
import Details from "@/model/details";
import VideoPreview from "@/model/video-preview";

function isHttpRequest(text) {
  var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  var regex = new RegExp(expression);
  return regex.test(text);
}
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listVideo: Array<Video>(), // danh sách video với các chất lượng khác nhau
    videoDetails: Details,
    quality: "",
    loading: false,
    isError: false,
    isSuccess: false,
    message: "",
    isSearching: false,
    listItem: Array<VideoPreview>(), // danh sách các video xem trước
    viewMode: 1, // tạm thời fix 1 list preview 2 video
    reloadPage: true, // có cần reload lại trang k // tạm thời đang dùng cho màn recommend
  },
  mutations: {
    setlistVideo(state, listVideo) {
      state.listVideo = listVideo;
    },
    setVideoDetail(state, detail) {
      //pending
      state.videoDetails = detail;
    },
    setListPreview(state, list) {
      state.listItem = list;
    },
    /**
     *
     * @param isLoading true / false
     */
    setLoadingStatus(state, isLoading) {
      state.loading = isLoading;
    },
    setSearchingStatus(state, status) {
      state.isSearching = status;
    },
    handleError(state, message) {
      state.isError = true;
      state.message = message;
    },
    handleSuccess(state, message) {
      state.isSuccess = true;
      state.message = message;
    },
    setErrorStatus(state, status) {
      state.isError = status;
    },
    setSuccessStatus(state, status) {
      state.isSuccess = status;
    },
    setViewMode(state, mode) {
      state.viewMode = mode;
    },
    setReloadPage(state, status) {
      state.reloadPage = status;
    },
  },
  actions: {
    getVideos(context, textSearch) {
      context.commit("setSearchingStatus", true);
      if (isHttpRequest(textSearch)) {
        this.dispatch("getVideosByURL", textSearch);
      } else {
        this.dispatch("searchVideo", textSearch);
      }
    },
    /**
     * Get video by link
     * @param context
     * @param textSearch
     */
    async getVideosByURL(context, textSearch) {
      let url = "https://getvideo-api.vietlach.vn/api/v1/api/video/all";
      let params = { url: textSearch };

      await axios
        .post(url, params)
        .then((res: any) => {
          if (res && res.data) {
            if (res.data.data) {
              const data = res.data.data;
              if (data.status == 1) {
                context.commit("setlistVideo", data.videos);
                context.commit("setVideoDetail", data.details);
                context.commit("setViewMode", 2);
              }
            }
          }
        })
        .catch(function(error) {
          context.commit("handleError", "Can't find video.");
        })
        .finally(() => {
          context.commit("setLoadingStatus", false);
          context.commit("setSearchingStatus", false);
        });
    },
    /**
     * search video theo text
     * @param context
     * @param textSearch
     */
    async searchVideo(context, textSearch) {
      let url =
        "https://getvideo-api.vietlach.vn/api/v1/api/search/youtube?search_query=" +
        textSearch;
      await axios
        .get(url)
        .then((res: any) => {
          if (res && res.data) {
            let reqRes = res.data;
            if (reqRes.status == 1 && reqRes.data) {
              context.commit("setListPreview", reqRes.data);
              context.commit("setViewMode", 1);
            }
          }
        })
        .catch(function(error) {
          context.commit("handleError", "Can't find video.");
        })
        .finally(() => {
          context.commit("setLoadingStatus", false);
          context.commit("setLoadingStatus", false);
        });
    },
    async getVideosById(context, video) {
      let url =
        `https://getvideo-api.vietlach.vn/api/v1/api/video/${video.source ||
          "youtube"}?id=` + video.id;
      await axios
        .get(url)
        .then((res: any) => {
          debugger;
          if (res && res.data) {
            if (res.data.data) {
              const data = res.data.data;
              if (data.status == 1) {
                context.commit("setlistVideo", data.videos);
                context.commit("setVideoDetail", data.details);
                context.commit("setViewMode", 2);
              }
            }
          }
        })
        .catch(function(error) {
          context.commit("handleError", "Can't find video.");
        })
        .finally(() => {
          context.commit("setSearchingStatus", false);
          context.commit("setLoadingStatus", false);
        });
    },
  },
  getters: {
    listVideo(state) {
      return state.listVideo;
    },
    getFitVideo(state) {
      let fitVideo = state.listVideo[0];
      if (state.quality) {
        let qualities = state.quality.split("-");
        fitVideo = state.listVideo.filter(
          (video) =>
            video.quality == qualities[0] &&
            video.audioQuality == qualities[1] &&
            video.container == qualities[2]
        )[0];
      }
      return fitVideo;
      // return fitVideo;
    },
    getVideoQuality(state) {
      const listQualify: string[] = [];
      state.listVideo.forEach((video) => {
        let quality =
          video.quality + "-" + video.audioQuality + "-" + video.container;
        listQualify.push(quality);
      });
      return listQualify;
    },
    getLoadingStatus(state) {
      return state.loading;
    },

    getVideoDetail(state) {
      return state.videoDetails;
    },
    listItem(state) {
      return state.listItem;
    },
    isSearching(state) {
      return state.isSearching;
    },
    //Status
    isSuccess(state) {
      return state.isSuccess;
    },
    isError(state) {
      return state.isError;
    },
    message(state) {
      return state.message;
    },
    viewMode(state) {
      return state.viewMode;
    },
    isReloadPage(state) {
      return state.reloadPage;
    },
  },

  modules: {},
});
