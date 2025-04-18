"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_userInfoStore = require("../../stores/userInfoStore.js");
const utils_debounce = require("../../utils/debounce.js");
const _sfc_main = {
  __name: "identity-pannel",
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const closePanel = () => {
      emit("close");
    };
    const data = common_vendor.ref([]);
    const selectedIndex = common_vendor.ref(0);
    const adminLx = common_vendor.ref("");
    const adminId = common_vendor.ref("");
    const handleCardClick = (index, item) => {
      selectedIndex.value = index;
      adminLx.value = item.adminLx;
      adminId.value = item.adminId;
    };
    const confirm = utils_debounce.debounce(() => handleConfirmClick(), 1e3, true);
    const saveIdentityToStorage = async () => {
      const userInfo = JSON.parse(common_vendor.index.getStorageSync("userInfo"));
      const db = common_vendor.Vs.database();
      await db.collection("user-setting").where({ user_id: userInfo.id }).remove();
      await db.collection("user-setting").add({
        user_id: userInfo.id,
        adminLx: adminLx.value,
        adminId: adminId.value,
        identityData: data.value,
        selectedMine: String(selectedIndex.value)
      });
    };
    const handleConfirmClick = async () => {
      common_vendor.index.setStorageSync("adminLx", adminLx.value);
      common_vendor.index.setStorageSync("adminId", adminId.value);
      const mineIndex = common_vendor.index.getStorageSync("selectedMine") || 0;
      if (mineIndex === selectedIndex.value) {
        closePanel();
        return;
      }
      await stores_userInfoStore.useUserStore().getInfo();
      common_vendor.index.setStorageSync("identityData", data.value);
      common_vendor.index.setStorageSync("selectedMine", selectedIndex.value);
      await saveIdentityToStorage();
      const isSameAdminType = data.value[mineIndex].adminLx === data.value[selectedIndex.value].adminLx;
      if (isSameAdminType) {
        const isAdmin = data.value[mineIndex].adminLx === "1";
        common_vendor.index.$emit(isAdmin ? "pagesAdminUpdate" : "pagesCustomMineUpdate");
        closePanel();
      } else {
        common_vendor.index.showLoading({
          title: "加载中"
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({
            url: data.value[selectedIndex.value].path + "?from=identity",
            success: () => {
              common_vendor.index.hideLoading();
            },
            fail: (err) => {
              console.error("Redirect failed:", err);
              common_vendor.index.hideLoading();
            }
          });
        }, 300);
        closePanel();
      }
    };
    const initializeIdentityData = () => {
      const userInfo = JSON.parse(common_vendor.index.getStorageSync("userInfo"));
      if (userInfo.joininfos && userInfo.joininfos.length > 0) {
        data.value.push({
          image: "https://www.xzxskj.com/Public/upload/66a5cbd5313826194.png",
          username: userInfo.username || "",
          text: "我是用户",
          adminLx: "",
          adminId: "",
          company: "",
          path: "/pagesUserMine/userMine/userMine"
        });
        userInfo.joininfos.forEach((joininfo) => {
          const image = joininfo.adminlx === "1" ? "https://www.xzxskj.com/Public/upload/66a5cbecc3e433030.png" : joininfo.adminlx === "2" || joininfo.adminlx === "4" ? "https://www.xzxskj.com/Public/upload/66a5cbbbd871a873.png" : "";
          const path = joininfo.adminlx === "1" ? "/pagesAdmin/admin/admin" : joininfo.adminlx === "2" || joininfo.adminlx === "4" ? "/pagesCustomMine/customMine/customMine" : "";
          data.value.push({
            image,
            username: joininfo.username || "",
            text: joininfo.gsname,
            adminLx: joininfo.adminlx,
            adminId: joininfo.id,
            company: joininfo.gwname,
            path,
            gsid: joininfo.gsid
          });
        });
      }
    };
    common_vendor.onMounted(() => {
      const selectedMine = common_vendor.index.getStorageSync("selectedMine");
      if (selectedMine) {
        selectedIndex.value = selectedMine;
      }
      initializeIdentityData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => _ctx.$emit("close")),
        b: common_vendor.f(data.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.image,
            b: common_vendor.t(item.text),
            c: item.company
          }, item.company ? {
            d: common_vendor.t(item.company),
            e: item.adminLx === "1" ? 1 : ""
          } : {}, {
            f: item.text === "我是用户" ? 1 : "",
            g: selectedIndex.value === index
          }, selectedIndex.value === index ? {} : {}, {
            h: index,
            i: selectedIndex.value === index ? 1 : "",
            j: common_vendor.o(($event) => handleCardClick(index, item), index)
          });
        }),
        c: common_vendor.o(($event) => common_vendor.unref(confirm)())
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bd945fa2"]]);
wx.createComponent(Component);
