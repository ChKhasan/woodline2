export const actions = {
    async fetchSliders() {
      try {
          const res = await this.$axios.$get("/sliders");
          console.log("slider",res.data);
         return res.data
      } catch (e) {
        console.log(e);
      }
    },
  };
  