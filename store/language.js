export const actions = {
  async fetchLanguage() {
    try {
      const res = await this.$axios.$get(`/languages`);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
};
