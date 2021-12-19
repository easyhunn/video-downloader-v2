<template>
  <div class="mask-loader">
    <v-progress-circular
        indeterminate
        color="primary"
        ></v-progress-circular>
  </div>
</template>
<style scoped></style>
<script>


export default {
  name: "Loader",
  data: function() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.mask-loader {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    
}
</style>
