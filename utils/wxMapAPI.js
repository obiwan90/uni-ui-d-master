// mapService.js
// import { useLocationStore } from '@/stores'
import QQMapWX from '../utils/qqmap-wx-jssdk.js'
const key = 'KJXBZ-NOQR4-A4CUH-KEJWI-F25M6-REFWO' //使用在腾讯位置服务申请的key
const referer = 'demo2' //调用插件的app的名称	
// const key = 'X4PBZ-LGUK5-UL7I5-ITP4P-RDPX2-2GBIQ' //使用在腾讯位置服务申请的key
// const referer = 'xuandian' //调用插件的app的名称
const category = '生活服务,娱乐休闲'
const qqmapsdk = new QQMapWX({
  key: key, // 替换为你的腾讯地图开发者密钥
})
//获取路线
export const getPoyline = (sendAddrBook, receiveAddrBook) => {
  return new Promise((resolve, reject) => {
    const startLatitude = parseFloat(sendAddrBook.latitude)
    const startLongitude = parseFloat(sendAddrBook.longitude)
    const endLatitude = parseFloat(receiveAddrBook.latitude)
    const endLongitude = parseFloat(receiveAddrBook.longitude)

    const start = {
      latitude: startLatitude,
      longitude: startLongitude,
    }

    const end = {
      latitude: endLatitude,
      longitude: endLongitude,
    }
    // 这里可以是 'driving', 'walking', 'bicycling','ebicycling(电驴)' 等
    qqmapsdk.direction({
      mode: 'ebicycling',
      from: start,
      to: end,
      success: function (res) {
        if (res && res.result && res.result.routes && res.result.routes.length > 0) {
          const route = res.result.routes[0]
          const points = decodePolyline(route.polyline)
          resolve(points)
        } else {
          reject('No route found')
        }
      },
      fail: function (error) {
        reject(error)
      },
    })
  })
}
//腾讯导航
export const navigateToLocation = (addressInfo) => {
  const latitude = parseFloat(addressInfo.latitude)
  const longitude = parseFloat(addressInfo.longitude)

  uni.openLocation({
    latitude: latitude,
    longitude: longitude,
    name: addressInfo.name,
    address: addressInfo.address,
    scale: 8,
  })
}

const decodePolyline = (coors) => {
  var pl = []
  var kr = 1000000
  for (var i = 2; i < coors.length; i++) {
    coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr
  }
  // eslint-disable-next-line no-redeclare
  for (var i = 0; i < coors.length; i += 2) {
    pl.push({
      latitude: coors[i],
      longitude: coors[i + 1],
    })
  }
  return pl
}

//腾讯路线规划
export const showRoutePlan = (addressInfo) => {
  // eslint-disable-next-line no-undef, no-unused-vars
  let plugin = requirePlugin('routePlan')
  // let key = 'X4PBZ-LGUK5-UL7I5-ITP4P-RDPX2-2GBIQ' //使用在腾讯位置服务申请的key
  // let referer = 'xuandian' //调用插件的app的名称
  // let mode = 'bicycling'//自行车
  let mode = 'ebicycling' //小电驴
  let endPoint = JSON.stringify({
    //终点
    name: addressInfo.address,
    latitude: addressInfo.latitude,
    longitude: addressInfo.longitude,
  })
  uni.navigateTo({
    url:
      'plugin://routePlan/index?key=' +
      key +
      '&referer=' +
      referer +
      '&endPoint=' +
      endPoint +
      '&mode=' +
      mode,
  })
}

//获取描点
export const getMarkers = (sendAddrBook, receiveAddrBook) => {
  // debugger
  const newMarkers = []

  if (sendAddrBook && sendAddrBook.latitude && sendAddrBook.longitude) {
    newMarkers.push({
      id: 1,
      iconPath: '/static/images/location_shop.png',
      latitude: sendAddrBook.latitude,
      longitude: sendAddrBook.longitude,
      width: 40,
      height: 40,
    })
  }

  if (receiveAddrBook && receiveAddrBook.latitude && receiveAddrBook.longitude) {
    newMarkers.push({
      id: 2,
      iconPath: '/static/images/location_my.png',
      latitude: receiveAddrBook.latitude,
      longitude: receiveAddrBook.longitude,
      width: 40,
      height: 40,
    })
  }

  // console.log('markers:' + markers.value)
  return newMarkers
}

//地址选择器
export function openLocationPicker(latitude, longitude) {
  const location = JSON.stringify({
    latitude: latitude,
    longitude: longitude,
  })

  uni.navigateTo({
    url: `plugin://chooseLocation/index?key=${key}&referer=${referer}&location=${location}&category=${category}`,
  })
}

//获取定位坐标
// export function getLocation() {
//   return new Promise((resolve, reject) => {
//     uni.getLocation({
//       type: 'gcj02',
//       success: function (res) {
//         //获取仓库
//         const locationStore = useLocationStore()
//         //更新定位
//         const location = {
//           latitude: res.latitude,
//           longitude: res.longitude,
//         }
//         locationStore.setLocation(location)
//         resolve(res)
//       },
//       fail: function (error) {
//         reject(error)
//       },
//     })
//   })
// }

//获取地址
export const getAddress = (latitude, longitude) => {
  return new Promise((resolve, reject) => {
    const url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}`
    // const url = `/api/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}`
    uni.request({
      url: url,
      method: 'GET',
      success: (res) => {
        if (res.data && res.data.result) {
          console.log(res)
          resolve(res.data.result)
        } else {
          reject('地址获取失败')
        }
      },
      fail: () => {
        reject('请求失败')
      },
    })
  })
}


//根据地址获取经纬度
export const getLocationByAddress = (address) => {
  return new Promise((resolve, reject) => {
    const url = `https://apis.map.qq.com/ws/geocoder/v1/?address=${encodeURIComponent(address)}&key=${key}`;
    uni.request({
      url: url,
      method: 'GET',
      success: (res) => {
        if (res.data && res.data.result && res.data.result.location) {
          const { lat, lng } = res.data.result.location;
          resolve({
            latitude: lat,
            longitude: lng
          });
        } else {
          reject('地址解析失败');
        }
      },
      fail: () => {
        reject('请求失败');
      }
    });
  });
};

