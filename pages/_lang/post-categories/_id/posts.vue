<template lang="html">
  <div>
    <BreadCrumbComp
      :category="translate[getLang]?.posts.posts ?? translate.ru.posts.posts"
    />
    <PostCategory :lang="getLang" />
  </div>
</template>

<script>
import BreadCrumbComp from "@/components/BreadCrumbComp.vue";
import PostCategory from "@/components/Posts/PostCategory.vue";

export default {
  head: {
    title: "Все посты",
  },
  data() {
    return {
      translate: {
        ru: require("@/locales/ru.json"),
        uz: require("@/locales/uz.json"),
      },
    };
  },
  components: {
    BreadCrumbComp,
    PostCategory,
  },
  computed: {
    getLang() {
      return this.$store.getters.language;
    },
  },
};
</script>
<style lang="css"></style>
