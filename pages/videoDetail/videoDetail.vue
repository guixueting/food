<template>
	<view class="box">
		<view class="lp">
			<video :src="newsList.playUrl" object-fit='fill' @click="addcount"></video>
		</view>
		<view class="bottom">
			<view class="bl">{{newsList.desc}}</view>
			<view class="br">观看次数：{{newsList.videoWatchcount}}次</view>
		</view>
		<view class="tabb">
			<view class="tl" @click="goWode">
				<image class="ltop" src="../../static/tabs/我的.png"></image>
				<view class="lbottom">
					收藏
				</view>
			</view>
			<view class="tr" @click="goShouye">
				<image class="rtop" src="../../static/tabs/菜谱.png"></image>
				<view class="rbottom">
					首页
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myRequestPost
	} from '@/utils/request.js'
	export default {
		data() {
			return {
				id: "",
				newsList: {}
			}
		},
		onLoad(options) {
			this.order = options.order
			this.getNewsList()
		},
		methods: {
			async getNewsList() {
				const res = await myRequestPost("/rest/ops/api/source/getCourseDetail", {
					"seriesId": "1540452695",
					"orderNo": this.order,
					"userId": null
				})
				this.newsList = res.payload
			},
			addcount() {
				this.newsList.videoWatchcount = this.newsList.videoWatchcount + 1
			},
			goWode() {
				uni.switchTab({
					url: `../my/my`
				})
			},
			goShouye() {
				uni.switchTab({
					url: `../index/index`
				})
			}
		}
	}
</script>

<style lang="less">
	/* #ifdef MP-ALIPAY*/
	.lp {
		width: 750rpx;
		height: 650rpx;

		video {
			width: 750rpx;
			height: 650rpx;
		}
}
		/* #endif*/
	

	/* #ifndef MP-ALIPAY*/


	.lp {
		width: 100%;
		height: 480rpx;

		video {
			width: 100%;
			height: 100%;
		}

	}

	/* #endif*/
	.bl {
		float: left;
		padding: 40rpx;
		font-size: 40rpx;
		font-weight: 700;
	}

	.br {
		float: right;
		padding: 30rpx;
		color: rgb(204, 204, 204);
		font-size: 40rpx;
	}

	.tabb {
		width: 100%;
		border-top: 2rpx solid grey;
		position: fixed;
		bottom: 0;
		display: flex;

		.tl {
			text-align: center;
			flex: 1;

			.ltop {
				width: 60rpx;
				height: 60rpx;
			}
		}

		.tr {
			text-align: center;
			flex: 1;

			.rtop {
				width: 60rpx;
				height: 60rpx;
			}
		}
	}
</style>
