<template>
	<view class="box">
		<view class="title" v-for="(item,index) in arr" :key="item.courseId">
			<image :src="item.arr1.courseImage" mode="scaleToFill" @click="goSuperMarket(index)" :data-index="index" :data-item="item"></image>
			<view class="box_bottom">
				<view class="fl">
					<view class="fl_top">{{item.arr1.courseTitle}}</view>
					<view class="fl_bottom">{{item.arr1.courseTitle}}</view>
				</view>

				<view class="fr">
					<text :style="item.flag?'color:red':''" class="sc " @click="addone(index)" disabled="disabled"></text>{{item.arr1.collectCount}}个收藏
				</view>
			</view>
		</view>
		<uni-load-more v-if="!aflag" :status="'loading'"></uni-load-more>
		<uni-load-more v-else :status="'noMore'"></uni-load-more>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni/uni-load-more/uni-load-more.vue"
	import {
		myRequestPost
	} from '@/utils/request.js'

	export default {
		data() {
			return {
				arr: [],
				aflag:false
			}
		},
		onLoad() {
			this.getNewsList();

		},
		methods: {
			async getNewsList() {
				const res = await myRequestPost("/rest/ops/api/source/getLocalVideoList", {
					"userId": null,
					"pageNo": 0,
					"pageSize": 50
				})
				this.newsList = res.datas
				// console.log(res.datas)
				this.getlist()
			},
			getlist() {
				for (var i = 0; i < this.newsList.length; i++) {
					var obj1 = {
						arr1: [],
						flag: false
					}
					// console.log(this.newsList)
					obj1.arr1 = this.newsList[i]
					this.arr.push(obj1)

				}
				console.log(this.arr)
			},
			goSuperMarket(i) {
				uni.navigateTo({
					url: `/pages/videoDetail/videoDetail?order=` + this.arr[i].arr1.orderNo
				})
			},
			addone(i) {
				if (i + 1 == this.arr[i].arr1.orderNo) {
					if (this.arr[i].flag == false) {
						this.arr[i].arr1.collectCount = this.arr[i].arr1.collectCount + 1
						this.arr[i].flag = true
					} else {
						this.arr[i].arr1.collectCount = this.arr[i].arr1.collectCount - 1
						this.arr[i].flag = false
					}
				}
			},
			onPullDownRefresh() {
				this.pageindex = 1;
				this.aflag = false;
				this.arr = [];
				//请求完成之后停止下拉刷新
				this.getNewsList().then(() => {
					uni.stopPullDownRefresh()
				});
			},
			//通过onReachBottom来监听触底
			onReachBottom() {
				this.pageindex++;
				if (this.pageindex <= 1) {
					this.getNewsList();
				} else {
					//没有更多数据了
					this.aflag = true;
				}
			}
		},
		components: {
			uniLoadMore
		}
	}
</script>

<style lang="less">
	.box {
		display: flex;
		flex-direction: column;
		padding: 30rpx;

		.title {
			width: 100%;
			display: flex;
			flex-direction: column;

			image {
				border-radius: 5%;
				height: 420rpx;
				width: 100%;
			}

			.box_bottom {
				padding-top: 20rpx;
				height: 135rpx;

				.fl {
					float: left;

					.fl_top {
						font-weight: 700;
						font-size: 40rpx;
						margin-bottom: 10rpx;
					}

					.fl_bottom {
						font-size: 28rpx;
						color: rgb(185, 185, 185);
					}
				}

				.fr {
					float: right;

					.sc {
						font-size: 40rpx;
					}
				}
			}
		}
	}
</style>
