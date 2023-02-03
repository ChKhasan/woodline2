<template lang="html">
  <div class="description_comp pt-2 pb-5">
    <div class="text-center mt-40"></div>
    <p class="mxw-830 mx-auto mb-0 color-gray" v-html="desc"></p>
  </div>
</template>
<script>
export default {
  props: ["desc"],
};
</script>
<style lang="css">
.description_comp {
  font-family: "Montserrat", sans-serif !important;
}
.mxw-830 {
  max-width: 830px !important;
}
@media (min-width: 768px) {
  .mt-md-10,
  .my-md-10 {
    margin-top: 4.375rem !important;
  }
}
.mt-40 {
  margin-top: 40px;
}
</style>
