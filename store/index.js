export const state = () => ({
  lang: localStorage.getItem("Lang"),
  translate: [],
});
export const mutations = {
  langRu(state, payload) {
    localStorage.setItem("Lang", payload);

    state.lang = localStorage.getItem("Lang");
  },

  fetchTranslation(state, translates) {
    state.translate.push(...translates);
  },
};
export const actions = {
  actionLangRu({ commit }, payload) {
    commit("langRu", payload);
  },

  async fetchTranslations({ commit }, payload) {
    try {
      const res = await this.$axios.$get(`/translations`);
      let translates = res.data;
      console.log(res.data);
      commit("fetchTranslation", translates);
    } catch (e) {
      console.log(e);
    }
  },
};
export const getters = {
  language(state) {
    return state.lang;
  },
  trans(state) {
    return state.translate;
  },
};
