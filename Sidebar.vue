<template>
  <div class="sidebar-wechat">
    <div class="izl-rmenu">
      <div
        class="item-layout"
        v-for="(item, key) in itemsModel"
        :key="key"
        v-show="item.isHide == false || item.isHide == undefined"
      >
        <img
          class="item-img"
          :src="item.iconItem.iconUrl"
          :data-name="key"
          @mouseenter="mouseenterHandle"
          @mouseout="mouseOutHandle"
        />
        <span class="item-title">{{ item.iconItem.title }}</span>
        <div
          :ref="'hoverItem' + '_' + key"
          class="qr-code-dialog"
          v-show="item.dialogVisible"
        >
          <div
            class="qr-code-dialog-item"
            v-for="qrItem in item.hoverItems"
            :key="qrItem.title"
          >
            <img v-if="qrItem.imgUrl" :src="qrItem.imgUrl" />
            <div v-if="qrItem.content">
              <a :href="qrItem.content" v-if="qrItem.isTagA == true">
                {{ qrItem.content }}
              </a>
              <span v-else>
                {{ qrItem.content }}
              </span>
            </div>
            <span>{{ qrItem.title }}</span>
          </div>
        </div>
      </div>
      <a class="btn_top" @click="backToTopHandle" style="display: none"></a>
    </div>
  </div>
</template>
  
  <script>
export default {
  components: {},
  data() {
    return {
      itemsModel: {},
    };
  },
  props: {
    config: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    backToTopHandle() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    mouseenterHandle(event) {
      if (this.isLock == true) {
        return;
      }
      const name = event.currentTarget.dataset.name;
      if (!this.itemsModel[name].dialogVisible) {
        this.itemsModel[name].dialogVisible = true;
        this.isLock = true;
      }
    },
    mouseOutHandle(event) {
      const name = event.currentTarget.dataset.name;
      this.itemsModel[name].dialogVisible = false;
      this.isLock = false;
    },
  },
  mounted: function () {
    window.addEventListener("scroll", function () {
      const backToTop = document.querySelector(".btn_top");
      if (window.pageYOffset > 300) {
        backToTop.style.display = "block";
      } else {
        backToTop.style.display = "none";
      }
    });

    let icon = null;
    let title = null;
    const keys = Object.keys(this.config);
    keys.forEach((key) => {
      if (key == "weixin") {
        icon = require("./assets/icon/微信.svg");
        title = "微信";
      } else if (key == "qq") {
        icon = require("./assets/icon/QQ.svg");
        title = "QQ";
      } else if (key == "reward") {
        icon = require("./assets/icon/打赏.svg");
        title = "打赏";
      } else if (key == "email") {
        icon = require("./assets/icon/邮箱.svg");
        title = "邮箱";
      } else {
        icon = require("./assets/icon/其他.svg");
        title = "其他";
      }
      var target = this.config[key];
      this.itemsModel = Object.assign({}, this.itemsModel, {
        [key]: {
          iconItem: {
            title:
              (target && target.iconItem && target.iconItem.title) || title,
            iconUrl:
              (target && target.iconItem && target.iconItem.iconUrl) || icon,
          },
          hoverItems: (target && target.hoverItems) || [
            {
              title: title,
              imgUrl: require("./assets/images/Demo.jpg"),
            },
          ],
          isHide: (target && target.isHide) || false,
          dialogVisible: false
        }
      });
    });
    console.log('last-config:',this.itemsModel);
  },
};
</script>
  
  <style>
/*reset css*/
.qr-code-dialog-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.qr-code-dialog {
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  padding: 16px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transform: translateX(-84px);
}
.qr-code-dialog img {
  width: 135px;
}

.item-layout {
  position: relative;
  width: 84px;
  height: 77px;
  background: #fbfbfb;
  margin-bottom: 2px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: -5px 5px 5px rgba(228, 228, 228, 0);
}
.item-img {
  width: 50%;
}
.hover-item-img {
  position: absolute;
  left: -160px;
  top: 0;
  width: 160px;
}
.item-title {
  font-size: 12px;
}

.izl-rmenu {
  margin-right: 0;
  width: 82px;
  position: fixed;
  right: 2px;
  bottom: 10%;
  -webkit-box-shadow: #ddd 0px 1px 5px;
  -moz-box-shadow: #ddd 0px 1px 5px;
  box-shadow: #ddd 0px 1px 5px;
  z-index: 999;
}

.izl-rmenu .consult .phone {
  background-color: rgb(247, 247, 255);
  position: absolute;
  width: 160px;
  left: -160px;
  top: 0px;
  line-height: 73px;
  color: #000;
  font-size: 18px;
  text-align: center;
  display: none;
  box-shadow: #ddd -1px 1px 4px;
}
.izl-rmenu a.consult:hover .phone {
  display: inline !important;
}

.izl-rmenu a.cart:hover .pic {
  display: block;
}
.izl-rmenu .btn_top {
  background-image: url(./assets/icon/float_top.gif);
  background-repeat: no-repeat;
  background-position: center top;
  display: block;
  height: 39px;
  width: 82px;
  -webkit-transition: all 0s ease-in-out;
  -moz-transition: all 0s ease-in-out;
  -o-transition: all 0s ease-in-out;
  transition: all 0s ease-in-out;
}
.izl-rmenu .btn_top:hover {
  background-image: url(./assets/icon/float_top.gif);
  background-repeat: no-repeat;
  background-position: center bottom;
}
</style>
  