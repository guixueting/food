<template>
	<view class="content">
		<image class='background' src="../../static/tabs/背景.jpg" mode="aspectFill"></image>
		<view class="logodiv"></view>
		<view class="form">
			<view class="username">
				<!-- #ifdef H5 -->
				<m-input class="nameform" type="text" clearable focus v-model="account" placeholder="请输入账号" />
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY | MP-WEIXIN -->
				<input class="nameform" type="text" clearable focus v-model="account" placeholder="请输入账号" />
				<!-- #endif -->
			</view>
			<view class="password">
				<!-- #ifdef H5 -->
				<m-input class="pawform" type="password" displayable v-model="password" placeholder="请输入密码" />
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY | MP-WEIXIN -->
				<input class="pawform" type="password" v-model="password" placeholder="请输入密码" />
				<!-- #endif -->
			</view>
			<view class="loginBtn">
				<text class="btnvalue" @tap="bindLogin">登录</text>
			</view>
			<view class="registBtn">
				<text class="regist" @tap="gotoregist">注册用户</text>
				<text>|</text>
				<text class="user" @tap="gotouser">返回首页</text>
			</view>
			<view class="oauth-row" v-if="hasProvider" v-bind:style="{top: positionTop + 'px'}">
				<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
					<image :src="provider.image" @tap="oauth(provider.value)"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../service.js';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'
	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),
			initProvider() {
				const filters = ['weixin', 'qq', 'sinaweibo'];
				uni.getProvider({
					service: 'oauth',
					success: (res) => {
						if (res.provider && res.provider.length) {
							for (let i = 0; i < res.provider.length; i++) {
								if (~filters.indexOf(res.provider[i])) {
									this.providerList.push({
										value: res.provider[i],
										image: '../../static/img/' + res.provider[i] + '.png'
									});
								}
							}
							this.hasProvider = true;
						}
					},
					fail: (err) => {
						console.error('获取服务供应商失败：' + JSON.stringify(err));
					}
				});
			},
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			oauth(value) {
				uni.login({
					provider: value,
					success: (res) => {
						uni.getUserInfo({
							provider: value,
							success: (infoRes) => {
								/**
								 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
								 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
								 */
								this.toMain(infoRes.userInfo.nickName);
							}
						});
					},
					fail: (err) => {
						console.error('授权登录失败：' + JSON.stringify(err));
					}
				});
			},
			gotouser() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			gotoregist() {
				uni.navigateTo({
					url: "/pages/register/register"
				})
			},
			bindLogin() {
				if (this.account.length < 5) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 5 个字符'
					});
					return;
				}
				if (this.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				const data = {
					account: this.account,
					password: this.password
				};
				const validUser = service.getUsers().some(function(user) {
					return data.account === user.account && data.password === user.password;
				});
				if (validUser) {
					this.toMain(this.account);
				} else {
					uni.showToast({
						icon: 'none',
						title: '用户账号或密码不正确',
					});
				}
			},
			toMain(userName) {
				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				if (this.forcedLogin) {
					uni.reLaunch({
						url: '../my/my',
					});
				} else {
					uni.navigateBack();
				}
			}
		}
	}
</script>

<style>
	page {
		height: 100%;

	}

	/* #ifdef MP-ALIPAY */
	page {
		height: 100%;
		background: url(../../static/tabs/背景.png);
		background-size: cover;
	}

	/* #endif */
	.background {
		width: 100%;
		height: 100%;
		position: fixed;
		background-size: 100% 100%;
		z-index: -1;
	}

	.content {
		width: 100vw;
		height: 100vh;

	}

	.logodiv {

		width: 100vw;
		height: 30vh;
		display: flex;
		/* 项目位于容器的中心 */
		justify-content: center;
		align-items: flex-end;
	}

	.form {
		padding: 0 100upx;

	}

	.username {
		width: 100%;
		height: 70upx;
		border-radius: 20upx;
		box-sizing: border-box;
		padding: 0 20upx;
		margin-top: 25upx;

	}

	.username .nameform {
		border-radius: 20upx;
		background: #FFFFFF;
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 25upx;


	}

	.password {
		width: 100%;
		height: 70upx;
		border-radius: 20upx;
		box-sizing: border-box;
		padding: 0 20upx;
		margin-top: 25upx;
	}

	.password .pawform {
		width: 100%;
		height: 100%;
		border-radius: 20upx;
		text-align: center;
		font-size: 25upx;
		background-color: #FFFFFF;
	}

	.loginBtn {
		width: 92%;
		height: 90upx;
		background: #FFFFFF;
		border-radius: 20upx;
		margin-top: 50upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 23rpx;
	}

	.registBtn {
		text-align: center;
		color: black;
		font-size: 30upx;
		margin-top: 20upx;
	}
</style>
