export const actions = {
  async fetchPostsPaginate({},paginate) {
    try {
      const res = await this.$axios.$get(`/posts?paginate=${paginate}`);
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchPostsCategories() {
    try {
      const res = await this.$axios.$get("/post-categories");
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchPostsCategoryById({},posCatId) {
    try {
      const res = await this.$axios.$get(`/post-categories/${posCatId}`);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchPosts() {
    try {
      const res = await this.$axios.$get("/posts");
      return res.data.data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchPostBySlug({},slug) {
    try {
      const res = await this.$axios.$get(`/posts/${slug}`);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchPostCategorySearch({},post) {
    try {
      const res = await this.$axios.$get(`post-categories/${post.id}/posts`, {
        params: post.params,
      });
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
  async fetchPostsByCategory({}, params) {
    try {
      const res = await this.$axios.$get(
        `/post-categories/${params.id}/posts?${params.query}&paginate=12`
      );
      return res.data;
    } catch (e) {
      console.log(e);
    }
  },
};
