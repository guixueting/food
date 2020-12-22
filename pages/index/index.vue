<template>
	<view class="content">
		<view class="box">
			<view class="input-box" @click="toSearch">
				<uni-search-bar placeholder="今天想吃点啥？" radius="100" disabled="true" cancelButton="none"></uni-search-bar>
			</view>
		</view>
		<swiper class="swiper" indicator-dots :autoplay="true" :interval="3000" circular>
			<swiper-item v-for="item in swipers" :key="item.id">
				<image :src="item.imageUrl"></image>
			</swiper-item>
		</swiper>
		<uni-grid :column="4" :showBorder="false">
			<uni-grid-item v-for="item in navs" :key="item.title">
				<image :src="item.img" @click="goZaoju(item)"></image>
				<text>{{item.title}}</text>
			</uni-grid-item>
		</uni-grid>
		<view class="main">
			<view class="title">
				菜谱推荐
			</view>
			<!-- 菜谱列表 -->
			<foodlist :menu="menu"></foodlist>
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni/uni-search-bar/uni-search-bar.vue';
	import uniGrid from "@/components/uni/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni/uni-grid-item/uni-grid-item.vue";
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue";
	import foodlist from '@/components/foodlist/foodlist.vue'
	import {
		myRequestPost
	} from '@/utils/request.js'
	export default {
		components: {
			uniSearchBar,
			uniGrid,
			uniGridItem,
			uniIcons,
			foodlist
		},
		data() {
			return {
				swipers: [],
				menu: [],
				navs: [{
						img: "../../static/tabs/番茄锅.png",
						title: "灶具菜谱",
						path: "/pages/zaoju/zaoju",
						dc: 'RRQZ'
					},
					{
						img: "../../static/tabs/蔬菜沙拉.png",
						title: "烤箱菜谱",
						path: "/pages/zaoju/zaoju",
						dc: 'RDKX'
					},
					{
						img: "../../static/tabs/蛋糕.png",
						title: "蒸汽炉菜谱",
						path: "/pages/zaoju/zaoju",
						dc: 'RZQL'
					},
					{
						img: "../../static/tabs/小笼包.png",
						title: "微波炉菜谱",
						path: "/pages/zaoju/zaoju",
						dc: "RWBL"
					}
				]
			}
		},
		onLoad() {
			this.getSwipers(),
				this.getMenu()

		},
		methods: {
			async getSwipers() {
				let result = await myRequestPost("/rest/cks/api/theme/list/get");
				if (result.rc === 0) {
					this.swipers = result.items.slice(0, 3);
				}
				console.log(result)
			},
			async getMenu() {
				let result = await myRequestPost("/rest/cks/api/recommender/user/get", {
					"userId": null,
					"pageNo": 0,
					"pageSize": 25
				})
				console.log(result.cookbooks);
				this.menu = result.cookbooks;
			},
			goZaoju(item) {
				uni.navigateTo({
					url: "/pages/zaoju/zaoju?dc=" + item.dc
				})
				console.log(item, "1005")
			},
			itemClick(item) {
				uni.navigateTo({
					url: '/pages/fooddetail/fooddetail?id=' + item.id
				})
			},
			toSearch() {
				console.log("hhhhhhhhhhhhhhhhh");
				uni.navigateTo({
					url: "/pages/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	.content {
		.box {
			width: 750rpx;
			height: 120rpx;
			display: flex;

			.input-box {
				width: 750rpx;
			}
		}

		.swiper {
			height: 380rpx;

			image {
				width: 750rpx;
				height: 380rpx;
			}
		}

		.uni-grid-item {
			text-align: center;

			image {
				line-height: 90rpx;
				width: 110rpx;
				height: 110rpx;
				margin: 10rpx auto;
				font-size: 25px;
			}

			text {
				font-size: 12px;
			}
		}

		.main {
			.title {
				border-top: 1px solid #ccc;
				padding: 15rpx 0;
				margin: 10rpx 10rpx 10rpx 25rpx;
				font-size: 50rpx;
				font-weight: 700;
			}
		}
	}
</style>
