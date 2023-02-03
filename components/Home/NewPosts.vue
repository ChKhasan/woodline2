<template lang="html">
  <div>
    <div class="container container-xl">
      <div class="row">
        <div class="col-12 j-card-controller">
          <JournalCard
            v-for="(item, index) in posts"
            :key="index"
            :post="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import JournalCard from "../../smallComponents/JournalCard.vue";
export default {
  props: ["posts"],
  components: {
    JournalCard,
  },
};
</script>
<style lang="css">
.j-card-controller {
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 30px;
  padding-bottom: 20px;
}
@media (min-width: 576px) {
  .j-card-controller {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
    padding-bottom: 120px;
  }
}

@media (min-width: 992px) {
  .container-shop {
    max-width: 960px !important;
    margin: 0 auto !important;
  }
  .j-card-controller {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 30px;
    padding-bottom: 120px;
  }
}
@media (min-width: 1200px) {
  .container-shop {
    max-width: 1200px !important;
    margin: 0 auto !important;
  }
}
</style>
