<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" inset>
      <template #activator="{ on, attrs }">
        <button class="unUser-open" v-bind="attrs" v-on="on">
          <div class="unUser-img">
            <v-icon>mdi-account-circle</v-icon>
          </div>
          <span>Вхід або реєстрація</span>
        </button>
      </template>
      <v-sheet class="text-center auth-main main_block-style" height="500px">
        <p class="text-h6 font-weight-light mb-2">
          <span>
            <h3>«Nikki - Blog»</h3>
            персоналізований блог для твого відпочинку</span
          >
        </p>
        <v-alert text dense color="teal" icon="mdi-account-clock" border="left">
          Це необідно для того, щоб ви могли зі зручністю спілкуватись та
          користуватись нашим сервісом.
        </v-alert>

        <div class="my-3">
          <v-form>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="email"
                    :class="{
                      errorMessage: errorMessage.message === 'AuthError',
                    }"
                    :rules="emailRules"
                    label="E-mail"
                    clearable
                    type="email"
                    autocomplete="email"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    @keydown.enter="signIn"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model="password"
                    label="Password"
                    :counter="26"
                    :rules="passwordRules"
                    :class="{
                      errorMessage: errorMessage.message === 'AuthError',
                    }"
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    required
                    loading
                    @click:append="show1 = !show1"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    @keydown.enter="signIn"
                  >
                    <template #progress>
                      <v-progress-linear
                        :value="progress"
                        :color="color"
                        absolute
                        height="7"
                      ></v-progress-linear>
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <h2
                v-if="errorMessage.message === 'AuthError'"
                class="errorMessage"
              >
                Перевірте будь ласка введені дані!
              </h2>
              <v-btn
                class="ma-2"
                :loading="loading"
                :disabled="loading"
                outlined
                large
                @click="signIn"
              >
                Авторизуватись
              </v-btn>
            </v-container>
          </v-form>

          <div class="registration_block">
            <span
              >У вас ще немає акаунту? Зареєструйте прямо зараз
              <v-icon>mdi-account-check</v-icon>
            </span>
            <button class="unUser-open" @click="goToRegistration">
              <div class="unUser-img">
                <v-icon>mdi-account-outline</v-icon>
              </div>
              <span>Зареєструватись</span>
            </button>
          </div>
        </div>
      </v-sheet>
    </v-bottom-sheet>
    <v-overlay :value="overlay"></v-overlay>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';

import {
  required,
  maxLength,
  email,
  minLength,
} from 'vuelidate/lib/validators';
import api from '../plugins/api';

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, maxLength: maxLength(26), minLength: minLength(8) },
  },
  data: () => ({
    show1: false,
    sheet: false,
    overlay: false,
    email: '',
    password: '',
    loader: null,
    loading: false,
    errorMessage: '',
    emailRules: [
      (v) => !!v || 'Потрібний E-mail',
      (v) => /.+@.+\..+/.test(v) || 'E-mail пошта повинна бути дійсною',
    ],
    passwordRules: [
      (v) => !!v || 'Потрібний пароль',
      (v) =>
        (v && v.length <= 26) || 'Пароль повинен мати не більше 26 символів.',
      (v) => (v && v.length >= 8) || 'Пароль повинен мати не менше 8 символів.',
    ],
  }),
  computed: {
    progress() {
      return Math.min(100, this.password.length * 6);
    },
    color() {
      return ['error', 'warning', 'success'][Math.floor(this.progress / 40)];
    },
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      this.loader = null;
    },
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 2000);
    },
  },
  methods: {
    goToRegistration() {
      this.sheet = false;
      this.$router.push('/registration');
    },
    signIn() {
      this.loader = 'loading';
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loader = '';
      } else {
        // do your submit logic here
        api
          .login({
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            this.sheet = false;
            this.loading = false;
            this.email = '';
            this.password = '';
            this.errorMessage = '';
            console.log(response.config.headers);
            this.$store.commit('user/add', response.data.user);
          })
          .catch((error) => {
            this.errorMessage = error.response.data || error.message;
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.registration_block {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.unUser-open:hover {
  background: rgba(25, 52, 58, 0.16);
}
.unUser-open {
  cursor: pointer;
  position: relative;
  display: -ms-flexbox;
  display: flex;
  max-width: 245px;
  -ms-flex-align: center;
  align-items: center;
  padding: 8px 24px;
  border-radius: 10px;
  text-decoration: none;
  -webkit-transition: background-color 300ms ease;
  -o-transition: background-color 300ms ease;
  transition: background-color 300ms ease;
  .unUser-img {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 8px;
    border-radius: 50%;
    background: rgba(25, 52, 58, 0.16);
  }
  span {
    text-decoration: none;
  }
}
// auth button
.errorMessage {
  color: red;
  text-shadow: 0.5px 0.5px 0.5px black;
}
.auth-main {
  padding: 3rem;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.main_block-style {
  background-color: rgb(245, 245, 245) !important;
  padding: 4rem !important ;
}
</style>
