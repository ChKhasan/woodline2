export const actions = {

  async fetchCategoriesPaginate() {
    try {
      const res = await this.$axios.$get("/categories?paginate=3");
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchCategories() {
    try {
      const res = await this.$axios.$get("/categories");
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchCategoryById({},categoryId) {
    try {
      const res = await this.$axios.$get(`/categories/${categoryId}`);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchCategorySearch({},category) {
    try {
      const res = await this.$axios.$get(`categories/${category.id}/products`,{
        params: category.params
      });
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
};
