"use strict";
const utils_customRequest = require("../../utils/customRequest.js");
function apiAddShopCard(data) {
  return utils_customRequest.customRequest("/Home/Goods/shoppingcartadd", data, "POST");
}
function apigetShopCard(data) {
  return utils_customRequest.customRequest("/Home/Goods/shoppingcart", data, "POST");
}
function apiSettleShopCard(data) {
  return utils_customRequest.customRequest("/Home/order/index", data, "POST");
}
function apiDeleteShopCard(data) {
  return utils_customRequest.customRequest("/Home/Goods/shoppingcartdel", data, "POST");
}
exports.apiAddShopCard = apiAddShopCard;
exports.apiDeleteShopCard = apiDeleteShopCard;
exports.apiSettleShopCard = apiSettleShopCard;
exports.apigetShopCard = apigetShopCard;
