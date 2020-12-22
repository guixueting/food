<template>
	<view class="items">
		<view class="food-head">
			<image :src="details.imgSmall" @click="previewImg(details.imgSmall)"></image>
			<view class="food-name">
				<view class="name-txt">
					{{details.name}}
				</view>
			</view>
		</view>
		<!-- 菜谱简介 -->
		<view class="food-inrduc">
			<view class="inrduc-center">
				<text class="online">——</text>
				<text class="txt" style="color: #000000;">菜谱简介</text>
				<text class="online">——</text>
				<text class="fuhao">▼</text>
			</view>
			<view class="content">{{details.introduction}}</view>
		</view>
		<!-- 菜谱用料 -->
		<view class="meterials">
			<view class="inrduc-center">
				<text class="online">——</text>
				<text class="txt">用料</text>
				<text class="online">——</text>
				<text class="fuhao">▼</text>
			</view>
			<view v-for="item in accessory" :key="item.id" class="food-ingred" mode="widthFix">
				<text>{{item.name}}</text>
				<text class="text-right">{{item.standardWeight+item.standardUnit}}</text>
			</view>
			<view v-for="item in main" :key="item.id" class="food-ingred" mode="widthFix">
				<text>{{item.name}}</text>
				<text class="text-right">{{item.standardWeight+item.standardUnit}}</text>
			</view>
		</view>
		<!-- 做法步骤 -->
		<view class="food-step">
			<!-- <image :src="details.prepareSteps.img" mode="widthFix"></image> -->
			<!-- 备菜步骤 -->
			<view class="inrduc-center">
				<text class="online">——</text>
				<text class="txt">备菜步骤</text>
				<text class="online">——</text>
				<text class="fuhao">▼</text>
			</view>
			<view class="prepare" v-for="item in prepare" :key="item.id">
				<image :src="item.imgUrl" mode=""></image>
				<view class="steps">
					<text style="color: orange;font-size: 30px;">{{item.no}}</text>
					<text>/</text>
					<text style="color: orange;">{{prepare.length}}</text>
					<view class="desc">{{item.desc}}</view>
				</view>
			</view>
			<!-- <view class="food-step-desc">{{details.prepareSteps.desc}}</view> -->
			<!-- 做法步骤 -->
			<view class="inrduc-center">
				<text class="online">——</text>
				<text class="txt">做法步骤</text>
				<text class="online">——</text>
				<text class="fuhao">▼</text>
			</view>
			<view class="prepare" v-for="item in step1" :key="item.id">
				<image :src="item.image" mode=""></image>
				<view class="steps">
					<text style="color: orange;font-size: 30px;">{{item.no-n}}</text>
					<text>/</text>
					<text style="color: orange;">{{len-n}}</text>
					<view>{{item.desc}}</view>
				</view>
			</view>
			<view class="footer">
				
			</view>
			<!-- <view class="btn">
				<button type="primary">222</button>
			</view> -->
			<!-- 底部导航 -->
			<view class="goods_nav">
				<view class="tab">
					<view class="tab_item" @click="handleflag">
						<uni-icons type="heart" size="20" v-if="!flag"></uni-icons>
						<uni-icons type="heart-filled" size="20" color='red' v-if="flag"></uni-icons>
						<view>收藏</view>
					</view>
					<view class="tab_item" @click="goIndex">
						<uni-icons type="home" size="20"></uni-icons>
						<view>首页</view>
					</view>
					<view class="tab_item">
						<!-- #ifdef H5 -->
						<uni-icons type="redo" size="20"></uni-icons>
						<view class="" @click="shareOn">分享</view>
						<uni-popup ref="sharepopup" type="bottom">
							<share-btn :sharedataTemp="sharedata"></share-btn>
						</uni-popup>
						<!-- #endif -->
						<!-- #ifdef MP-ALIPAY -->
						<uni-icons type="redo" size="20"></uni-icons>
						<view class="tab-btn">
							<button open-type="share" class="share-btn" v-if="canIUseShareButton">分享</button>
						</view>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<uni-icons type="redo" size="20"></uni-icons>
						<view class="tab-btn"><button class="share-btn" open-type="share">分享</button></view>
						<!-- #endif -->
					</view>
				</view>
				<view class="btn">
					<button @click='buttonClick' class="btn-left">加入菜篮子</button>
					<button @click='goCart' class="btn-right">去看看</button>
				</view>
				<!-- <uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"></uni-goods-nav> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import {
		myRequestPost
	} from '@/utils/request.js';
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import shareBtn from '@/components/share-btn/share-btn.vue';
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue";
	export default {
		components: {
			uniPopup,
			shareBtn,
			uniIcons
		},
		data() {
			return {
				id: "",
				details: [],
				prepare: [],
				step1: [],
				len: "",
				step_length: "",
				count: "",
				flag: false,
				title: "",
				obj: {},
				detailStorge: "",
				n: 0,
				accessory:[],
				main:[],
				canIUseShareButton: true,
				sharedata: {
					type: 1,
					strShareUrl: "http://www.baidu.com",
					strShareTitle: "分享标题",
					strShareSummary: "分享总结",
					strShareImageUrl: "http://www.xuelejia.com/xljapp/h5/static/aboutUsLogo.png"
				}
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getdetails();
			this.detailStorge = uni.getStorageSync("flag")
			console.log(this.detailStorge, "222222222222")
			console.log(this.menus, "sssssssssss")
			for (var i = 0; i < this.menus.length; i++) {
				if (this.menus[i].id == this.id) {
					this.flag = true
				} else {
					this.flag = false
				}
			}
			
			
		},
		// #ifdef MP-ALIPAY
		setShareButtonSwitch() {
			this.setData({
				canIUseShareButton: my.canIUse('button.open-type.share')
			})
		},
		// #endif
		onShareAppMessage(res) {
			return {
				title: "美食分享",
				path: "pages/themeDetails/themeDetails"
			}
		},
		computed: {
			...mapState({
				menus: "menus"
			})
		},
		
		methods: {
			...mapMutations({
				addToCarts: 'addToCarts',
				addToMenus: 'addToMenus'
			}),
			async getdetails() {
				let result = await myRequestPost('/rest/cks/api/cookbook/details/get-by-id/', {
					"cookbookId": this.id
				})
				console.log(result.cookbook, "kkkkkkkkkk")
				this.details = result.cookbook;
				this.accessory=this.details.materials.accessory;
				this.main=this.details.materials.main;
				this.prepare = this.details.prepareSteps.steps;
				this.step1 = this.details.steps;
				this.len = this.step1.length;
				for (var i = 0; i < this.details.steps.length; i++) {
					for (var j = 0; j < this.details.prepareSteps.steps.length; j++) {
						if (this.step1[i].desc == this.prepare[j].desc) {
							this.step1.splice(i, 1);
							this.n++;
						}
					}
				}

				console.log(this.details, "00000000000"),
					console.log(this.prepare, "111111"),
					console.log(this.step1, "22222222")
				console.log(this.len)
			},
			//收藏保存数据
			handleflag() {
				for (var i = 0; i < this.menus.length; i++) {
					if (this.menus[i].id == this.id) {
						this.flag = true
					} else {
						this.flag = false
					}
				}
				this.flag = !this.flag
				this.title = this.flag ? "收藏成功" : "取消收藏"
				//提示框
				uni.showToast({
					title: this.title,
					icon: 'success',
					duration: 1000 //1后消失
				});
				//缓存到本地
				uni.getStorage({
					key: "flag",
					success: (datas) => {
						console.log(datas, typeof datas, "bbbbbbbbbbb")
						this.id = this.details.id
						this.obj = datas.data //{}
						this.obj[this.id] = this.flag
						uni.setStorage({
							key: "flag",
							data: this.obj,
							success: () => {
								console.log("huancun")
							}
						})
						console.log(this.obj, "ddddddddd")
						console.log(this.obj[this.id], "ccccccccc")
					}
				})
				console.log(this.details, "aaaaaaaa")
				var menu = {
					id: this.details.id,
					name: this.details.name,
					num: this.details.collectCount,
					img: this.details.imgLarge,
					collected: this.flag
				}
				console.log(menu, "eeeeeeee")
				this.addToMenus(menu)
			},
		
			previewImg(imageUrl) {
				console.log(imageUrl)
				var images = [];
				images.push(imageUrl);
				console.log(images)
				uni.previewImage({ // 预览图片  图片路径必须是一个数组 => ["http://192.168.100.251:8970/6_1597822634094.png"]
					current: 0,
					urls: images
				});
			},
			goIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			shareOn() {
				this.$refs.sharepopup.open();
			},
			buttonClick(e) {
				console.log("buttonClick", e)
				//加入菜篮子
				if (this.details.productsInfo) {
					var good = {
						id: this.details.id,
						price: this.details.productsInfo[this.details.productsInfo.length - 1].price,
						imgPath: this.details.productsInfo[this.details.productsInfo.length - 1].img,
						name: this.details.productsInfo[this.details.productsInfo.length - 1].materialName,
						slide_x: 0
					}
					this.addToCarts(good)
					console.log(this.details.productsInfo)
				} else {
					uni.showToast({
						title: `暂时不能提供参考价`,
						icon: 'none'
					})
				}
			},
			goCart() {
				uni.navigateTo({
					url: '/pages/cart/cart'
				})
			}
		}
	}
</script>

<style lang="scss">
	.items {
		display: flex;
		box-sizing: border-box;
		flex-wrap: wrap;
		font-family: "楷体";

		.food-head {
			position: relative;

			image {
				width: 750rpx;
				height: 550rpx;
				background-size: cover;
			}

			.food-name {
				position: absolute;
				bottom: -80rpx;
				left: 50%;
				margin-left: -37rpx;
				padding: 10rpx;
				width: 60rpx;
				background-color: rgba($color: #fff, $alpha: 0.81);
				opacity: 0.7;
				border-radius: 30rpx;
				text-align: center;

				.name-txt {
					padding: 13rpx 12rpx;
					border: 1rpx solid #000;
					font-size: 33rpx;
					border-radius: 20rpx;
					color: #000;
					line-height: 43rpx;
				}
			}
		}

		.food-inrduc {
			width: 710rpx;
			margin-top: 100rpx;
			margin-bottom: 40rpx;
			margin-left: 20rpx;
			color: #979797;

			.content {
				margin-left: 38rpx;
				text-indent: 2em;
			}
		}

		.meterials {
			margin-left: 50rpx;
			margin-bottom: 20rpx;
		}

		.goods_nav {
			position: fixed;
			display: flex;
			bottom: 0;
			width: 100%;
			background-color: #fff;

			.tab {
				display: flex;
				padding: 0 5px;
				font-size: 12px;

				.tab_item {

					margin: 0 10px;
					margin-top: 15rpx;

					.tab-btn {
						border: 0;

						.share-btn {
							// width: 80rpx;
							height: 38rpx;
							padding: 0;
							background-color: #fff;
							line-height: 27rpx;
							font-size: 12px;
							border: none;
							outline: none;
						}

						/* #ifdef MP-ALIPAY */
						.share-btn {
							// width: 80rpx;
							height: 30rpx;
							padding: 0;
							background-color: #fff;
							line-height: 27rpx;
							font-size: 12px;
							border: none;
							outline: none;
						}

						/* #endif */
					}
				}
			}

			.btn {
				float: right;
				display: flex;
				width: 446rpx;
				height: 80rpx;
				margin: 5px 0;
				margin-right: 10px;
				overflow: hidden;

				button {
					height: 80rpx;
					line-height: 80rpx;
					font-size: 14px;

					flex: 1;
				}

				button::after {
					border: none;
				}

				.btn-left {
					border-top-left-radius: 200rpx;
					border-bottom-left-radius: 200rpx;
					background-color: #ff0000;
					color: #fff;
				}

				.btn-right {
					border-top-right-radius: 200rpx;
					border-bottom-right-radius: 200rpx;
					background-color: #ffa200;
					color: #fff;
				}
			}
		}

		.inrduc-center {
			text-align: center;
			color: orange;

			.txt {
				font-size: 35rpx;
				font-weight: 520;
				padding: 0 20rpx;
			}

			.fuhao {
				display: block;
			}

		}

		.food-ingred {
			width: 650rpx;
			height: 50rpx;
			line-height: 50rpx;
			color: #333;
			margin: 0 auto;
			border-bottom: 1px solid #ccc;

			text {
				margin-left: 130rpx;
			}

			.text-right {
				margin-right: 150rpx;
				float: right;
			}
		}

		.food-step {
			display: flex;
			box-sizing: border-box;
			flex-wrap: wrap;

			.inrduc-center {
				margin-left: 212rpx;
			}

			image {
				width: 640rpx;
				height: 600rpx;
				margin-left: 55rpx;
				background-size: cover;
			}

			.food-step-desc {
				width: 670rpx;
				margin-left: 40rpx;
				line-height: 36rpx;
				margin-bottom: 20rpx;
			}

			.steps {
				display: flex;
				box-sizing: border-box;
				margin: 10rpx 0 10rpx 50rpx;

				.desc {
					width: 580rpx;
					padding-left: 5rpx;
					letter-spacing: 2rpx;
					line-height: 40rpx;
					color: #666;
					text-indent: 1em;
				}
			}

			.food-step-main {
				width: 680rpx;
			}
		}
		.footer{
			width: 750rpx;
			height: 100rpx;
			background-color: #FFFFFF;
			margin: 40rpx auto;
		}
	}
</style>
