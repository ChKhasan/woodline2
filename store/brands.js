export const actions = {
  async fetchBrands() {
    try {
      const res = await this.$axios.$get(`/brands`);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchBrandById({}, brandId) {
    try {
      const res = await this.$axios.$get(`/brands/${brandId}`);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchBrandSearch({}, brand) {
    try {
      const res = await this.$axios.$get(`/brands/${brand.id}/products`, {
        params: brand.params,
      });
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
};
