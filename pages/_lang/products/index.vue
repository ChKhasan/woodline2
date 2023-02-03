<template lang="html">
  <div>
    <BreadCrumbComp
      :category="
        translate[getLang]?.products.allProducts ??
        translate.ru.products.allProducts
      "
    />
    <div class="container container-xl py-5">
      <div class="row pb-6">
        <div class="col-md-3">
          <div class="shop-sticky">
            <div class="filter-card">
              <div class="filter-card-title">
                <h1>
                  {{
                    translate[getLang]?.products.categoriesTitle ??
                    translate.ru.products.categoriesTitle
                  }}
                </h1>
              </div>
              <div class="filter-card-body">
                <ul class="f-card-list" style="padding-left: none;">
                  <li style="cursor: pointer;" class="mb-1 hover-effect">
                    <span
                      class="list-inline-item active mb-2"
                      @click="$router.push(`/${getLang}/products?page=1`)"
                    >
                      {{
                        translate[getLang]?.products.allProducts ??
                        translate.ru.products.allProducts
                      }}
                    </span>
                  </li>
                  <li
                    style="cursor: pointer;"
                    class="mb-1 hover-effect mb-2"
                    v-for="(category, index) in categories.slice().reverse()"
                    :key="category.id"
                  >
                    <span
                      class="list-inline-item"
                      :class="{ active: category.id == id }"
                      @click="
                        $router.push(
                          `/${getLang}/categories/${category.id}/products?page=1`
                        )
                      "
                    >
                      {{
                        category.title[getLang]
                          ? category.title[getLang]
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
          <div class="position-relative d-flex search-blog mt-4 mb-4">
            <input
              type="text"
              v-model="params.search"
              v-on:keyup.enter="searchProduct"
              class="search-input"
              :placeholder="
                translate[getLang]?.products.search ??
                translate.ru.products.search
              "
            />
            <el-button
              icon="el-icon-search"
              class="search-btn"
              :class="{ 'btn-primary': params.search !== '' }"
              :disabled="params.search == '' ? true : false"
              @click="searchProduct"
            ></el-button>
          </div>

          <div class="shop-card-controller">
            <ProductCard
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="900"
              img="./images/product-10.jpg"
              v-for="(item, index) in productsByCategory"
              :key="index"
              :hide="false"
              :product="item"
            />
          </div>
          <div class="shop-pagination d-flex justify-content-center pt-5">
            <vs-pagination
              :total-pages="currentPage"
              :current-page="1"
              :page-padding="1"
              @change="changePage($event)"
            ></vs-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProductCard from "@/smallComponents/ProductCard.vue";
import VsPagination from "@vuesimple/vs-pagination";
export default {
  head: {
    title: "Все продукты",
  },
  data() {
    return {
      productsByCategory: [],
      categoryById: {},
      categoryImg: {},
      id: 1,
      categories: [],
      currentPage: 1,
      params: {
        page: 1,
        paginate: window.innerWidth < 576 ? 9 : 18,
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
  },
  // async created() {
  //   let id = await this.$route.params.id;
  //   let width = window.innerWidth;
  //   const categories = await this.$store.dispatch(`categories/fetchCategories`);
  //   const products = await this.$store.dispatch(
  //     `products/fetchProductByParams`,
  //     {
  //       query: this.$route.query,
  //       paginate: width < 576 ? 9 : 18,
  //     }
  //   );
  //   (this.categories = categories),
  //     (this.productsByCategory = products.data),
  //     (this.currentPage = products.last_page),
  //     (this.id = id);

  // },
  async asyncData({ store, route }) {
    let id = await route.params.id;
    let width = window.innerWidth;
    const categories = await store.dispatch(`categories/fetchCategories`);
    const products = await store.dispatch(`products/fetchProductByParams`, {
      query: route.query,
      paginate: width < 576 ? 9 : 18,
    });
    return {
      categories,
      productsByCategory: products.data,
      currentPage: products.last_page,
      id,
    };
  },
  methods: {
    async searchProduct() {
      this.text = true;
      try {
        const searchProducts = await this.$store.dispatch(
          `products/fetchProductSearch`,
          {
            id: this.id,
            params: this.params,
          }
        );

        this.productsByCategory =
          searchProducts.data == [] ? [] : searchProducts.data;
        this.currentPage = searchProducts.last_page;
      } catch (err) {
        console.log(err);
      }
    },

    async changePage(val) {
      window.scrollTo({ top: "300px", behavior: "smooth" });
      this.params.page = val;
      this.page.page = val;

      await this.$router.replace({
        path: `/${this.getLang}/products`,
        query: this.page,
      });

      const pro = await this.$axios.$get(`products`, {
        params: this.params,
      });
      this.productsByCategory = await pro.data.data;
      this.currentPage = await pro.data.last_page;
    },
  },
};
</script>
<style lang="css">
.category-banner {
  width: 100%;

  background-position: center;
  background-size: cover;
  overflow: hidden;
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
  color: #000 !important;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.shop-page-img-overlay h2 {
  font-size: 30px !important;
  margin-bottom: 0.5rem;
  font-weight: 700;
  line-height: 1.25;
  font-family: "Poppins", sans-serif;
}
.number {
  display: flex;
  align-items: center;
}
.shop-page-img-overlay p {
  font-size: 18px !important;
  font-weight: 700 !important;
  font-family: "Poppins", sans-serif;
}
@media (min-width: 576px) {
  .shop-page-img-overlay h2 {
    font-size: 40px !important;
  }
}

.number-pages {
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.63;
}
.shop-card-controller {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;
}
@media (min-width: 300px) and (max-width: 650px) {
  .shop-card-controller {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 7px;
  }
}
@media (min-width: 650px) {
  .shop-card-controller {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
  }
}
@media (min-width: 992px) {
  .shop-card-controller {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
  }
}

/* @media (min-width: 576px) {
  .shop-card-controller {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 768px) {
  .shop-card-controller {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 992px) {
  .shop-card-controller {
    grid-template-columns: 1fr 1fr 1fr;
  }
} */
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
@media (min-width: 576px) {
  .search-input {
    padding: 1px 8px;
  }
}
@media (min-width: 300px) and (max-width: 576px) {
  .search-input {
    width: 80%;
  }
  .search-btn {
    width: 20%;
  }
}
@media (max-width: 300px) {
  .search-input {
    width: 70%;
  }
  .search-btn {
    width: 30%;
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
  font-family: "Poppins", sans-serif;
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
.to-brands-link {
  transition: 0.4s;
}
.to-brands-link:hover {
  transform: translateX(8px);
}
.search-blog .el-button:focus {
  color: #fff !important;
  border-color: #eee !important;
  background-color: #a2a2a2 !important;
}
.search-blog .el-button:hover {
  color: #fff;
  border-color: #f6f6f6;
  background-color: #a2a2a2;
}
.search-blog .btn-primary:focus {
  box-shadow: none !important;
}
</style>
