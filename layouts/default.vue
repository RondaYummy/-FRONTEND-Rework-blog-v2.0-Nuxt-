<template>
  <v-app light>
    <v-app-bar fixed app height="80px" class="app-bar" flat color="white">
      <div class="d38"></div>
      <nuxt-link to="/" class="tittle">
        <v-toolbar-title v-text="title" />
      </nuxt-link>

      <search-form />
      <v-spacer />

      <authComponent v-if="!loginIn" />
      <v-badge
        v-if="loginIn"
        :content="messages"
        :value="messages"
        color="green"
        overlap
        class="awatar_main"
      >
        <v-row justify="center">
          <v-menu bottom min-width="200px" rounded offset-y>
            <template #activator="{ on }">
              <v-btn icon x-large v-on="on">
                <v-avatar color="brown" size="48">
                  <span class="white--text text-h5">
                    {{ user.firstName[0] }}{{ user.lastName[0] }}
                  </span>
                </v-avatar>
              </v-btn>
            </template>
            <v-card>
              <v-list-item-content class="justify-center">
                <div v-if="user" class="mx-auto text-center">
                  <v-avatar color="brown">
                    <span class="white--text text-h5">
                      {{ user.firstName[0] }}{{ user.lastName[0] }}
                    </span>
                  </v-avatar>
                  <h3>{{ user.firstName }} {{ user.lastName }}</h3>
                  <p class="text-caption mt-1">
                    {{ user.email }}
                  </p>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text @click="getUser">
                    Go to profile
                  </v-btn>
                  <v-divider class="my-3"></v-divider>
                  <v-btn depressed rounded text @click="logout(user._id)">
                    Disconnect
                  </v-btn>
                </div>
              </v-list-item-content>
            </v-card>
          </v-menu>
        </v-row>
      </v-badge>
    </v-app-bar>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ disconnectText }}

      <template #action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-main>
      <!-- <v-container> -->
      <nuxt />
      <!-- </v-container> -->
    </v-main>

    <v-footer :absolute="!fixed" app class="footer">
      <span> &copy;2021 &mdash; {{ new Date().getFullYear() }} </span>
      <span>
        <span>«{{ title }}»</span> – ПЕРСОНАЛІЗОВАНИЙ БЛОГ ДЛЯ ІДЕАЛЬНОГО
        СПІЛКУВАННЯ
      </span>
      <!-- Start SVG Image for filter #goo -->
      <div style="display: none">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
          <circle cx="420" cy="150" fill="#3498db" filter="url(#goo)" r="80" />
          <circle cx="200" cy="150" fill="#3498db" filter="url(#goo)" r="80" />
        </svg>
      </div>
      <!-- End SVG Image for filter #goo -->
    </v-footer>
  </v-app>
</template>

<script>
import api from '../plugins/api';
import { tittle } from '../config/default.json';
import authComponent from '../components/authorization.vue';
import searchForm from '../components/searchForm.vue';

export default {
  components: {
    authComponent,
    searchForm,
  },
  data() {
    return {
      fixed: false,
      title: tittle,
      messages: 66,
      show: false,
      snackbar: false,
      disconnectText: 'You are logged out.',
      timeout: 2000,
      loginIn: false,
      page: null,
      loading: false,
      items: [],
      search: null,
      select: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
  },

  watch: {
    user() {
      this.loginIn = true;
    },

    group() {
      this.drawer = false;
    },
  },
  methods: {
    async logout(id) {
      await api.logout(id);
      // TODO Продумати логіку дисконекту
      this.snackbar = true;
      this.$router.push(`/`);
    },

    getUser() {
      this.$router.push(`user/${this.$store.state.user.user._id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  text-decoration: none;
}
.navIcons {
  position: absolute;
  top: 50%;
  padding: 20px;
  width: 24px;
  height: 24px;
  left: 12px;
  border-radius: 50%;
  color: rgba(25, 52, 58, 0.64);
  z-index: 1400;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: color 300ms ease, background 300ms ease;
  -o-transition: color 300ms ease, background 300ms ease;
  transition: color 300ms ease, background 300ms ease;
}
.nav-drawer {
  padding-top: 5rem;
  background: #19343a;
  color: rgba(255, 255, 255, 0.64);
}
.app-bar {
  padding-left: 13px;
  padding-right: 33px;
  z-index: 20;
}

.awatar_main {
  margin: 30px;
}
.tittle {
  margin-right: 2rem;
}
.listItem {
  width: 50px;
  height: 10px;
  display: flex;
}

// start листочок LOGO
.d38 {
  width: 1.25em;
  height: 1.25em;
  margin: 1em 1.5em 2.5em 6em;
  border-radius: 100% 0;
  background: #32336b;
  box-shadow: -1.5em 1.5em #32336b;
  position: relative;
}
.d38:before,
.d38:after {
  content: '';
  width: 1.25em;
  height: 1.25em;
  margin: 0.5em 1.5em;
  border-radius: 0 100%;
  background: #32336b;
  position: absolute;
  left: -3em;
  top: -0.5em;
  box-shadow: 1.5em 1.5em #32336b;
  transform-origin: 1.375em 1.375em;
}
.d38:before {
  transform: rotate(-30deg);
}
.d38:after {
  transform: rotate(30deg);
}
// Листочок end

// start footer
.footer {
  margin-top: auto;
  padding: 20px;
  background: #e4e5eb;
}
// end footer
</style>
