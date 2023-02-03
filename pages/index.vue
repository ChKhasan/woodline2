<template>
  <div>
    <Banner :sliders="sliders" />
    <div class="mt-5">
      <TitleComp
        :title="
          translate[getLang]?.homepage.ourProducts ??
          translate.ru.homepage.ourProducts
        "
      />
    </div>
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
      <div class="d-flex justify-content-center my-4">
        <nuxt-link
          :to="`/${getLang}/products?page=1`"
          class="btn btn-outline-primary text-uppercase shop_now_btn-shop"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
          >{{
            translate[getLang]?.homepage.shownow ??
            translate.ru.homepage.shownow
          }}</nuxt-link
        >
      </div>
    </div>
    <TitleComp
      :title="
        translate[getLang]?.homepage.recentPosts ??
        translate.ru.homepage.recentPosts
      "
    />
    <NewPosts :posts="posts" />
    <div class="contact-top">
      <ContactCardBlog :siteInfo="siteInfo" />
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Home/Banner.vue";
import HomeCardBlog from "@/components/Home/HomeCardBlog.vue";
import TitleComp from "@/components/TitleComp.vue";
import ContactCardBlog from "@/components/Home/ContactCardBlog.vue";
import NewPosts from "@/components/Home/NewPosts.vue";
import translate from "@/translate/translation";
import ProductCard from "@/smallComponents/ProductCard.vue";
import ShoppingCard from "@/smallComponents/ShoppingCard.vue";
import global from "@/mixins/global.js";
export default {
  head: {
    title: "Woodline",
  },
  layout: "home-layout",
  loading: false,
  name: "IndexPage",
  mixins: [global],
  data() {
    return {
      translate: {
        ru: require("../locales/ru.json"),
        uz: require("../locales/uz.json"),
      },
    };
  },
  async asyncData({ store }) {
    if (!localStorage.getItem("Lang")) {
      await store.dispatch("actionLangRu", "ru");
    }
    const products = await store.dispatch("products/fetchProductsPaginate");
    const categories = await store.dispatch(
      "categories/fetchCategoriesPaginate"
    );
    const posts = await store.dispatch("posts/fetchPostsPaginate", 3);
    const sliders = await store.dispatch("sliders/fetchSliders");
    const siteInfo = await store.dispatch("site-info/fetchSiteInfo");

    const category = await categories;
    await category.splice(3);
    return {
      products,
      category,
      posts,
      sliders,
      siteInfo,
    };
  },

  components: {
    Banner,
    HomeCardBlog,
    TitleComp,
    ContactCardBlog,
    NewPosts,
    ShoppingCard,
    ProductCard,
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@500&family=Montserrat:wght@100;200;300;500;700&family=Philosopher:wght@700&family=Poppins:ital,wght@0,100;0,300;0,400;0,500;0,800;1,100&family=Roboto&display=swap");
body {
  margin: 0;
  font-family: "Montserrat", sans-serif !important;
}
a {
  text-decoration: none !important;
}
@media (min-width: 768px) {
  .mb-md-8,
  .my-md-8 {
    margin-bottom: 3.125rem !important;
  }
}

@media (min-width: 576px) {
  .container_block {
    max-width: 540px !important;
    margin: 0 auto !important;
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
}
@media (min-width: 576px) {
  .container_block {
    max-width: 540px !important;
    margin: 0 auto !important;
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
}
@media (min-width: 768px) {
  .container_block {
    max-width: 720px !important;
    margin: 0 auto !important;
  }
}
@media (min-width: 992px) {
  .container_block {
    max-width: 960px !important;
    margin: 0 auto !important;
  }
}
@media (min-width: 1200px) {
  .container_block {
    max-width: 1200px !important;
    margin: 0 auto !important;
  }
}
@media (min-width: 1750px) {
  .container-xl {
    max-width: 1480px !important;
    margin: 0 auto !important;
  }
}
.container-shop {
  padding-left: 24px !important;
  padding-right: 24px !important;
}
@media (min-width: 576px) {
  .container-shop {
    max-width: 540px !important;
    margin: 0 auto !important;
  }
}
@media (min-width: 768px) {
  .container-shop {
    max-width: 720px !important;
    margin: 0 auto !important;
  }
}
@media (min-width: 992px) {
  .container-shop {
    max-width: 960px !important;
    margin: 0 auto !important;
  }
}
@media (min-width: 1200px) {
  .container-shop {
    max-width: 1200px !important;
    margin: 0 auto !important;
  }
}

.text-muted {
  color: #999 !important;
}
#icon-container {
  background: #fff !important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
#icon-arrow-up {
  color: #000 !important;
}
.color-gray {
  color: #777 !important;
  font-family: "Poppins", sans-serif;
}
#icon-container {
  z-index: 2000 !important;
}
.contact-top {
  margin-bottom: 117px;
}

.card_box {
  padding-top: 40px;
  padding-bottom: 10px;
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
}
@media (min-width: 300px) and (max-width: 650px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 7px;
  }
}
@media (min-width: 650px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
  }
}
@media (min-width: 992px) {
  .grid-container {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
  }
  .card_box {
    padding-top: 40px;
    padding-bottom: 110px;
  }
}
@media (max-width: 576px) {
  .contact-top {
    margin-bottom: 40px;
  }
  .card_box {
    padding-top: 5px;
    padding-bottom: 10px;
  }
}
</style>
