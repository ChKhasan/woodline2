<template lang="html">
  <div class="row">
    <div class="col-sm-6 d-flex align-items-center">
      <span class="post-messengers">Tag:</span>
      <div>
        <nuxt-link to="/"> Sweaters, Clothing </nuxt-link>
      </div>
    </div>
    <div class="col-sm-6 share-blog d-flex align-items-center">
      <span class="post-messengers">Share:</span>
      <div class="brands_block d-flex">
        <a href="#">
          <font-awesome-icon
            style="font-size: 20px;"
            :icon="['fab', 'fa-facebook-f']"
          />
        </a>
        <a href="#">
          <font-awesome-icon
            style="font-size: 20px;"
            icon="fa-brands footer_icon fa-pinterest-p"
          />
        </a>
        <a href="#">
          <font-awesome-icon
            style="font-size: 20px;"
            icon="fa-brands footer_icon fa-instagram"
          />
        </a>
        <a href="#">
          <font-awesome-icon
            style="font-size: 20px;"
            icon="fa-brands footer_icon fa-twitter"
          />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="css">
.post-messengers {
  color: #000 !important;
  font-weight: 700 !important;
  margin-right: 1rem !important;
  margin-bottom: 0 !important;
  font-family: "Montserrat", sans-serif !important;
  font-size: 1rem;
  line-height: 1.63;
}
.share-blog {
  justify-content: start;
  margin-top: 10px;
}
@media (min-width: 576px) {
  .share-blog {
    justify-content: end;
  margin-top: 0;
  }
}
</style>
