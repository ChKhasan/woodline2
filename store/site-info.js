export const actions = {
  async fetchSiteInfo() {
    try {
        const res = await this.$axios.$get("/site-info");
       return res.data
    } catch (e) {
      console.log(e);
    }
  },
};
