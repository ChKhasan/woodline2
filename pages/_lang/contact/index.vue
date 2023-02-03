<template lang="html">
  <div>
    <BreadCrumbComp
      :category="
        translate[getLang]?.contact.contact ?? translate.ru.contact.contact
      "
    />
    <div class="container container-xxl mt-3 py-5 pb-14">
      <div class="row">
        <div class="col-12 contact-title">
          <h1>
            {{
              translate[getLang]?.contact.contactUs ??
              translate.ru.contact.contactUs
            }}
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12 map-control">
          <!-- <yandex-map
              :coords="[41.311158, 69.279737]"
              zoom="16"
              style="width: 100%; aspect-ratio: 1/0.5"
              :cluster-options="{
                1: { clusterDisableClickZoom: true },
              }"
              :behaviors="['drag']"
              :controls="['zoomControl']"
              :marker="placemarks"
              map-type="hybrid"
              @map-was-initialized="initHandler"
            >
              <ymap-marker
                marker-id="1"
                marker-type="placemark"
                :coords="[41.311158, 69.279737]"
                hint-content="Hint content 1"
                :balloon="{
                  header: 'Space Mos',
                  body: 'body',
                  footer: 'footer',
                }"
                :icon="{ color: 'red', glyph: 'cinema' }"
                cluster-name="1"
              ></ymap-marker>
            </yandex-map> -->
          <iframe
            :src="site_info.map"
            width="100%"
            class="i-frame-map"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div class="row">
        <div class="col-md-8 mb-8 mb-md-0 mt-4">
          <h2 class="fs-24 mb-2 form-title">
            {{
              translate[getLang]?.contact.formTitle ??
              translate.ru.contact.formTitle
            }}
          </h2>
          <p class="mb-7 form-text">
            {{
              translate[getLang]?.contact.formText ??
              translate.ru.contact.formText
            }}
          </p>
          <form v-on:submit.prevent="postData">
            <div class="row mb-6">
              <div class="col-sm-6 mt-4">
                <input
                  type="text"
                  class="form-control"
                  :placeholder="
                    translate[getLang]?.contact.yourName ??
                    translate.ru.contact.yourName
                  "
                  required
                  oninvalid="this.setCustomValidity('Введите имя пользователя')"
                  oninput="this.setCustomValidity('')"
                  v-model="dynamicValidateForm.name"
                />
              </div>
              <div class="col-sm-6 mt-4">
                <the-mask
                  v-model="dynamicValidateForm.phone_number"
                  class="form-control"
                  value="+998 "
                  required
                  placeholder="+998 __ ___-__-__"
                  :mask="['+998 ## ### ## ##', '+998 ## ### ## ##']"
                />
              </div>
            </div>
            <div class="form-group mb-4">
              <textarea
                class="form-control"
                rows="6"
                required
                v-model="dynamicValidateForm.message"
              >
