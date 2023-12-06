<template>
  <main>
    <h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill=""
        class="bi bi-house"
        viewBox="0 0 16 16"
      >
        <path
          d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"
        />
      </svg>
      Novo Endereço
    </h1>
    <div class="address-all new">
      <input class="title" type="text" placeholder="Nome" v-model="newAddres.name" />
      <span>
        <input type="text" placeholder="Rua" style="width: 30%" v-model="newAddres.streetAddress" />
        &nbsp;-&nbsp;
        <input type="text" placeholder="Cidade " style="width: 40%" v-model="newAddres.city" />
        &nbsp;-&nbsp;
        <input type="text" placeholder="CEP" style="width: 20%" v-model="newAddres.postalCode" />
        &nbsp;-&nbsp;
        <input type="text" placeholder="UF" style="width: 10%" v-model="newAddres.acronymState" />
        &nbsp;-&nbsp;
        <input type="text" placeholder="Pais" style="width: 10%" v-model="newAddres.country" />
      </span>
      <input
        type="text"
        placeholder="Referencia"
        style="width: 90%; margin: auto; margin-left: 7%; height: fit-content"
        v-model="newAddres.reference"
      />
      <div class="buttons">
        <button class="check button-create" @click="createAddress">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-check"
            viewBox="0 0 16 16"
          >
            <path
              d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
            />
          </svg>
          Criar
        </button>
      </div>
    </div>
    <h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill=""
        class="bi bi-house"
        viewBox="0 0 16 16"
      >
        <path
          d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"
        />
      </svg>
      Meus Endereço
    </h1>
    <div class="address-all" v-for="add in address" :key="add.id">
      <input class="title" type="text" placeholder="Nome" v-model="add.name" />
      <span>
        <input type="text" placeholder="Rua" style="width: 30%" v-model="add.streetAddress" />
        &nbsp;-&nbsp;
        <input type="text" placeholder="Cidade " style="width: 40%" v-model="add.city" />
        &nbsp;-&nbsp;
        <input type="text" placeholder="CEP" style="width: 20%" v-model="add.postalCode" />
        &nbsp;-&nbsp;
        <input type="text" placeholder="UF" style="width: 10%" v-model="add.acronymState" />
        &nbsp;-&nbsp;
        <input type="text" placeholder="Pais" style="width: 10%" v-model="add.country" />
      </span>
      <input
        type="text"
        placeholder="Referencia"
        style="width: 90%; margin: auto; margin-left: 7%; height: fit-content"
        v-model="add.reference"
      />
      <div class="buttons">
        <button class="trash button" @click="deleteAddress(add.id)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash3"
            viewBox="0 0 16 16"
          >
            <path
              d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
            />
          </svg>
        </button>
        <button class="check button" @click="updateAddress(add)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-check"
            viewBox="0 0 16 16"
          >
            <path
              d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
            />
          </svg>
        </button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { registerAddress, listAddres, deleteAddress, updateAddress } from "@/service/address";
import { DTOAddress, DTOAddressRegister, DTOAddressReturn } from "@/service/address/type";

export default defineComponent({
  name: "AddressComp",
  data() {
    return {
      newAddres: {} as DTOAddressRegister,
      address: [] as DTOAddress[],
    };
  },
  async created() {
    const response = await listAddres();

    if (response.status) {
      if (response.data) {
        this.address = response.data;
      }
    } else {
      this.$emit("listenError", response);
    }
  },
  methods: {
    async createAddress() {
      const response = await registerAddress(this.newAddres);
      if (response.status) {
        location.reload;
      } else {
        this.$emit("listenError", response);
      }
    },
    async deleteAddress(id: string) {
      const response = await deleteAddress(id);
      this.$emit("listenError", response);
    },
    async updateAddress(address: DTOAddress) {
      const response = await updateAddress(address);
      this.$emit("listenError", response);
    },
  },
});
</script>

<style scoped>
main {
  width: 80vw;
  height: 75vh;
  margin: auto;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 100px 30vh;
  overflow-y: auto;
  padding-bottom: 2vh;
}

main h1 {
  color: white;
  display: flex;
  justify-items: start;
  align-items: end;
  text-wrap: nowrap;
  grid-column-start: 1;
  grid-column-end: 3;
  height: fit-content;
  font-size: 40px;
}

main h1 svg {
  height: 5vh;
  width: 5vh;
  min-width: 5vh;
  min-height: 5vh;
  margin-right: 2%;
  background: white;
  padding: 10px;
  border-radius: 15px;
}

.address-all {
  background: white;
  height: 30vh;
  display: grid;
  grid-template-columns: 70% 30%;
  padding: 1%;
  border-radius: 15px;
  width: 90%;
}

.address-all .title {
  grid-column-start: 1;
  grid-column-end: 3;
  font-size: 25px;
  margin: auto;
  width: 50%;
  text-align: center;
}

.address-all span {
  grid-column-start: 1;
  grid-column-end: 3;
  width: 90%;
  padding: 0 2.5%;
  margin: auto;
  display: flex;
  background: white;
  justify-content: center;
}

.address-all input {
  min-width: 40px;
  border: none;
  border-bottom: 1px solid black;
  font-size: 15px;
}

.address-all input:focus {
  outline: 0;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: auto;
  margin-right: 5%;
}

.buttons button {
  cursor: pointer;
}

.buttons .button {
  height: 6vh;
  width: 6vh;
  margin: auto;
  border-radius: 15px;
  border: 0;
  border: 1px solid black;
}

.buttons .button-create {
  border: 0;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  color: white;
  width: 60%;
  cursor: pointer;
}

.trash {
  background: red;
}

.check {
  background: green;
}

.button svg,
.button-create svg {
  width: 100%;
  height: fit-content;
  fill: white;
}

.buttons .button:focus {
  outline: 0;
  border: 1px solid black;
}
</style>
