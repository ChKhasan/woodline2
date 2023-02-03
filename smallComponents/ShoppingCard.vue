<template lang="">
  <div
    class="shopping_card gr-start-lg-2 grid-item px-sm-5 px-3 py-sm-4 py-3"
    :class="gridClass"
    :style="{ 'background-image': `url(${category.lg_img})` }"
  >
    <div class="sh_control_box d-flex flex-column justify-content-between">
      <div class="sh_title">
        <h1>
          {{ category.title.ru }} <br />
          <!-- category -->
        </h1>
      </div>
      <div>
        <router-link
          :to="`/${getLang}/categories/${category.id}/products?page=1`"
          class="btn btn-outline-primary text-uppercase shop_now_btn-shop"
          >{{
            translate[getLang]?.homepage.buynow ?? translate.ru.homepage.buynow
          }}</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["gridClass", "category"],
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
};
</script>
<style lang="css">
.shopping_card {
  background-position: center;
  background-size: cover;
  display: grid;
  height: 100%;
  cursor: pointer;
  padding-top: 40px !important;
  font-family: "Montserrat", sans-serif !important;
  transition: transform 0.5s !important;
}
.shopping_card:hover {
  transform: translateY(-10px) !important;
}
.sh_title {
  max-width: 300px;
}
@media (min-width: 1200px) {
  .sh_title h1 {
    font-size: 40px !important;
  }
}

@media (min-width: 992px) and (max-width: 1200px) {
  .sh_title h1 {
    font-size: 30px !important;
    font-weight: 700;
    line-height: 1.25;
  }
}
@media (min-width: 992px) {
  .shopping_card-grid1 {
    grid-row-start: 4 !important;
    grid-column-start: 3 !important;
    grid-column-end: 5 !important;
  }
  .shopping_card-grid3 {
    grid-row-start: 6 !important;
    grid-column-start: 1 !important;
    grid-column-end: 3 !important;
  }
  .shopping_card-grid2 {
    grid-row-start: 2 !important;
    grid-column-start: 1 !important;
    grid-column-end: 3 !important;
  }
}

@media (min-width: 576px) and (max-width: 992px) {
  .shopping_card-grid1 {
    grid-row-start: 2 !important;
    grid-column-start: 1 !important;
    grid-column-end: 4 !important;
    aspect-ratio: 1/0.5;
  }
  .shopping_card-grid3 {
    grid-row-start: 5 !important;
    grid-column-start: 1 !important;
    grid-column-end: 4 !important;
    aspect-ratio: 1/0.5;
  }
  .shopping_card-grid2 {
    grid-row-start: 8 !important;
    grid-column-start: 1 !important;
    grid-column-end: 4 !important;
    aspect-ratio: 1/0.5;
  }
}

@media (min-width: 300px) and (max-width: 576px) {
  .shopping_card-grid1 {
    grid-row-start: 4 !important;
    grid-column-start: 1 !important;
    grid-column-end: 3 !important;
    aspect-ratio: 1/0.7;
    min-height: 300px;
  }
  .shopping_card-grid3 {
    grid-row-start: 6 !important;
    grid-column-start: 1 !important;
    grid-column-end: 3 !important;
    aspect-ratio: 1/0.7;
    min-height: 300px;
  }
  .shopping_card-grid2 {
    grid-row-start: 8 !important;
    grid-column-start: 1 !important;
    grid-column-end: 3 !important;
    aspect-ratio: 1/0.7;
    min-height: 300px;
  }
}

@media (max-width: 300px) {
  .shopping_card-grid1 {
    grid-row-start: 4 !important;

    aspect-ratio: 1/1;
  }
  .shopping_card-grid3 {
    grid-row-start: 6 !important;

    aspect-ratio: 1/1;
  }
  .shopping_card-grid2 {
    grid-row-start: 8 !important;

    aspect-ratio: 1/1;
  }
}
.sh_title h1 {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.25;
}
.grid-item {
  display: grid;
  width: 100%;
}

.shop_now_btn-shop {
  border: 1px solid #000 !important;
  border-radius: 0 !important;
  color: #000 !important;
  padding: 1.2rem 2rem !important;
  margin-top: 60px;
  font-family: "Montserrat", sans-serif !important;

  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
}
.shop_now_btn-shop:hover {
  border: 1px solid #000 !important;
  background-color: #000 !important;
  color: #fff !important;
}
@media (max-width: 400px) {
  .sh_title h1 {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.25;
  }
  .shop_now_btn-shop {
    border: 1px solid #000 !important;
    border-radius: 0 !important;
    color: #fff !important;
    padding: 0.5rem 1rem !important;
    margin-top: 0px !important;
    font-family: "Montserrat", sans-serif !important;
    background: #000;
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0em;
    text-align: left;
  }
}
@media (max-width: 576px) {
  .shop_now_btn-shop {
    color: #fff !important;
    background: #000;
  }
}
@media (max-width: 700px) {
  .shop_now_btn-shop {
    margin-top: 0px !important;
  }
}
</style>
