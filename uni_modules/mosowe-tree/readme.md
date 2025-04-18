# v2未测，nvue，uvue未测，微信以外小程序未测，不确定是否兼容
## 属性

| 属性                  | 类型            | 说明                                                                | 默认       |
| ------------------- | ------------- | ----------------------------------------------------------------- | -------- |
| modelValue          | array         | v-model值，可选择时已选项值                                                 | []       |
| data                | array         | 树数据                                                               | []       |
| label               | string        | 要展示的目标文案字段                                                        | label    |
| value               | string        | 每个树节点用来作为唯一标识的属性，在整棵树中应该是唯一的                                      | id       |
| children            | string        | 指定子树为节点对象的某个属性值                                                   | children |
| disabled            | string        | 指定节点选择框是否禁用为节点对象的某个属性值                                            | disabled |
| showCheckbox        | boolean       | 是否可选                                                              | false    |
| defaultExpandedKeys | array,boolean | 子集展开收起，Boolean全展开或全收起，array展开指定keys                               | false    |
| expandOnClickNode   | boolean       | 是否在点击节点的时候展开或者收起节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点     | true     |
| checkOnClickNode    | boolean       | 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点，优先级高于expandOnClickNode | false    |
| emptyText           | string        | 空数据展示文案                                                           | 暂无数据     |
| height              | string        | 组件高度，要带单位                                                         | 800rpx   |
| itemHeight          | string        | 每一项高度，要带单位                                                        | 60rpx    |
| indent              | string        | 相邻级节点间的水平缩进，要带单位                                                  | 36rpx    |

## 事件

| 事件        | 说明     | 参数     |
| --------- | ------ | ------ |
| nodeClick | 节点点击事件 | (node) |

## 方法

| 方法              | 说明                             | 参数                        |
| --------------- | ------------------------------ | ------------------------- |
| getHalfCheck    | 获取半选节点                         | -                         |
| getCheckedNodes | 获取已选节点数据，已选节点的keys在v-model中返回了 | -                         |
| setCheckedKeys  | 设置节点选中状态                       | (arrKeys, boolean = true) |
| filter          | 筛选                             | (keyword)                 |

## 插槽

| 插槽      | 说明                         |
| ------- | -------------------------- |
| default | 自定义树节点的内容。 作用域参数为 { node } |

## 示例

