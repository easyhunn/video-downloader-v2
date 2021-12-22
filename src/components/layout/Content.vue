<template>
  <div class="w-100 h-100 main-content p-3 flex bg-gray-50">
    <div class="w-100 h-100 main-container">
      <div class="video-frame">
        <!-- <iframe
          width="100%"
          :height="440"
          :src="selectedVideo ? selectedVideo.url : ''"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          id="mainIframe"
        ></iframe> -->
        <video
          v-show="selectedVideo && selectedVideo.url"
          :src="selectedVideo ? selectedVideo.url : ''"
          style="width: 100%; height: 70vh"
          controls
          autoplay
        ></video>
      </div>
      <div class="video-content">
        <div class="content-tool-bar my-3" v-show="selectedVideo">
          <div style="width: 200px; height: 40px;">
            <v-select
              label="Qualify"
              v-on:change="changeQuality()"
              v-model="selectedQuality"
              v-bind:items="videoQuality"
              dense
              solo
              v-on:click="check()"
            ></v-select>
          </div>
          <div style="width: 150px; height: 40px;" class="mx-3">
            <v-btn elevation="2" style="height: 40px;" depressed color="error"
              >Save Video</v-btn
            >
          </div>
        </div>
        <div class="video-name" v-show="detail.title">
          <div class="title-1">
            {{ detail.title }} | {{ detail.ownerChannelName }}
          </div>
          <div class="sub-title py-3" v-if="detail">
            {{ detail.stats.viewCount }} views - {{ detail.publishDate }}
          </div>
        </div>
        <div class="description">
          {{ detail.description }}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
<script>
import { mapGetters } from "vuex";
export default {
  name: "Content",
  components: {},
  data: function() {
    return {
      mainVideoUrl: "",
      qualify: ["360p", "480p", "hd720", "1080p"],
      selectedQuality: null,
      selectedUrl: null,
    };
  },
  methods: {
    changeQuality() {
      this.$store.state.quality = this.selectedQuality;
    },
    check() {
      console.log(this.videoQuality);
    },
  },
  computed: {
    ...mapGetters({
      listVideo: "listVideo",
      selectedVideo: "getFitVideo",
      detail: "getVideoDetail",
      videoQuality: "getVideoQuality",
    }),
  },
  watch: {
    videoQuality() {
      this.selectedQuality = this.videoQuality[0];
    },
  },
};
</script>
<style lang="scss" scoped>
.main-content {
  // background-color: #e5e6eb;
  display: flex;
  max-height: calc(100vh - 60px);
  .main-container {
    flex: 1;
    padding: 8px;
    overflow: auto;
    .title-1 {
      font-size: 1.4em;
      font-weight: 400;
    }
    .sub-title {
      font-size: 14px;
    }
    .video-content {
      .content-tool-bar {
        width: 100%;
        display: flex;
        align-items: center;
      }
    }
    .video-frame {
      width: 100%;
      min-height: 400px;
    }
  }
  .video-unavailable {
    background-image: url("../../assets/video-unavailabel.png");
    width: 100%;
    height: 100%;
  }
}
</style>
