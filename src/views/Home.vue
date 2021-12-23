<template>
  <div class="main-view">
    <Content v-show="viewMode == 2" />
    <Recommend v-show="viewMode == 1" />
  </div>
</template>
<script>
import Content from "../components/layout/Content";
import Recommend from "../components/layout/Recommend";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { Content, Recommend },
  computed: {
    ...mapGetters({
      fitUrl: "getFitVideo",
      viewMode: "viewMode",
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
</style>
