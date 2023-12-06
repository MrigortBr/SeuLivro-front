<template>
  <Header></Header>
  <div class="menu">
    <span :class="{ enable: page === 1 }" @click="switchStore(1)">
      <svg
        class="icon-menu"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path
          d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
        />
      </svg>
      <p>Informações</p>
    </span>
    <span :class="{ enable: page === 2 }" @click="switchStore(2)">
      <svg
        class="icon-menu"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"
        />
      </svg>
      <p>Livros</p>
    </span>
    <span :class="{ enable: page === 3 }" @click="switchStore(3)">
      <svg
        class="icon-menu"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"
        />
      </svg>
      <p>Vendas</p>
    </span>
  </div>
  <div class="store-info" v-if="page == 1">
    <img
      v-if="store.image !== null && store.image !== ''"
      @click="openFiles"
      :src="store.image"
      alt="imagem da loja"
    />
    <img
      v-if="store.image == null || store.image === ''"
      @click="openFiles"
      src="@/assets/user-default.svg"
      alt="imagem da loja"
    />
    <input id="files" type="file" @change="handleImageChange" />

    <input type="text" class="input" placeholder="Nome Da loja" v-model="store.name" />
    <input type="text" class="input" placeholder="Nome Fantasia" v-model="store.fantasyName" />
    <input
      type="text"
      id="description"
      class="input"
      placeholder="Descrição"
      v-model="store.description"
    />
    <input type="text" class="input" id="cnpj" placeholder="cnpj" v-model="store.cnpj" />
    <span
      id="isEnabled"
      class="input enabled"
      v-if="store.enabled"
      @click="() => (store.enabled = !store.enabled)"
      >Loja Visivel</span
    >
    <span
      id="isEnabled"
      class="input disabled"
      v-if="!store.enabled"
      @click="() => (store.enabled = !store.enabled)"
      >Loja Oculta</span
    >
    <button v-if="!newStore" id="delete" @click="deleteStore()">Deletar Loja</button>
    <button v-if="!newStore" id="update" @click="updateStore()">Atualizar Loja</button>
    <button v-if="newStore" id="create" @click="createStore()">Criar Loja</button>
  </div>
  <div class="books-info" v-if="page == 2">
    <div class="book" :key="index" v-for="(book, index) in books">
      <img class="image-book" alt="" :src="book.image" @click="openFilesBook(book)" />
      <input id="files" type="file" @change="handleImageChangeBook" />

      <input
        type="text"
        id="title"
        class="input edit"
        name="title"
        placeholder="title"
        v-model="book.title"
      />

      <input
        type="number"
        id="publicationYear"
        class="input edit"
        name="publicationYear"
        placeholder="Ano de publicação"
        v-model="book.publicationYear"
      />

      <input
        type="text"
        id="genre"
        name="genre"
        class="input edit"
        placeholder="genero"
        v-model="book.genre"
      />

      <input
        type="number"
        id="price"
        name="price"
        class="input edit"
        step="0.01"
        placeholder="preço"
        v-model="book.price"
      />

      <input
        type="number"
        id="stockQuantity"
        name="stockQuantity"
        class="input edit"
        placeholder="estoque"
        v-model="book.stockQuantity"
      />
      <span
        id="isEnabled"
        class="input edit enabled"
        v-if="book.enabled"
        @click="() => (book.enabled = !book.enabled)"
        >Livro Visivel</span
      >
      <span
        id="isEnabled"
        class="input edit disabled"
        v-if="!book.enabled"
        @click="() => (book.enabled = !book.enabled)"
        >Livro Oculto</span
      >
      <span v-if="book.authorId" id="author" class="input">Autor: {{ book.author }}</span>
      <input
        v-if="!book.authorId && book.linkAuthor"
        id="author"
        class="input"
        v-model="book.linkAuthor"
      />
      <span v-if="!book.authorId && !book.linkAuthor" id="author" class="input"
        >Gerar Link para autor</span
      >
      <button @click="generateUrl(book)" class="button" v-if="!book.authorId">
        Gerar Link de convite
      </button>
      <input
        type="text"
        id="description-book"
        name="description"
        class="input edit"
        placeholder="descricao"
        v-model="book.description"
      />
      <button class="button" @click="updateBook(book)">Atualizar</button>
    </div>
    <h1>Adicionar Novo Livro</h1>
    <div class="new-book">
      <img class="image-book" alt="" :src="newBook.image" @click="openFilesBook(newBook)" />

      <input id="files" type="file" @change="handleImageChangeBook" />

      <input
        type="text"
        id="title"
        class="input edit"
        name="title"
        placeholder="title"
        v-model="newBook.title"
      />

      <input
        type="number"
        id="publicationYear"
        class="input edit"
        name="publicationYear"
        placeholder="Ano de publicação"
        v-model="newBook.publicationYear"
      />

      <input
        type="text"
        id="genre"
        name="genre"
        class="input edit"
        placeholder="genero"
        v-model="newBook.genre"
      />

      <input
        type="number"
        id="price"
        name="price"
        class="input edit"
        step="0.01"
        placeholder="preço"
        v-model="newBook.price"
      />

      <input
        type="number"
        id="stockQuantity"
        name="stockQuantity"
        class="input edit"
        placeholder="estoque"
        v-model="newBook.stockQuantity"
      />
      <span
        id="isEnabled"
        class="input edit enabled"
        v-if="newBook.enabled"
        @click="() => (newBook.enabled = !newBook.enabled)"
        >Livro Visivel</span
      >
      <span
        id="isEnabled"
        class="input edit disabled"
        v-if="!newBook.enabled"
        @click="() => (newBook.enabled = !newBook.enabled)"
        >Livro Oculto</span
      >
      <input
        type="text"
        id="description-book"
        name="description"
        class="input edit"
        placeholder="descricao"
        v-model="newBook.description"
      />
      <button class="button" @click="createBook()">Criar</button>
    </div>
  </div>
  <div class="sale" v-if="page == 3">
    <span class="title-sales">Venda Total: </span>
    <span class="title-sales">Quantidade Total: </span>
    <span class="title-sales">Livros Vendidos: </span>
    <span class="value">{{
      formatPrice(actualSales.reduce((sales, sale) => sales + sale.price, 0))
    }}</span>
    <span class="value"
      >{{ actualSales.reduce((sales, sale) => sales + sale.quantity, 0) }} Livros</span
    >
    <select name="" id="" @change="selectBookForSale($event)">
      <option value="null">Todos</option>
      <option :key="index" v-for="(book, index) in salesNoRepet" :value="book.idBook">
        {{ book.title }}
      </option>
    </select>
    <div class="table">
      <table>
        <thead>
          <th>Id</th>
          <th>Imagem</th>
          <th>Titulo</th>
          <th>Data da compra</th>
          <th>Quantidade</th>
          <th>Preço da Venda</th>
        </thead>
        <tbody :key="index" v-for="(sale, index) in actualSales">
          <td>
            <a @click="$router.push(`book/${sale.idBook}`)">{{ sale.idBook }}</a>
          </td>
          <td><img :src="sale.image" alt="" /></td>
          <td>{{ sale.title }}</td>
          <td>{{ formatDate(sale.datePurchase) }}</td>
          <td>{{ sale.quantity }}</td>
          <td>{{ formatPrice(sale.price) }}</td>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// eslint-disable-next-line import/no-extraneous-dependencies
