import colors from 'vuetify/es5/util/colors'
import config from 'config'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'blog_nails_project',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: ''
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  loading: {
    color: 'blue',
    height: '4px',
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/axios.js', '~/plugins/vuePhoneNumber.js', '~plugins/filters.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
  ],
  server: {
    host: config.get('server.url.host'),
    port: config.get('server.url.port')
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', ],
  axios: {
    // proxy: true
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  env: {
    baseUrl: config.get('client.url'),
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: '/registration',
        path: '/registration',
        component: resolve(__dirname, 'components/registration.vue'),
      });
      routes.push({
        name: '/user',
        path: '/user/:id',
        component: resolve(__dirname, 'components/user_profile.vue')
      });
      routes.push({
        name: '/for_clients',
        path: '/for_clients',
        component: resolve(__dirname, 'components/aboutTheSystem/for_clients.vue'),
      });
      return routes;
    },

  }
}
