<template lang="html">
    <div>
        <Nuxt />
    </div>
</template>
<script>
export default {
    head() {
    return {
      link: [
        { rel: "icon", type: "image/png", href: this.siteInfo?.lg_favicon_path },
      ],
    };
  },
}
</script>
<style lang="css">
    
</style>