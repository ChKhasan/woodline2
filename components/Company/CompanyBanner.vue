<template lang="html">
  <div>
    <div
      class="banner_company d-flex flex-column justify-content-center"
      :style="{ 'background-image': `url(${sliders[0].lg_img})` }"
    >
      <div
        class="d-flex flex-column justify-content-center"
        style="height: 100%"
      >
        <div class="container container-xl">
          <div class="row align-items-center banner_company-title flex-column">
            <h1
              class="d-block title_banner fadeInUp animated"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-offset="100"
              data-aos-duration="900"
            >
              {{ sliders[0]?.title[getLang] ?? sliders[0].title.ru }}
            </h1>
            <span
              class="company_banner-text"
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-offset="100"
              data-aos-duration="900"
              >{{
                sliders[0]?.subtitle[getLang] ?? sliders[0].subtitle.ru
              }}</span
            >
            <nuxt-link
              :to="`/${getLang}/products?page=1`"
              data-aos="fade-up"
              data-aos-delay="800"
              data-aos-offset="100"
              data-aos-duration="900"
              href="shop-page-02.html"
              class="btn btn-outline-primary text-uppercase shop_now_btn"
              data-animate="fadeInUp"
              tabindex="0"
              >{{
                translate[getLang]?.homepage.buynow ??
                translate.ru.homepage.buynow
              }}</nuxt-link
            >
          </div>
        </div>
      </div>
      <div class="mt-auto">
        <div class="container_block container-xl">
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BannerComp",
  props: ["title", "sliders"],
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
.banner_company {
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  max-height: 1200px;
  margin-bottom: 124px;
}
.banner_company-title {
  margin-bottom: 100px;
}
.newIn {
  font-weight: 100 !important;
  font-size: 24px;
  line-height: 1.63;
  font-family: "Montserrat", sans-serif !important;
  color: #000;
  margin-top: 30px;
}
.company_banner-text {
  font-family: "Montserrat", sans-serif !important;
  color: #fff;
  width: 50%;
  font-size: 18px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: center;
}
.title_banner {
  text-align: center;
  font-family: "Montserrat", sans-serif !important;
  margin-top: 14px;
  color: #fff;

  font-size: 56px;
  font-weight: 700;
  line-height: 68px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 28px;
}

@media (max-width: 1400px) {
  .title_banner {
    font-size: 40px;
    line-height: 58px;
  }
  .company_banner-text {
    font-size: 16px;
    line-height: 30px;
    width: 60%;
  }
}
.design-by-span {
  font-weight: 600 !important;
}
.design-by-p {
  margin-bottom: 3.125rem !important;
}
@media (max-width: 991.98px) {
  .custom-height-sm {
    height: 600px !important;
  }
}
@media (max-width: 576px) {
  .title_banner {
    font-size: 30px;
    line-height: 48px;
  }
  .company_banner-text {
    font-size: 14px;
    line-height: 24px;
    width: 90%;
  }
  .banner_company {
    margin-bottom: 54px;
  }
}
</style>
