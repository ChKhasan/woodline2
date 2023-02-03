<template lang="html">
  <div class="container py-5">
    <div class="row pb-6">
      <div class="col-md-3">
        <div class="shop-sticky">
          <div class="filter-card">
            <div class="filter-card-title">
              <h1>
                {{
                  translate[getLang]?.posts.allposts ??
                  translate.ru.posts.allposts
                }}
              </h1>
            </div>
            <div class="filter-card-body">
              <ul class="f-card-list" style="padding-left: none;">
                <b-skeleton v-if="skeleton" width="40%"></b-skeleton>
                <b-skeleton v-if="skeleton" width="60%"></b-skeleton>
                <b-skeleton v-if="skeleton" width="80%"></b-skeleton>

                <li
                  v-else
                  style="cursor: pointer;"
                  class="mb-1"
                  v-for="category in categories.slice().reverse()"
                  :key="category.id"
                >
                  <span
                    class="list-inline-item"
                    :class="{ active: category.id == id }"
                    @click="
                      $router.push(
                        `/${getLang}/post-categories/${category.id}/posts?page=1`
                      )
                    "
                  >
                    {{
                      category.title[lang]
                        ? category.title[lang]
                        : category.title.ru
                    }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="position-relative d-flex search-blog mt-3 mb-4">
          <input
            type="text"
            v-model="params.search"
            v-on:keyup.enter="searchProduct"
            class="search-input"
            :placeholder="
              translate[getLang]?.posts.search ?? translate.ru.posts.search
            "
          />
          <el-button
            icon="el-icon-search"
            :class="{ 'btn-primary': params.search !== '' }"
            :disabled="params.search == '' ? true : false"
            @click="searchProduct"
          ></el-button>
        </div>

        <div class="post-card-controller">
          <b-skeleton v-if="skeleton" width="100%" height="400px"></b-skeleton>
          <b-skeleton v-if="skeleton" width="100%" height="400px"></b-skeleton>
          <b-skeleton v-if="skeleton" width="100%" height="400px"></b-skeleton>
          <b-skeleton v-if="skeleton" width="100%" height="400px"></b-skeleton>
          <JournalCard
            v-else
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="900"
            img="./images/product-10.jpg"
            v-for="(item, index) in productsByCategory"
            :key="index"
            :post="item"
            :lang="lang"
          />
        </div>
        <div class="shop-pagination d-flex justify-content-center pt-5">
          <vs-pagination
            :total-pages="currentPage"
            :current-page="1"
            :page-padding="2"
            @change="changePage($event)"
          ></vs-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductCard from "../../smallComponents/ProductCard.vue";
import VsPagination from "@vuesimple/vs-pagination";
import JournalCard from "~/smallComponents/JournalCard.vue";
export default {
  props: ["lang"],
  data() {
    return {
      productsByCategory: [],
      categoryById: {},
      categoryImg: {},
      id: 1,
      skeleton: true,
      categories: [],
      currentPage: 1,
      params: {
        page: 1,
        paginate: 12,
        search: "",
      },
      page: {
        page: 1,
      },
      year: null,
      translate: {
        ru: require("@/locales/ru.json"),
        uz: require("@/locales/uz.json"),
      },
    };
  },
  computed: {
    getLang() {
      return this.$store.getters.language;
    },
  },
  components: {
    ProductCard,
    VsPagination,
    JournalCard,
  },
  created() {
    this.fetchSomething();
  },
  methods: {
    async fetchSomething() {
      let id = this.$route.params.id;
      this.id = id;
      this.params.page = 1;
      const products = await this.$store.dispatch(
        `posts/fetchPostsByCategory`,
        {
          query: this.$route.query,
          id: this.$route.params.id,
        }
      );

      const categories = await this.$store.dispatch(
        "posts/fetchPostsCategories"
      );
      const categoryImg = await this.$store.dispatch(
        "posts/fetchPostsCategoryById",
        this.id
      );

      this.categories = categories;
      const event = new Date(categoryImg.created_at);
      this.year = event.getFullYear();
      this.categoryImg = categoryImg;
      this.productsByCategory = products.data;
      this.currentPage = products.last_page;
      this.skeleton = false;
    },
    async searchProduct() {
      const searchProducts = await this.$store.dispatch(
        `posts/fetchPostCategorySearch`,
        {
          id: this.id,
          params: this.params,
        }
      );

      const categoryById = await this.$store.dispatch(
        "posts/fetchPostsCategoryById",
        this.id
      );
      this.categoryById = categoryById;
      this.productsByCategory = searchProducts.data;
      this.currentPage = searchProducts.last_page;
    },
    async changePage(val) {
      this.params.page = val;
      this.page.page = val;

      this.$router.replace({
        path: `/post-categories/${this.id}/posts`,
        query: this.page,
      });

      const pro = await this.$axios.$get(`post-categories/${this.id}/posts`, {
        params: this.params,
      });
      this.productsByCategory = pro.data.data;
      this.currentPage = pro.data.last_page;
    },
  },
};
</script>
<style lang="css">
@media (min-width: 576px) {
  .search-input {
    padding: 1px 8px;
  }
}

.search-input {
  border: none;
  border-width: 2px !important;
  height: calc(1.25em + 1.4375rem + 2px);

  font-size: 1rem;
  font-weight: 400;
  line-height: 1.25;
  color: #000;
  background-color: #fff;
  background-clip: padding-box;
  /* border-bottom: 1px solid #d2d2d2; */
  border-bottom: 0.3px solid #dcdfe6 !important;
  border-radius: 0;
  box-shadow: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-family: "Montserrat", sans-serif !important;
}
.search-input:focus {
  outline: none;
  border-bottom: 1px solid #d2d2d2;
}
.serach-btn {
  position: absolute;
  padding: 15px;
  /* top: 30%; */
  right: 0;
}
.shop-sticky {
  transition: 0.5s;
}
.category-banner {
  width: 100%;
  aspect-ratio: 1/0.5;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}
.category-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover !important;
}
.f-card-list {
  list-style: none;
  padding-left: 0 !important;
  padding-top: 20px;
}
.f-card-list li span {
  color: #777;
  line-height: 1.2 !important;
  transition: all 0.2s;
  font-weight: 400 !important;
  font-family: "Montserrat", sans-serif !important;
  border-bottom: 1px solid transparent;
}

