Skip to content Search or jump to… Pull requests Issues Marketplace Explore
@easyhunn easyhunn / video-downloader Public 1 00 Code Issues Pull requests
Actions Projects Wiki Security Insights Settings
video-downloader/src/views/Login.vue @easyhunn easyhunn base Latest commit
7e908a8 11 days ago History 1 contributor 126 lines (121 sloc) 3.17 KB

<template>
  <div class="w-full h-full flex items-center justify-center bg-gray-50">
    <div class="sm:w-1/2 xl:w-1/3">
      <div
        class="border-teal p-8 border-t-12 mb-6 rounded-lg shadow-lg bg-white"
      >
        <div class="mb-5">
          <h1 class="font-bold text-grey-darker block mb-2 text-lg">Login</h1>
        </div>
        <div class="mb-5">
          <label class="font-bold text-grey-darker block mb-2">Email</label>
          <input
            type="text"
            class="block appearance-none d-height w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
            placeholder="Your email"
            v-model="email"
          />
        </div>
        <div class="mb-5">
          <label class="font-bold text-grey-darker block mb-2">Password</label>
          <input
            type="password"
            class="block d-height appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
            placeholder="Your password"
            v-model="password"
          />
          <span v-show="isAuthFalse" class="text-red-500 mt-1"
            >username or password is incorrect</span
          >
        </div>
        <div class="flex flex-col gap-2">
          <a
            @click="handleLogin()"
            href="#"
            class="btn-primary-outline d-height bg-indigo-600"
          >
            <span class="text-white">Sign in</span>
          </a>
          <a
            @click="handleSignup()"
            href="#"
            class="btn-black d-height"
            tabindex="0"
          >
            <span class="text-white">Sign up</span>
          </a>
        </div>

        <div class="mt-2 text-sm leading-5 ">
          <router-link
            to="/forgot-password"
            class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            Forgot your password?
          </router-link>
        </div>
      </div>
      <!-- <div v-show="isVerify">
        <a
          href="https://getvideo-api.vietlach.vn/auth/v1/verify"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to verify
        </a>
      </div> -->
    </div>
  </div>
</template>

<script>
import { Auth } from "../store/auth.ts";
import axios from "axios";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      show: false,
      isVerify: false,
      isAuthFalse: false,
    };
  },
  methods: {
    async handleLogin() {
      Auth.dispatch("signIn", {
        email: this.email,
        password: this.password,
      }).then((res) => {
        if (res) {
          if (Auth.state.email) {
            this.$router.push("/");
            this.isAuthFalse = false;
          } else {
            console.log("sai mk");
            this.isAuthFalse = true;
          }
        } else {
          this.isAuthFalse = true;
        }
      });
    },
    handleSignup() {
      let me = this;
      Auth.dispatch("signUp", { email: this.email, password: this.password })
        .then((result) => {
          // me.isVerify = true;
        })
        .catch((err) => {
          alert("error");
        });
    },
  },
};
</script>

<style scoped lang="scss">
input {
  border: none !important;
  outline: none !important;
  &.focus {
    --tw-bg-opacity: 1;
    background-color: red;
  }
}
.btn-black {
  &:hover {
    span {
      color: black;
    }
  }
}
.d-height {
  height: 42px !important;
}
</style>
