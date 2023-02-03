export const actions = {
  async fetchProductsPaginate() {
    try {
      const res = await this.$axios.$get(`/products?paginate=18`);
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchProductByParams({}, fullPage) {
    try {
      const res = await this.$axios.$get(
        `/products?${fullPage.query}&paginate=${fullPage.paginate}`
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchProductByCategory({}, params) {
    try {
      const res = await this.$axios.$get(
        `/categories/${params.id}/products?${params.query}&paginate=${params.paginate}`
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchProductBySlug({}, slug) {
    try {
      const res = await this.$axios.$get(`/products/${slug}`);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchProductSearch({}, category) {
    try {
      const res = await this.$axios.$get(`products`, {
        params: category.params,
      });
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
};
