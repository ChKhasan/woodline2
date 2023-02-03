<template lang="html">
  <div>
    <div class="container container-xl">
      <div class="row">
        <div class="col-12 my-4 contact-grid">
          <ContactCard
            name="Подробнее"
            v-if="siteInfo.instagram"
            :link="siteInfo.instagram"
            :title="
              translate[getLang]?.contact.card.instagram ??
              translate.ru.contact.card.instagram
            "
            img="./images/instagram.png"
            bgcolor="#D7D3FF"
          />

          <ContactCard
            name="Подробнее"
            v-if="siteInfo.youtube"
            :link="siteInfo.youtube"
            :title="
              translate[getLang]?.contact.card.youtube ??
              translate.ru.contact.card.youtube
            "
            img="./images/youtube.png"
            bgcolor="#FFC0C0"
          />

          <ContactCard
            name="Подробнее"
            v-if="siteInfo.facebook"
            :link="siteInfo.facebook"
            :title="
              translate[getLang]?.contact.card.facebook ??
              translate.ru.contact.card.facebook
            "
            img="./images/facebook.png"
            bgcolor="#D3E5FF"
          />

          <ContactCard
            name="Подробнее"
            v-if="siteInfo.telegram"
            :link="siteInfo.telegram"
            :title="
              translate[getLang]?.contact.card.telegram ??
              translate.ru.contact.card.telegram
            "
            img="./images/telegram.png"
            bgcolor="#D3F4FF"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContactCard from "../../smallComponents/ContactCard.vue";
export default {
  props: ["siteInfo"],
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
  components: {
    ContactCard,
  },
};
</script>
<style lang="css">
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
}

@media (min-width: 820px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }
}

</style>
