<template lang="html">
  <div class="container-fluid bg-color py-5">
    <div class="container container-xl footer_comp">
      <div class="row">
        <div class="col-lg mb-6 mb-lg-0">
          <div class="footer_logo">
            <nuxt-link to="/" class="navbar-brand">
              <img :src="siteInfo.lg_logo_path" :alt="siteInfo.title" />
            </nuxt-link>
          </div>
        </div>
        <div class="col-sm-6 col-lg mb-6 mb-lg-0">
          <ul class="list-unstyled mb-0 mt-2">
            <li>
              <h3
                class="fs-14 mb-3 text-uppercase footer-link-title letter-spacing-05"
              >
                {{
                  translate[getLang]?.footer.menu ?? translate.ru.footer.menu
                }}
              </h3>
            </li>

            <li class="py-0">
              <nuxt-link to="/" class="lh-225 footer-links">{{
                translate[getLang]?.footer.home ?? translate.ru.footer.home
              }}</nuxt-link>
            </li>
            <li class="py-0">
              <nuxt-link
                :to="`/${getLang}/products?page=1`"
                class="lh-225 footer-links"
                >{{
                  translate[getLang]?.footer.category ??
                  translate.ru.footer.category
                }}
              </nuxt-link>
            </li>
            <li class="py-0">
              <nuxt-link
                :to="`/${getLang}/contact`"
                class="lh-225 footer-links"
                >{{
                  translate[getLang]?.footer.contact ??
                  translate.ru.footer.contact
                }}</nuxt-link
              >
            </li>
            <li class="py-0">
              <nuxt-link
                :to="`/${getLang}/post-categories/1/posts?page=1`"
                class="lh-225 footer-links"
                >{{
                  translate[getLang]?.footer.posts ?? translate.ru.footer.posts
                }}</nuxt-link
              >
            </li>

            <li class="py-0">
              <nuxt-link
                :to="`/${getLang}/company`"
                class="lh-225 footer-links"
                >{{
                  translate[getLang]?.footer.company ??
                  translate.ru.footer.company
                }}</nuxt-link
              >
            </li>
          </ul>
        </div>
        <div class="col-sm-6 col-lg mb-6 mb-lg-0">
          <ul class="list-unstyled mb-0 mt-2">
            <li>
              <h3
                class="fs-14 mb-3 text-uppercase footer-link-title letter-spacing-05"
              >
                {{
                  translate[getLang]?.footer.categories ??
                  translate.ru.footer.categories
                }}
              </h3>
            </li>

            <li class="py-0" v-for="item in categories">
              <nuxt-link
                :key="item.id"
                :to="`/${getLang}/categories/${item.id}/products?page=1`"
                class="lh-225 footer-links"
                >{{ item?.title[getLang] ?? item.title.ru }}</nuxt-link
              >
            </li>
          </ul>
        </div>
        <div class="col-sm-6 col-lg mb-6 mb-lg-0"></div>
        <div class="col-sm-6 col-lg mb-6 mb-lg-0">
          <div class="brands_block d-flex">
            <a :href="siteInfo.facebook">
              <font-awesome-icon
                style="font-size: 20px"
                :icon="['fab', 'fa-facebook-f']"
              />
            </a>
            <a :href="siteInfo.telegram">
              <font-awesome-icon
                style="font-size: 20px"
                icon="fa-brands footer_icon fa-telegram"
              />
            </a>
            <a :href="siteInfo.instagram">
              <font-awesome-icon
                style="font-size: 20px"
                icon="fa-brands footer_icon fa-instagram"
              />
            </a>
            <a :href="siteInfo.youtube">
              <font-awesome-icon
                style="font-size: 20px"
                icon="fa-brands footer_icon fa-youtube"
              />
            </a>
          </div>

          <p
            class="mb-0 text-gray text-lg-right footer-links"
            v-if="siteInfo && siteInfo.title"
          >
            © {{ year }}
            Woodline
          </p>
          <p class="mb-0 text-gray text-lg-right footer-links mt-2">
            {{
              translate[getLang]?.footer.security ??
              translate.ru.footer.security
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "footer-comp",
  props: ["siteInfo", "categories"],
  data() {
    return {
      year: new Date().getFullYear(),
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
};
</script>
<style lang="css">
.bg-color {
  background-color: #f6f6f6 !important;
}
.brands_block {
  justify-content: start;
}
.footer_logo {
  max-width: 164px;
}
.mb-6,
.my-6 {
  margin-bottom: 1.875rem !important;
}
.footer_logo img {
  width: 100%;
}

.brands_block a {
  margin-right: 1.5rem;
  line-height: 40px !important;
  color: #000 !important;
}
.footer_icon {
  font-size: 40px !important;
}
.text-gray {
  color: #7c7c7c !important;
}

@media (min-width: 992px) {
  .brands_block {
    justify-content: end;
  }
  .text-lg-right {
    text-align: right;
  }
}
.footer-links {
  font-weight: 500 !important;
  font-family: "Montserrat", sans-serif !important;
  /* line-height: 10px !important; */
  color: #7c7c7c !important;
  transition: all 0.2s;
  font-size: 1rem;
}
.footer-links:hover {
  color: #000 !important;
}
.en-link {
  font-weight: 500 !important;
}
.footer-link-title {
  letter-spacing: 0.5px !important;
  font-size: 14px !important;
  text-transform: uppercase !important;
  font-family: "Montserrat", sans-serif !important;

  font-weight: 700 !important;
  line-height: 1.25;
  color: #000;
}
ul li {
  margin-bottom: 8px;
}
</style>
