const SYSTEM_INFO = uni.getSystemInfoSync();

export const getStatusBarHeight = ()=> SYSTEM_INFO.statusBarHeight || 15;

export const getTitleBarHeight = ()=>{
	if(uni.getMenuButtonBoundingClientRect){
		let {top,height} = uni.getMenuButtonBoundingClientRect();
		return height + (top - getStatusBarHeight())*2		
	}else{
		return 40;
	}
}
// 40为search固定高度
export const  getNavBarHeight = ()=> getStatusBarHeight()+getTitleBarHeight()+50;
// header 高度
export const  getHeaderBarHeight = () => getStatusBarHeight()+getTitleBarHeight();
export const getLeftIconLeft = ()=> {
// #ifdef MP-TOUTIAO
	let {leftIcon:{left,width}}  = tt.getCustomButtonBoundingClientRect();
	return left+ parseInt(width);
// #endif

// #ifndef MP-TOUTIAO
	return 0
// #endif	
}