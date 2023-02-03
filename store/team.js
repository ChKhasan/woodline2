export const actions = {
    async fetchTeam() {
      try {
          const res = await this.$axios.$get("/team");
         return res.data.data
      } catch (e) {
        console.log(e);
      }
    },
  };
  