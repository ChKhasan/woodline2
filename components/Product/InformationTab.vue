<template lang="html">
  <div class="mt-5">
    <div class="d-none d-md-block">
      <div class="info-title d-flex justify-content-center">
        <h1>
          {{ translate[getLang]?.product.desc ?? translate.ru.product.desc }}
        </h1>
      </div>

      <DescriptionComp :desc="desc" />
    </div>
    <div class="d-md-none">
      <vsa-list>
        <vsa-item>
          <vsa-heading>{{
            translate[getLang]?.product.desc ?? translate.ru.product.desc
          }}</vsa-heading>

          <vsa-content>
            <DescriptionComp :desc="desc" />
          </vsa-content>
        </vsa-item>
      </vsa-list>
    </div>
  </div>
</template>
<script>
import DescriptionComp from "./DescriptionComp.vue";
import { VsaList, VsaItem, VsaHeading, VsaContent } from "vue-simple-accordion";
import "vue-simple-accordion/dist/vue-simple-accordion.css";
export default {
  props: ["desc"],
  data() {
    return {
      activeName: "first",
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
    DescriptionComp,
    VsaList,
    VsaItem,
    VsaHeading,
    VsaContent,
  },
  methods: {
    handleClick(tab, event) {},
  },
};
</script>
<style lang="css">
.el-tabs__nav-scroll {
  display: flex;
  justify-content: center;
}
.el-tabs__nav-wrap::after {
  background: transparent !important;
}
.el-tabs__item.is-active {
  color: #000 !important;
}
.el-tabs__active-bar {
  background: transparent !important;
}
.el-tabs__item {
  padding: 0 20px;
  height: 40px;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 24px !important;
  font-weight: 500 !important;
  color: #bebebe !important;
  position: relative;
  transition: all 0.2s !important;
  font-family: "Montserrat", sans-serif !important;
}
@media (min-width: 992px) {
  .el-tabs__item {
    font-size: 32px !important;
  }
}
.vsa-item__trigger__icon {
  display: none !important;
}
.vsa-item__trigger:hover {
  outline: none;
  background-color: white !important;
  color: #000 !important;
}

.vsa-item__heading {
  border: 1px solid #e4e4e4 !important;
}
.vsa-item__content {
  border: 1px solid #e4e4e4 !important;
  margin-top: 20px;
}
.vsa-list {
  border: none !important;
  --vsa-border: none !important;
}
</style>
