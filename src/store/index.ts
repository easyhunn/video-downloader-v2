import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import YoutubeVideo from "@/model/youtube-video";
import VideoDetails from "@/model/video-details";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listVideo: Array<YoutubeVideo>(),
    videoDetails: VideoDetails,
    quality: "480p",
    loading: false,
  },
  mutations: {
    addUrl(state, url) {
      state.listVideo.push(url);
    },
    setlistVideo(state, listVideo) {
      state.listVideo = listVideo;
    },
    setVideoDetail(state, detail) {
      if (detail.viewCount) {
        const views = detail.viewCount as string;
        let formatedViews = "";
        for (let i = 0; i <= views.length; i += 3) {
          formatedViews += views.substring(i, i + 3);
          if (i + 3 < views.length) {
            formatedViews += ",";
          }
        }
        detail.viewCount = formatedViews;
      }
      state.videoDetails = detail;
    },
    /**
     *
     * @param isLoading true / false
     */
    setLoadingStatus(state, isLoading) {
      state.loading = isLoading;
    }
  },
  actions: {
    /**
     * Lấy youtube url
     * 08/10/2021
     */
    async getYoutubeVideos(context, url) {
      context.commit("setLoadingStatus", true);
      await axios
        .post("http://localhost:3333/api/video/all", {
          url: url,
        })
        .then((res: any) => {
          if (res && res.data) {
            if (res.data.data) {
              const data = res.data.data;
              context.commit("setlistVideo", data.formats);
              context.commit("setVideoDetail", data.videoDetails);
            }
          }
        })
        .finally(() => {
          context.commit("setLoadingStatus", false);
        });
    },
    // async signUpAction({ dispatch }, form) {
    //   try {
    //     const { error } = await supabase.auth.signUp({
    //       email: form.email,
    //       password: form.password,
    //     });
    //     if (error) throw error;
    //     alert("You've been registered successfully");
    //     await dispatch("signInAction", form);
    //   } catch (error) {
    //     // alert(error.error_description || error.message);
    //   }
    // },
    
  },
  getters: {
    listVideo(state) {
      return state.listVideo;
    },
    getFitVideo(state) {
      if (state.listVideo) {
        let video = state.listVideo.find(
          (video) =>
            video.qualityLabel == state.quality &&
            video.hasAudio &&
            video.hasVideo
        );
        if (!video) {
          video = state.listVideo.find(
            (video) => video.hasAudio && video.hasVideo
          );
        }
        console.log(video);
        return video;
      } else {
        return [];
      }
    },
    getVideoQuality(state) {
      const listQualify: string[] = [];
      state.listVideo.forEach((qualify) => {
        if (!listQualify.includes(qualify.qualityLabel)) {
          listQualify.push(qualify.qualityLabel);
        }
      });
      return listQualify;
    },
    getLoadingStatus(state) {
      return state.loading;
    },

    getVideoDetail(state) {
      return state.videoDetails;
    },
  },

  modules: {},
});
