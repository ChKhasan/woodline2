export const actions = {
  async fetchTranslations() {
    try {
      const res = await this.$axios.$get(`/translations`);

      // let translate = res.data;

      // let tran = translate
      //   .filter((item, index) => item.translation_group.title == payload.title)
      //   .filter((item, index) => item.key == payload.key)[0].val;
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
};
