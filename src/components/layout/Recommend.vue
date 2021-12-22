<template>
  <div class="main-view">
    <div class="w-100 h-100 main-content p-3 flex bg-gray-50">
      <div class="w-100 h-100 main-container">
        <div
          class="item item-render cursor-pointer"
          v-on:click="showVideo(item)"
          v-for="item in listItem"
          :key="item.id"
        >
          <img
            class="item-img"
            :src="item.thumbnails[0].url"
            alt="video preview"
          />
          <div class="content flex mt-1">
            <div class="content-left mr-2">
              <img
                :src="item.channel.avatar.thumb"
                alt="avatar"
                class="rounded-full channel-avatar"
              />
            </div>
            <div class="content-right">
              <div class="item-title flex">
                <div class="title-content">
                  {{ item.title }}
                </div>
              </div>
              <div class="sub-title">
                <div class="item-line ">
                  {{ item.channel.title }}
                </div>
                <div class="item-line">
                  {{ item.stats.viewCount }} | {{ item.publishedTime }}
                </div>
              </div>
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
import axios from "axios";

export default {
  name: "Recommend",
  components: {},
  data: function() {
    return {};
  },
  methods: {
    showVideo(item) {
      if (item && item.href) {
        this.$store.dispatch("getVideos", item.href);
        this.$router.push("/");
      } else {
        this.$store.commit("handleError", "Can't find video.");
      }
    },
  },
  computed: {
    ...mapGetters({
      listItem: "listItem",
    }),
  },
  created: function() {
    let me = this;
    this.$store.commit("setLoadingStatus", true);
    this.$store.dispatch("searchVideo", "").then((res) => {
      this.$store.commit("setLoadingStatus", false);
    });
  },
};
</script>
<style lang="scss" scoped>
.main-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.main-content {
  // background-color: #e5e6eb;
  display: flex;
  max-height: calc(100vh - 60px);
  .main-container {
    flex: 1;
    padding: 8px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      width: 360px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      .item-img {
        border: 1px solid;
        min-height: 180px;
        max-height: 180px;
        width: 100%;
      }
      .content {
        .content-left {
          .channel-avatar {
            width: 36px;
            max-width: 36px;
            min-width: 36px;
            height: 36px;
            min-height: 36px;
            max-height: 36px;
            // border: 1px solid;
          }
        }
        .content-right {
          .item-title {
            .title-content {
              // white-space: pre;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2; /* number of lines to show */
              line-clamp: 2;
              -webkit-box-orient: vertical;
              font-size: 14px;
              font-weight: 500;
            }
          }
          .sub-title {
            // white-space: pre;
            .item-line {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1; /* number of lines to show */
              line-clamp: 1;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }
}
</style>
