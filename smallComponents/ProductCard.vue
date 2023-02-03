<template lang="html">
  <div
    class="product_card d-flex flex-column justify-content-between position-relative"
  >
    <nuxt-link class="mt-1" :to="`/${getLang}/product/${product.slug}`">
      <div class="product-card-banner d-flex align-items-center">
        <img :src="product.product_images[0].lg_img" :alt="product.title.ru" />
      </div>
    </nuxt-link>

    <div class="d-flex flex-column justify-content-between pt-4" style="">
      <div
        class="product_card_title d-flex flex-column justify-content-between"
      >
        <p v-if="hide" class="p_card_title_type">
          {{
            product.products_categories[0]?.title[getLang] ??
            product.products_categories[0].title.ru
          }}
        </p>
        <nuxt-link
          class="p_card_title"
          :to="`/${getLang}/product/${product.slug}`"
        >
          {{
            product?.title[getLang] ? product.title[getLang] : product.title.ru
          }}
        </nuxt-link>

        <p class="p_card_title_price" v-if="product.price">
          {{ product?.price }} СУМ
        </p>
        <p class="p_card_title_price-none" v-else></p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["product", "hide"],
  computed: {
    getLang() {
      return this.$store.getters.language;
    },
  },
};
</script>
<style lang="css">
a {
  text-decoration: none !important;
  color: #000;
}
.p_card_title_price-none {
  height: 20px;
  margin-bottom: 3px !important;
  margin-top: 10px;
}
.p_card_title {
  line-height: 20px !important;
  font-weight: 600 !important;
  font-size: 14px;
  font-family: "Montserrat", sans-serif !important;
  margin-top: 10px;
  transition: color 0.3s;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
  flex-grow: 1;
  max-height: 40px;
}
.p_card_title:hover {
  color: #777;
}
.p_card_title_type {
  font-size: 13px !important;
  letter-spacing: 0.5px !important;
  font-weight: 500 !important;
  color: #999 !important;
  margin-bottom: 0px !important;
  height: 15px;
  line-height: 15px;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  text-overflow: ellipsis;
  flex-grow: 1;
}
.p_card_title_price {
  font-weight: 500 !important;
  color: #000 !important;
  margin-bottom: 3px !important;
  margin-top: 10px;
  line-height: 20px !important;
  width: 100%;
  font-size: 14px;
}

.product-card-banner {
  aspect-ratio: 1/1 !important;
  background-position: center;
  background-size: cover;
  overflow: hidden;
  transition: 0.3s;
}
.product-card-banner img {
  width: 100%;
  height: 250px;
  object-fit: contain !important;
  transition: 0.5s;
}
.product_card {
  transition: 0.3s !important;
  font-family: "Montserrat", sans-serif !important;
}

.product-card-banner:hover img {
  transform: scale(1.2);
}
@media (min-width: 400px) and (max-width: 576px) {
  .p_card_title {
    line-height: 20px !important;
    height: 42px;
    font-size: 13px;
  }
  .p_card_title_type {
    font-size: 12px !important;
    line-height: 14px;
    height: 14px;
  }
  .p_card_title_price {
    font-weight: 500 !important;
    line-height: 20px !important;
    font-size: 12px;
  }
}
@media (min-width: 576px) and (max-width: 700px) {
  .p_card_title {
    line-height: 20px !important;
    height: 42px;
    font-size: 11px;
    margin-top: 10px;
  }
  .p_card_title_type {
    font-size: 10px !important;
  }
  .p_card_title_price {
    line-height: 20px !important;
    font-size: 10px;
  }
}
@media (max-width: 576px) {
  .product_card {
    padding: 10px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 5px;
  }
  .product-card-banner img {
    height: 160px;
  }
}
@media (min-width: 300px) and (max-width: 400px) {
  .p_card_title {
    line-height: 14px !important;
    height: 28px;
    font-size: 11px;
  }
  .p_card_title_type {
    font-size: 11px !important;
    line-height: 12px;
    height: 12px;
  }
  .p_card_title_price {
    margin-top: 10px;
    line-height: 12px !important;
    font-size: 12px;
  }

  .p_card_title_price-none {
    height: 10px;
    margin-bottom: 0 !important;
    margin-top: 10px;
  }
}
</style>
