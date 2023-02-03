<template lang="html">
  <div>
    <div>
      <BreadCrumbCategory
        :category="{
          id: product.products_categories[0].id,
          title:
            product.products_categories[0]?.title[getLang] ??
            product.products_categories[0].title.ru,
        }"
      />
      <div class="container container-xl">
        <div class="row pb-4">
          <div class="col-md-6 mb-8 mb-md-0 mt-5">
            <a
              href="#"
              v-for="(img, index) in product.product_images"
              :key="index"
            >
              <img
                class="my-2 product_info_img"
                :src="img.lg_img"
                :alt="product.title.ru"
              />
            </a>
          </div>
          <div class="pt-3 mr-40 col-md-5 pl-md-6 pl-lg-0">
            <div class="content-right primary-summary summary-sticky">
              <div class="d-flex">
                <p
                  style="margin-right: 7px;"
                  class="body_type text-muted fs-12 font-weight-500 letter-spacing-05"
                  v-for="item in product.products_categories"
                >
                  {{
                    item.title[getLang] ? item.title[getLang] : item.title.ru
                  }}
                </p>
              </div>
              <h1 class="body_title fs-lg-40 mb-2">
                {{
                  product.title[getLang]
                    ? product.title[getLang]
                    : product.title.ru
                }}
              </h1>

              <form v-on:submit.prevent="submitForm">
                <label class="ml-1 placing-title">{{
                  translate[getLang]?.product.count ??
                  translate.ru.product.count
                }}</label>
                <div class="couter-box">
                  <a class="count-btn" @click="countFunc(false)"
                    ><font-awesome-icon :icon="['fas', 'fa-minus']"
                  /></a>

                  <span>{{ dynamicValidateForm.count }}</span
                  ><a class="count-btn" @click="countFunc(true)"
                    ><font-awesome-icon :icon="['fas', 'fa-plus']"
                  /></a>
                </div>
                <label for="client_name">{{
                  translate[getLang]?.product.name ?? translate.ru.product.name
                }}</label
                ><br />
                <input
                  class="tel-number-input"
                  :placeholder="
                    translate[getLang]?.product.yourName ??
                    translate.ru.product.yourName
                  "
                  required
                  oninvalid="this.setCustomValidity('Введите имя пользователя')"
                  oninput="this.setCustomValidity('')"
                  v-model="dynamicValidateForm.name"
                /><br />
                <label for="client_phone_number">{{
                  translate[getLang]?.product.phoneNumber ??
                  translate.ru.product.phoneNumber
                }}</label>
                <the-mask
                  v-model="dynamicValidateForm.phone_number"
                  class="tel-number-inputs"
                  value="+998"
                  required
                  aria-required="true"
                  placeholder="+998 __ ___-__-__"
                  :mask="['+998 ## ### ## ##', '+998 ## ### ## ##']"
                />
                <recaptcha required class="form-recaptcha" />

                <div class="send-info-btn">
                  <button
                    v-ripple="'rgba(255, 255, 255, 0.35)'"
                    :ripple="false"
                    type="primary"
                    class="send_btn d-flex justify-content-center align-items-center"
                  >
                    {{
                      translate[getLang]?.product.send ??
                      translate.ru.product.send
                    }}
                  </button>
                </div>
              </form>

              <div class="d-flex align-items-center flex-wrap mt-6"></div>
              <ul class="list-unstyled mt-2">
                <li class="row mb-2 flex-wrap">
                  <span class="d-block mt-4 col-md-6 font-weight-500 fs-15"
                    >{{
                      translate[getLang]?.product.callBack ??
                      translate.ru.product.callBack
                    }}
                  </span>
                  <span class="d-block mt-4 col-md-6 fs-15 color-gray"
                    ><a
                      :href="`tel:${siteInfo.phone_number}`"
                      class="nav-phone"
                    >
                      <font-awesome-icon :icon="['fas', 'fa-phone']" />
                      {{ siteInfo.phone_number }}
                    </a></span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div v-if="product.desc.ru" class="row justify-content-center">
          <InformationTab :desc="product?.desc[getLang] ?? product.desc.ru" />
        </div>
      </div>
    </div>
    <TitleComp
      :title="
        translate[getLang]?.product.lastProducts ??
        translate.ru.product.lastProducts
      "
    />
    <div class="container container-xxl mb-120">
      <div class="row pb-4">
        <div class="col-12">
          <CardCarousel :products="products" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumbComp from "@/components/BreadCrumbComp.vue";