.filter-card-title h1 {
  font-size: 20px !important;
  font-weight: 700;
  line-height: 1.25;
  color: #000;
  font-family: "Montserrat", sans-serif !important;
  margin-bottom: 0 !important;
}
.filter-card {
  margin-bottom: 40px;
}

.active {
  border-bottom: 1px solid #000 !important;
}

.color_selection .list-inline-item {
  border-radius: 50%;
  border: 1px solid transparent;
  transition: all 0.2s;
  padding: 4px;
  margin-right: 5px;
}
.list-inline-item {
  display: inline-block;
}

.color_selection .swatches-item {
  width: 18px;
  height: 18px;
  border-radius: 50%;
}
.color_selection {
  display: flex;
  flex-wrap: wrap;
  max-width: 200px;
}
.mr-2 {
  margin-right: 0.625rem !important;
}
.shop-page-banner {
  position: relative;
  margin-bottom: 50px;
}
.shop-page-banner img {
  width: 100%;
}

.shop-page-img-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 1.25rem;
  border-radius: 0;
}
.shop-page-img-overlay h2 {
  font-size: 30px !important;
  margin-bottom: 0.5rem;
  font-weight: 700;
  line-height: 1.25;
  font-family: "Montserrat", sans-serif !important;
}
.number {
  display: flex;
  align-items: center;
}
.shop-page-img-overlay p {
  font-size: 18px !important;
  font-weight: 700 !important;
  font-family: "Montserrat", sans-serif !important;
}
@media (min-width: 576px) {
  .shop-page-img-overlay h2 {
    font-size: 40px !important;
  }
}

.number-pages {
  font-family: "Montserrat", sans-serif !important;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.63;
}
.post-card-controller {
  display: grid;
  grid-template-columns: auto;
  grid-gap: 30px;
}
@media (min-width: 576px) {
  .post-card-controller {
    grid-template-columns: 1fr;
  }
}
@media (min-width: 768px) {
  .post-card-controller {
    grid-template-columns: 1fr;
  }
}
@media (min-width: 992px) {
  .post-card-controller {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1200px) {
  .container_block {
    max-width: 1200px !important;
    margin: 0 auto !important;
  }
}
@media (min-width: 1400px) {
  .container_block {
    max-width: 1390px !important;
    margin: 0 auto !important;
  }
}
.shop-sticky {
  position: sticky;
  top: 100px;
}
.page-link {
  position: relative;
  display: block;
  padding: 0.5rem 21px;
  margin-left: 0;
  line-height: 1.25;
  color: #a2a2a2;
  background-color: transparent;
  border: 0 solid #dee2e6;
}
.el-pagination {
  display: flex;
  align-items: center;
}
.el-pager {
  display: flex;
  list-style: none;
  margin-bottom: 0 !important;
}
.el-pager li {
  padding-left: 21px !important;
  padding-right: 21px !important;
  background: transparent !important;
  cursor: pointer;
  min-width: 35.5px;
  color: #a2a2a2 !important;
  height: 28px;
  line-height: 1.25 !important;
  box-sizing: border-box;
  border: 0 solid #dee2e6 !important  ;
  font-size: 18px !important;
  font-weight: 500 !important;
  letter-spacing: 4.5px;
  /* font-family: "Poppins",sans-serif !important; */
}
/* .el-pager li:hover {
  color: #000 !important;
} */
.el-pager li.active {
  color: #000 !important;
  cursor: default;
}

.btn-prev {
  background-image: url("@/static/images/images.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  widows: 20px;
  height: 20px;
  border: none;
}
.btn-next {
  background-image: url("@/static/images/1200px-OOjs_UI_icon_next-ltr.svg.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  widows: 20px;
  height: 20px;
  border: none;
}
</style>
