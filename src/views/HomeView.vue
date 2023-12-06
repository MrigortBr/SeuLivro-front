<template>
  <Header></Header>
  <div class="background">
    <h1 class="titles" v-if="books.length > 0">Descubra Novos Livros</h1>
    <div class="books" v-if="books.length > 0">
      <div
        class="book after after-red"
        v-for="(book, index) in books"
        :key="index"
        @click="$router.push(`book/${book.id}`)"
      >
        <img :src="book.image" alt="" />
        <h1>{{ book.title }}</h1>
      </div>
    </div>
    <h1 class="titles green" v-if="stores.length > 0">Descubra As Melhores Lojas</h1>
    <div class="stores" v-if="stores.length > 0">
      <div
        class="store after after-green"
        v-for="(store, index) in stores"
        :key="index"
        @click="$router.push(`store/${store.id}`)"
      >
        <img :src="store.image || require('@/assets/user-default.svg')" alt="" />
        <h1>{{ store.fantasyName }}</h1>
      </div>
    </div>
    <h1 class="titles orange" v-if="authors.length > 0">Leia os Melhores Autores</h1>
    <div class="authors" v-if="authors.length > 0">
      <div
        class="author after after-orange"
        v-for="(author, index) in authors"
        :key="index"
        @click="$router.push(`author/${author.id}`)"
      >
        <img :src="author.image || require('@/assets/user-default.svg')" alt="" />
        <h1>{{ author.nickname }}</h1>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/HeaderComp.vue";
import getHome from "@/service/home";
import { DTOUserSimple } from "@/service/auth/types";
import { DTOBooksSimple } from "@/service/books/type";
import { DTOStoreSimple } from "@/service/store/type";

export default defineComponent({
  name: "HomeView",
  components: {
    Header,
  },
  data() {
    return {
      books: {} as DTOBooksSimple[],
      authors: {} as DTOUserSimple[],
      stores: {} as DTOStoreSimple[],
      showElement: true,
    };
  },
  async mounted() {
    const response = await getHome();
    if (response.status) {
      if (response.data) {
        this.books = response.data.books;
        this.authors = response.data.authors;
        this.stores = response.data.stores;
      }
    }
  },
});
</script>

<style scoped>
.background {
  display: grid;
  grid-template-rows:
    40px 45vh
    40px 45vh
    40px 45vh;
  grid-row-gap: 7vh;
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  width: 90vw;
  margin: auto;
}
.background .titles {
  color: white;
  position: relative;
  height: fit-content;
  width: fit-content;
  padding-left: 2vh;
  height: 40px;
}

.titles::before {
  content: " ";
  width: 1.5vh;
  height: 100%;
  background: red;
  position: absolute;
  left: 0;
}

.green::before {
  background: green;
}

.orange::before {
  background: orange;
}
</style>

<style scoped>
.books,
.stores,
.authors {
  width: 90vw;
  display: grid;
  height: 45vh;
  grid-template-columns: 25vw 25vw 25vw;
  grid-column-gap: 5vw;
  margin: 0 auto;
  justify-content: center;
}
.book,
.store,
.author {
  display: grid;
  background: white;
  grid-template-rows: 30vh 10vh;
  min-width: 25vw;
  margin: auto;
  height: 45vh;
  border-radius: 15px;
  padding: 2.5vh 0;
  position: relative;
  cursor: pointer;
}

.after::after {
  content: " ";
  position: absolute;
  width: 100%;
  height: 100%;
  background: red;
  top: 5%;
  left: 0%;
  border-radius: 15px;
  z-index: -1;
  transition: 500ms;
}

.after:hover::after {
  left: 5%;
}

.after-red::after {
  background: red;
}

.after-green::after {
  background: green;
}

.after-orange::after {
  background: orange;
}

.book img,
.store img,
.author img {
  height: 30vh;
  width: 30vh/4;
  margin: auto;
}

.store img,
.author img {
  border-radius: 50%;
  width: 30vh;
  object-fit: cover;
}

.book h1,
.author h1,
.store h1 {
  height: 10vh;
}
</style>
