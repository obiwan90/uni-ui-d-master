import  {customRequest}  from '@/utils/customRequest.js';

//获取商品详情 id string
export function apiAddShopCard(data){
  return customRequest('/Home/Goods/shoppingcartadd', data,'POST');
}

//获取列表  opdi
export function apigetShopCard(data){
  return customRequest('/Home/Goods/shoppingcart', data,'POST');
}

//购物车结算 opdi  goodsid
export function apiSettleShopCard(data){
  return customRequest('/Home/order/index', data,'POST');
}

//购物车删除
export function apiDeleteShopCard(data){
  return customRequest('/Home/Goods/shoppingcartdel', data,'POST');
}