Комментарий</textarea
              >
            </div>

            <recaptcha required class="form-recaptcha mb-6" />
            <button
              v-ripple="'rgba(255, 255, 255, 0.35)'"
              :ripple="false"
              class="btn form-btn text-uppercase letter-spacing-05"
            >
              {{
                translate[getLang]?.contact.sendNow ??
                translate.ru.contact.sendNow
              }}
            </button>
          </form>
        </div>

        <div class="col-md-4 pl-xl-13 pl-md-6 mt-4">
          <p class="font-weight-bold adress-title mb-3">
            {{
              translate[getLang]?.contact.address ??
              translate.ru.contact.address
            }}
          </p>
          <address class="mb-6 form-text">
            {{
              site_info.address[getLang]
                ? site_info.address[getLang]
                : site_info.address.ru
            }}
          </address>
          <p class="font-weight-bold info-title mb-2 form-text">
            {{ translate[getLang]?.contact.info ?? translate.ru.contact.info }}
          </p>
          <a :href="`tel:${site_info.phone_number}`" class="mb-0 form-text">{{
            site_info.phone_number
          }}</a>
          <a :href="`mailto:${site_info.email}`" class="mb-7 form-text">{{
            site_info.email
          }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BreadCrumbComp from "~/components/BreadCrumbComp.vue";
import { yandexMap, ymapMarker } from "vue-yandex-maps";
import { TheMask } from "vue-the-mask";
export default {
  head: {
    title: "Контакт",
  },
  data() {
    return {
      dynamicValidateForm: {
        name: "",
        phone_number: "",
        message: "",
        page: "https://plaza.choopon.uz",
      },
      placemarks: [
        {
          coords: [41.3, 69.2],
          properties: {}, // define properties here
          options: {}, // define options here
          clusterName: "1",
          balloonTemplate: '<div>"Your custom template"</div>',
          callbacks: { click: function () {} },
        },
      ],
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
  async mounted() {
    try {
      await this.$recaptcha.init();
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    async postData() {
      if (
        this.dynamicValidateForm.name !== "" &&
        this.dynamicValidateForm.phone_number !== "" &&
        this.dynamicValidateForm.message !== ""
      ) {
        try {
          await this.$recaptcha.getResponse();
          await this.$axios.post("/feedback", this.dynamicValidateForm);
          (this.dynamicValidateForm = {
            name: "",
            phone_number: "",
            message: "",
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
          console.log("Error in order:", error);
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
  },
  components: { yandexMap, ymapMarker, BreadCrumbComp, TheMask },
  async asyncData({ store }) {
    const site_info = await store.dispatch("site-info/fetchSiteInfo");
    return {
      site_info,
    };
  },
};
</script>
<style lang="css">
.i-frame-map {
  border: 0;
  aspect-ratio: 1/0.5;
}
@media (max-width: 576px) {
  .i-frame-map {
    border: 0;
    aspect-ratio: 1/0.8;
  }
}
.contact-title h1 {
  font-size: 40px !important;
  text-align: center !important;
  font-weight: 700;
  line-height: 1.25;
  color: #000;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif !important;
}

.form-title {
  font-size: 24px !important;
  font-weight: 700;
  line-height: 1.25;
  color: #000;
  font-family: "Montserrat", sans-serif !important;
}
.form-text {
  font-family: "Montserrat", sans-serif !important;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.63;
  color: #777;
  text-align: left;
  transition: 0.3s;
}
.form-text:hover {
  color: #000;
}
.form-btn {
  color: #fff;
  border-radius: 0;
  background-color: #000;
  border-color: #000;
  box-shadow: none;
  letter-spacing: 0.5px !important;
  display: inline-block;
  font-weight: 700 !important;
  text-align: center;
  vertical-align: middle;
  font-family: "Montserrat", sans-serif !important;
  font-size: 0.875rem !important;
}
.form-btn:hover {
  color: #fff;
  border-radius: 0;
  background-color: #000;
  border-color: #000;
  box-shadow: none;
  letter-spacing: 0.5px !important;
  display: inline-block;
  font-weight: 700 !important;
  text-align: center;
  vertical-align: middle;
  font-family: "Montserrat", sans-serif !important;
}
.adress-title,
.info-title {
  color: #000 !important;
  font-weight: 700 !important;
  font-family: "Montserrat", sans-serif !important;
  font-size: 1rem;
  line-height: 1.63;
}

.pb-14 {
  padding-bottom: 6.875rem !important;
}
@media (max-width: 576px) {
  .pb-14 {
    padding-bottom: 50px !important;
  }
}
.map-control {
  padding-bottom: 70px;
  padding-top: 50px;
}
.btn:focus,
.btn.focus {
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgb(0 0 0 / 1%);
}
.form-control:focus {
  /* outline: none !important;
  border: none !important;
*/
  border-color: rgba(75, 77, 78, 0.01);
  box-shadow: 0px 0px 5px rgba(75, 77, 78, 0.4),
    0px 0px 3px rgba(75, 77, 78, 0.4);
}
@media (max-width: 576px) {
  .map-control {
    padding-bottom: 10px;
    padding-top: 30px;
  }
  .contact-title h1 {
    font-size: 25px !important;
  }
  .py-5 {
    padding-top: 1.5rem !important;
  }
  .form-title {
    font-size: 20px !important;

    line-height: 1.25;
  }
}
</style>
