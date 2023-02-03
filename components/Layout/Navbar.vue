<template lang="html">
  <div class="sticky-area" id="container-nav" ref="navScroll">
    <div class="container-fluid" id="bg-white">
      <div class="container container-xl">
        <div
          class="row d-none d-xl-flex justify-content-between"
          style="height: 75px"
        >
          <div class="col-2 d-flex align-items-center">
            <div class="position-relative">
              <nuxt-link to="/" class="navbar-brand">
                <img :src="siteInfo.lg_logo_path" alt="" />
              </nuxt-link>
            </div>
          </div>
          <div
            class="col-6 d-flex py-xl-3 justify-content-between align-items-center justify-content-center"
          >
            <NuxtLink v-for="link in links" :to="link.to" class="dropdown_btn">
              <span class="dropdown_hover" id="hover">
                {{ link.name }}
              </span>
            </NuxtLink>
          </div>
          <div class="col-1 d-flex align-items-center">
            <el-dropdown @command="changeLang">
              <span class="el-dropdown-link">
                {{ getLang }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in language"
                  :key="item.id"
                  :command="item.code"
                  >{{ item.title }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="col-2 d-flex align-items-center justify-content-start">
            <font-awesome-icon class="mx-1" :icon="['fas', 'fa-phone']" />

            <a
              :href="`tel:${siteInfo.phone_number}`"
              id="hover-effect"
              class="nav-phone"
              >{{ siteInfo.phone_number }}</a
            >
          </div>
        </div>

        <div class="row align-items-center d-xl-none py-3">
          <div class="col-2 menu-btn">
            <b-button
              v-b-toggle.sidebar-no-header
              class="navbar-toggler border-0 px-0 canvas-toggle"
              ><span class="fs-24 toggle-icon"></span
            ></b-button>
            <b-sidebar
              id="sidebar-no-header"
              aria-labelledby="sidebar-no-header-title"
              no-header
              shadow
              class="sidebar-get"
            >
              <template #default="{ hide }">
                <div class="p-3">
                  <div
                    class="d-flex align-items-center justify-content-between mt-3"
                  >
                    <img
                      :src="siteInfo.lg_logo_path"
                      class="sidebar-logo"
                      alt=""
                    />
                    <span class="d-flex align-items-center" variant="primary" block @click="hide"
                      ><svg
                        viewBox="0 0 16 16"
                        width="1em"
                        height="1em"
                        focusable="false"
                        role="img"
                        aria-label="x"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        class="bi-x b-icon bi"
                      >
                        <g>
                          <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                          ></path>
                        </g></svg
                    ></span>
                  </div>
                  <div class="sidebar-body">
                    <ul class="mt-5">
                      <li class="mt-3 drawer-links" v-for="link in links">
                        <nuxt-link :to="link.to">{{ link.name }}</nuxt-link>
                      </li>
                    </ul>
                  </div>
                  <div class="d-flex justify-content-between drawer-lang-box">
                    <span
                      @click="changeLang(item.code)"
                      v-for="item in language"
                      :key="item.id"
                      class="drawer-lang"
                      :class="{ activeDrawer: item.code == getLang }"
                      >{{ item.title }}</span
                    >
                  </div>
                </div>
              </template>
            </b-sidebar>
          </div>
          <div class="d-flex justify-content-center col-8">
            <a href="" class="navbar-brand">
              <img src="../../static/images/logo.png" alt="" />
            </a>
          </div>
          <div class="col-2 d-flex justify-content-end"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "data-center",
  props: ["siteInfo", "language"],

  data() {
    return {
      open: true,
      drawer: false,
      currentEl: "",
      currLang: "ru",
      lang: this.siteInfo,
      lastScrollTop: 0,

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
    routerName() {
      return this.$route.name;
    },
    routerParams() {
      return this.$route.params.index;
    },
    links() {
      return [
        {
          to: "/",
          name:
            this.translate[this.getLang]?.navbar.home ??
            this.translate.ru.navbar.home,
        },
        {
          to: `/${this.getLang}/products?page=1`,
          name:
            this.translate[this.getLang]?.navbar.category ??
            this.translate.ru.navbar.category,
        },
        {
          to: `/${this.getLang}/company`,
          name:
            this.translate[this.getLang]?.navbar.company ??
            this.translate.ru.navbar.company,
        },
        {
          to: `/${this.getLang}/contact`,
          name:
            this.translate[this.getLang]?.navbar.contact ??
            this.translate.ru.navbar.contact,
        },
      ];
    },
  },

  methods: {
    ...mapActions(["actionLangRu"]),
    changeLang(code) {
      this.$store.dispatch("actionLangRu", code),
        this.$router.replace({
          params: {
            lang: code,
          },
        });
      localStorage.setItem("Lang", code);
    },
  },

  mounted() {
    var header = this.$refs.navScroll;
    this.$store.dispatch(
      "actionLangRu",
      this.$route.params.lang ?? localStorage.getItem("Lang")
    ),
      window.addEventListener("scroll", () => {
        let scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > this.lastScrollTop) {
          header.style.top = "-128px";
          header.style.background = "transparent";
          header.style.marginTop = "0";
        } else if (document.documentElement.scrollTop == 0) {
          header.style.marginTop = "0";
          header.style.boxShadow = "none";
          header.style.background = "transparent";
        } else {
          header.style.top = "0";
          header.style.boxShadow = " 0 0.5rem 1rem rgb(0 0 0 / 15%)";
          header.style.background = "#fff";
          header.style.marginTop = "0";
        }
        this.lastScrollTop = scrollTop;
      });
  },

  watch: {
    routerName(oldVal, newVal) {
      if (oldVal !== newVal) {
        var header = this.$refs.navScroll;
        header.style.top = "0";
      }
    },
    routerParams(oldVal, newVal) {
      if (oldVal !== newVal) {
        var header = this.$refs.navScroll;
        header.style.top = "0";
      }
    },
  },
};
</script>
<style lang="css" scoped>
.b-icon.bi {
  font-size: 30px;
}
a.nuxt-link-active {
  font-weight: bold;
}
/* exact link will show the primary color for only the exact matching link */
.drawer-links {
  padding-bottom: 5px;
  border-bottom: 1px solid rgb(0 0 0 / 30%);
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.badge_box {
  position: relative;
}
.menu-btn {
  padding-left: 0 !important;
}
.badge_abs {
  position: absolute;
  top: -12px;
  right: -10px;
  line-height: 26px;
  font-weight: 600;
}
.el-badge__content {
  font-size: 20px !important;
}
.dropdown_btn {
  position: relative;
  transition: 2s;
}
.dropdown_hover {
  cursor: pointer;
  transition: 1s;
  color: #fff !important;
}
.dropdown_hover:hover + .dropdown-bottom {
  top: 100%;
  display: flex;
  opacity: 1;
}
.dropdown_item {
  display: flex;
  width: 100%;
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400 !important;
  color: #000;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  font-family: "Montserrat", sans-serif !important;
}
.dropdown-bottom {
  position: absolute;
  background: white;
  top: 150%;

  z-index: 1000 !important;
  display: none;
  transition: 0.2s !important;
  opacity: 0;
  z-index: 1000;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #777;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 18%);
}
a {
  color: #000 !important;
  text-decoration: none;
  background-color: transparent;
  text-decoration: none !important;
  font-size: 1rem !important;
  font-weight: 600;
}
ul {
  list-style: none;
  margin-bottom: 0 !important;
  padding-left: 0 !important;
}
.el-dropdown-link,
.dropdown_hover {
  font-weight: 700 !important;
  font-size: 1rem !important;
  line-height: 26px;
  color: #000 !important;
  font-family: "Montserrat", sans-serif !important;
  letter-spacing: 0.8px;
}
.navbar-brand {
  max-width: 177px;
  display: block;
  position: relative;
}
.navbar-brand img {
  max-width: 100%;
}
.sticky-area {
  transition: all 0.5s !important;
  height: auto;
  background-color: transparent;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1000 !important;
}

.toggle-icon {
  bottom: 0;
  display: block;
  height: 2px;
  left: 2px;
  right: 0;
  margin: auto;
  position: absolute;
  top: 0;
  transition: all 0.3s;
  background-color: black !important;
}
.navbar-light .navbar-toggler {
  color: #000;
  border-color: rgba(0, 0, 0, 0.1);
}
.toggle-icon::before {
  content: "";
  position: absolute;
  width: 18px;
  left: -6px;
  top: 8px;
}
.toggle-icon::after {
  top: -8px;
  left: -9px;
  width: 15px;
}
.toggle-icon::before,
.toggle-icon::after {
  content: "";
  height: 2px;
  left: 0;
  /* margin: auto; */
  position: absolute;
  right: 0;
  transition: top 0.3s ease-in-out, background 0.3s,
    -webkit-transform 0.3s ease-in-out;
  transition: top 0.3s ease-in-out, transform 0.3s ease-in-out, background 0.3s;
  transition: top 0.3s ease-in-out, transform 0.3s ease-in-out, background 0.3s,
    -webkit-transform 0.3s ease-in-out;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  background-color: black !important;
}
.navbar-toggler,
.toggle-bar {
  width: 28px;
  height: 28px;
  display: inline-block;
  position: relative;
  vertical-align: middle;
}
.navbar-toggler {
  padding: 0.25rem 0.75rem;
  font-size: 1.25rem;
  line-height: 1;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 0;
}
.el-badge__content {
  border: none !important;
  font-size: 16px !important;
  font-weight: 700 !important;
}
.nav-phone {
  font-family: "Montserrat", sans-serif !important;
  margin-bottom: 0 !important;
  font-weight: 500 !important;
  font-size: 13px !important;
  position: relative;
  transition: color 10s;
}
.nav-phone:hover {
  color: #777 !important;
}
.navbar-toggler:active {
  border: 0 !important;
  outline: 0 !important;
}
.b-sidebar {
  background: #fff !important;
}
.sidebar-logo {
  height: 20px;
}

.b-sidebar .b-sidebar-header {
  padding: 24px 50px !important;
  margin-top: 50px !important;
}

.dropdown_hover::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 1px;
  background: black;
  transition: 0.3s;
}
.dropdown_hover:hover::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #000 !important;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled) {
  background-color: #fff;
  color: #777 !important;
  font-weight: 500;
  font-family: "Montserrat", sans-serif !important;
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #fff !important;
  color: #000 !important;
}
.lan-btn {
  font-weight: 500 !important;
  font-family: "Montserrat", sans-serif !important;
  color: #000 !important;
}
.b-sidebar-header .close {
  margin-left: auto;
  margin-top: 25px !important;
}

.drawer-lang {
  color: rgb(0 0 0 / 30%);
}
.activeDrawer {
  color: black;
}
.drawer-lang-box {
  position: absolute;
  left: 0;
  bottom: 20px;
  width: 100%;
  padding: 0 20px;
}
</style>
