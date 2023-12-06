<template>
  <Header></Header>
  <div class="index">
    <span
      class="book"
      :key="index"
      v-for="(book, index) in books"
      @click="$router.push(`/book/${book.id}`)"
    >
      <img :src="book.image" alt="" />
      <span class="book-info">
        <h1>{{ book.title }}</h1>
        <h2>Autor: {{ book.nameAuthor }}</h2>
        <h2>Loja: {{ book.nameStore }}</h2>
        <button>Ver Livro</button>
      </span>
    </span>
    <span
      class="author"
      :key="index"
      v-for="(author, index) in authors"
      @click="$router.push(`/author/${author.id}`)"
    >
      <img :src="author.image || require('../assets/user-default.svg')" alt="" style="" />
      <span class="book-info">
        <h1>{{ author.nickname }}</h1>
        <h2>Autor: {{ author.nameAuthor }}</h2>
        <button>Ver Obras</button>
      </span>
    </span>
    <span
      class="genre"
      :key="index"
      v-for="(genre, index) in genres"
      @click="$router.push(`/book/${genre.id}`)"
    >
      <img :src="genre.image" alt="" />
      <span class="book-info">
        <h1>{{ genre.title }}</h1>
        <h2>Autor: {{ genre.nameAuthor }}</h2>
        <h2>Loja: {{ genre.nameStore }}</h2>
        <button>Ver Livro</button>
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// eslint-disable-next-line import/no-extraneous-dependencies
import Header from "@/components/HeaderComp.vue";
import { getByGenre, getByNickName, getByTitleBook } from "@/service/search/index";
import { DTOSearchAuthor, DTOSearchBook, DTOSearchGenre } from "@/service/search/type";

export default defineComponent({
  name: "SearchView",
  components: {
    Header,
  },
  data() {
    return {
      books: [] as DTOSearchBook[],
      authors: [] as DTOSearchAuthor[],
      genres: [] as DTOSearchGenre[],
    };
  },

  async created() {
    const { type } = this.$route.params;
    const { search } = this.$route.query;

    await this.find(type.toString() || "", search?.toString() || "");
  },
  async beforeRouteUpdate(next) {
    const { type } = next.params;
    const { search } = next.query;
    await this.find(type.toString() || "", search?.toString() || "");
  },
  methods: {
    async find(type: string, search: string) {
      this.books = [];
      this.genres = [];
      this.authors = [];
      if (type !== "" && search !== "" && typeof search === "string" && typeof type === "string") {
        switch (type) {
          case "book":
            const responseBook = await getByTitleBook(search);

            if (responseBook.data) {
              this.books = responseBook.data;
            }
            break;
          case "author":
            const responseAuthor = await getByNickName(search);

            if (responseAuthor.data) {
              this.authors = responseAuthor.data;
            }
            break;
          case "genre":
            const responseGenre = await getByGenre(search);

            if (responseGenre.data) {
              this.genres = responseGenre.data;
            }
            break;
          default:
            break;
        }
      } else {
        this.$router.push("/home");
      }
    },
  },
});
</script>

<style scoped>
.index {
  display: grid;
  width: 80vw;
  height: 85vh;
  overflow-y: auto;
  margin: auto;
  font-family: "Indie Flower", cursive;
}

.index .book,
.author,
.genre {
  position: relative;
  padding: 2%;
  border-radius: 15px;
  margin: 2% auto;
  height: 25vh;
  width: 80%;
  display: flex;
  background: white;
  transition: 500ms;

  cursor: pointer;
  border-bottom: 1px solid transparent;
  border-right: 1px solid transparent;
}

.book:hover {
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  width: 85%;
}

.author img {
  height: 25vh;
  width: 25vh;
  object-fit: cover;
  border-radius: 50%;
}

.book::after,
.author::after,
.genre::after {
  content: " ";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #ffe600;
  top: 0;
  left: 0;
  border-radius: 15px;
  z-index: -1;
  transition: 500ms;
}

.book:hover::after,
.genre:hover::after,
.author:hover::after {
  top: 5%;
  left: 2.5%;
}

.index span img {
  height: 100%;
}

.book-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100%;
  width: 100%;
}

.book-info h1,
.book-info h2 {
  margin: auto 0;
  text-align: left;
  padding: 0 2%;
}

.book-info button {
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 4;
  height: 10vh;
  width: 60%;
  margin: 0 auto;
  margin-top: auto;
  background-color: #ffe600;
  transition: 500ms;
  border: 0;
  border-radius: 15px;
  cursor: pointer;
  position: relative;
  z-index: 0;
}

.book-info button:hover {
  transform: scale(1.1);
}
</style>
