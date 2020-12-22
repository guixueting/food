<template>
	<view>
		<uni-search-bar placeholder="今天想吃点啥？" @confirm="search" radius="100" v-model="name" v-bind:value="name"></uni-search-bar>
		<view class="recommend">热门搜索</view>
		<view class="btns">
			<button type="default" @click="searchOne(foodsList[0])" class="btn">{{foodsList[0]}}</button>
			<button type="default" @click="searchOne(foodsList[1])" class="btn">{{foodsList[1]}}</button>
			<button type="default" @click="searchOne(foodsList[2])" class="btn">{{foodsList[2]}}</button>
			<button type="default" @click="searchOne(foodsList[3])" class="btn">{{foodsList[3]}}</button>
			<button type="default" @click="searchOne(foodsList[4])" class="btn">{{foodsList[4]}}</button>
		</view>
		<view class="" v-for="item in foodList2" :key="item.name" @click="toFoodDetail(item)">
			<view class="img">
				<image :src="item.imgSmall" mode=""></image>
				<view class="text">
					<view class="">{{item.name}}</view>
					<view class="">{{item.collectCount}}人收藏</view>
				</view>
			</view>
		</view>
		<view class="" v-for="item in foodList4" :key="item.name" @click="toFoodDetail(item)">
			<view class="img">
				<image :src="item.imgSmall" mode=""></image>
				<view class="text">
					<view class="">{{item.name}}</view>
					<view class="">{{item.collectCount}}人收藏</view>
				</view>
			</view>
		</view>
		<view class="" v-if="!flag">
			抱歉，暂时没有您要找的菜呢。
		</view>
	</view>
</template>

<script>
	import uniSearchBar from '@/components/uni/uni-search-bar/uni-search-bar.vue';
	import {
		myRequestPost
	} from '@/utils/request.js';
	export default {
		data() {
			return {
				name: "",
				foodList2: {},
				foodList4: {},
				flag: true,
				foodsList: ["东坡肉", "可乐鸡翅", "排骨", "沙拉", "面"]
			};
		},
		methods: {
			async search(event) {
				this.name = event.value;
				let result = await myRequestPost("/rest/cks/api/cookbook/by-name/get", {
					"name": this.name,
					"x_current_user_id": null
				});
				console.log(result);
				this.foodList2 = result.cookbooks;
				if (this.foodList2.length == 0) {
					this.flag = false;
				}
				console.log(this.flag);
			},
			async searchOne(e) {
				let result = await myRequestPost("/rest/cks/api/cookbook/by-name/get", {
					"name": e,
					"x_current_user_id": null
				});
				console.log(result);
				this.foodList4 = result.cookbooks;
				if (this.foodList4.length == 0) {
					this.flag = false;
				}
			},

			toFoodDetail(item) {
				console.log("mmmmmmmmmmmmmmmm");
				uni.navigateTo({
					url: `/pages/fooddetail/fooddetail?id=${item.id}`
				})
			}
		},
		components: {
			uniSearchBar
		}
	}
</script>

<style lang="less">
	page {
		width: 100%;
		height: 100%;
		font-family: "楷体";

		.recommend {
			margin-top: 40rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: #A0A0A0;
		}

		.btns {
			display: flex;
			margin-top: 40rpx;

			.btn {
				width: 120rpx;
				height: 50rpx;
				line-height: 38rpx;
				padding: 5rpx 10rpx;
				font-size: 24rpx;
				border-radius: 30rpx;
				text-align: center;
				background-color: #ffffff;
				border: 1px #FFCC66 solid;
				color: #A0A0A0;

			}
		}

		.image {
			width: 64px;
			height: 48px;
			background-size: cover;
		}

		.img {
			width: 700rpx;
			margin: 20rpx auto;

			image {
				width: 670rpx;
				height: 400rpx;
				border-radius: 16rpx;
				margin-left: 15rpx;
				background-size: cover;
			}

			.text {
				width: 670rpx;
				margin: 15rpx 0 15rpx 15rpx;
				display: flex;
				justify-content: space-between;
				font-size: 30rpx;
			}
		}
	}
</style>
