<template>
  <div class="main-view">
    <div class="w-100 h-100 main-content p-3 flex bg-gray-50">
      <div class="w-100 h-100 main-container">
        <div
          class="item w-100 h-100 cursor-pointer"
          v-on:click="showVideo(item)"
          v-for="item in listItem"
          :key="item.id"
        >
          <div class="item-img">
            <iframe
              width="100%"
              height="100%"
              :src="item && item.videoDetail ? item.videoDetail.url + '?autoplay=0&showinfo=0&controls=0' : ''"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
            
          </div>
          <div class="content">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="sub-title">
              {{ item.subtitle }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Category",
  components: {},
  data: function() {
    return {
      listItem: [
        {
          id: 2,
          title: "The Viet Nam language",
          subtitle:
            "Learn how to use these tricky English vocabulary words with a simple English test. Can you pass? Download the free PDF worksheet for this lesson here: http://www.speakenglishwithvanessa.co... ",
          videoDetail: {
            mimeType: 'video/mp4; codecs="avc1.42001E, mp4a.40.2"',
            qualityLabel: "360p",
            bitrate: 678414,
            audioBitrate: 96,
            itag: 18,
            width: 640,
            height: 360,
            lastModified: "1589035124358833",
            contentLength: "23321191",
            quality: "medium",
            fps: 30,
            projectionType: "RECTANGULAR",
            averageBitrate: 678279,
            audioQuality: "AUDIO_QUALITY_LOW",
            approxDurationMs: "275063",
            audioSampleRate: "44100",
            audioChannels: 2,
            s:
              "aOq0QJ8wRQIgbBpVAaGvg3vqqcAKd0_SbY2OZ7RjAJU1WOqau-E1UN8CIQ=SliAm2RMPca5M9PR-b-iLPnbdIyos1cBQI3rUzDS4aQ=3",
            sp: "sig",
            url:
              "https://r8---sn-8pxuuxa-i5oez.googlevideo.com/videoplayback?expire=1638896876&ei=jECvYefRLY-zqAH03JSQBQ&ip=171.224.181.192&id=o-AMNA7Y7BUjHikY-8iZLzhDNYyWMmo0DvsBn8wlZG6myH&itag=18&source=youtube&requiressl=yes&mh=3D&mm=31%2C26&mn=sn-8pxuuxa-i5oez%2Csn-30a7yn76&ms=au%2Conr&mv=m&mvi=8&pl=24&initcwndbps=2286250&vprv=1&mime=video%2Fmp4&ns=--iZ1AD9BAhfQj4VNoBP2UkG&gir=yes&clen=23321191&ratebypass=yes&dur=275.063&lmt=1589035124358833&mt=1638874862&fvip=5&fexp=24001373%2C24007246&c=WEB&txp=5531432&n=rWdDU7sbcoG_V1Nf_ua&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgSKp1MhgIxMUFvtQ9unvBxWVmYEUtcNmz4IS4MLN24R8CIQDx3xmJeF9nlwgkg26j5pwgwg5y-V_x8epnxIopNkXLhA%3D%3D&sig=AOq0QJ8wRQIgbBpVAaGvg3vqqcAKd1_SbY2OZ7Rj0JUaWOqau-E1UN8CIQDSliAm2RMPca5M9PR-b-iLPnbdIyos1cBQI3rUz3S4aQ%3D%3D",
            hasVideo: true,
            hasAudio: true,
            container: "mp4",
            codecs: "avc1.42001E, mp4a.40.2",
            videoCodec: "avc1.42001E",
            audioCodec: "mp4a.40.2",
            isLive: false,
            isHLS: false,
            isDashMPD: false,
          },
        },
        {
          id: 3,
          title: "The Viet Nam language",
          subtitle:
            "Learn how to use these tricky English vocabulary words with a simple English test. Can you pass? Download the free PDF worksheet for this lesson here: http://www.speakenglishwithvanessa.co... ",
        },
        {
          id: 4,
          title: "The Viet Nam language",
          subtitle:
            "Learn how to use these tricky English vocabulary words with a simple English test. Can you pass? Download the free PDF worksheet for this lesson here: http://www.speakenglishwithvanessa.co... ",
        },
        {
          id: 5,
          title: "The Viet Nam language",
          subtitle:
            "Learn how to use these tricky English vocabulary words with a simple English test. Can you pass? Download the free PDF worksheet for this lesson here: http://www.speakenglishwithvanessa.co... ",
        },
        {
          id: 6,
          title: "The Viet Nam language",
          subtitle:
            "Learn how to use these tricky English vocabulary words with a simple English test. Can you pass? Download the free PDF worksheet for this lesson here: http://www.speakenglishwithvanessa.co... ",
        },
      ],
    };
  },
  methods: {
    showVideo(item) {
      if (item && item.videoDetail) {
        this.$store.commit("setlistVideo", [item.videoDetail]);
        this.$store.commit("setlistVideo", item.detail);
      }
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters({
      listVideo: "listVideo",
      fitUrl: "getFitVideo",
      detail: "getVideoDetail",
      videoQuality: "getVideoQuality",
    }),
  },
};
</script>
<style lang="scss" scoped>
.main-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .main-view-container {
    display: flex;
    flex: 1;
  }
}
.main-content {
  // background-color: #e5e6eb;
  display: flex;
  max-height: calc(100vh - 60px);
  .main-container {
    flex: 1;
    padding: 8px;
    overflow: auto;
    .item {
      width: 100%;
      height: 150px;
      padding: 16px;
      display: flex;
      border-bottom: 1px solid #bbbbbb;
      .item-img {
        border: 1px solid;
        height: 100%;
        width: 220px;
      }
      .content {
        padding: 0 16px 0 16px;
      }
    }
  }
}
</style>
