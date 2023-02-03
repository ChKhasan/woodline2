import store from "@/store/index.js"
export default {
  trans() {
   let res =  window.$nuxt.$store.state.translate.filter(item => item.translation_group.title == "Products").filter(element => element.key == "home")
    return res
  },
};
