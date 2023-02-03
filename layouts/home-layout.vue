<template lang="html">
  <div>
    <v-scroll-to-top></v-scroll-to-top>
    <HomeHeader :siteInfo="siteInfo" :language="language" />
    <Nuxt />
    <Footer :siteInfo="siteInfo" :categories="categories" />
  </div>
</template>
<script>
import HomeHeader from "@/components/Layout/HomeHeader.vue";
import Footer from "@/components/Layout/Footer.vue";

export default {
  head() {
    return {
      link: [
        { rel: "icon", type: "image/png", href: this.siteInfo.lg_favicon_path },
      ],
    };
  },
  data() {
    return {
      siteInfo: {},
      language: [],
      categories: [],
    };
  },
  components: {
    HomeHeader,
    Footer,
  },

  async mounted() {
    this.siteInfo = await this.__GET();
    this.language = await this.__GET1();
    this.categories = await this.__GET2();
  },
  methods: {
    __GET() {
      return this.$store.dispatch("site-info/fetchSiteInfo");
    },
    __GET1() {
      return this.$store.dispatch("language/fetchLanguage");
    },
    __GET2() {
      return this.$store.dispatch("categories/fetchCategories");
    },
  },
};
</script>
