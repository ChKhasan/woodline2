<template lang="html">
  <div class="service-card">
    <div class="d-flex flex-wrap align-items-center">
      <div
        class="service-c-img col-lg-4"
        :style="{
          'background-image': `url(${services.lg_img})`,
        }"
      ></div>

      <div class="service-c-body py-4 col-lg-8">
        <div class="service-c-title d-flex justify-content-between">
          <h3 class="mb-3">{{ services.title.ru }}</h3>
          <span class="service-price"> {{ services.price }} $ </span>
        </div>
        <div class="service-subtitle">
          <h5>{{ services.subtitle.ru }}</h5>
        </div>
        <div class="service-c-text">
          <p class="mb-0" v-html="services.desc.ru"></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["services"],
};
</script>
<style lang="css">
.service-c-img {
  background: url("../static/images/bg-home-01.jpg");
  height: 200px;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}
.service-c-title h3 {
  font-size: 20px !important;
  font-weight: 700;
  line-height: 1.25;
  color: #000;
  font-family: "Poppins", sans-serif;
}
.service-c-text p {
  font-family: "Poppins", sans-serif;
  font-size: 1rem !important;
  font-weight: 400;
  line-height: 1.63;
  color: #777 !important;
}
.service-card {
  transition: 0.3s;
}

</style>
