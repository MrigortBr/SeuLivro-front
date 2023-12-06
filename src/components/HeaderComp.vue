<template>
  <header>
    <div class="logo" @click="$router.push('/home')">
      <img src="../assets/logo2.webp" alt="" />
      <span class="text"> Seu Livro </span>
    </div>
    <div class="searchBar" @keyup="keyUp($event)">
      <select name="" id="" v-model="type">
        <option value="author">autor</option>
        <option value="book">livro</option>
        <option value="genre">genero</option>
      </select>
      <input type="text" v-model="search" placeholder="Faça sua busca" />
      <button class="search">
        <img v-if="search" src="../assets/search.svg" alt="" @click="searchText" />
      </button>
    </div>
    <div class="user">
      <img @click="$router.push('/history')" class="user-picture" src="@/assets/books.svg" alt="" />
      <img @click="$router.push('/myStore')" class="user-picture" src="@/assets/store.svg" alt="" />
      <img
        @click="$router.push('/profile')"
        class="user-picture"
        src="@/assets/user-default.svg"
        alt=""
      />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderComp",
  data() {
    return {
      search: "",
      type: "author",
    };
  },
  created() {
    const code = localStorage.getItem("AuthorCode");
    if (code !== null) {
      // window.location.href = code;
      this.$router.replace(code.split("#")[1]);
    }
  },
  methods: {
    searchText() {
      if (this.search !== "") {
        this.$router.replace(`/search/${this.type}?search=${this.search}`);
      }
    },
    keyUp(key: KeyboardEvent) {
      if (key.key === "Enter") this.searchText();
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");

header {
  width: 100vw;
  height: 10vh;
  background: #ffe500;
  display: grid;
  grid-template-columns: 25vw 50vw 25vw;
  position: relative;
}
</style>

<style scoped>
.logo {
  width: 25vw;
  display: flex;
  height: 10vh;
  box-sizing: border-box;
  padding: 0 2%;
  cursor: pointer;
  transition: 500ms;
}

.logo:hover {
  transform: scale(1.05);
}

.logo img {
  height: 90%;
  width: fit-content;
}

.text {
  font-family: "Indie Flower", cursive;
  font-size: 40px;
  height: 100%;
  display: flex;
  align-items: end;
  color: black;
}
</style>

<style scoped>
.searchBar {
  width: 100%;
  display: flex;
  margin: auto;
  border: 1px solid black;
  border-radius: 15px;
  height: 7vh;
  z-index: 1;
}

.searchBar > * {
  border: 0;
  z-index: 0;
  font-family: "Imprima", sans-serif;
}

.searchBar > *:focus {
  outline: 0;
}

.searchBar input {
  width: 80%;

  border-left: 1px solid black;
  font-size: 30px;
  box-sizing: content-box;
  padding: 0 2%;
}

.searchBar select {
  width: 20%;
  text-align: center;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  font-size: 30px;
}

.search {
  background: white;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 0 2%;
}

.search img {
  cursor: pointer;
}
</style>

<style scoped>
.user {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 60%;
  margin-left: auto;
}
.user-picture {
  height: 60%;
  width: fit-content;
  margin: auto;
  transition: 500ms;
}

.user-picture:hover {
  cursor: pointer;
  transform: scale(1.2);
}
</style>
