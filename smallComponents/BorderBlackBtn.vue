<template lang="html">
  <div class="j-card-btn">
    <nuxt-link
      class="b-btn"
      :to="`/${getLang}/post-categories/1/posts?page=1`"
      >{{ name }}</nuxt-link
    >
  </div>
</template>
<script>
export default {
  props: ["name"],
  computed: {
    getLang() {
      return this.$store.getters.language;
    },
  },
};
</script>
<style lang="css">
.j-card-btn a:hover {
  border-bottom: 1px solid #000 !important;
}
.b-btn {
  border-color: rgba(0, 0, 0, 0.11) !important;
  font-size: 14px !important;
  border-bottom: 1px solid #e4e4e4 !important;
  text-transform: uppercase !important;
  transition: 0.4s;

  font-weight: 700 !important;
  font-size: 1rem !important;
  line-height: 26px;
  color: #000 !important;
  font-family: "Montserrat", sans-serif !important;
}
</style>
