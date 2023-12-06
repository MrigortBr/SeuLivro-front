<template>
  <Header></Header>
  <div class="background">
    <div class="book">
      <img :src="book.image" alt="" />
      <h1>{{ book.title }}</h1>
      <h2>{{ book.author }}</h2>
    </div>
    <div class="finish">
      <h1>Detalhes Compra</h1>
      <h2>Preço: {{ formatPrice(book.price) }}</h2>
      <span class="quantity"
        ><a @click="changeQuantity(1)">+</a>{{ quantity }}<a @click="changeQuantity(-1)">-</a></span
      >
      <h2>Preço Final:{{ formatPrice(priceFinal) }}</h2>

      <button @click="buy">Finalizar Compra</button>
    </div>
    <div class="address">
      <h1>{{ actualAddres.name }}</h1>
      <p>
        {{ actualAddres.streetAddress }} - {{ actualAddres.city }} -
        {{ actualAddres.acronymState }} - {{ actualAddres.country }} - {{ actualAddres.postalCode }}
      </p>
      <span>{{ actualAddres.reference }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/HeaderComp.vue";
import { DTOBooksSimpleBuy } from "@/service/books/type";
import { DTOAddress } from "@/service/address/type";
import { buyBook, getByUUID } from "@/service/books";
import { listAddres } from "@/service/address";
import { DTOLoginReturn } from "@/service/login/type";

export default defineComponent({
  name: "PaymentView",
  components: {
    Header,
  },
  data() {
    return {
      book: {} as DTOBooksSimpleBuy,
      address: [] as DTOAddress[],
      actualAddres: {} as DTOAddress,
      quantity: 1,
      priceFinal: 0,
    };
  },
  async created() {
    if (typeof this.$route.params.uuid === "string" && this.$route.params.uuid !== "") {
      const bookResponse = await getByUUID(this.$route.params.uuid);
      console.log(bookResponse);
      if (bookResponse.status) {
        if (bookResponse.data) {
          this.book = bookResponse.data;
          this.priceFinal = this.book.price * this.quantity;
          const response = await listAddres();
          if (response.status) {
            if (response.data) {
              if (response.data.length === 0) {
                const fakeResponse: DTOLoginReturn = {
                  code: 411,
                  message: "Cadastre um endereço primeiro",
                  status: false,
                };
                this.$emit("listenError", fakeResponse);
                this.$router.push("/profile");
              } else {
                this.address = response.data;
                this.actualAddres = response.data[0];
              }
            }
          }
        }
      }
    }
  },
  methods: {
    formatPrice(price: number | undefined) {
      // Verifica se o preço é um número
      if (typeof price === "number") {
        // Converte o preço para uma string formatada com duas casas decimais
        return `R$${price.toFixed(2).replace(".", ",")}`;
      }
      // Se o preço não for um número, retorna uma string vazia ou outra mensagem de erro
      return "";
    },
    changeQuantity(value: number) {
      if (this.quantity + value > 0) {
        this.quantity += value;
        this.priceFinal = this.book.price * this.quantity;
      }
    },
    async buy() {
      const response = await buyBook(this.book.id, this.actualAddres.id, this.quantity);

      if (response.status) {
        this.$router.push("/history");
        console.log(response);
        this.$emit("listenError", response);
      } else {
        this.$emit("listenError", response);
      }
    },
  },
});
</script>

<style>
.background {
  display: grid;
  width: 80%;
  height: 80vh;
  grid-template-columns: 50% 50%;
  grid-template-rows: 50% 50%;
  margin: auto;
}

.book {
  background: white;
  display: flex;
  display: grid;
  grid-template-columns: 50% 50%;
  height: 80%;
  border-radius: 15px;
}
.book h1 {
  text-align: start;
}

.book h2 {
  text-align: start;
}

.book img {
  width: 50%;
  height: 80%;
  margin: auto;
  grid-row-start: 1;
  grid-row-end: 3;
}

.address {
  width: 100%;
  background: white;
  height: 100%;
  border-radius: 15px;
}

.address h1 {
  font-size: 40px;
}

.address p {
  font-size: 25px;
}

.address span {
  width: 100%;
  height: 100%;
  font-size: 20px;
}

.finish {
  height: 100%;
  background: white;
  width: 80%;
  margin: auto;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 3;
  border-radius: 15px;
  display: grid;
}

.finish button {
  height: 80%;
  width: 60%;
  margin: auto;
  border: 0;
  border: 1px solid black;
  border-radius: 20px;
  background: #ffe600;
  cursor: pointer;
  transition: 500ms;
  font-size: 30px;
}

button:hover {
  transform: scale(1.1);
  box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
}

.quantity {
  border: 0;
  background: #ffe500;
  width: 30%;
  font-size: 50px;
  padding: 0 5%;
  margin: auto;
  border-radius: 15px;
  height: fit-content;
  cursor: pointer;
  display: flex;
}

.quantity a {
  border-radius: 20px;
  height: 80%;
  font-size: 40px;
  margin: auto;
}
</style>
