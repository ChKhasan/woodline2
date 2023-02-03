<template lang="html">
  <div class="container container-xl card_box">
    <div class="grid-container">
      <ProductCard
        v-for="(item, index) in products"
        data-aos="fade-up"
        data-aos-duration="900"
        :data-aos-delay="(1 + ((index * 1) % 4)) * 100"
        :hide="true"
        :product="item"
      />
      <ShoppingCard
        v-for="(item, index1) in category"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="900"
        :key="item.id"
        :category="item"
        :gridClass="`shopping_card-grid${index1 + 1}`"
      />
    </div>
    <div class="d-flex justify-content-center my-5">
      <nuxt-link
        to="/products?page=1"
        class="btn btn-outline-primary text-uppercase shop_now_btn-shop"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="800"
        >{{
          translate[getLang]?.homepage.shownow ?? translate.ru.homepage.shownow
        }}</nuxt-link
      >
    </div>
  </div>
</template>
<script>
import ProductCard from "../../smallComponents/ProductCard.vue";
import ShoppingCard from "../../smallComponents/ShoppingCard.vue";

export default {
  props: ["products", "category"],
  data() {
    return {
      translate: {
        ru: require("@/locales/ru.json"),
        uz: require("@/locales/uz.json"),
      },
    };
  },
  computed: {
    getLang() {
      return this.$store.getters.language;
    },
  },

  components: {
    ProductCard,
    ShoppingCard,
  },
};
</script>
<style lang="css">

</style>
