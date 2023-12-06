<template>
  <Header></Header>
  <div class="menu">
    <span :class="{ enable: page === 1 }" @click="page = 1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="icon-menu"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path
          d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
        />
      </svg>
      <p>Informações</p>
    </span>
    <span :class="{ enable: page === 2 }" @click="page = 2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="icon-menu"
        viewBox="0 0 16 16"
      >
        <path
          d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"
        />
      </svg>
      <p>Endereços</p>
    </span>
  </div>
  <ProfileComp v-if="page == 1" @listenError="listenError"></ProfileComp>
  <AddressComp v-if="page == 2" @listenError="listenError"></AddressComp>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// eslint-disable-next-line import/no-extraneous-dependencies
import Header from "@/components/HeaderComp.vue";
import ProfileComp from "@/components/ProfileComp.vue";
import AddressComp from "@/components/AddressComp.vue";
import { Error } from "@/service/error/type";

export default defineComponent({
  name: "BookView",
  components: {
    Header,
    ProfileComp,
    AddressComp,
  },
  data() {
    return {
      page: 1,
    };
  },
  methods: {
    listenError(response: any) {
      this.$emit("listenError", response);
    },
  },
});
</script>

<style scoped>
.menu {
  width: 50vw;
  height: 6vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 1% auto;
}

.menu span {
  display: grid;
  grid-template-columns: 25% 75%;
  min-width: 50%;
  max-width: 60%;
  background: white;
  padding: 0 2%;
  border-radius: 15px;
  margin: auto;
  box-shadow: 0px 0px 19px 10px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: 500ms;
}

.menu span:hover {
  box-shadow: 0px 0px 19px 10px rgba(0, 255, 42, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(0, 255, 42, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(0, 255, 42, 0.4);
  transform: scale(1.1);
}

span .enable {
  box-shadow: 0px 0px 19px 10px rgba(0, 255, 42, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(0, 255, 42, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(0, 255, 42, 0.4);
  transform: scale(1.1);
  background: red;
}

.icon-menu {
  height: 100%;
  width: 100%;
  margin: auto;
  margin-right: 2%;
}
</style>
