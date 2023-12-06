<template>
  <div
    class="background-popup"
    :class="{ error: error?.type == 'error', success: error?.type == 'success', leave: leave }"
  >
    {{ error?.message }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Error } from "@/service/error/type";

export default defineComponent({
  name: "errorComp",
  props: {
    error: {} as PropType<Error>,
  },
  data() {
    return {
      leave: false,
    };
  },
  async created() {
    setTimeout(() => {
      this.leave = true;
    }, 5500);

    setTimeout(() => {
      this.$emit("disableError");
    }, 6000);

    this.errorLoad();
  },
  methods: {
    errorLoad() {
      if (this.error?.code === 401) {
        this.$router.push("/login");
      }
    },
  },
});
</script>

<style scoped>
.background-popup {
  width: 100%;
  height: 5vh;
  margin-top: -10vh;
  animation-name: enter;
  animation-duration: 500ms;
  animation-fill-mode: forwards;

  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  z-index: 2;
}

.leave {
  animation-name: leave;
  animation-duration: 500ms;
  animation-fill-mode: forwards;
}

.background-popup::after {
  content: "";
  width: 0%;
  height: 100%;
  background: red;
  position: absolute;
  z-index: -1;
  animation-name: count;
  animation-duration: 5s;
  animation-fill-mode: forwards;
}

.error {
  background: rgb(88, 34, 34);
  color: white;
}

.success {
  background: rgb(5, 63, 1);
  color: white;
}

.success::after {
  background: rgba(32, 126, 25, 0.418);
}

@keyframes enter {
  from {
    bottom: -10vh;
  }
  to {
    bottom: 0vh;
  }
}

@keyframes leave {
  to {
    bottom: -10vh;
  }
  from {
    bottom: 0vh;
  }
}

@keyframes count {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
</style>
