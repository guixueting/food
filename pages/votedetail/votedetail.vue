<template>
	<view class="box">
		<view class="main">
			<view class="title">
				<image :src="paiInfo.avatar" mode="" class="logo"></image>
				<view class="titleName">
					<view class="tnt">{{paiInfo.username}}</view>
					<view class="tnb">{{paiInfo.dateline}}</view>
				</view>
			</view>
			<view class="content">
				<view class="titletop">{{voteInfo.title}}</view>
				<image :src="paiInfo.p800[0].pic" mode="widthFix"></image>
			</view>
			<view class="radio">
				<view class="uni-title uni-common-mt uni-common-pl">{{voteInfo.title}} (单选)</view>
				<view class="uni-list">
					<radio-group @click="changeRadio">
						<label v-for="(item) in voteInfo.optionlist" :key="item.id" class="list">
							<view class="radioValue">
								<radio class="radioo" :value="item.id" ref = "radio_ref"/>
							</view>
							<view class="radioTitle">{{item.title}}</view>
						</label>
					</radio-group>
					<button @click="chenked()" ref='button'>投 票</button>
				</view>
			</view>
			<view class="comment">
				<view class="discuss" v-if="commentList!=null">
					评论
				</view>
				<view class="discuss" v-else></view>
				<view class="commentMain" v-for="(item,index) in commentList" :key="item.cid">
					<view style="display: none;">
						{{JSON.stringify(item.avatar)}}
					</view>
					<view class="commentTitle">
						<image :src="item.avatar" @error="onImgError('commentList',index)" class="commentLogo"></image>
						<view class="commentTitleName">
							<view class="ctnt">{{item.author}}</view>
							<view class="commentTime">
								<view class="ctnf">{{item.floors}}#</view>
								<view class="ctnd">{{item.dateline}}</view>
							</view>
						</view>
					</view>
					<view class="commentContent">{{item.message}}</view>
				</view>
			</view>
			<uni-load-more v-if="!flag" :status="'loading'"></uni-load-more>
			<uni-load-more v-else :status="'noMore'"></uni-load-more>
		</view>
		<view class="tabb">
			<view class="one" @click="goComment">
				<!-- <image class="pic"></image> -->
				<text class="iconfont icon-pinlun"></text>
				<view class="fsize">
					评论
				</view>
			</view>
			<view class="one" @click="goCollect" :style="flag1?'color:red':''">
				<!-- <image class="pic icon-shoucang iconfont"></image> -->
				<text class="iconfont icon-shoucang"></text>
				<view class="fsize">
					收藏
				</view>
			</view>
			<view class="one" @click="goShare">
				<!-- <image class="pic"></image> -->
				<text class="iconfont icon-fenxiang-"></text>
				<view class="fsize">
					分享
				</view>
			</view>
			<view class="one" @click="goGift" style="color: red">
				<!-- <image class="pic"></image> -->
				<text class="iconfont icon-gift-box"></text>
				<view class="fsize">
					福利社
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "@/components/uni/uni-load-more/uni-load-more.vue"
	import {
		myRequestGet
	} from '@/utils/request-xuchen.js'
	export default {
		data() {
			return {
				placeholderImage: '../../static/tabs/默认头像.jpg', //占位图
				flag: false,
				aflag: false,
				paiInfo: {},
				voteInfo: {},
				commentList: [],
				flag1: false,
				id: ""
			};
		},
		onLoad(options) {
			this.id = options.id,
				// console.log(options.id)
				this.pai_getVoteInfo()
			this.comment_getCommentList()
			this.pai_getPaiInfo()

		},
		methods: {
			async pai_getPaiInfo() {
				const res = await myRequestGet('/api.php', {
					p: JSON.stringify({
						"m": {
							"pai_getPaiInfo": {
								"id": this.id
							}
						},
						"openudid": "meishichina",
						"uid": "",
						"appver": "3028",
						"device": "microsoftmicrosoft",
						"appname": "xcx_weixin",
						"session": ""
					})
				})
				this.paiInfo = res.pai_getPaiInfo.data
				// console.log(this.paiInfo)
			},
			async pai_getVoteInfo() {
				const res = await myRequestGet('/api.php', {
					p: JSON.stringify({
						"m": {
							"pai_getVoteInfo": {
								"id": this.id
							}
						},
						"openudid": "meishichina",
						"uid": "",
						"appver": "3028",
						"device": "microsoftmicrosoft",
						"appname": "xcx_weixin",
						"session": ""
					})
				})
				this.voteInfo = res.pai_getVoteInfo.data
				// console.log(this.voteInfo)
			},
			async comment_getCommentList() {
				const res = await myRequestGet('/api.php', {
					p: JSON.stringify({
						"m": {
							"comment_getCommentList": {
								"id": this.id,
								"type": "pai",
								"show": "asc",
								"pageindex": 1,
								"pagesize": 20
							}
						},
						"openudid": "meishichina",
						"uid": "",
						"appver": "3028",
						"device": "microsoftmicrosoft",
						"appname": "xcx_weixin",
						"session": ""
					})
				})
				this.commentList = res.comment_getCommentList.data
			},
			onImgError(dataArray, index) {
				console.log("图片加载失败,载入占位符");
				this.commentList[index].avatar = this.placeholderImage;
				// this.[dataArray][index].avatar=this.placeholderImage;
			},
			changeRadio() {
				this.aflag = true
			},
			chenked() {
				console.log(this.aflag)
				if (this.aflag) {
					uni.showToast({
							title: '投票完成',
						}),
						this.voteInfo.partnum = parseInt(this.voteInfo.partnum) + 1
					this.aflag = false
					let pages = getCurrentPages();
					let nowPage=pages[pages.length - 1];
					// #ifdef H5
					console.log(nowPage)
					for(var i=0;i<nowPage.$refs.radio_ref.length;i++){
						nowPage.$refs.radio_ref[i].disabled = true
					}
					nowPage.$refs.button.disabled = true
					// #endif
					let prevPage = pages[pages.length - 2];
					// console.log(getCurrentPages())
					for (var i = 0; i < prevPage.$vm._data.tabs.length; i++) {
						if (prevPage.$vm._data.tabs[i].id == this.id) {
							prevPage.$vm._data.tabs[i].partnum = this.voteInfo.partnum
						}
					}
				}
			},

			goComment() {

			},
			goCollect() {
				if (this.flag1 == false) {
					this.flag1 = true
					uni.showToast({
						title: '收藏完成',
					});
					let pages = getCurrentPages();
					let prevPage = pages[pages.length - 2];
					for (var i = 0; i < prevPage.$vm._data.tabs.length; i++) {
						if (prevPage.$vm._data.tabs[i].id == this.id) {
							prevPage.$vm._data.tabs[i].likenum = parseInt(prevPage.$vm._data.tabs[i].likenum) + 1
						}
					}
				} else {
					this.flag1 = false
					let pages = getCurrentPages();
					let prevPage = pages[pages.length - 2];
					for (var i = 0; i < prevPage.$vm._data.tabs.length; i++) {
						if (prevPage.$vm._data.tabs[i].id == this.id) {
							prevPage.$vm._data.tabs[i].likenum = parseInt(prevPage.$vm._data.tabs[i].likenum) - 1
						}
					}
				}
			},
			goShare() {

			},
			goGift() {
				uni.switchTab({
					url: `../my/my`
				})
			},
			onPullDownRefresh() {
				this.pageindex = 1;
				this.flag = false;
				this.commentList = [];
				//请求完成之后停止下拉刷新
				this.comment_getCommentList().then(() => {
					uni.stopPullDownRefresh()
				});
			},
			//通过onReachBottom来监听触底
			onReachBottom() {
				this.pageindex++;
				if (this.pageindex <= 1) {
					this.comment_getCommentList();
				} else {
					//没有更多数据了
					this.flag = true;
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

		.main {
			padding-left: 30rpx;
			padding-top: 12rpx;
			margin-bottom: 90rpx;

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
						margin-top: 10rpx;
						font-size: 24rpx;
						color: rgb(156, 156, 156);
					}
				}
			}

			.content {
				margin: 0 10rpx 40rpx;

				.titletop {
					font-size: 36rpx;
					margin: 20rpx 0;
				}

				image {
					width: 670rpx;
					height: 618rpx;
				}
			}

			.radio {
				border: 2rpx solid rgb(221, 221, 221);
				background-color: rgb(242, 242, 242);
				padding-top: 40rpx;
				padding-left: 40rpx;
				border-radius: 3%;

				.uni-title {
					margin-bottom: 10rpx;
					font-weight: 600;
				}

				.uni-list {
					radio-group {
						.list {
							display: flex;
							margin-top: 30rpx;
							padding-bottom: 20rpx;
							border-bottom: 2rpx solid rgb(221, 221, 221);
							font-size: 34rpx;

							.radioValue {}

							.radioTitle {}
						}
					}

					button {
						margin-left: -40rpx;
						color: rgb(153, 153, 153);
					}
				}
			}

			.comment {
				margin-top: 60rpx;

				.discuss {
					margin-bottom: 40rpx;
				}

				.commentMain {
					.commentTitle {
						display: flex;
						margin-top: 30rpx;

						image {
							width: 100rpx;
							height: 100rpx;
							border-radius: 50%;
						}

						.commentTitleName {
							margin-left: 20rpx;

							.ctnt {
								font-size: 32rpx;
							}

							.commentTime {
								display: flex;

								.ctnf {
									font-size: 24rpx;
									color: rgb(156, 156, 156);
									margin-right: 20rpx;
								}

								.ctnd {
									font-size: 24rpx;
									color: rgb(156, 156, 156);
								}
							}
						}
					}

					.commentContent {
						margin: 16rpx 0 0;
						padding-bottom: 26rpx;
						border-bottom: 2rpx solid rgb(221, 221, 221);
					}
				}
			}

			uni-load-more {
				margin-top: -30rpx;
			}

		}

		.tabb {
			width: 100%;
			border-top: 2rpx solid grey;
			position: fixed;
			bottom: 0;
			display: flex;
			background-color: rgb(241, 241, 241);

			.one {
				text-align: center;
				flex: 1;

				text {
					font-size: 50rpx;
				}

				.fsize {
					font-size: 30rpx;
					margin-bottom: 6rpx;
				}
			}
		}
	}
</style>