import TitleComp from "@/components/TitleComp.vue";
import CardCarousel from "@/components/Product/CardCarousel.vue";
import InformationTab from "@/components/Product/InformationTab.vue";
import BreadCrumbCategory from "@/components/BreadCrumbCategory.vue";
import { TheMask } from "vue-the-mask";

export default {
  head: {
    title: "Продукть",
  },
  data() {
    return {
      cursorPos: {},
      count: 1,

      dynamicValidateForm: {
        name: "",
        phone_number: "",
        count: 1,
        page: "https://plaza.choopon.uz",
      },
      numberModel: "",

      mask: {
        mask: "{8}000000",
        lazy: false,
      },
      quality: 1,
      value: "",
      translate: {
        ru: require("@/locales/ru.json"),
        uz: require("@/locales/uz.json"),
      },
    };
  },
  components: {
    BreadCrumbComp,
    CardCarousel,
    TitleComp,
    TheMask,
    InformationTab,
    BreadCrumbCategory,
  },
  async asyncData({ params, store }) {
    const products = await store.dispatch("products/fetchProductsPaginate");
    const siteInfo = await store.dispatch("site-info/fetchSiteInfo");
    const product = await store.dispatch(
      "products/fetchProductBySlug",
      params.index
    );
    return { product, products, siteInfo };
  },

  computed: {
    getLang() {
      return this.$store.getters.language;
    },
  },
  async mounted() {
    try {
      await this.$recaptcha.init();
    } catch (e) {
      console.log(e);
    }
  },

  methods: {
    async submitForm() {
      if (
        this.dynamicValidateForm.name !== "" &&
        this.dynamicValidateForm.phone_number !== ""
      ) {
        try {
          await this.$recaptcha.getResponse();
          await this.$axios.post("/feedback", {
            ...this.dynamicValidateForm,
            product_id: this.product.id,
          });
          (this.dynamicValidateForm = {
            name: "",
            phone_number: "",
            count: 1,
            page: "https://plaza.choopon.uz",
          }),
            await this.$toast.open({
              message: "Successfully",
              type: "success",
              duration: 2000,
              dismissible: true,
              position: "top-right",
            });
          await this.$recaptcha.reset();
        } catch (error) {
          await this.$toast.open({
            message: error,
            type: "error",
            duration: 2000,
            dismissible: true,
            position: "top-right",
          });
        }
      }
    },
    async recaptcha() {
      await this.$recaptchaLoaded();
      await this.$recaptcha("login");
    },

    countFunc(def) {
      def ? this.dynamicValidateForm.count++ : this.dynamicValidateForm.count--;

      localStorage.setItem("count", this.dynamicValidateForm.message);
      this.count = localStorage.getItem("count");
    },
  },
};
</script>

<style lang="css">
.nav-phone:hover {
  color: #777 !important;
}
.mb-120 {
  margin-bottom: 120px;
}
.product_info_img {
  width: 100%;
  height: 400px;
  object-fit: contain;
}
.body_type {
  font-family: "Montserrat", sans-serif !important;
  font-weight: 400;
  font-size: 12px !important;
}
@media (min-width: 992px) {
  .fs-lg-40 {
    font-size: 40px !important;
  }
}
.fs-30 {
  font-size: 30px !important;
}
.body_title {
  font-size: 30px;
  font-weight: 600;
  line-height: 1.25;
  color: #000;
  font-family: "Montserrat", sans-serif !important;
}
.letter-spacing-05 {
  letter-spacing: 0.5px !important;
}
.fs-20 {
  font-size: 20px !important;
}
.body_price {
  color: #000 !important;
  font-size: 20px !important;
}
.see_reviews {
  line-height: 1 !important;
  font-size: 15px !important;
  color: #000 !important;
  /* padding-left: 1.25rem !important; */
}
.see_reviews span {
  border-right: 1px solid #e4e4e4 !important;
  padding-right: 5px;
  margin-right: 5px;
}
.see_reviews a {
  color: #000 !important;
}
.reyt_star {
  font-size: 12px !important;
  margin-right: 2px;
}
.body_card_info {
  color: #777 !important;
  font-family: "Montserrat", sans-serif !important;
}
@media (min-width: 768px) {
  .pl-md-6,
  .px-md-6 {
    padding-left: 1.875rem !important;
  }
  .mr-40 {
    margin-left: 60px;
  }
}
.img_catchap {
  border: 1px solid #e4e4e4 !important;
  margin-bottom: 2.5rem !important;
}
.color_title span:first-child,
.quality_title {
  font-weight: 700 !important;
  color: #000 !important;
  font-family: "Montserrat", sans-serif !important;
  font-size: 16px !important;
}
.color_title span:last-child {
  font-weight: 400 !important;
  color: #000 !important;
  font-family: "Montserrat", sans-serif !important;
  font-size: 16px !important;
  margin-left: 4px;
}