import Header from "@/components/HeaderComp.vue";
import { createStore, getMyStore, updateStore, deleteStore } from "@/service/store";
import { DTOStore, DTOStoreReturn } from "@/service/store/type";
import { DTOBooksResponse } from "@/service/books/type";
import { getMyBooks, updateBook, createBook } from "@/service/books";
import { getSales } from "@/service/history";
import { DTOSales } from "@/service/history/type";
import { generateUrl } from "@/service/invite/index";

export default defineComponent({
  name: "BookView",
  components: {
    Header,
  },
  data() {
    return {
      store: {} as DTOStore,
      page: 1 as number,
      books: {} as DTOBooksResponse[],
      newStore: false as boolean,
      actualBook: {} as DTOBooksResponse,
      newBook: {
        image: require("@/assets/updatePicture.svg"),
      } as DTOBooksResponse,
      sales: [] as DTOSales[],
      actualSales: [] as DTOSales[],
      salesNoRepet: [] as DTOSales[],
    };
  },
  async created() {
    if (this.page === 1) {
      await this.createdPage1();
    } else if (this.page === 2) {
      await this.createdPage2();
    } else if (this.page === 3) {
      await this.createdPage3();
    }
  },
  methods: {
    openFiles() {
      document.getElementById("files")?.click();
    },
    openFilesBook(book: DTOBooksResponse) {
      this.actualBook = book;
      document.getElementById("files")?.click();
    },
    handleImageChange(event: Event) {
      if (event && event.target instanceof HTMLInputElement) {
        const fileInput = event.target;

        if (fileInput.files && fileInput.files.length > 0) {
          const selectedFile = fileInput.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            const { result } = reader;
            if (typeof result === "string") {
              this.store.image = result;
            }
          };
          reader.readAsDataURL(selectedFile);
        }
      }
    },
    handleImageChangeBook(event: Event) {
      if (event && event.target instanceof HTMLInputElement) {
        const fileInput = event.target;

        if (fileInput.files && fileInput.files.length > 0) {
          const selectedFile = fileInput.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            const { result } = reader;
            if (typeof result === "string") {
              this.actualBook.image = result;
            }
          };
          reader.readAsDataURL(selectedFile);
        }
      }
    },
    async updateStore() {
      const response: DTOStoreReturn = await updateStore(this.store);
      if (response.status) {
        this.$emit("listenError", response);
      } else {
        this.$emit("listenError", response);
      }
    },
    async createStore() {
      const response: DTOStoreReturn = await createStore(this.store);
      if (response.status) {
        location.reload();
      } else {
        alert(response.message);
      }
    },
    async deleteStore() {
      const response: DTOStoreReturn = await deleteStore();
      if (response.status) {
        this.$router.push("/home");
        this.$emit("listenError", response);
      } else {
        this.$emit("listenError", response);
      }
    },
    switchStore(page: number) {
      this.page = page;
      if (page === 1 && this.store.name === undefined) {
        this.createdPage1();
      } else if (page === 2 && this.books[0] === undefined) {
        this.createdPage2();
      } else {
        this.createdPage3();
      }
    },
    async createdPage1() {
      const response = await getMyStore();
      if (response.data) {
        this.store = response.data;
      } else if (response.code === 404 && response.message === undefined) {
        this.store = {
          cnpj: "",
          description: "",
          enabled: true,
          fantasyName: "",
          image: "",
          name: "",
        };

        const update = document.getElementById("update");

        this.newStore = true;
      } else {
        this.$router.push("/login");
        this.$emit("listenError", response);
      }
    },
    async createdPage2() {
      const response = await getMyBooks();
      if (response.status && response.data !== undefined) {
        this.books = response.data;
      } else {
        this.$router.push("/login");
      }
    },
    async createdPage3() {
      const response = await getSales();

      if (response.status) {
        console.log(response);
        if (response.data !== undefined) {
          this.sales = response.data;
          this.actualSales = this.sales;
          this.salesNoRepet = this.sales.filter(
            (sale, index, self) =>
              index === self.findIndex((s: DTOSales) => s.idBook === sale.idBook)
          );
        }
      } else {
        console.log(response);
      }
    },
    async updateBook(book: DTOBooksResponse) {
      const response = await updateBook(book);
      this.$emit("listenError", response);
    },
    async createBook() {
      const response = await createBook(this.newBook);
      if (!response.status) {
        this.$emit("listenError", response);
      } else {
        location.reload();
      }
    },
    formatPrice(price: number | undefined) {
      // Verifica se o preço é um número
      if (typeof price === "number") {
        // Converte o preço para uma string formatada com duas casas decimais
        return `R$${price.toFixed(2).replace(".", ",")}`;
      }
      // Se o preço não for um número, retorna uma string vazia ou outra mensagem de erro
      return "";
    },
    selectBookForSale(event: Event) {
      const selectedId = (event.target as HTMLSelectElement).value;
      if (selectedId !== "null") {
        this.actualSales = this.sales.filter((sale) => sale.idBook === selectedId);
      } else {
        this.actualSales = this.sales;
      }
    },
    formatDate(dataString: Date, localizacao = "pt-BR", opcoes = {}) {
      const data = new Date(dataString);
      return data.toLocaleString(localizacao, opcoes);
    },
    async generateUrl(book: DTOBooksResponse) {
      const response = await generateUrl(book.id);
      if (response.status) {
        book.linkAuthor = `${window.location.host}/#/invite/open/${response.data}`;
      }
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Imprima&display=swap");

.store-info {
  display: grid;
  width: 80%;
  flex-wrap: wrap;
  grid-template-columns: 50% 50%;
  margin: auto;
  height: 80vh;
}

.store-info img {
  height: 25vh;
  min-height: 150px;
  grid-column-start: 1;
  grid-column-end: 3;
  margin: auto;
  border-radius: 50%;
  min-width: 150px;
  width: 25vh;
  object-fit: cover;
}

.input {
  width: 90%;
  height: 60%;
  margin: auto;
  border: 0;
  border-radius: 20px;
  font-family: "Imprima", sans-serif;
  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  position: relative;
  transition: 500ms;
  font-size: 20px;
  box-sizing: border-box;
  padding: 0 5%;
}

.input:focus {
  outline: 0;
  transform: scale(1.05);
  box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
}

.identifier-div {
  width: 90%;
  height: 60%;
  margin: auto;
  display: grid;
  grid-template-columns: 20% 80%;
}

.identifier-div span {
  height: 100%;
  margin: auto 0;
  background: white;
  margin-left: 5%;
  border-radius: 0;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-right: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  cursor: pointer;
}

#identifier {
  width: 100%;
  height: 100%;
  position: relative;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: 0;
}

#files {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

button {
  width: 90%;
  height: 60%;
  border-radius: 15px;
  border: 0;
  margin: auto;
  margin-bottom: 5vh;
  transition: 500ms;
  cursor: pointer;
  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  font-size: 20px;
}

button:hover {
  transform: scale(1.1);
}

#delete:hover {
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 0px 0px 19px 10px rgba(255, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(255, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(255, 0, 0, 0.4);
}

#update:hover,
#create:hover {
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 0px 0px 19px 10px rgba(0, 255, 42, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(0, 255, 42, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(0, 255, 42, 0.4);
}

#create {
  grid-column-start: 1;
  grid-column-end: 3;
  width: 95%;
}

#isEnabled {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  background: white;
}

.enabled {
  box-shadow: 0px 0px 19px 10px rgba(0, 255, 42, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(0, 255, 42, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(0, 255, 42, 0.4);
}

.disabled {
  box-shadow: 0px 0px 19px 10px rgba(255, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(255, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(255, 0, 0, 0.4);
}

#description {
  grid-column-start: 1;
  grid-column-end: 3;
  width: 95%;
}
</style>

<style scoped>
.books-info {
  display: grid;
  width: 100%;
  flex-wrap: wrap;
  grid-template-columns: 50% 50%;
  margin: auto;
  height: 80vh;
  overflow-y: auto;
}

h1 {
  text-align: start;
  margin: auto;
  grid-column-start: 1;
  grid-column-end: 3;
  position: relative;
  color: white;
}

h1::after {
  animation-name: subli;
  animation-duration: 500ms;
  animation-fill-mode: forwards;
  position: absolute;
  background: #ffe500;
  content: " ";
}

@keyframes subli {
  0% {
    bottom: -6px;
    left: -5%;
    height: 3px;
    width: 0%;
  }

  100% {
    bottom: -6px;
    left: -10%;
    height: 3px;
    width: 120%;
    border-radius: 50%;
  }
}

.book,
.new-book {
  display: grid;
  width: 80%;
  height: 65vh;
  grid-template-columns: repeat(4, 1fr);
  position: relative;
  grid-column-start: 1;
  grid-column-end: 3;
  border: 1px solid black;
  background: white;
  padding: 1%;
  border-radius: 15px;
  margin: 2% auto;
  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
}

.new-book {
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
.button {
  margin: auto;
  min-height: 5vh;
}
.edit {
  height: 40%;
}

#description-book {
  grid-column-start: 2;
  grid-column-end: 4;
  height: 60%;
  width: 95%;
}
.book .image-book,
.new-book .image-book {
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 5;
  height: 60vh;
  margin: auto;

  object-fit: cover;
}
#author {
  grid-column-start: 2;
  grid-column-end: 4;
  width: 95%;
  text-align: center;
  display: flex;
  align-items: center;
  margin: auto;
}
</style>

<style scoped>
.menu {
  width: 50vw;
  height: 6vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

<style scoped>
.sale {
  width: 80vw;
  height: 70vh;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 10% 10% 80%;
}

.sale .title-sales {
  height: fit-content;
  width: 70%;
  padding: 2% 10%;
  background: white;
  border-radius: 15px;
  margin: auto;
  margin-bottom: 0;
}

.value,
.sale select {
  height: 100%;
  width: fit-content;
  padding: 2% 5%;
  background: white;
  border-radius: 15px;
  margin: 0 auto;
  margin-top: 0;
  display: flex;
  align-items: center;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  text-align: center;
}

.sale table {
  width: 100%;
  height: 100%;
  margin: auto;
  box-shadow: 0px 0px 19px 10px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(0, 0, 0, 0.4);
}

.table {
  overflow-y: auto;
  grid-column-start: 1;
  grid-column-end: 4;
  width: 100%;
  height: 80%;
  margin: auto;
  overflow-x: hidden;
}

table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
  height: fit-content;
}
table thead {
  background: white;
  border: 1px solid black;
}

table img {
  width: 5vh;
}

td a {
  font-weight: bold;
}

td a:hover {
  cursor: pointer;
  text-decoration: underline;
}

table tbody {
  background: #858585;
  border: 1px solid black;
}
</style>
