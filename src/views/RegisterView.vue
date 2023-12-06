<template>
  <main>
    <div class="left">
      <div class="logo">
        <img src="../assets/logo2.webp" alt="" />
        <span class="text"> Seu Livro </span>
      </div>
      <div class="subtitle">
        <h2>
          <a>Encontre os Melhores Livros</a> <br />
          Para os melhores gostos
        </h2>
        <button @click="$router.push('/login')">Fazer Login</button>
      </div>
    </div>
    <div class="logins">
      <div class="login div-login" :style="{ zIndex: swipePage == 1 ? 1 : 0 }">
        <h1>Registrar</h1>
        <div class="form" v-show="swipePage == 1">
          <input type="text" class="firstName input" placeholder="Nome" v-model="firstName" />
          <input type="text" class="lastName input" placeholder="Sobrenome" v-model="lastName" />
          <input type="email" class="email input" placeholder="Email" v-model="email" />
          <div class="identifier-div">
            <span id="type" @click="swipeType()">{{ typeIdentifier }}</span>
            <input type="text" id="identifier" class="identifier input" v-model="identifier" />
          </div>
          <input type="password" class="password input" placeholder="Senha" v-model="password" />
          <input
            type="date"
            class="birthDate input"
            placeholder="Data Nascimento"
            v-model="birthDate"
          />
          <button @click="passPage(2)">
            Proximo
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1
            .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0
            1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="login-second div-login">
        <h1>Registrar</h1>
        <div class="form">
          <img
            :src="image || require(`@/assets/user-default.svg`)"
            class="picture-user"
            alt=""
            @click="openFiles"
          />
          <input type="text" class="nickname input" placeholder="Apelido" v-model="nickname" />
          <button @click="passPage(1)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5
                0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
            Anterior
          </button>
          <button @click="register()">
            Cadastrar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1
            .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0
            1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </main>
  <input
    type="file"
    name=""
    id="files"
    style="position: absolute; opacity: 0"
    @change="handleImageChange"
  />
</template>

<script lang="ts">
import { DTOUserResponse } from "@/service/auth/types";
import { defineComponent } from "vue";
import { validateSession } from "@/service/auth";
import { DTORegister, DTORegisterReturn } from "@/service/register/type";
import { register, userRegisterIsValid } from "@/service/register/index";

export default defineComponent({
  name: "loginView",
  data() {
    return {
      swipePage: 1,
      firstName: "",
      lastName: "",
      birthDate: "",
      email: "",
      password: "",
      nickname: "",
      identifier: "",
      typeIdentifier: "CPF",
      image: "",
    };
  },
  async mounted() {
    const response: DTOUserResponse = await validateSession();
    if (response.status) {
      this.$router.push("/home");
    } else {
      // alert(response.message);
    }
  },
  methods: {
    passPage(page: number) {
      this.swipePage = page;
    },
    async register() {
      const dtoRegister: DTORegister = {
        firstName: this.firstName,
        lastName: this.lastName,
        nickname: this.nickname,
        birthDate: this.birthDate,
        password: this.password,
        email: this.email,
        identifier: this.identifier,
        typeIdentifier: this.typeIdentifier,
        image: this.image || "",
      };
      const userValid = userRegisterIsValid(dtoRegister);
      if (typeof userValid === "string") {
        const fakeResponse: DTORegisterReturn = {
          code: 411,
          message: userValid,
          status: false,
        };
        this.$emit("listenError", fakeResponse);
      } else {
        const response = await register(dtoRegister);
        if (response.status) {
          this.$router.push("/login");
          this.$emit("listenError", response);
        } else {
          this.$emit("listenError", response);
        }
      }
    },
    swipeType() {
      console.log("oii");
      if (this.typeIdentifier === "CPF") {
        this.typeIdentifier = "CNPJ";
      } else {
        this.typeIdentifier = "CPF";
      }
    },
    openFiles() {
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
              this.image = result;
            }
          };
          reader.readAsDataURL(selectedFile);
        }
      }
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Imprima&display=swap");
main {
  width: 100vw;
  height: 100vh;
  display: flex;
}

main::after {
  content: "";
  background-image: url("../assets/background-netflix.png");
  filter: brightness(0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-position: center;
  z-index: -2;
}

.logo {
  width: 25vw;
  display: flex;
  height: 16vh;
  box-sizing: border-box;
  padding: 0 2%;
}

.left {
  display: flex;
  flex-wrap: wrap;
  width: 50vw;
}

.logo img {
  height: 90%;
  width: fit-content;
}

.text {
  font-family: "Indie Flower", cursive;
  font-size: 40px;
  height: 90%;
  display: flex;
  align-items: end;
  color: white;
}

.subtitle {
  margin: calc((100vh - 16vh) / 4) 0;
  margin-left: 1vw;
}

.subtitle button {
  font-family: "Imprima", cursive;
  font-size: 50px;
  background-color: #ffe600;
  border: 0;
  border-radius: 25px;
  margin: auto;
  transition: 500ms;
  width: 50%;
}

.subtitle button:hover {
  cursor: pointer;
  transform: scale(1.1);
  box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
}

.subtitle a {
  font-family: "Imprima", sans-serif;
  color: #ffe500;
  font-size: 50px;
}

.subtitle h2 {
  font-family: "Indie Flower", cursive;
  color: #ffe500;
  font-size: 50px;
  margin-bottom: 2%;
}

.identifier-div {
  display: grid;
  grid-template-columns: 30% 70%;
}

.identifier-div span {
  height: 60%;
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
  position: relative;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  margin-left: 0;
}
</style>

<style scoped>
.logins {
  width: 30vw;
  height: 80vh;
  margin: auto;
  position: relative;
}

.div-login {
  background-color: #fff8bb;
  width: 30vw;
  height: 80vh;
  margin: auto;
  border-radius: 20px;
  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  position: absolute;
}

.login-second {
  background-color: #ffe500;
  top: 5%;
  left: 5%;
}

.div-login h1 {
  font-family: "Imprima", sans-serif;
  font-size: 50px;
  width: fit-content;
  margin: 5% auto;
  text-align: center;
  position: relative;
}

.div-login h1::after {
  position: absolute;
  background: #ffe500;
  content: " ";
}

.login-second h1::after {
  position: absolute;
  background: #a79600;
  content: " ";
}

.div-login:hover h1::after {
  animation-name: subli;
  animation-duration: 500ms;
  animation-fill-mode: forwards;
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
  }
}

.div-login .form {
  width: 100%;
  height: 80%;
  display: grid;
  grid-template-columns: 50% 50%;
}

.div-login .input {
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

input:focus {
  outline: 0;
}

.input:hover {
  transform: scale(1.01);
}

.form button:hover {
  transform: scale(1.05);
  box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
}

.form button {
  display: flex;
  width: fit-content;
  height: 40%;
  margin: auto;
  border: 0;
  border-radius: 20px;
  font-family: "Imprima", sans-serif;
  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  font-size: 30px;
  transition: 500ms;
  align-items: center;
  cursor: pointer;
}

.form button svg {
  width: fit-content;
  height: 100%;
}

.picture-user {
  grid-column-start: 1;
  grid-column-end: 3;
  position: relative;
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  margin: auto;
  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  object-fit: cover;
  object-position: center;
}

.nickname {
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;
  height: fit-content;
  margin: auto;
}
</style>
