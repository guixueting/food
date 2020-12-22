<template>
	<view>
		<view class="continer">
			<view class="title">{{themeName}}</view>
			<view class="themeIntroduce">{{themeDescription}}</view>
			<view class="title2">推荐菜</view>
			<view v-for="(item,index) in themeList" :key="index" class="buttons">
				<button type="default" class="button_item" @click="goFoodDetails(item)">{{item.name}}</button>
			</view>

			<view class="foodsPhoto" v-for="(item,index) in themeList" :key="item.id">
				<view class="Photo_item">
					<image :src="item.imgLarge" @click="goFoodDetails(item)"></image>
					<view class="text">
						<text class="left">{{item.name}}</text>
						<view class="right">
							<uni-icons type="heart" size="20"></uni-icons>
							<text class="collect">{{item.collectCount}}人收藏</text>
						</view>
					</view>
				</view>
			</view>

			<view class="blank">

			</view>

			<view class="bottom">
				<view class="tab_item" @click="toIndex">
					<uni-icons type="home" size="20"></uni-icons>
					<view class="text">
						首页
					</view>
				</view>
				<view class="tab_item">
					<!-- #ifdef H5-->
					<uni-icons type="redo" size="20"></uni-icons>
					<view class="" @click="shareOn">分享</view>
					<uni-popup ref="sharepopup" type="bottom">
						<share-btn :sharedataTemp="sharedata"></share-btn>
					</uni-popup>

					<!-- #endif -->

					<!-- #ifdef MP-WEIXIN -->
					<uni-icons type="redo" size="20"></uni-icons>
					<view class="btn"><button class="share-btn text" open-type="share">分享</button></view>
					<!-- #endif -->

					<!-- #ifdef MP-ALIPAY -->
					<uni-icons type="redo" size="20"></uni-icons>
					<view class="btn"><button class="share-btn text" open-type="share" v-if="canIUseShareButton">分享</button></view>
					<!-- #endif -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myRequestPost
	} from "@/utils/request.js";
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue";
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import shareBtn from '@/components/share-btn/share-btn.vue';

	export default {
		data() {
			return {
				themeId: "",
				themeDescription: "",
				themeName: "",
				themesIdList: [],
				themeList: {},
				isCollected: true,
				canIUseShareButton: true,
				sharedata: {
					type: 1,
					strShareUrl: "http://www.baidu.com",
					strShareTitle: "分享标题",
					strShareSummary: "分享总结",
					strShareImageUrl: "http://www.xuelejia.com/xljapp/h5/static/aboutUsLogo.png"
				},


			}
		},
		components: {
			uniIcons,
			uniPopup,
			shareBtn
		},
		setShareButtonSwitch() {
			this.setData({
				canIUseShareButton: my.canIUse('button.open-type.share')
			})
		},
		onLoad(options) {
			this.themeId = options.themeId;
			this.getThemeDetail();
			

		},
		onShareAppMessage(res) {
			return {
				title: "美食分享",
				path: "pages/theme/theme"
			}
		},
		methods: {
			async getThemeDetail() {
				const res = await myRequestPost("/rest/cks/api/theme/list/get")
				console.log(res, "vvvvvvvvvvvvvvvvvv");
				console.log(this.themeId);
				for (var i = 0; i < res.items.length; i++) {
					if (res.items[i].id == this.themeId) {
						this.themeDescription = res.items[i].description;
						this.themeName = res.items[i].name;
						var str = res.items[i].relateCookbookId;
						this.themesIdList = str.split(",").map(Number);
						console.log(this.themesIdList, "ccccccccccccccccc");
					}
				}

				const res1 = await myRequestPost("/rest/cks/api/cookbook/get-by-ids", {
					"CookbookIdList": this.themesIdList,
				});
				this.themeList = res1.cookbooks;
			},

			goFoodDetails(item) {
				uni.navigateTo({
					url: `/pages/fooddetail/fooddetail?id=${item.id}`
				})
			},

			handleCollection() {
				this.isCollected = !(this.isCollected);
			},

			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			shareOn() {
				console.log("jjjjjjjjjj");
				this.$refs.sharepopup.open();
			}


		}
	}
</script>

<style lang="less">
	page {
		width: 750rpx;
		height: 100%;
		font-family: "楷体";

		.continer {
			width: 700rpx;
			padding-left: 25rpx;
			padding-right: 25rpx;
			background-color: #FFFFFF;

			.blank {
				width: 700rpx;
				height: 300rpx;
			}

			.title {
				width: 100%;
				height: 80rpx;
				font-size: 40rpx;
				font-weight: bold;
				font-family: "楷体";
				text-align: center;
				padding-top: 20rpx;

			}

			.themeIntroduce {
				margin-top: 20rpx;
				color: #999999;

			}

			.title2 {
				font-size: 40rpx;
				margin-top: 20rpx;
				font-family: "楷体";

			}

			.buttons {
				display: inline-block;
				padding: 0;
				border: none;

				button {
					height: 30rpx;
					margin-left: 10rpx;
					padding: 0 10rpx 0 10rpx;
					font-size: 24rpx;
					line-height: 30rpx;
					color: #c2a054;
					background-color: #fff5e1;
					border: none;
				}
			}

			.foodsPhoto {
				width: 670rpx;
				margin: 0 auto;
				margin-top: 40rpx;

				.Photo_item {
					image {
						width: 670rpx;
						height: 380rpx;
						border-radius: 16rpx;
						background-size: cover;
					}

					.text {
						width: 670rpx;
						height: 40rpx;
						display: flex;
						flex-direction: row;
						justify-content: space-between;

						.right {
							uni-icons {
								margin-top: 10rpx;
							}
						}
					}
				}
			}

			.bottom {
				width: 100%;
				height: 100rpx;
				position: fixed;
				left: 0;
				bottom: 0;
				background-color: #E9E9E9;
				display: flex;
				justify-content: space-around;

				.tab_item {
					margin-top: 10rpx;

					.text {

						text-align: center;
						margin-left: -12rpx;
					}

					.btn {
						border: 0;

						.share-btn {
							width: 80rpx;
							height: 40rpx;
							padding: 0;
							background-color: #E9E9E9;
							line-height: 40rpx;
						}

						button::after {
							border: none;
						}

					}
				}
			}
		}
	}
</style>
