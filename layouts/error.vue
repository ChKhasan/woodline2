<template>
  <div class="container">
    <div class="row justify-content-center align-items-center error-page">
      <h1 v-if="error.statusCode === 404">{{ error.statusCode }}Not found</h1>
      <h1 v-if="error.statusCode !== 404">{{error }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  layout: "error-layout",
  head() {
    return {
      link: [
        { rel: "icon", type: "image/png", href: this.siteInfo?.lg_favicon_path },
      ],
    };
  },
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style>
.error-page {
    height: 100Vh;
}
</style>
