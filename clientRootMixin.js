import QrCode from "./Sidebar";
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
    const qrcodeBtn = document.querySelector(".sidebar-wechat");
    if (navlink != null && qrcodeBtn == null) {
      this.$nextTick(() => {
        const navItem = document.createElement("DIV");
        navItem.className += "qr-item";
        navItem.appendChild(this.qr.$el);
        globalUi.appendChild(navItem);
      });
    } else if (qrcodeBtn != null) {
      this.transformLabel();
      this.qr.$el.querySelector('.labelText').innerText = this.currentLabel;
    }
  },
  mounted() {
    const C = Vue.extend(QrCode);
    const qr = new C();
    console.log(options);
    qr.config = options;
    qr.$mount();
    this.qr = qr;
  },
  methods: {
  },
};
