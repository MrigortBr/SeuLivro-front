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
        <button @click="$router.push('/register')">Criar Conta</button>
      </div>
    </div>
    <div class="login">
      <h1>Login</h1>
      <div class="form">
        <input type="email" class="email" placeholder="Email" v-model="email" />
        <input type="password" class="password" placeholder="Password" v-model="password" />
        <button @click="login">Login</button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// eslint-disable-next-line import/no-extraneous-dependencies
import { DTOLogin, DTOLoginReturn } from "@/service/login/type";
import login, { validateParamsLogin } from "@/service/login/index";
import { validateSession } from "@/service/auth/index";
import { DTOUserResponse } from "@/service/auth/types";

export default defineComponent({
  name: "loginView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  async mounted() {
    const response: DTOUserResponse = await validateSession();
    if (response.status) {
      if (response.data) {
        this.$router.push("/home");
      }
    }
  },
  methods: {
    async login() {
      const dtoLogin: DTOLogin = {
        email: this.email,
        password: this.password,
      };
      const loginValid = validateParamsLogin(dtoLogin);
      if (loginValid === true) {
        const response = await login(dtoLogin);

        if (response.status) {
          this.$router.push("/home");
        } else {
          this.$emit("listenError", response);
        }
      } else if (typeof loginValid === "string") {
        const fakeResponse: DTOLoginReturn = {
          code: 411,
          message: loginValid,
          status: false,
        };
        this.$emit("listenError", fakeResponse);
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
  cursor: pointer;
}

.subtitle button:hover {
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

.login {
  background-color: #fff8bb;
  width: 30vw;
  height: 80vh;
  margin: auto;
  position: relative;
  border-radius: 20px;
  box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.4);
}

.login::after {
  position: absolute;
  content: " ";
  width: 30vw;
  height: 80vh;
  background: #ffe500;
  top: 2.5%;
  left: 2.5%;
  z-index: -1;
  border-radius: 20px;
  transition: 500ms;
}

.login h1 {
  font-family: "Imprima", sans-serif;
  font-size: 50px;
  width: fit-content;
  margin: 5% auto;
  text-align: center;
  position: relative;
}

.login h1::after {
  position: absolute;
  background: #ffe500;
  content: " ";
}

.login:hover h1::after {
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

.form {
  width: 100%;
  height: 80%;
  display: grid;
}

.email,
.password {
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
  font-size: 40px;
  box-sizing: border-box;
  padding: 0 5%;
}

.email:focus,
.password:focus {
  outline: 0;
}

.email::placeholder {
}

.email:hover,
.password:hover {
  transform: scale(1.01);
}

.form button:hover {
  transform: scale(1.11);
  box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
  -webkit-box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
  -moz-box-shadow: 0px 0px 19px 10px rgba(255, 230, 0, 0.4);
}

.form button {
  width: 60%;
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
  cursor: pointer;
}
</style>
