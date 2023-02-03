export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "wood-site",
    target: "server",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "",
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "Woodline,Cheap Furniture,table, stucco,furniture,chair,office chairs,Cheap,стол, стул,Офисные кресла,Дешевая мебель,кресла,офис,мебель,Арзон Мебеллар,Arzon,Мебель,Mebillar,Kreslolar,Ofis kerslolari,Ofis",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    script: [
      {
        src: "https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit",
      },
    ],
    // link: [{ rel: "icon", type: "image/png", href: "/short_logo.png" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@fortawesome/fontawesome-svg-core/styles.css",
    "element-ui/lib/theme-chalk/index.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  fontawesome: {
    icons: {
      solid: true,
      brands: true,
    },
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "@nuxtjs/axios",
    "@nuxtjs/i18n",
    "@nuxtjs/recaptcha",
    "bootstrap-vue/nuxt",
    "nuxt-element-ui",
    "vue-yandex-maps/nuxt",
    "nuxt-i18n",
    "@nuxtjs/proxy",
  ],

  i18n: {
    locales: ["ru", "en"],
    defaultLocale: "ru",
    vueI18n: {
      fallbackLocale: "ru",
      messages: {
        en: {
          curLang: "en",
        },
        ru: {
          curLang: "ru",
        },
      },
    },
  },
  recaptcha: {
    hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
    language: "en", // Recaptcha language (v2)
    // mode: String,       // Mode: 'base', 'enterprise'
    siteKey: "6LdlkNEiAAAAAKEt2rLVxjel1xMpjUjhFKKvLIUV", // Site key for requests
    version: 2, // Version
    // size: String        // Size: 'compact', 'normal', 'invisible' (v2)
  },
  elementUI: {
    components: ["Button", "DatePicker", "Pagination", "Collapse"],
    locale: "",
  },
  mode: "spa",
  axios: { baseURL: "https://plaza.choopon.uz/api" },
  // Build Configuration: https://go.nuxtjs.dev/config-build

  build: {
    vendor: ["aos"],
  },
  plugins: [
    { src: "~/plugins/aos", ssr: false },
    { src: "~plugins/v-scroll-to-top.js", ssr: false },
    { src: "~plugins/element-ui.js", ssr: false },
    { src: "~plugins/vue-i18n.js", ssr: false },
    { src: "~/plugins/vue-ripple-directive.js", ssr: false },
    { src: "~/plugins/vue-toast-notifitation.js", ssr: false },
  ],
  css: ["aos/dist/aos.css", "vue-toast-notification/dist/theme-sugar.css"],
};
