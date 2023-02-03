<template lang="html">
  <div>
    <div class="container-fluid bg-color py-4 mt-70">
      <div class="container container-xl">
        <div class="row">
          <div class="col-md-8">
            <div class="bread_crumb_box">
              <router-link to="/">
                <h5 class="bread_crumb">
                  {{
                    translate[getLang]?.navbar.home ?? translate.ru.navbar.home
                  }}
                </h5>
              </router-link>
              <span>/</span>
              <h5 class="last_crumb">{{ category }}</h5>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["category"],
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
.bread_crumb_box span {
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  font-size: 0.9375rem;
  font-family: "Montserrat", sans-serif !important;
  color: #959595 !important;
}
.mt-70 {
  margin-top: 76px;
}
.bread_crumb {
  display: inline;
  font-size: 0.9375rem;
  text-transform: capitalize;
  list-style: none;
  color: #959595 !important;
  font-weight: 600 !important;
  letter-spacing: 0;
  text-transform: capitalize;
  font-family: "Montserrat", sans-serif !important;
}
.last_crumb {
  font-size: 0.9375rem;
  text-transform: capitalize;
  list-style: none;
  color: #000 !important;
  font-weight: 600 !important;
  letter-spacing: 0;
  display: inline;
  text-transform: capitalize;
  font-family: "Montserrat", sans-serif !important;
}
@media (max-width: 576px) {
  .bread_crumb {
    font-size: 12px;
  }
  .last_crumb {
    font-size: 12px;
  }
  .bread_crumb_box span {
    padding-right: 5px;
    padding-left: 5px;
  }
  .py-4 {
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
}
</style>
