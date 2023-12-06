<template>
  <Header></Header>
  <div class="left">
    <img :src="store.image || require('@/assets/user-default.svg')" alt="" />
    <h1>{{ store.name }}</h1>
  </div>
  <div class="books">
    <h1 class="title">Livros Da Loja</h1>
    <div
      @click="$router.push(`/book/${book.id}`)"
      class="book"
      v-for="(book, index) in books"
      :key="index"
    >
      <img :src="book.image" alt="" />
      <h1>{{ book.title }}</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// eslint-disable-next-line import/no-extraneous-dependencies
import Header from "@/components/HeaderComp.vue";
import { getStore } from "@/service/store";
import { DTOBooksResponse } from "@/service/books/type";
import { DTOStoreProfile } from "@/service/store/type";

export default defineComponent({
  name: "StoreView",
  components: {
    Header,
  },
  data() {
    return {
      books: [] as DTOBooksResponse[],
      store: {} as DTOStoreProfile,
    };
  },
  async mounted() {
    if (typeof this.$route.params.uuid === "string" && this.$route.params.uuid !== "") {
      const result = await getStore(this.$route.params.uuid);
      console.log(result);
      if (result.status) {
        console.log(result.data);

        if (result.data) {
          this.books = result.data.books;
          this.store = result.data;
        }
      } else {
        this.$router.push("/home");
      }
    } else {
      this.$router.push("/home");
    }
  },
});
</script>

<style scoped>
.left {
  height: fit-content;
  background: white;
  margin: auto;
  width: 15vw;
  padding: 2% 1%;
  border-radius: 20px;
}

.left img {
  border-radius: 50%;
  height: 10vw;
  width: 10vw;
  box-sizing: border-box;
  object-fit: cover; /* ajusta para cobrir completamente a área */
}

.left h1 {
  font-size: 30px;
}

.books {
  height: 80vh;
  width: 70vw;
  background: white;
  margin: auto;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 33% 33% 33%;
  overflow-y: auto;
  overflow-x: hidden;
}

.books .title {
  grid-column-start: 1;
  grid-column-end: 4;
  text-align: start;
  padding: 0 2%;
}

.book {
  width: 90%;
  display: grid;
  border: 1px solid black;
  padding: 2%;
  border-radius: 20px;
  margin: 5% auto;
  cursor: pointer;
}

.book img {
  width: fit-content;
  margin: auto;
  height: 30vh;
}

.book h1 {
  width: 90%;
  margin: auto;
}
</style>
