<template>
  <div class="main-view">
    <div class="w-100 h-100 main-content p-3 flex bg-gray-50">
      <h1 v-if="!listItem">No data</h1>
      <div class="w-100 h-100 main-container" v-if="listItem.length > 0">
        <div
          class="item w-100 h-100 cursor-pointer"
          v-on:click="showVideo(item)"
          v-for="item in listItem"
          :key="item.id"
        >
          
          <img class="item-img" :src="item.thumbnail" alt="">
          <div class="content">
            <div class="title">
              {{ item.title }}
            </div>
            <div class="sub-title">
              {{ item.description }}
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
import { Auth } from "../store/auth.ts";
export default {
  name: "Category",
  components: {},
  data: function() {
    return {};
  },
  methods: {
    showVideo(item) {
      if (item && item.id) {
        this.$store.dispatch("getVideosById", item.id);
        this.$router.push("/");
      }
    },
  },
  computed: {
    listItem() {
      return Auth.getters.savedVideos;
    },
  },
  created: function() {
    let me = this;
    this.$store.commit("setLoadingStatus", true);
    Auth.dispatch("getSavedVideos").then((res) => {
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
