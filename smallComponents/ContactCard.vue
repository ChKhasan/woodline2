<template lang="html">
  <div class="contact-card" :style="{ 'background-image': `url(${img})` }">
    <div class="backColor" :style="{ background: `${bgcolor}` }"></div>
    <div class="c-card-title mb-2">
      <h3>{{ title }}</h3>
    </div>
    <div class="c-card-btn">
      <div class="j-card-btn">
        <a class="b-btn" :href="link">{{
          translate[getLang]?.contact.card.learnMore ??
          translate.ru.contact.card.learnMore
        }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import BorderBlackBtn from "../smallComponents/BorderBlackBtn.vue";
export default {
  props: ["name", "img", "link", "title", "bgcolor"],
  components: {
    BorderBlackBtn,
  },
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
.backColor {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
@media (min-width: 576px) {
  .contact-card {
    height: 408px;
  }
  .c-card-title h3 {
    font-size: 40px !important;
  }
}

.contact-card {
  position: relative;
  padding: 50px;
  height: 320px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  transition: 0.5s;
}

.c-card-title h3 {
  font-size: 30px !important;
  font-weight: 700 !important;
  font-family: "Montserrat", sans-serif !important;
  line-height: 1.25;
  color: #000;
}
.c-card-text p {
  color: #777 !important;
  font-weight: 500 !important;
  font-family: "Montserrat", sans-serif !important;
  margin-bottom: 1rem !important  ;
}
.c-card-btn {
  margin-top: auto !important;
}
@media (max-width: 576px) {
  .contact-card {
    height: 300px;
    padding: 30px;
    background-position: right;
  }
  .c-card-title h3 {
    font-size: 26px !important;
  }
}
</style>
