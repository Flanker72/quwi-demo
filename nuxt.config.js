export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'quwi-demo',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/validate'],

  // Enable Components autoimport
  components: [
    {
      path: '~/components/',
      prefix: 'q',
    },
  ],

  // Load global styles
  css: ['~/assets/styles/global'],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],

  router: {
    middleware: ['auth'],
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'auth/login', method: 'post', propertyName: 'token' },
          logout: { url: 'auth/logout', method: 'post' },
          user: false,
        },
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/',
      callback: false,
    },
  },

  axios: {
    proxy: true,
    prefix: '/api/',
    progress: false,
  },

  proxy: {
    '/api/': {
      target: 'https://api.quwi.com/v2/',
      pathRewrite: { '^/api/': '' },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      presets({ envName }) {
        return [
          [
            // Force set core-js version to proper build
            '@nuxt/babel-preset-app',
            { corejs: { version: 3 } },
          ],
        ]
      },
    },
    transpile: ['vee-validate/dist/rules'],
  },
}
