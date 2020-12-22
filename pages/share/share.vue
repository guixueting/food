<template>
	<view class="content">
		<view class="top"></view>
		<view class="banner">
			<!-- <image src="../../static/img/banner.png" class="imgbei"></image> -->
			<dl>
				<dt>
					<image src="../../static/img/logo.png" mode=""></image>
				</dt>
				<dd>私塾圈</dd>
			</dl>
			<view class="img">
				<image src="../../static/img/ewm.jpg" mode=""></image>
			</view>
			<view class="tgtit">推广链接：<text class="tugurl">http://sishuquan.com?id=3228969</text></view>
			<view class="sharbuttn">
				<view class="btn">保存二维码</view>
				<view class="btn" @click="sharurl">复制推广链接</view>
			</view>

			<!-- <button class="btn" @click="share">分享</button> -->
			<view class="shartitle">
				<view>分享</view>
			</view>
			<view class="sharapk" @click="share">
				<view>
					<image src="../../static/img/weact.png"></image>
				</view>
				<view>
					<image src="../../static/img/shar.png"></image>
				</view>
				<view>
					<image src="../../static/img/qq.png"></image>
				</view>
			</view>
			<view class="bottom">
				<ul>
					<li>1、好友识别二维码通过手机号进行注册</li>
					<li>2、也可分享此页面到微信或QQ邀请好友注册</li>
					<li>3、注册完成后您即可得到相应的积分</li>
				</ul>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				providerList: [],
				sourceLink: 'http://yunzhujiao.cn/bind_pub/index.html',
				type: 0,
			}
		},
		onLoad() {
			// this.version = plus.runtime.version;
			uni.getProvider({
				service: 'share',
				success: (e) => {
					let data = [];
					for (let i = 0; i < e.provider.length; i++) {
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								})
								break;
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								})
								break;
							default:
								break;
						}
					}
					this.providerList = data;
				},
				fail: (e) => {
					console.log('获取登录通道失败' + JSON.stringify(e));
				}
			});
		},
		methods: {
			//复制分享链接
			sharurl() {
				uni.setClipboardData({
					data: 'http://sishuquan.com?id=3228969',
					success: function() {
						console.log('success');
						uni.showModal({
							title: '复制成功',
							content: '内容已复制到粘贴板，可前往其他应用粘贴查看。',
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									//console.log('用户点击确定');
								} else if (res.cancel) {
									//console.log('用户点击取消');
								}
							}
						});
					}
				});
			},
			share(e) {
				if (this.providerList.length === 0) {
					uni.showModal({
						title: '当前环境无分享渠道!',
						showCancel: false
					})
					return;
				}
				let itemList = this.providerList.map(function(value) {
					return value.name
				})

				console.log(itemList)

				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						console.log(this.providerList[res.tapIndex].id)
						if (this.providerList[res.tapIndex].id == 'qq') {
							this.type = 1
						} else {
							this.type = 0
						}
						uni.share({
							provider: this.providerList[res.tapIndex].id,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type === 'WXSenceTimeline' ?
								'WXSenceTimeline' : "WXSceneSession",
							type: this.type,
							title: '耘助教',
							summary: '耘助教是一个在线教育应用平台',
							imageUrl: 'http://pds.jyt123.com/wxtest/logo.png',
							href: "https://m3w.cn/uniapp",
							success: (res) => {
								// console.log("success:" + JSON.stringify(res));
							},
							fail: (e) => {
								uni.showModal({
									content: e.errMsg,
									showCancel: false
								})
							}
						});
					}
				})
			},
			openLink() {
				// plus.runtime.openWeb(this.sourceLink)
			}
		}
	}
</script>

<style>
	.tugurl {
		color: #999;
	}

	.sharbuttn {
		display: flex;
		justify-content: center;
	}
	li{
		list-style: none;
		 /* #ifdef H5 */
			font-size: 16.75px;		
		/* #endif */
	}

	.shartitle {
		width: 80%;
		text-align: center;
		margin-left: 10%;
		border-bottom: 1px solid #dddddd;
		position: relative;
		height: 60upx;
	}

	.tgtit {
		text-align: center;
		margin-top: 10px;
	}

	.shartitle view {
		height: 50upx;
		line-height: 50upx;
		font-size: 28upx;
		color: #999;
		width: 120upx;
		margin: 32upx auto;
		position: absolute;
		background: #fff;
		left: 50%;
		margin-left: -60upx;
	}

	.sharapk {
		display: flex;
		justify-content: center;
		margin: 20upx auto
	}

	.sharapk view {
		margin: 40upx;
	}

	.sharapk view image {
		height: 80upx;
		width: 80upx;
	}

	.content {
		width: 100%;
		background-color: #ffffff;
	}

	.top {
		width: 100%;
		height: 100px;
		/* background: url(http://pds.jyt123.com/wxtest/banner.png) no-repeat ; */
		/* background: url(http://127.0.0.1:55658/static/img/banner.fa7ff1e3.png) no-repeat; */
		/* background: url(http://127.0.0.1:55658/static/img/banner.fa7ff1e3.png) no-repeat; */
		background-size: 100%;
		background-position: center center;
	}

	.banner {
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 60upx 60upx 0 0;
		margin-top: -60upx;
	}

	.banner dl {
		margin-top: -80upx;
	}

	.banner dl dt {
		text-align: center;
	}

	.banner dl dt image {
		width: 160upx;
		height: 160upx;
		border-radius: 50%;
	}

	.banner dl dd {
		text-align: center;
	}

	.img {
		width: 300upx;
		height: 300upx;
		background-color: red;
		margin: 0 auto;
		margin-top: 60upx;
	}

	.img image {
		width: 100%;
		height: 100%;
	}

	.btn {
		width: 260upx;
		height: 60upx;
		line-height: 60upx;
		margin: 0 auto;
		margin-top: 60upx;
		border-radius: 40upx;
		border: 0;
		font-size: 26upx;
		outline: 0;
		background: #33b17b;
		color: #FFFFFF;
		text-align: center;
	}

	.bottom {
		width: 100%;
		height: 400upx;
		
		background-position: left bottom;
		/* 设置背景图片位置 */
		background-size: 20%;
	}

	.bottom ul {
		padding-left: 40upx;
		box-sizing: border-box;
	}

	.bottom ul li {
		width: 100%;
		height: 60upx;
	}
</style>
