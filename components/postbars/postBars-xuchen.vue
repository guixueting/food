<template>
	<view>
		<block v-for="(item,index) in square" :key="item.id">
			<view class="content">
				<view class="content2">
					<!-- {{JSON.stringify(item.avatar)}} -->
					<view style="display: none;">
						{{JSON.stringify(item.avatar)}}
					</view>
					<image :src="item.avatar" class="img1" @error="onImgError(square,index)"></image>
					<view class="rt">
						<text class="texts1">{{item.username}}</text>
						<text class="texts2">{{item.diettime}}</text>
					</view>
					<view class="texts4">{{item.title}}</view>
					<view class="texts3">{{item.subject}}</view>
					<view class="commentPhoto">
						<block v-for="picitem in item.photo" :key="picitem.pic">
							<image :src="picitem.pic" class="img2" @click="gopostBarsDetail(item)"></image>
						</block>
					</view>
					<view class="contentbottom">
						<text class="texts5">{{item.likenum}}个喜欢</text>
						<text class="texts5">{{item.replynum}}个评论</text>
					</view>

				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import {
		imgErr
	} from '@/utils/defaultimg.js';
	export default {
		props: ['square'],
		data() {
			return {

			};
		},
		methods: {
			gopostBarsDetail(item) {
				console.log("qqqqqqqq")
				uni.navigateTo({
					url: '/pages/postBarsDetail/postBarsDetail?id=' + item.id
				})
			},
			onImgError(dataArray, index) {
				imgErr(dataArray, index)
			},
		}

	}
</script>

<style lang="scss">
	.content {
		// height: 400rpx;
		// border-top: 1px solid #DCDCDC;
		border-bottom: 1px solid #DCDCDC;
		width: 725rpx;
		margin-left: 25px;
		position: relative;
		padding-bottom: 9px;

		.content2 {
			// position: absolute;
			width: 325px;
			margin: 0;
			margin-right: 25px;
			// padding-right: 25px;
			// box-sizing: border-box;
			// right: 0;
		}

		.img1 {
			border-radius: 50%;
			height: 80rpx;
			width: 80rpx;
			margin-top: 15px;
			// vertical-align: top;
		}

		.texts1 {
			color: #000000;
			font-size: 20px;
			letter-spacing: 2rpx;
		}

		.texts2 {
			color: #888;
			font-size: 14px;
			letter-spacing: 2rpx;
		}

		.texts3 {
			font-size: 16px;
			margin-bottom: 9px;
			letter-spacing: 2rpx;
		}

		.texts4 {
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 9px;
			letter-spacing: 2rpx;
		}


		.rt {
			position: absolute;
			left: 55px;
			top: 15px;
		}

		.commentPhoto {
			width: 650rpx;

			.img2 {
				width: 210rpx;
				height: 210rpx;
				display: inline-block;
				margin-right: 6rpx;
				border-radius: 16rpx;
			}
		}

		.contentbottom {
			margin-top: 18rpx;
			height: 20px;
			display: flex;
			flex-wrap: nowrap;

			.texts5 {
				width: 51px;
				color: #696969;
				font-size: 10px;
				margin-right: 10rpx;
				// line-height:40rpx ;
			}

		}

		text {
			display: block;
			margin: 0;
		}
	}
</style>