.shop-swatch .list-inline-item.selected,
.shop-swatch .list-inline-item:hover {
  border-color: #000;
}

.shop-swatch .list-inline-item {
  border-radius: 50%;
  border: 1px solid transparent;
  transition: all 0.2s;
  padding: 4px;
  margin-right: 5px;
}
.list-inline-item {
  display: inline-block;
}
.shop-swatch .swatches-item {
  width: 18px;
  height: 18px;
  border-radius: 50%;
}
.control_quality {
  display: flex;
  align-items: center;
  min-width: 100px;
  height: 45px;
  padding: 0.71875rem 1.25rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #d2d2d2;
  border-radius: 0;
  box-shadow: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.ml-2 {
  margin-left: 8px !important;
}
@media (max-width: 768px) {
  .control_quality {
    width: 100%;
    margin-bottom: 30px;
  }
  .quality_resp {
    flex-direction: column;
  }
}
.control_quality a {
  color: #000 !important;
}
.btn-block {
  color: #fff !important;
  background-color: #000 !important;
  border-color: #000 !important;
  box-shadow: none;
  border-radius: 0 !important;
  height: 100% !important;
  width: 100% !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  font-weight: 700 !important;
}
.compare {
  font-weight: 700 !important;
  font-size: 14px !important;
  font-family: "Montserrat", sans-serif !important;
  letter-spacing: 0.5px !important;
  color: #000;
  text-decoration: none !important  ;
}
.mr-3 {
  margin-right: 1rem !important;
}
.i_body_icon {
  color: #666 !important;
  font-weight: 400;
  font-size: 14px !important;
}
.font-weight-500 {
  font-weight: 500 !important;
  font-family: "Montserrat", sans-serif !important;
}

.fs-15 {
  font-size: 15px !important;
}

.mr-4 {
  margin-right: 1.5rem !important;
}
.content-right {
  position: sticky;
  top: 100px;
}
.card_icons {
  color: #000 !important;
}
@media (min-width: 992px) {
  .pb-6 {
    padding-bottom: 5rem !important;
  }
}
.tel-number-input,
.tel-number-inputs {
  height: 63px !important;
  border: 1px solid #f2f2fa !important;
  border: none;
  width: 100%;
  border-radius: 0 !important;
  padding: 0 24px !important;
  margin-bottom: 10px !important;
}
.tel-number-inputs {
  width: 100%;
}
.tel-number-input:focus,
.tel-number-inputs:focus {
  outline: none !important;
  border: none !important;
  border-bottom: 2px solid transparent;
  box-shadow: 0px 0px 1px rgba(75, 77, 78, 0.75);
}
.placing-title {
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #5d5d5f;
}
.count-btn {
  cursor: pointer;
  padding: 10px;
}
.couter-box {
  border: 1px solid #f2f2fa;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 168px;
  margin-bottom: 10px;
}
.input-form label {
  font-size: 16px;
  font-weight: 600 !important;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
}
.send_btn {
  background: #191d31 !important;
  padding: 0 63px !important;
  border: none !important;
  width: 100%;
  border-radius: 0 !important;
  height: 64px;
  font-size: 16px !important;
  font-weight: 500 !important;
  line-height: 24px !important;
  letter-spacing: 0em !important;
  text-align: left;
  color: #fff !important;
}
.send-info-btn {
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1fr;
  margin-bottom: 16px;
  /* grid-gap: 24px; */
}
.vsa-item__trigger:focus,
.vsa-item__trigger:hover {
  outline: none;
  background-color: #fff !important;
  color: #000 !important;
}
@media (max-width: 576px) {
  .body_title {
    font-size: 20px;
    font-weight: 600;
    line-height: 1.25;
    color: #000;
    font-family: "Montserrat", sans-serif !important;
  }
  .product_info_img {
    height: 300px;
    object-fit: contain;
  }
}
</style>
