<template>
	<view>
		<view class="themeList" v-for="item in themeList" :key="item.id">
			<view class="item" @click="goDetail(item)">
				<image :src="item.imageUrl"></image>
				<view class="bigText">{{item.name}}</view>
				<view class="smallText">{{item.subName}}</view>
			</view>
		</view>
		<view class="blank"></view>
	</view>
</template>

<script>
	import {
		myRequestPost
	} from "@/utils/request.js";

	export default {
		data() {
			return {
				themeList: [],
				themeDescription: []
			};
		},
		onLoad() {
			this.getThemes();

		},
		methods: {
			async getThemes() {
				let result = await myRequestPost("/rest/cks/api/theme/list/get");
				this.themeList = result.items;
				this.themeDescription = result.description;
			},
			goDetail(item) {
				uni.navigateTo({
					url: `/pages/themeDetails/themeDetails?themeId=${item.id}`
				})
			}
		}
	}
</script>

<style lang="less">
	.themeList {
		.item {
			width: 700rpx;
			height: 500rpx;
			margin-left: 40rpx;
			margin-top: 40rpx;
			font-family: "楷体";

			image {
				width: 670rpx;
				height: 380rpx;
				border-radius: 16rpx;
			}

			.bigText {

				margin-top: 20rpx;
				font-size: 40rpx;
				font-weight: bold;
			}

			.smallText {
				margin-top: 10rpx;
				font-size: 24rpx;
				color: gray;
			}
		}
	}

	.blank {
		width: 750rpx;
		height: 400rpx;
	}
</style>
