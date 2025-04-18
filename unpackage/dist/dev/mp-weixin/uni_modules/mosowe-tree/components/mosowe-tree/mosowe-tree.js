"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "mosowe-tree",
  props: {
    modelValue: {
      // v-model，数据为全选状态值，初始化后父组件修改不会触发数据更新，可使用setCheckedKeys方法处理，done
      type: Array,
      default: () => []
    },
    data: {
      // 树数据，done
      type: Array,
      default: () => []
    },
    label: {
      // 指定节点标签为节点对象的某个属性值，done
      type: String,
      default: "label"
    },
    value: {
      // 每个树节点用来作为唯一标识的属性，在整棵树中应该是唯一的，done
      type: String,
      default: "id"
    },
    children: {
      // 指定子树为节点对象的某个属性值，done
      type: String,
      default: "children"
    },
    disabled: {
      // 指定节点选择框是否禁用为节点对象的某个属性值，done
      type: String,
      default: "disabled"
    },
    showCheckbox: {
      // 可选，done
      type: Boolean,
      default: false
    },
    defaultExpandedKeys: {
      // done 子集展开收起，Boolean全展开或全收起，array展开指定keys
      type: [Array, Boolean],
      default: false
    },
    expandOnClickNode: {
      // done 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点
      type: Boolean,
      default: true
    },
    checkOnClickNode: {
      // done 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点，优先级高于expandOnClickNode
      type: Boolean,
      default: false
    },
    emptyText: {
      // 空数据时展示形式，done
      type: String,
      default: "暂无数据"
    },
    height: {
      // 组件高度，done
      type: String,
      default: "800rpx"
    },
    itemHeight: {
      // 每一项的高度，done
      type: String,
      default: "60rpx"
    },
    indent: {
      // 相邻级节点间的水平缩进，done
      type: String,
      default: "36rpx"
    }
  },
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  data() {
    return {
      sourceData: [],
      // 原树数据，来源props.data，已添加自定义层级字段
      chooseList: [],
      // 已选择数据
      scrollTop: 0,
      list: [],
      // 已展开数据
      showList: [],
      // 展示的数据列表
      offsetY: 0,
      // 滚动偏移量
      offsetNum: 5,
      // 前后保留数据量
      openList: [],
      // 已展开项数据列表，存的是value值
      startIndex: 0,
      // 显示的内容起始位置
      itemHeightPx: 0,
      // 把原本rpx的转为px，用于计算滚动
      mosoweTreeContainerPx: 0
      // 把原本rpx的转为px，用于计算滚动
    };
  },
  computed: {
    wrapHeight() {
      const unit = this.itemHeight.replace(/[0-9]/g, "");
      return parseInt(this.itemHeight) * this.list.length + unit;
    },
    pageNum() {
      if (this.mosoweTreeContainerPx && this.itemHeightPx) {
        return Math.ceil(this.mosoweTreeContainerPx / this.itemHeightPx) + this.offsetNum;
      } else {
        return this.offsetNum;
      }
    }
  },
  watch: {
    chooseList: {
      // v-model
      handler() {
        this.$emit("update:modelValue", this.chooseList);
      },
      deep: true
    },
    data: {
      // props.data
      handler() {
        this.init();
      },
      deep: true
    }
  },
  created() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      this.treeAddLevel();
      this.list = JSON.parse(JSON.stringify(this.sourceData));
      this.chooseList = [...this.modelValue];
      this.nodeOpenStatus();
      this.nodeInfo();
    },
    // 给data树添加nodeLevel并赋值给sourceData
    treeAddLevel() {
      const recursive = (array, level = -1) => {
        level++;
        return array.map((v) => {
          v["nodeLevel"] = level;
          const child = v[this.children];
          if (child && child.length)
            recursive(child, level);
          return v;
        });
      };
      this.sourceData = recursive(this.data);
    },
    // 节点默认情况下的展开形式
    nodeOpenStatus() {
      var _a;
      if (typeof this.defaultExpandedKeys === "boolean" && this.defaultExpandedKeys) {
        this.list = this.openNodes(this.list, []);
      }
      if (Array.isArray(this.defaultExpandedKeys) && ((_a = this.defaultExpandedKeys) == null ? void 0 : _a.length)) {
        let openKeys = this.getValueByKeyForObject({
          value: this.defaultExpandedKeys,
          source: this.list,
          valueKey: this.value,
          targetKey: this.value
        }).map((i) => i.toString().split("/").map(Number));
        openKeys = Array.from(new Set(openKeys.flat(Infinity)));
        this.list = this.openNodes(this.list, [], openKeys);
      }
    },
    // 节点相关数据计算
    nodeInfo() {
      this.$nextTick(() => {
        const query = common_vendor.index.createSelectorQuery().in(this);
        query.select("#mosowe-tree-container").boundingClientRect((data) => {
          this.mosoweTreeContainerPx = data.height.toFixed(2);
        });
        query.select("#mosowe-tree-wrap").boundingClientRect((data) => {
          this.itemHeightPx = data.height.toFixed(2) / this.list.length;
          this.startIndex = 0;
          let t = setTimeout(() => {
            clearTimeout(t);
            t = null;
            this.handleScroll(null);
          }, 100);
        }).exec();
      });
    },
    // 初始化展开节点
    openNodes(list, oldList, openKeys = []) {
      const oldListIds = oldList.map((i) => i[this.value]);
      let l = JSON.parse(JSON.stringify(list));
      let len = list.length - 1;
      let hasChildren = false;
      while (len > -1) {
        const item = list[len];
        if (this.hasChildren(item) && !oldListIds.includes(item[this.value]) && (!openKeys.length ? true : openKeys.includes(item[this.value]))) {
          this.openList.push(item[this.value]);
          l.splice(len + 1, 0, ...item[this.children]);
          if (item[this.children].filter((i) => this.hasChildren(i)).length) {
            hasChildren = true;
          }
        }
        len--;
      }
      if (hasChildren) {
        l = this.openNodes(l, list, openKeys);
      }
      return l;
    },
    // 滚动时
    handleScroll(e) {
      var _a;
      const scrollTop = Math.floor(((_a = e == null ? void 0 : e.detail) == null ? void 0 : _a.scrollTop) || 0);
      this.offsetY = scrollTop - scrollTop % this.itemHeightPx;
      let startIndex = Math.floor(scrollTop / this.itemHeightPx);
      if (startIndex > this.offsetNum) {
        this.offsetY -= this.offsetNum * this.itemHeightPx;
        startIndex = startIndex - this.offsetNum;
      }
      this.startIndex = startIndex;
      this.setShowList();
    },
    // 展示的数据
    setShowList() {
      this.showList = [...this.list].slice(this.startIndex, this.startIndex + this.pageNum + this.offsetNum);
    },
    // 是否有子集
    hasChildren(item) {
      return Object.keys(item).includes(this.children) && item[this.children].length > 0;
    },
    // 点击箭头展开/关闭子集
    openOrCloseChild(item) {
      const value = item[this.value];
      const index = this.openList.indexOf(value);
      if (index > -1) {
        this.openList.splice(index, 1);
        const children = this.treeToArray(item[this.children]);
        const arrValue = children.map((i) => {
          const iIndex = this.openList.indexOf(i[this.value]);
          if (iIndex > -1) {
            this.openList.splice(iIndex, 1);
          }
          return i[this.value];
        });
        this.list = this.list.filter((i) => !arrValue.includes(i[this.value]));
      } else {
        this.openList.push(value);
        const lIndex = this.list.findIndex((i) => i[this.value] === item[this.value]);
        this.list.splice(lIndex + 1, 0, ...item[this.children]);
      }
      this.setShowList();
    },
    // 节点点击
    labelClick(item) {
      this.$emit("nodeClick", item);
      if (this.checkOnClickNode && this.showCheckbox) {
        this.selectionClick(item);
        return;
      }
      if (this.expandOnClickNode && this.hasChildren(item)) {
        this.openOrCloseChild(item);
        return;
      }
    },
    // 选择
    selectionClick(item) {
      if (item[this.disabled]) {
        return;
      }
      const index = this.chooseList.indexOf(item[this.value]);
      let chooseList = [...this.chooseList];
      if (index > -1) {
        chooseList.splice(index, 1);
        if (this.hasChildren(item)) {
          this.treeToArray(item[this.children]).forEach((i) => {
            const iIndex = chooseList.indexOf(i[this.value]);
            if (iIndex > -1) {
              chooseList.splice(iIndex, 1);
            }
          });
        }
      } else {
        let newList = [item[this.value]];
        if (this.hasChildren(item)) {
          this.treeToArray(item[this.children]).forEach((i) => {
            newList.push(i[this.value]);
          });
        }
        chooseList.push(...newList);
      }
      this.chooseList = Array.from(new Set(chooseList));
      this.selectionCheckFather(item);
    },
    // 操作子集的时候，父级也要看情况是全选、半选、不选
    selectionCheckFather(item) {
      const chooseList = [...this.chooseList];
      if (item.nodeLevel > 0) {
        const index = this.list.findIndex((i) => i[this.value] === item[this.value]);
        item.nodeLevel;
        this.list.slice(0, index).reverse();
        let parentNodes = [];
        parentNodes.forEach((it) => {
          const list = this.treeToArray(it[this.children]);
          let isAll = true;
          for (let itcIndex = 0; itcIndex < list.length; itcIndex++) {
            const itc = list[itcIndex];
            if (!chooseList.includes(itc[this.value])) {
              isAll = false;
              break;
            }
          }
          if (isAll) {
            chooseList.push(it[this.value]);
          } else {
            const i = chooseList.indexOf(it[this.value]);
            if (i > -1) {
              chooseList.splice(i, 1);
            }
          }
        });
        this.chooseList = Array.from(new Set(chooseList));
      }
    },
    // 节点是否半选，用于多选框的半选展示
    isHalfCheck(item) {
      return Object.keys(item).includes(this.children) && this.treeToArray(item[this.children]).filter((i) => this.chooseList.includes(i[this.value])).length > 0 && !this.isAllCheck(item);
    },
    // 节点是否全选，用于多选框的全选展示
    isAllCheck(item) {
      return this.chooseList.includes(item[this.value]);
    },
    // 树转数组
    treeToArray(tree) {
      const nodes = JSON.parse(JSON.stringify(tree));
      var r = [];
      if (Array.isArray(nodes)) {
        for (var i = 0, l = nodes.length; i < l; i++) {
          r.push(nodes[i]);
          if (Array.isArray(nodes[i][this.children]) && nodes[i][this.children].length > 0)
            r = r.concat(this.treeToArray(nodes[i][this.children]));
        }
      }
      return r;
    },
    /*
    * 根据值和数组/树形结构数据，获取指定字段值
    * @param value 值，数组，一个值的情况可以不用数组
    * @param source 源数组或树
    * @param valueKey value对应的key
    * @param targetKey 需要获取的值对应的key
    * 返回数组
    */
    getValueByKeyForObject(options) {
      if (!options) {
        return [];
      }
      const {
        value,
        source,
        valueKey,
        targetKey
      } = options;
      let treePrefix = "";
      let result = [];
      let val = value;
      const treeDeal = (data) => {
        if (data[this.children]) {
          let r = this.getValueByKeyForObject({
            ...options,
            source: data[this.children]
          });
          if (r.length) {
            treePrefix = data[targetKey];
            r = r.map((item) => {
              return treePrefix + "/" + item;
            });
          }
          result.push(...r);
        }
      };
      if (Object.prototype.toString.call(source) === "[object Object]") {
        if (val.includes(source[valueKey])) {
          result.push(source[targetKey]);
        }
        treeDeal(source);
      } else {
        source.forEach((item) => {
          if (Object.prototype.toString.call(item) === "[object Object]") {
            if (val.includes(item[valueKey])) {
              result.push(item[targetKey]);
            }
            treeDeal(item);
          }
          if (Array.isArray(item)) {
            result.push(
              ...this.getValueByKeyForObject({
                ...options,
                source: item
              })
            );
          }
        });
      }
      return result;
    },
    // ***【方法】【父组件调用】获取半选，返回halfNodeKeys和halfNodes
    getHalfCheck() {
      const halfNodes = this.treeToArray(this.sourceData).filter((i) => this.isHalfCheck(i)).map((i) => {
        delete i[this.children];
        return i;
      });
      return {
        halfNodeKeys: halfNodes.map((i) => i[this.value]),
        halfNodes
      };
    },
    // ***【方法】【父组件调用】获取已选节点数据，已选节点的keys在v-model中返回了
    getCheckedNodes() {
      const nodes = this.treeToArray(this.sourceData).filter((i) => this.isAllCheck(i)).map((i) => {
        delete i[this.children];
        return i;
      });
      return nodes;
    },
    // ***【方法】【父组件调用】设置节点选中状态
    setCheckedKeys(arr, boolean = true) {
      const dataArr = this.treeToArray(this.sourceData);
      let chooseList = [...this.chooseList];
      if (boolean) {
        while (arr.length) {
          const key = arr.pop();
          chooseList.push(key);
          const item = dataArr.filter((i) => i[this.value] === key)[0];
          if (item && this.hasChildren(item)) {
            const childKeys = this.treeToArray(item[this.children]).map((i) => i[this.value]);
            chooseList.push(...childKeys);
          }
        }
      } else {
        while (arr.length) {
          const key = arr.pop();
          const index = chooseList.indexOf(key);
          if (index > -1) {
            chooseList.splice(index, 1);
          }
          const item = dataArr.filter((i) => i[this.value] === key)[0];
          if (item && this.hasChildren(item)) {
            let childKeys = this.treeToArray(item[this.children]).map((i) => i[this.value]);
            while (childKeys.length) {
              const k = childKeys.pop();
              const ki = chooseList.indexOf(k);
              if (ki > -1) {
                chooseList.splice(ki, 1);
              }
            }
          }
        }
      }
      this.chooseList = Array.from(new Set(chooseList));
    },
    // ***【方法】【父组件调用】筛选
    filter(keyword) {
      if (keyword) {
        this.list = this.openNodes(this.filterDeal(this.sourceData, keyword), []);
        this.nodeInfo();
      } else {
        this.openList = [];
        this.init();
      }
      this.scrollTop = -1;
      setTimeout(() => {
        this.scrollTop = 0;
      }, 100);
    },
    filterDeal(data, keyword) {
      let arr = JSON.parse(JSON.stringify(data));
      let result = [];
      for (let item of arr) {
        if (item[this.label].includes(keyword)) {
          if (this.hasChildren(item)) {
            item[this.children] = this.filterDeal(item[this.children], keyword);
          }
          result.push(item);
        } else if (this.hasChildren(item)) {
          item[this.children] = this.filterDeal(item[this.children], keyword);
          if (item[this.children].length) {
            result.push(item);
          }
        }
      }
      return result;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.data.length || !$data.list.length
  }, !$props.data.length || !$data.list.length ? {
    b: common_vendor.t($props.emptyText)
  } : {}, {
    c: common_vendor.f($data.showList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.f(item.nodeLevel, (i, k1, i1) => {
          return {
            a: i
          };
        }),
        b: $data.openList.includes(item[$props.value]) && $options.hasChildren(item) ? 1 : "",
        c: !$data.openList.includes(item[$props.value]) && $options.hasChildren(item) ? 1 : "",
        d: common_vendor.o(($event) => $options.openOrCloseChild(item), index)
      }, $props.showCheckbox ? {
        e: item[$props.disabled] ? 1 : "",
        f: $options.isHalfCheck(item) ? 1 : "",
        g: $options.isAllCheck(item) ? 1 : "",
        h: common_vendor.o(($event) => $options.selectionClick(item), index)
      } : {}, {
        i: common_vendor.t(item[$props.label]),
        j: "d-" + i0,
        k: common_vendor.r("d", {
          node: item
        }, i0),
        l: common_vendor.o(($event) => $options.labelClick(item), index),
        m: index
      });
    }),
    d: $props.showCheckbox,
    e: "translateY(" + $data.offsetY + "px)",
    f: $options.wrapHeight,
    g: $props.height,
    h: $props.indent,
    i: $props.itemHeight,
    j: $props.height
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cdd30e4e"]]);
wx.createComponent(Component);
