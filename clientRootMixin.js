import Sidebar from "./Sidebar";
import Vue from "vue";
export default {
  data() {
    return {
      qr: null,
    };
  },
  updated() {
    const navlink = document.querySelector(".nav-links");
    const globalUi = document.querySelector(".global-ui");
    const qrcodeSidebar = document.querySelector(".qrcode-sidebar");
    if (navlink != null && qrcodeSidebar == null) {
      this.$nextTick(() => {
        const navItem = document.createElement("DIV");
        navItem.className += "qrcode-sidebar";
        navItem.appendChild(this.qr.$el);
        globalUi.appendChild(navItem);
      });
    } 
  },
  mounted() {
    const C = Vue.extend(Sidebar);
    const qr = new C();
    console.log(options);
    qr.config = options;
    qr.$mount();
    this.qr = qr;
  },
  methods: {
  },
};
