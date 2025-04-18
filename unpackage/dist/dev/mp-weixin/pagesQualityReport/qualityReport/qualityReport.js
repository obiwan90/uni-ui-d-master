"use strict";
const common_vendor = require("../../common/vendor.js");
require("../../stores/tokenStore.js");
require("../../stores/userInfoStore.js");
const utils_common = require("../../utils/common.js");
const api_qualityCheck_qualityCheck = require("../../api/qualityCheck/qualityCheck.js");
if (!Array) {
  const _easycom_custom_header2 = common_vendor.resolveComponent("custom-header");
  const _component_van_tag = common_vendor.resolveComponent("van-tag");
  const _easycom_uv_album2 = common_vendor.resolveComponent("uv-album");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uv_upload2 = common_vendor.resolveComponent("uv-upload");
  (_easycom_custom_header2 + _component_van_tag + _easycom_uv_album2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uv_upload2)();
}
const _easycom_custom_header = () => "../../components/custom-header/custom-header.js";
const _easycom_uv_album = () => "../../uni_modules/uv-album/components/uv-album/uv-album.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uv_upload = () => "../../uni_modules/uv-upload/components/uv-upload/uv-upload.js";
if (!Math) {
  (_easycom_custom_header + _easycom_uv_album + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uv_upload)();
}
const _sfc_main = {
  __name: "qualityReport",
  setup(__props) {
    const instance = common_vendor.getCurrentInstance();
    const modelData = common_vendor.ref([
      { type: "gjbbname", title: "国家版本", value: "无" },
      { type: "wlbbname", title: "网络版本", value: "无" },
      { type: "bxzt", title: "保修状态", value: "无" },
      { type: "efficiency", title: "电池效率", value: "无" }
    ]);
    const data = common_vendor.ref([
      {
        title: "上传图片",
        tips: "* 机身背面为封面图",
        items: [
          { text: "机身背面", image: "https://www.xzxskj.com/xcximg/img_add_img@3x.png", fileList: [] },
          { text: "屏幕息屏", image: "https://www.xzxskj.com/xcximg/img_add_closewindow@3x.png", fileList: [] },
          { text: "关于本机", image: "https://www.xzxskj.com/xcximg/img_add_about@3x.png", fileList: [] }
        ]
      },
      {
        title: "中框四面",
        items: [
          { text: "中框上方", image: "https://www.xzxskj.com/xcximg/img_add_upward@3x.png", fileList: [] },
          { text: "中框右侧", image: "https://www.xzxskj.com/xcximg/img_add_right@3x.png", fileList: [] },
          { text: "中框下方", image: "https://www.xzxskj.com/xcximg/img_add_downward@3x.png", fileList: [] },
          { text: "中框左侧", image: "https://www.xzxskj.com/xcximg/img_add_left@3x.png", fileList: [] }
        ]
      },
      {
        title: "机身四角",
        items: [
          { text: "左上角", image: "https://www.xzxskj.com/xcximg/img_add_lefttop@3x.png", fileList: [] },
          { text: "右上角", image: "https://www.xzxskj.com/xcximg/img_add_righttop@3x.png", fileList: [] },
          { text: "右下角", image: "https://www.xzxskj.com/xcximg/img_add_rightdown@3x.png", fileList: [] },
          { text: "左下角", image: "https://www.xzxskj.com/xcximg/img_add_leftdown@3x.png", fileList: [] }
        ]
      }
    ]);
    const previewImage = (url) => {
      const urls2 = data.value.flatMap((group) => group.items.flatMap((subItem) => subItem.fileList.map((file) => file.url)));
      console.log("data:", data.value);
      console.log("url:", url);
      const current = urls2.indexOf(url);
      console.log("current:", current);
      common_vendor.index.previewImage({
        showmenu: true,
        current,
        urls: urls2,
        longPressActions: {
          itemList: ["发送给朋友", "保存图片", "收藏"],
          success: function(data2) {
            console.log("选中了第" + (data2.tapIndex + 1) + "个按钮,第" + (data2.index + 1) + "张图片");
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      });
    };
    const isShow = common_vendor.ref(false);
    common_vendor.ref("ch");
    common_vendor.ref("ch");
    common_vendor.ref(false);
    common_vendor.ref(null);
    const titleRemarl = common_vendor.ref("");
    const orgArray = common_vendor.ref([]);
    const selectChange = (e) => {
      console.log("selectChange:", e);
      data.value.forEach((group) => {
        group.items.forEach((item) => {
          item.fileList = [];
        });
      });
      if (e) {
        console.log("selectChange e:", e);
        const { name, ch, machinetime, jkuidname, id, functionaltime, gnjcuidname, servicetime, serviceuidname, price, special, finenessname, csbz, jkbz, gnjcbz, wxjcbz, pzbz, cgyname, productimage } = e;
        receivedData.value = {
          spname: name,
          imei: ch,
          inputTime: utils_common.formatTimestamp(machinetime),
          inputPerson: jkuidname,
          funcInputTime: utils_common.formatTimestamp(functionaltime),
          funcInputPerson: gnjcuidname,
          maintenanceInputTime: utils_common.formatTimestamp(servicetime),
          maintenanceInputPerson: serviceuidname,
          zjid: id,
          finenessname,
          cgyname
        };
        console.log("Received data:", receivedData.value);
        titleRemarl.value = jkbz + " " + gnjcbz + " " + wxjcbz + " " + pzbz + " " + csbz;
        ListingPrice.value = price;
        specialPrice.value = special == 1 ? true : false;
        apiQualityCheckInfoData();
        if (productimage) {
          const productImages = productimage.split(",");
          let imageIndex = 0;
          data.value.forEach((group) => {
            group.items.forEach((item) => {
              if (imageIndex < productImages.length) {
                item.fileList.push({
                  url: productImages[imageIndex],
                  name: item.text
                });
                imageIndex++;
              }
            });
          });
        }
        console.log("data", data.value);
      }
    };
    const ListingPrice = common_vendor.ref();
    const specialPrice = common_vendor.ref(false);
    const urls = common_vendor.ref([
      // 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
      // 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
      // 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
      // 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
      // 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
      // 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
      // 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
      // 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
      // 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
      // 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
      // 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png',
      // 'https://www.xzxskj.com/Public/upload/6612393544bda4389.png'
    ]);
    const infos = common_vendor.ref();
    const yjinfos = common_vendor.ref();
    const qualityinspection = common_vendor.ref([]);
    const apiQualityCheckSerialSearchData = async (ch) => {
      const param = {
        opid: common_vendor.index.getStorageSync("sessionInfo").opid,
        ch
      };
      const res = await api_qualityCheck_qualityCheck.apiQualityCheckSerialSearch(param);
      if (res.code === 200) {
        return orgArray.value = res.lists ? res.lists : [];
      }
    };
    const jbztycbg = common_vendor.ref();
    const gnjcycbg = common_vendor.ref();
    const wxjcycbg = common_vendor.ref();
    const zjbg = common_vendor.ref([]);
    const apiQualityCheckInfoData = async () => {
      const param = {
        id: receivedData.value.zjid
      };
      const res = await api_qualityCheck_qualityCheck.apiQualityCheckInfo(param);
      if (res.code === "200") {
        console.log("Quality check info:", res);
        infos.value = res.infos;
        let bxsj = new Date(infos.value.bxsj);
        jbztycbg.value = infos.value.jbztycbg ? JSON.parse(infos.value.jbztycbg) : [];
        gnjcycbg.value = infos.value.gnjcycbg ? JSON.parse(infos.value.gnjcycbg) : [];
        wxjcycbg.value = infos.value.wxjcycbg ? JSON.parse(infos.value.wxjcycbg) : [];
        zjbg.value = [
          ...jbztycbg.value.map((item) => ({ id: item.id, url: item.url })),
          ...gnjcycbg.value.map((item) => ({ id: item.id, url: item.url })),
          ...wxjcycbg.value.map((item) => ({ id: item.id, url: item.url }))
        ];
        const getCurrentDate = () => {
          const now = /* @__PURE__ */ new Date();
          now.setHours(0, 0, 0, 0);
          return now;
        };
        let currentDate = getCurrentDate();
        qualityinspection.value = res.infos.qualityinspection;
        qualityinspection.value.forEach((item) => {
          item.er.forEach((item1) => {
            if (item1.name === "保修截止") {
              item1.xznr = infos.value.bxsj;
              item1.xznrcor = "";
              if (bxsj < currentDate) {
                item1.xznrcor = "black";
              } else {
                item1.xznrcor = "black";
              }
            }
          });
        });
        console.log("qualityinspection:", qualityinspection.value);
        yjinfos.value = res.yjinfos;
        infos.value.combinationid.push(yjinfos.value.qminfos);
        infos.value.combinationname.push(yjinfos.value.name);
        infos.value.combinationyslist.push(yjinfos.value.color);
        const yjxsimgs = infos.value.yjxsimg.split(",");
        const jswgimgs = infos.value.jswgimg.split(",");
        const pmwgimgs = infos.value.pmwgimg.split(",");
        urls.value = [
          {
            imgs: jswgimgs
          },
          {
            imgs: pmwgimgs
          },
          {
            imgs: yjxsimgs
          }
        ];
        modelData.value = modelData.value.map((item) => ({
          ...item,
          value: res.infos[item.type] || "无"
        }));
        console.log("urls:", urls.value[0].imgs);
      }
    };
    const showImage = (id) => {
      const foundItem = zjbg.value.find((item) => item.id === id);
      if (foundItem) {
        return true;
      }
      return false;
    };
    const preview = (id) => {
      zjbg.value.forEach((item, index) => {
        if (item.id === id) {
          common_vendor.index.previewImage({
            current: index,
            urls: zjbg.value.map((item2) => item2.url)
          });
        }
      });
    };
    const receivedData = common_vendor.ref(null);
    common_vendor.index.$on("listingProductRefresh", () => {
      receivedData.value = null;
      orgArray.value = [];
    });
    common_vendor.onLoad((options) => {
      if (options.data) {
        try {
          isShow.value = true;
          receivedData.value = JSON.parse(decodeURIComponent(options.data));
          titleRemarl.value = receivedData.value.jkbz + " " + receivedData.value.gnjcbz + " " + receivedData.value.wxjcbz + " " + receivedData.value.pzbz + " " + receivedData.value.csbz;
          console.log("Received data:", receivedData.value);
          apiQualityCheckInfoData();
        } catch (e) {
          console.error("Failed to parse received data:", e);
        }
      }
      if (options.ch) {
        apiQualityCheckSerialSearchData(options.ch).then((res) => {
          selectChange(res[0]);
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          backgroundColor: "#F3F2F6"
        }),
        b: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? common_vendor.e({
        c: common_vendor.unref(receivedData).finenessname
      }, common_vendor.unref(receivedData).finenessname ? {
        d: common_vendor.t(common_vendor.unref(receivedData).finenessname),
        e: common_vendor.p({
          size: "mini",
          color: "linear-gradient(132deg, #D94C24 0%, #FF5221 100%)"
        })
      } : {}, {
        f: common_vendor.t(common_vendor.unref(receivedData).spname),
        g: common_vendor.t(common_vendor.unref(receivedData).imei),
        h: common_vendor.o(($event) => common_vendor.unref(instance).proxy.copyText(common_vendor.unref(receivedData).imei)),
        i: common_vendor.t(common_vendor.unref(receivedData).cgyname),
        j: common_vendor.t(common_vendor.unref(receivedData).inputPerson),
        k: common_vendor.t(common_vendor.unref(receivedData).funcInputPerson),
        l: common_vendor.t(common_vendor.unref(receivedData).maintenanceInputPerson),
        m: common_vendor.t(common_vendor.unref(titleRemarl))
      }) : {}, {
        n: common_vendor.f(common_vendor.unref(modelData), (item, index, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.value),
            c: index
          };
        }),
        o: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {
        p: common_vendor.unref(ListingPrice),
        q: common_vendor.o(($event) => common_vendor.isRef(ListingPrice) ? ListingPrice.value = $event.detail.value : null),
        r: common_vendor.unref(specialPrice) ? "https://www.xzxskj.com/xcximg/icon_xuanze_sel@3x.png" : "https://www.xzxskj.com/xcximg/icon_moren_nor@3x.png"
      } : {}, {
        s: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {
        t: common_vendor.f(common_vendor.unref(infos).combinationid, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.t(common_vendor.unref(infos).combinationname[index]),
            c: common_vendor.unref(infos).combinationyslist[index],
            d: "de3cf05e-2-" + i0,
            e: common_vendor.p({
              urls: common_vendor.unref(urls)[index].imgs,
              maxCount: "2",
              rowCount: "2",
              multipleSize: "48rpx",
              singleSize: "48rpx",
              space: "8rpx"
            }),
            f: index
          };
        })
      } : {}, {
        v: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {
        w: common_vendor.f(common_vendor.unref(qualityinspection), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.name),
            b: item.ycnum === 0
          }, item.ycnum === 0 ? {} : {
            c: common_vendor.t(item.ycnum + "项异常")
          }, {
            d: "de3cf05e-6-" + i0 + "," + ("de3cf05e-5-" + i0),
            e: "de3cf05e-5-" + i0 + "," + ("de3cf05e-4-" + i0),
            f: common_vendor.f(item.er, (item1, index2, i1) => {
              return common_vendor.e({
                a: common_vendor.t(item1.name),
                b: showImage(item1.id)
              }, showImage(item1.id) ? {} : {}, {
                c: common_vendor.t(item1.xznr),
                d: item1.xznrcor === "" ? "#41AF6F" : item1.xznrcor,
                e: common_vendor.o(($event) => preview(item1.id), index2),
                f: index2
              });
            }),
            g: index,
            h: "de3cf05e-4-" + i0 + ",de3cf05e-3"
          });
        }),
        x: common_vendor.p({
          border: false
        }),
        y: common_vendor.p({
          titleBorder: "none",
          border: false
        })
      } : {}, {
        z: common_vendor.unref(receivedData)
      }, common_vendor.unref(receivedData) ? {
        A: common_vendor.f(common_vendor.unref(data), (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: index === 0
          }, index === 0 ? {
            c: common_vendor.t(item.tips)
          } : {}, {
            d: common_vendor.f(item.items, (item1, index1, i1) => {
              return common_vendor.e({
                a: item1.fileList.length > 0
              }, item1.fileList.length > 0 ? {
                b: item1.image,
                c: "de3cf05e-7-" + i0 + "-" + i1,
                d: common_vendor.p({
                  fileList: item1.fileList,
                  name: "1",
                  multiple: true,
                  accept: "image",
                  maxCount: 1,
                  maxSize: "5242880",
                  width: "0",
                  height: "0",
                  sizeType: ["compressed"],
                  previewFullImage: false,
                  previewFullVideo: false
                }),
                e: common_vendor.f(item1.fileList, (item2, index2, i2) => {
                  return {
                    a: item2.url,
                    b: common_vendor.t(item2.name),
                    c: index2,
                    d: common_vendor.o(($event) => previewImage(item2.url), index2)
                  };
                })
              } : {}, {
                f: index1
              });
            }),
            e: index
          });
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-de3cf05e"]]);
wx.createPage(MiniProgramPage);
