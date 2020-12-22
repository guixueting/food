<template>
	<view class="box">
		<view v-for="item in tabs" :key="item.id" @click="goVoteDetail(item)" class="main">
			<view class="title">
				<image :src="item.avatar" mode="" class="logo"></image>
				<view class="titleName">
					<view class="tnt">{{item.username}}</view>
					<view class="tnb">{{item.diettime}}</view>
				</view>
			</view>
			<view class="votetitle">
				<button class="tp">投 票</button>
				<view class="ts">{{item.subject}}</view>
			</view>
			<view class="content">
				<image :src="item.photo[0].pic" mode=""></image>
			</view>
			<view class="bottom">
				{{item.likenum}}个喜欢, {{item.replynum}}条评论, {{item.partnum}}人投票
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: ['tabs'],
		created() {

		},

		methods: {
			goVoteDetail(item){
				// console.log("qqqqqqqq")
				uni.navigateTo({
					url:'/pages/votedetail/votedetail?id='+item.id
				})
			}
		}
	}
</script>

<style lang="less">
	.box {
		padding-left: 30rpx;
		padding-top: 16rpx;
		.main {
			border-bottom: 2rpx solid rgb(156, 156, 156);
			padding-bottom: 20rpx;
			margin-bottom: 20rpx;
			.title {
				display: flex;
				.logo {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					background-size: cover;
				}
				.titleName {
					margin-left: 20rpx;
					.tnb {
						font-size: 24rpx;
						color: rgb(156, 156, 156);
					}
				}
			}
			.votetitle {
				display: flex;
				margin-top: 40rpx;
				margin-bottom: 30rpx;
				text-align: left;
				.tp {
					color: rgb(255, 103, 103);
					font-size: 24rpx;
					border: 1px solid red;
					margin: 0 10rpx 20rpx 0;
					line-height: 38rpx;
					text-align: center;
					padding: 0;
					// display: inline;
					height: 40rpx;
					width: 90rpx;
				}
				.ts {
					margin: -6rpx 10rpx 20rpx 0;
				}
			}
			.content {
				margin: 0 10rpx 10px;
				// #ifdef MP-ALIPAY
				border: 0;
				// #endif
				image {
					width: 300rpx;
					height: 300rpx;
					background-size: cover;
				}
			}
			.bottom {
				font-size: 24rpx;
				color: rgb(156, 156, 156);
			}
		}
	}
</style>
