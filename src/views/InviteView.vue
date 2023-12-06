<template>
  <Header></Header>
  <div class="book-invite">
    <img :src="book.image" alt="" />
    <h1>{{ book.name }}</h1>
    <button @click="acceptBook()">Assumir autoria</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// eslint-disable-next-line import/no-extraneous-dependencies
import Header from "@/components/HeaderComp.vue";
import { getBookInvited, acceptBook } from "@/service/invite/index";
import { DTOSimple } from "@/service/invite/type";

export default defineComponent({
  name: "InvitwView",
  components: {
    Header,
  },
  data() {
    return {
      code: "",
      book: {} as DTOSimple,
    };
  },
  async created() {
    const { code } = this.$route.params;
    if (localStorage.getItem("JWTKey")) {
      if (typeof code === "string") {
        this.code = code;
        const r = await getBookInvited(code);
        if (r.data !== undefined) {
          this.book = r.data;
        }
      }

      localStorage.removeItem("AuthorCode");
    } else {
      await localStorage.setItem(
        "AuthorCode",
        `${window.location.host}/#/invite/open/${code.toString()}`
      );
      this.$router.push("/login");
    }
  },
  methods: {
    async acceptBook() {
      const response = await acceptBook(this.code);

      if (response.status) {
        this.$router.push(`/book/${this.book.id}`);
      } else {
        alert(response.message);
      }
    },
  },
});
</script>

<style scoped>
.book-invite {
  height: fit-content;
  display: grid;
  margin: 0 auto;
  width: fit-content;
  background: white;
  padding: 2%;
  border-radius: 15px;
  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
}

.book-invite button {
  border: 0;
  font-size: 20px;
  background-color: #ffe500;
  border-radius: 15px;
  height: 100%;
  margin: auto;
  width: 90%;
  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  transition: 500ms;
}

.book-invite button:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
}

.book-invite img {
  height: 40vh;
  margin: auto;
}
</style>
