<template lang="html">
  <div>
    <div class="container container-xxl">
      <div class="row">
        <div class="col-12 title_may">
          <h2>
            {{ title }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["title"],
};
</script>
<style lang="css">
@media (min-width: 768px) {
  .title_may {
    font-size: 40px !important;
  }
}

.title_may h2 {
  font-size: 30px !important;
  font-family: "Montserrat", sans-serif !important;
  font-weight: 700;
  line-height: 1.25;
  text-align: center;
}
@media (max-width: 576px) {
  .title_may h2 {
    font-size: 20px !important;
  }
}
</style>
