<template lang="html">
  <div class="team-card">
    <div class="team-card-img d-flex justify-content-center">
      <div class="t-img">
        <img :src="team.lg_img" :alt="team.name.ru" />
      </div>
    </div>
    <div class="team-card-body d-flex justify-content-center flex-column">
      <div class="team-card-name d-flex justify-content-center">
        <h5>{{ team.name[getLang] ? team.name[getLang] : team.name.ru }}</h5>
      </div>
      <div class="team-card-position d-flex justify-content-center">
        <p>
          {{
            team.position[getLang] ? team.position[getLang] : team.position.ru
          }}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["team"],
  computed: {
    getLang() {
      return this.$store.getters.language;
    },
  },
};
</script>
<style lang="css">
.t-img {
  border-radius: 50%;
  overflow: hidden;
  aspect-ratio: 1/1;
  height: 108px;
  transition: 0.5s;
  flex-shrink: 0;
}
.team-card {
  transition: 0.3s;
}
.team-card:hover {
  transform: translateY(-8px);
}
.t-img img {
  width: auto;
  height: 100%;
  object-fit: cover !important;
  max-width: 100%;
  flex-shrink: 0;
}
.team-card-name h5 {
  font-family: "Montserrat", sans-serif !important;
  font-size: 28px;
  font-weight: 600;
  line-height: 34px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: 40px;
}
.team-card-position p {
  margin-top: 10px;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  font-family: "Montserrat", sans-serif !important;
  color: #83879b;
  text-overflow: clip;
  overflow: hidden;
  width: 100%;
  height: 25px;
}
.team-card {
  cursor: pointer;
  border: 1px solid rgb(228, 228, 228);
  border-radius: 5px;

  padding: 40px 20px 20px 20px;
  aspect-ratio: 1/0.8;
}
</style>
