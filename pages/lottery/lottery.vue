<template>
	<view class="Lottery">

		<view class="select" @click="linktolodetail">
			<view class="up">
				今天吃啥?
			</view>
			<view class="down">
				点我选菜
			</view>
		</view>


		<view class="search" @click="linktolosearch">
			<view class="input">
				<input type="text" value="" placeholder="输入你想吃啥~" />
			</view>
			<view class="icon">
				<uni-icons type="search" size="30" color="white" style="background-color: #FFA200;"></uni-icons>
			</view>
		</view>
		<view class="item">
			<text>热门搜索:</text>
			<view v-for="item in menu" :key="item.id" class="item-text" @click="linktomenu(item)">
				<text>{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	var timer = null;
	import {
		myRequestPost
	} from '@/utils/request.js';
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	export default {
		data() {
			return {
				menu: []

			};
		},
		components: {
			uniIcons
		},
		onLoad() {
			this.getMenu()
		},
		methods: {
			linktolodetail() {
				uni.navigateTo({
					url: "/pages/lotteryDetail/lotteryDetail"
				})
			},
			async getMenu() {
				let result = await myRequestPost("/rest/cks/api/recommender/user/get", {
					"userId": null,
					"pageNo": 0,
					"pageSize": 25
				})
				console.log(result.cookbooks);
				this.menu = result.cookbooks.slice(1, 7);
			},
			///api/cookbook/by-name/get
			linktomenu(item) {
				uni.navigateTo({
					url: "/pages/fooddetail/fooddetail?id=" + item.id
				})
			},
			linktolosearch() {
				uni.navigateTo({
					url: "/pages/search/search"
				})
			}
		}

	}
</script>

<style lang="scss">
	@keyframes turn2 {
		0% {
			transform: scale(.99);
		}

		50% {
			transform: scale(1.2);
		}

		100% {
			transform: scale(.99);
		}
	}

	page {
		background-color: #fff;
	}

	.Lottery {
		margin: 0 auto;
		padding-top: 100rpx;

		.select {
			margin: 0 auto;
			width: 250rpx;
			height: 250rpx;
			background-color: orange;
			border-radius: 50%;
			color: #fff;
			text-align: center;
			animation: turn2 2.2s linear infinite;

			.up {
				height: 140rpx;
				font-size: 38rpx;
				line-height: 220rpx;
			}

			.down {
				height: 110rpx;
				font-size: 28rpx;
			}
		}

		.search {
			margin: 50rpx auto;
			width: 600rpx;
			height: 100rpx;
			display: flex;

			.input {
				flex: 1;
				display: inline-block;
				padding: 20rpx 0 0 20rpx;
				width: 502rpx;
				height: 70rpx;
				outline-color: red;
				border: 1px solid orange;
				border-radius: 16rpx 0 0 16rpx;
				box-shadow: #DF5000 5rpx;
				font-size: 26rpx;
			}

			.icon {
				width: 100rpx;
				height: 94rpx;
				background-color: #FFA200;
				text-align: center;
				line-height: 100rpx;
				border-radius: 0 16rpx 16rpx 0;

				uni-icons {
					background-color: #FFA200;
					color: #fff;
				}
			}
		}

		.item {
			width: 580rpx;
			height: 400rpx;
			margin: 0 auto;
			font-size: 28rpx;

			.item-text {
				display: inline-block;
				margin: 10rpx 10rpx;
				padding: 15rpx 30rpx;
				border: 1rpx solid #ccc;
				border-radius: 55rpx;
			}
		}
	}
</style>
