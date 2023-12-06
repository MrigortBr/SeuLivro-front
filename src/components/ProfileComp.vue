<template>
  <div class="user-info">
    <img
      v-if="user.image !== null && user.image !== ''"
      @click="openFiles"
      :src="user.image"
      alt="imagem do usuario"
    />
    <img v-else @click="openFiles" src="@/assets/user-default.svg" alt="imagem do usuario" />
    <input type="text" class="input" id="nickname" placeholder="Apelido" v-model="user.nickname" />
    <input type="text" class="input" placeholder="Primeiro Nome" v-model="user.firstName" />
    <input type="text" class="input" placeholder="Sobrenome" v-model="user.lastName" />
    <input type="date" class="input" placeholder="Data de Nascimento" v-model="user.birthDate" />
    <input type="email" class="input" placeholder="E-mail" v-model="user.email" />
    <div class="identifier-div">
      <span id="type" @click="swipeType()">{{ user.typeIdentifier }}</span>
      <input type="text" class="input" id="identifier" v-model="user.identifier" />
    </div>
    <input id="files" type="file" @change="handleImageChange" />
    <span
      id="isEnabled"
      :class="{ enabled: user.enabled, disabled: !user.enabled }"
      class="input"
      @click="swipeTypeAccount()"
    ></span>
    <input type="password" class="input" placeholder="Senha Nova" v-model="user.password" />
    <button id="delete">Deletar Conta</button>
    <button id="update" @click="updateUser">Atualizar Conta</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getUser, updateUser } from "@/service/profile";
import { DTOProfile } from "@/service/profile/type";

export default defineComponent({
  name: "ProfileComp",
  data() {
    return {
      user: {} as DTOProfile,
    };
  },
  async created() {
    const response = await getUser();
    if (response.data) {
      this.user = response.data;
      const input = document.getElementById("isEnabled");
      if (this.user.enabled && input !== null) {
        input.innerHTML = "Conta Ativada";
      } else if (input !== null) {
        input.innerHTML = "Conta Oculta";
      }
      console.log(this.user.image);
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
    openFiles() {
      document.getElementById("files")?.click();
    },
    swipeType() {
      if (this.user.typeIdentifier === "CPF") {
        this.user.typeIdentifier = "CNPJ";
      } else {
        this.user.typeIdentifier = "CPF";
      }
    },
    swipeTypeAccount() {
      const input = document.getElementById("isEnabled");
      if (this.user.enabled && input !== null) {
        this.user.enabled = false;
        input.innerHTML = "Conta Oculta";
      } else if (input !== null) {
        this.user.enabled = true;
        input.innerHTML = "Conta Ativada";
      }
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
              this.user.image = result;
            }
          };
          reader.readAsDataURL(selectedFile);
        }
      }
    },
    async updateUser() {
      const response = await updateUser(this.user);
      this.$emit("listenError", response);
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Imprima&display=swap");

.user-info {
  display: grid;
  width: 80%;
  flex-wrap: wrap;
  grid-template-columns: 50% 50%;
  margin: auto;
  margin-top: 0;
  height: 80vh;
}

.user-info img {
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

  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  font-size: 20px;
}

#delete:hover {
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 0px 0px 19px 10px rgba(255, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(255, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(255, 0, 0, 0.4);
}

#update:hover {
  cursor: pointer;
  transform: scale(1.05);
  box-shadow: 0px 0px 19px 10px rgba(0, 255, 42, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(0, 255, 42, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(0, 255, 42, 0.4);
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
</style>
