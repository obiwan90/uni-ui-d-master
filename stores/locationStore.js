import { defineStore } from 'pinia'
import  { getAddress }  from "@/utils/wxMapAPI.js" // 确保路径正确

export const useLocationStore = defineStore('location', {
  state: () => ({
    form: {
      fullLocation: '', // 前端展示
      province: '', // 省份编码（后端参数）
      city: '', // 城市编码（后端参数）
      region: '', // 区/县编码（后端参数）
      address: '', // 详细地址
      postCode: '', // 邮编
      longitude: '', // 经度
      latitude: '', // 纬度
      name: '', // 地址名称
    }
  }),
  actions: {
    async getForm() {
      let localData = uni.getStorageSync('locationForm');
      if (!localData) {
        try {
          const res = await uni.getLocation({
            type: "gcj02",
            altitude: true,
          });
          this.form.longitude = res.longitude;
          this.form.latitude = res.latitude;
          const result = await getAddress(res.latitude, res.longitude);
          this.form.city = result.address_component.city;
		  this.form.province = result.address_component.province;
          this.form.region = result.address_component.district;
          this.form.fullLocation = `${result.address_component.province} ${result.address_component.city} ${result.address_component.district}`;
          this.form.address = result.address;
		  localData = this.form;
          uni.setStorageSync('locationForm', this.form);
        } catch (error) {
          console.error('定位或获取地址信息失败：', error);
        }
      } else {
        this.form = localData; 
      }
      return this.form;
    },
  }
});
