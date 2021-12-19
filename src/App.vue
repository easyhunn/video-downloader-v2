<template>
  <v-app>
    <div class="main-view">
      <div class="main-view-container">
        <Menu />
        <div class="flex flex-column" style="flex: 1;">
          <Header />
          <!-- <Footer /> -->
          <!-- <Content /> -->
          <!-- <Category /> -->
          <router-view />
        </div>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import VueSupabase from "vue-supabase";
import Content from "./components/layout/Content.vue";
import Header from "./components/layout/Header.vue";
import Menu from "./components/layout/Menu.vue";

import "./css/icon.css";
import "./css/table.css";
import "./css/button.scss";
import "./css/common.css";
import "./css/font.css";
import "./css/input.css";
import "./css/main.css";
import "./assets/tailwind.css";

Vue.use(VueSupabase, {
  supabaseUrl: "https://cjpqxaywbhfbvkqgtcye.supabase.co",
  supabaseKey:
    "VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoi/* YW5vbiIsImlhdCI6MTYzMzgzMjY4MiwiZXhwIjoxOTQ5NDA4NjgyfQ.RGW7K04p1BrwDuq3ll_b5sxW6-uV8XhQkSsGeFfXzbM",
  supabaseOptions: {},
});
export default Vue.extend({
  name: "App",
  components: { Content, Header, Menu },
  data: () => ({
    //
  }),
});
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
