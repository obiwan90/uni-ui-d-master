<template>
	<view>
	 <view class="main_box">
	    <classify></classify>
	 	<mine v-if="currentTabIndex === 4"></mine>
	 </view>
	 <custom-tabbar v-if="currentTabIndex!==3" ></custom-tabbar>
	</view>
</template>

<script setup>
	import { useTabStore } from '@/stores/tabStore';
	const tabStore = useTabStore();
	const currentTabIndex = computed(() => tabStore.currentTabIndex);
	import { classify } from '@/pagesClassify/classify/classify.vue'
	import { mine } from '@/pages/mine/mine.vue'
</script>

<style lang="scss" scoped>
	
</style>
