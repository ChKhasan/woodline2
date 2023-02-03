<template lang="html">
  <div>
    <CompanyBanner :title="site_info" :sliders="sliders" />

    <TitleComp
      :title="
        translate[getLang]?.company.ourTeam ?? translate.ru?.company.ourTeam
      "
    />
    <div class="container container-xl">
      <div class="row">
        <div class="col-12 mb-5 mt-4 team-card-controller">
          <TeamCard v-for="(item, index) in team" :key="index" :team="item" />
        </div>
      </div>
      <div class="row company-info">
        <div class="col-lg-7 pr-md-5">
          <h1 class="company-info-title">
            {{
              translate[getLang]?.company.place ?? translate.ru?.company.place
            }}
          </h1>
          <p
            class="company-desc"
            v-html="
              site_info.desc[getLang]
                ? site_info.desc[getLang]
                : site_info.desc.ru
            "
          ></p>
        </div>
        <div class="col-lg-5 company-info-img">
          <img src="../../static/images/Rectangle 122439.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CompanyBanner from "~/components/Company/CompanyBanner.vue";
import TitleComp from "~/components/TitleComp.vue";
import TeamCard from "~/smallComponents/TeamCard.vue";
export default {
  layout: "home-layout",
  head: {
    title: "Наша компания",
  },
  data() {
    return {
      translate: {
        ru: require("@/locales/ru.json"),
        uz: require("@/locales/uz.json"),
      },
    };
  },
  mounted() {
  },
  async asyncData({ store, route }) {
    const language = route.params.lang;
    const site_info = await store.dispatch("site-info/fetchSiteInfo");
    const team = await store.dispatch("team/fetchTeam");
    const sliders = await store.dispatch("sliders/fetchSliders");
    return {
      site_info,
      team,
      language,
      sliders,
    };
  },
  computed: {
    getLang() {
      return this.$store.getters.language;
    },
  },

  components: { TeamCard, TitleComp, CompanyBanner },
  // watch: {
  //   getLang(newVal, oldVal) {
  //     newVal = "uz";
  //   },
  // },
};
</script>
<style lang="css">
.service-title h1 {
  font-weight: 600;
}
.company-info {
  margin-top: 124px !important;
  margin-bottom: 124px !important;
}
.info-desc {
  font-family: "Montserrat", sans-serif !important;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.63;
  color: #777;
  text-align: left;
  max-width: 830px;
}
.hr {
  border-bottom: 1px solid rgb(228, 228, 228) !important;
}
.team-card-controller {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
}
@media (min-width: 576px) {
  .team-card-controller {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 30px;
  }
}
@media (min-width: 768px) {
  .team-card-controller {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
  }
  .company-info-title {
    font-size: 48px;
    margin-top: 0 !important;
  }
}

@media (min-width: 992px) {
  .team-card-controller {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
  }
}
@media (min-width: 1200px) {
  .team-card-controller {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
  }
}

@media (min-width: 1400px) {
  .team-card-controller {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 30px;
  }
}
.company-info-title {
  font-family: "Montserrat", sans-serif !important;
  font-size: 30px;
  font-weight: 600;
  line-height: 38px;
  letter-spacing: 0em;
  text-align: left;
  margin-top: 60px;
}
.company-desc {
  font-family: "Montserrat", sans-serif !important;
  font-size: 18px;
  font-weight: 400;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: left;
}
.company-info-img img {
  width: 100%;
}
@media (max-width: 576px) {
  .company-info-title {
    font-family: "Montserrat", sans-serif !important;
    font-size: 18px;
    font-weight: 600;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: justify;
    margin-top: 60px;
  }
  .company-desc {
    font-family: "Montserrat", sans-serif !important;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: justify;
  }
  .company-info {
    margin-top: 24px !important;
    margin-bottom: 15px !important;
  }
  .company-info-img img {
    padding-bottom: 60px;
  }
}
</style>