```html
<template>
  <view class="">
    <mosowe-tree
      ref="mosoweTreeRef"
      v-model="checkValues"
      :data="treeList"
      label="name"
      value="id"
      show-checkbox
      @nodeClick="nodeClick"></mosowe-tree>
    <mosowe-button @click="getHalf">获取半选</mosowe-button>
    <mosowe-button @click="getCheckedNodes">获取已选节点数据</mosowe-button>
    <mosowe-button @click="setCheckedKeys">设置节点已选</mosowe-button>
    <mosowe-button @click="setCheckedKeysNone">设置节点未选</mosowe-button>
    <mosowe-text>搜索：</mosowe-text>
    <input
      class="input"
      placeholder="请输入"
      v-model="searchKey" />
    <mosowe-button @click="search">搜索</mosowe-button>
  </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { onShow } from '@dcloudio/uni-app';
const mosoweTreeRef = ref<any>(null);
// 获取半选
const getHalf = () => {
  console.log(mosoweTreeRef.value.getHalfCheck());
};
// 获取已选节点的数据
const getCheckedNodes = () => {
  console.log(mosoweTreeRef.value.getCheckedNodes());
};
// 设置节点已选
const setCheckedKeys = () => {
  mosoweTreeRef.value.setCheckedKeys(['64589cd409e29891989bc316', '64589cd409e29891989bc31e']);
};
// 设置节点未选
const setCheckedKeysNone = () => {
  mosoweTreeRef.value.setCheckedKeys(['64589cd409e29891989bc316', '64589cd409e29891989bc31e'], false);
};
// 节点点击
const nodeClick = (item: any) => {
  console.log(item);
};
// filter筛选
const searchKey = ref('');
const search = () => {
  mosoweTreeRef.value.filter(searchKey.value);
};

const checkValues = ref([]);
watch(
  () => checkValues.value,
  () => {
    console.log(checkValues.value);
  },
  {
    deep: true
  }
);
const treeList = [
  {
    id: '64589cd409e29891989bc315',
    comment: '系统管理-目录',
    create_date: 0,
    enable: true,
    icon: 'uni-icons-list',
    menu_id: 'system',
    name: '系统管理',
    parent_id: '',
    permission: 'system',
    sort: 99,
    type: 0,
    url: '',
    children: [
      {
        id: '64589cd409e29891989bc316',
        comment: '用户管理',
        create_date: 0,
        enable: true,
        icon: 'uni-icons-person-filled',
        menu_id: 'system-user',
        name: '用户管理',
        parent_id: 'system',
        permission: 'system-user',
        sort: 99,
        type: 1,
        url: '/pages/system/users/users',
        children: [
          {
            id: '64589cd409e29891989bc317',
            comment: '用户管理-查看',
            create_date: 0,
            enable: true,
            icon: '',
            menu_id: 'system-user-see',
            name: '查看',
            parent_id: 'system-user',
            permission: 'system-user-see',
            sort: 99,
            type: 2,
            url: '',
            children: [],
            text: '查看',
            value: 'system-user-see'
          },
          {
            id: '64589cd409e29891989bc318',
            comment: '用户管理-新增',
            create_date: 0,
            enable: true,
            icon: '',
            menu_id: 'system-user-add',
            name: '新增',
            parent_id: 'system-user',
            permission: 'system-user-add',
            sort: 99,
            type: 2,
            url: '',
            children: [],
            text: '新增',
            value: 'system-user-add'
          },
          {
            id: '64589cd409e29891989bc319',
            comment: '用户管理-编辑',
            create_date: 0,
            enable: true,
            icon: '',
            menu_id: 'system-user-edit',
            name: '编辑',
            parent_id: 'system-user',
            permission: 'system-user-edit',
            sort: 99,
            type: 2,
            url: '',
            children: [],
            text: '编辑',
            value: 'system-user-edit'
          },
          {
            id: '64589cd409e29891989bc31a',
            comment: '用户管理-删除',
            create_date: 0,
            enable: true,
            icon: '',
            menu_id: 'system-user-delete',
            name: '删除',
            parent_id: 'system-user',
            permission: 'system-user-delete',
            sort: 99,
            type: 2,
            url: '',
            children: [],
            text: '删除',
            value: 'system-user-delete'
          },
          {
            id: '64589cd409e29891989bc31b',
            comment: '用户管理-重置密码',
            create_date: 0,
            enable: true,
            icon: '',
            menu_id: 'system-user-password',
            name: '重置密码',
            parent_id: 'system-user',
            permission: 'system-user-password',
            sort: 99,
            type: 2,
            url: '',
            children: [],
            text: '重置密码',
            value: 'system-user-password'
          },
          {
            id: '64589cd409e29891989bc31c',
            comment: '用户管理-用户状态设置，启用禁用',
            create_date: 0,
            enable: true,
            icon: '',
            menu_id: 'system-user-status',
            name: '用户状态设置',
            parent_id: 'system-user',
            permission: 'system-user-status',
            sort: 99,
            type: 2,
            url: '',
            children: [],
            text: '用户状态设置',
            value: 'system-user-status'
          }
        ],
        text: '用户管理',
        value: '/pages/system/users/users'
      },
      {
        id: '64589cd409e29891989bc31d',
        comment: '菜单管理',
        create_date: 0,
        enable: true,
        icon: 'uni-icons-list',
        menu_id: 'system-menu',
        name: '菜单管理',
        parent_id: 'system',
        permission: 'system-menu',
        sort: 99,
        type: 1,
        url: '/pages/system/menus/menus',
        children: [
          {
            id: '64589cd409e29891989bc31e',
            comment: '菜单管理-查看',
            create_date: 0,
            enable: true,
            icon: '',
            menu_id: 'system-menu-see',
            name: '查看',
            parent_id: 'system-menu',
            permission: 'system-menu-see',
            sort: 99,
            type: 2,
            url: '',
            children: [],
            text: '查看',
            value: 'system-menu-see'
          },
          {
            id: '64589cd409e29891989bc31f',
            comment: '菜单管理-新增',
            create_date: 0,
            enable: true,
            icon: '',
            menu_id: 'system-menu-add',
            name: '新增',
            parent_id: 'system-menu',
            permission: 'system-menu-add',
            sort: 99,
            type: 2,
            url: '',
            children: [],
            text: '新增',
            value: 'system-menu-add'
          },
          {
            id: '64589cd409e29891989bc320',
            comment: '菜单管理-编辑',
            create_date: 0,
            enable: true,
            icon: '',
            menu_id: 'system-menu-edit',
            name: '编辑',
            parent_id: 'system-menu',
            permission: 'system-menu-edit',
            sort: 99,
            type: 2,
            url: '',
            children: [],
            text: '编辑',
            value: 'system-menu-edit'
          },
          {
            id: '64589cd409e29891989bc321',
            comment: '菜单管理-删除',
            create_date: 0,
            enable: true,
            icon: '',
            menu_id: 'system-menu-delete',
            name: '删除',
            parent_id: 'system-menu',
            permission: 'system-menu-delete',
            sort: 99,
            type: 2,
            url: '',
            children: [],
            text: '删除',
            value: 'system-menu-delete'
          }
        ],
        text: '菜单管理',
        value: '/pages/system/menus/menus'
      },
      {
        id: '64589cd409e29891989bc322',
        comment: '角色管理',
        create_date: 0,
        enable: true,
        icon: '',
        menu_id: 'system-roles',
        name: '角色管理',
        parent_id: 'system',
        permission: 'system-roles',
        sort: 99,
        type: 1,
        url: '/pages/system/roles/roles',
        children: [
          {
            id: '64589cd409e29891989bc323',
            comment: '角色管理-查看',
            create_date: 0,
            enable: true,
            icon: '',
            menu_id: 'system-roles-see',
            name: '查看',
            parent_id: 'system-roles',
            permission: 'system-roles-see',
            sort: 99,
            type: 2,
            url: '',
            children: [],
            text: '查看',
            value: 'system-roles-see'
          },
          {
            id: '64589cd409e29891989bc324',
            comment: '角色管理-新增',
            create_date: 0,
            enable: true,
            icon: '',
            menu_id: 'system-roles-add',
            name: '新增',
            parent_id: 'system-roles',
            permission: 'system-roles-add',
            sort: 99,
            type: 2,
            url: '',
            children: [],
            text: '新增',
            value: 'system-roles-add'
          },
          {
            id: '64589cd409e29891989bc325',
            comment: '角色管理-编辑',
            create_date: 0,
            enable: true,
            icon: '',
            menu_id: 'system-roles-edit',
            name: '编辑',
            parent_id: 'system-roles',
            permission: 'system-roles-edit',
            sort: 99,
            type: 2,
            url: '',
            children: [],
            text: '编辑',
            value: 'system-roles-edit'
          },
          {
            id: '64589cd409e29891989bc326',
            comment: '角色管理-删除',
            create_date: 0,
            enable: true,
            icon: '',
            menu_id: 'system-roles-delete',
            name: '删除',
            parent_id: 'system-roles',
            permission: 'system-roles-delete',
            sort: 99,
            type: 2,
            url: '',
            children: [],
            text: '删除',
            value: 'system-roles-delete'
          }
        ],
        text: '角色管理',
        value: '/pages/system/roles/roles'
      }
    ],
    text: '系统管理',
    value: 'system'
  }
];
</script>

<style scoped>
.input {
  width: 100%;
  height: 80rpx;
  margin: 30rpx 0;
  border: 1px solid #999;
  border-radius: 6rpx;
  box-sizing: border-box;
}
</style>


```