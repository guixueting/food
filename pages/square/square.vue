<template>
	<view class="Box">
		<view class="top">
			<view class="nav">
				<view class="nav-item ">
					<view class="item" :class="{ active: isActive == 0 }" @click="chenked(0)">看帖</view>
				</view>
				<view class="nav-item ">
					<view class="item" :class="{ active: isActive == 1 }" @click="chenked(1)">投票</view>
				</view>
				<view class="nav-item ">
					<view class="item" :class="{ active: isActive == 2 }" @click="chenked(2)">精华</view>
				</view>
			</view>
		</view>
		<!-- nav-item -->
		<view class="nav_item" v-if="isActive == 0">
			<post-bars :square="square"></post-bars>
			<uni-load-more v-if="!flag" :status="'loading'" class=""></uni-load-more>
			<uni-load-more v-else :status="'noMore'"></uni-load-more>
		</view>
		<view class="nav_item" v-if="isActive == 1">
			<tab2 :tabs="tabs"></tab2>
			<uni-load-more v-if="!flag" :status="'loading'"></uni-load-more>
			<uni-load-more v-else :status="'noMore'"></uni-load-more>
		</view>
		<view class="nav_item" v-if="isActive == 2">
			<Elite :elite="elite"></Elite>
			<uni-load-more v-if="!flag" :status="'loading'"></uni-load-more>
			<uni-load-more v-else :status="'noMore'"></uni-load-more>
		</view>
		<view class="hover-button">
			<view class="button-text1">
				+
			</view>
			<view class="button-text2">
				发帖子
			</view>
		</view>
	</view>

</template>

<script>
	import uniLoadMore from "@/components/uni/uni-load-more/uni-load-more.vue"
	import postBars from '@/components/postbars/postBars-xuchen.vue'
	import Elite from '@/components/elite/elite.vue'
	import tab2 from '@/components/tab/tab2.vue'
	import {
		myRequestGet
	} from '@/utils/request-xuchen.js';
	export default {
		data() {
			return {
				isActive: 0,
				id: "",
				pageindex: 1,
				flag: false,
				square: [],
				elite: [],
				tabs: [],
				current: 0,
				items: ['看帖', '投票', '精华'],
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.getSquareWatch();
			this.getLikechioce();
			this.getPailList();
			// this.findHeadPic()
		},
		methods: {
			chenked(type) {
				this.isActive = type;
				uni.showToast({
					title: '切换至：' + this.items[type]
				})
			},
			//看帖的数据请求 		
			async getSquareWatch() {
				let result = await myRequestGet('/api.php', {
					p: JSON.stringify({
						"m": {
							"pai_getPaiList": {
								"type": "all",
								"pageindex": this.pageindex
							}
						},
						"openudid": "meishichina",
						"uid": 12656254,
						"appver": "3028",
						"device": "microsoftmicrosoft",
						"appname": "xcx_weixin",
						"session": "xcx_weixin:weixin:12656254:g4j5SkNMeV2KNerCulQ1YPuLTnGKQI1J"
					})
				});
				// this.square = result.pai_getPaiList.data;
				// console.log(result,"uuuuuuuuuuuuuuuuu");
				this.square = [...this.square, ...result.pai_getPaiList.data];
			},
			// **********************************************************************************************
			//精选的数据请求 
			async getLikechioce() {
				let result = await myRequestGet('/api.php', {
					p: JSON.stringify({
						"m": {
							"pai_getPaiList": {
								"type": "elite",
								"pageindex": this.pageindex
							}
						},
						"openudid": "meishichina",
						"uid": 12656254,
						"appver": "3028",
						"device": "microsoftmicrosoft",
						"appname": "xcx_weixin",
						"session": "xcx_weixin:weixin:12656254:g4j5SkNMeV2KNerCulQ1YPuLTnGKQI1J"
					})
				});
				// this.elite = result.pai_getPaiList.data;
				this.elite = [...this.elite, ...result.pai_getPaiList.data];
				// console.log("22222222222222222")
			},
			// **********************************************************************************************
			//投票的数据请求 
			async getPailList() {
				const res = await myRequestGet('/api.php', {
					p: JSON.stringify({
						"m": {
							"pai_getPaiList": {
								"type": "vote",
								"pageindex": this.pageindex
							}
						},
						"openudid": "meishichina",
						"uid": "",
						"appver": "3028",
						"device": "microsoftmicrosoft",
						"appname": "xcx_weixin",
						"session": "xcx_weixin:weixin:12656254:g4j5SkNMeV2KNerCulQ1YPuLTnGKQI1J"
					})
				});
				this.tabs = res.pai_getPaiList.data
				console.log(this.tabs)
			},
			// **********************************************************************************************
			onPullDownRefresh() {
				this.pageindex = 1;
				this.flag = false;
				this.square = [];
				this.elite = [];
				//请求完成之后停止下拉刷新
				this.getLikechioce().then(() => {
					uni.stopPullDownRefresh()
				});
				this.getSquareWatch().then(() => {
					uni.stopPullDownRefresh()
				});
				this.getPailList().then(() => {
					uni.stopPullDownRefresh()
				});
			},
			//通过onReachBottom来监听触底
			onReachBottom() {
				this.pageindex++;
				if (this.pageindex <= 3) {
					this.getSquareWatch();
					this.getLikechioce();
					this.getPailList();
				} else {
					//没有更多数据了
					this.flag = true;
				}
			},

		},
		components: {
			uniLoadMore,
			postBars,
			Elite,
			tab2
		}
	}
</script>

<style lang="scss" scoped>
	.Box {
		.hover-button {
			background-color: rgb(233, 160, 111);
			position: fixed;
			right: 100rpx;
			bottom: 100px;
			z-index: 999;
			width: 60px;
			height: 60px;
			// line-height: 100px;
			// text-align: center;
			border-radius: 50%;
			color: #FFFDEF;

			.button-text1 {
				line-height: 40px;
				text-align: center;
				font-size: 30px;
				height: 30px;
			}

			.button-text2 {
				// line-height: 45px;
				margin-bottom: 20px;
				font-size: 10px;
				height: 30px;
				text-align: center;
				line-height: 25px;
			}
		}

		.top {
			.nav {
				background-color: #fff;
				display: flex;
				height: 44px;
				color: #353b48;
				font-size: 16px;
				overflow: scroll;
				position: fixed;
				// #ifdef H5
				top: 40px;
				// #endif
				//#ifdef MP-WEIXIN | MP-ALIPAY
				top: 0px;
				//#endif
				z-index: 999;
				width: 100%;

				.nav-item {
					flex: 1;

					.item {
						text-align: center;
						height: 33px;
						line-height: 33px;
						margin-top: 10px;
					}

					.active {
						color: rgb(255, 116, 116);
						font-weight: 550;
						position: relative;
					}

					.active::after {
						content: '';
						position: absolute;
						top: 25px;
						width: 65rpx;
						height: 8rpx;
						background-color: rgb(255, 103, 103);
						left: 0px;
						right: 0px;
						bottom: 0px;
						margin: auto;
					}
				}
			}
		}

		.nav_item {
			margin-top: 88rpx;
		}
	}
</style>
