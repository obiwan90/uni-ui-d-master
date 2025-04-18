import  {customRequest}  from '@/utils/customRequest.js';

//上架
export function apiListingProductAdd(data) {
	return customRequest('/Home/Basic/priceadd', data, 'POST');
}

//获取商品详情 id string
export function apiGetProductDetail(data){
  return customRequest('/Home/Goods/infos', data,'POST');
}