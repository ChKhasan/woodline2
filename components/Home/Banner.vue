<template lang="html">
  <div>
    <div
      class="banner_comp d-flex flex-column justify-content-center bg-img-cover-center custom-height-sm"
      :style="{ 'background-image': `url(${sliders[1].lg_img})` }"
    >
      <div class="d-flex flex-column h-100 justify-content-center">
        <div class="container container-xl mt-5">
          <div>
            <h1
              class="fs-60 fs-xxl-120 title_banner-home heading-home-01 lh-113"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-offset="100"
              data-aos-duration="900"
            >
              <strong
                class="d-block fadeInUp animated"
                data-animate="fadeInUp"
                >{{ sliders[1]?.title[getLang] ?? sliders[1].title.ru }}</strong
              >
            </h1>
            <p
              class="banner-subtitle"
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-duration="900"
            >
              {{ sliders[1]?.subtitle[getLang] ?? sliders[1].subtitle.ru }}
            </p>
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
    </div>
  </div>
</template>
<script>
export default {
  name: "BannerComp",
  props: ["sliders"],
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
.banner_comp {
  background-image: url("../../static/images/image_banner2.png");
  background-position: center top;
  /* background-size: contain; */
  background-size: cover;
  background-repeat: no-repeat;
  max-height: 1400px;
  height: 100vh;
}
.newIn {
  font-weight: 700;
  font-size: 24px;
  line-height: 1.63;
  font-family: "Montserrat", sans-serif !important;
  color: #000;
  margin-bottom: 30px;
}

.title_banner-home {
  font-size: 55px !important;
  font-weight: 700 !important;
  font-family: "Montserrat", sans-serif !important;
  color: #fff;
  max-width: 50%;
  width: 100%;
}
.shop_now_btn {
  border: 1px solid #fff !important;
  border-radius: 0 !important;
  color: #fff !important;
  padding: 0.8rem 1.6rem !important;
  margin-top: 80px;
  font-family: "Montserrat", sans-serif !important;

  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
}
.shop_now_btn:hover {
  border: 1px solid #fff !important;
  background-color: #fff !important;
  color: #000 !important;
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
.banner-subtitle {
  margin-top: 28px;
  font-family: "Montserrat", sans-serif !important;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0em;
  text-align: left;
  max-width: 435px;
  margin-bottom: 0;
  color: #fff;
}
@media (min-width: 1400px) {
  .title_banner-home {
    font-size: 70px !important;
    line-height: 97.5px;
  }
  .banner-subtitle {
    font-size: 18px;
    max-width: 535px;
  }
  .shop_now_btn {
    padding: 1rem 2rem !important;
    font-size: 20px;
  }
}
@media (max-width: 576px) {
  .title_banner-home {
    font-size: 40px !important;
    line-height: 50px;
  }
  .banner-subtitle {
    font-size: 14px;
    line-height: 20px;
    width: 90%;
  }
  .shop_now_btn:hover {
    border: 1px solid #fff !important;
    background-color: transparent !important;
    color: #fff !important;
  }
}
</style>
