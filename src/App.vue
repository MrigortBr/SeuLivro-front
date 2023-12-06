<template>
  <ErrorComp v-if="errorShow" :error="message" @disableError="disableError"></ErrorComp>
  <router-view @listenError="initComp" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Error } from "@/service/error/type";
import ErrorComp from "./components/ErrorComp.vue";

export default defineComponent({
  name: "errorComp",
  components: { ErrorComp },
  data() {
    return {
      message: {} as Error,
      errorShow: false,
    };
  },
  methods: {
    initComp(response: any) {
      if (response.status !== undefined && response.message !== undefined) {
        const error = {} as Error;

        if (response.status) {
          error.type = "success";
        } else {
          error.type = "error";
        }

        error.message = response.message;
        error.code = response.code;

        this.message = error;

        if (this.errorShow) {
          this.errorShow = false;
          setTimeout(() => {
            this.errorShow = true;
          }, 100);
        } else {
          this.errorShow = true;
        }
      }
    },
    disableError() {
      this.errorShow = false;
    },
  },
});
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  overflow: hidden;
  z-index: 0;
  background-image: url("./assets/background.svg");
}

#app::-webkit-scrollbar,
#app > *::-webkit-scrollbar,
#app > * > *::-webkit-scrollbar {
  width: 10px; /* Largura total da scrollbar */
}

#app::-webkit-scrollbar-thumb,
#app > *::-webkit-scrollbar-thumb,
#app > * > *::-webkit-scrollbar-thumb {
  background-color: white; /* Cor da barra de rolagem */
  border-radius: 10px; /* Border-radius de 20% para a barra de rolagem */
}
</style>
