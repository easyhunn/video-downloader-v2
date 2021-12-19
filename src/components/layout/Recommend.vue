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
          <div class="item-img"></div>
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
  name: "Recommend",
  components: {},
  data: function() {
    return {
      listItem: [
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
        {
          id: 6,
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
        {
          id: 6,
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
  computed: {},
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
      width: 275px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      .item-img {
        border: 1px solid;
        min-height: 175px;
        max-height: 175px;
        width: 100%;
      }
      .content {
        .sub-title {
          // white-space: pre;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* number of lines to show */
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
