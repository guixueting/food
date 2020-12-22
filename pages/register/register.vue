<template>
	<view class="content">
		<image class='background' src="../../static/tabs/背景.png" mode="aspectFill"></image>
		<view class="form">
			<view class="username">
				<!-- #ifdef H5 -->
				<m-input class="nameform" focus clearable type="text" v-model="account" placeholder="请输入账号" />
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY|MP-WEIXIN -->
				<input class="nameform" focus clearable type="text" v-model="account" placeholder="请输入账号" />
				<!-- #endif -->
			</view>
			<view class="password">
				<!-- #ifdef H5 -->
				<m-input class="pawform" displayable type="password" v-model="password" placeholder="请输入密码" />
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY|MP-WEIXIN -->
				<input class="pawform" displayable type="password" v-model="password" placeholder="请输入密码" />
				<!-- #endif -->
			</view>
			<view class="passwordup">
				<!-- #ifdef H5 -->
				<m-input class="pawformup" type="text" clearable v-model="email" placeholder="请输入邮箱"></m-input>
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY|MP-WEIXIN -->
				<input class="pawformup" type="text" clearable v-model="email" placeholder="请输入邮箱"></m-input>
				<!-- #endif -->
			</view>
			<!-- <view class="passwordup">
				<input class="pawformup" type="password" v-model="confirmPassword" placeholder="请再次输入密码" />
			</view> -->
			<view hover-class="registBtnhover">
				<button type="primary" class="primary" @tap="register">注册</button>
			</view>
			<view class="registBtn" hover-class="registBtnhover">
				<text class="btnvalue" @tap="loginrequest">返回登录</text>
			</view>
		</view>
	</view>

</template>

<script>
	import uniPopup from '@/components/uni/uni-popup/uni-popup.vue';
	import uniPopupMessage from '@/components/uni/uni-popup/uni-popup-message.vue';
	import uniPopupDialog from '@/components/uni/uni-popup/uni-popup-dialog.vue';
	import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
	export default {
		data() {
			return {
				account: '',
				password: '',
				email: ''
			}
		},
		methods: {
			loginrequest() {
				console.log("我的");
				uni.navigateTo({
					url: "/pages/login/login"
				})
			},
			register() {
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
				if (this.email.length < 3 || !~this.email.indexOf('@')) {
					uni.showToast({
						icon: 'none',
						title: '邮箱地址不合法'
					});
					return;
				}

				const data = {
					account: this.account,
					password: this.password,
					email: this.email
				}
				service.addUser(data);
				uni.showToast({
					title: '注册成功'
				});
				uni.navigateBack({
					delta: 1
				});
			}
		},
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog,
			mInput
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

	.background {
		width: 100%;
		height: 100%;
		position: fixed;
		background-size: 100% 100%;
		z-index: -1;
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
	}

	.form {
		margin: 300rpx 150rpx;
		height: 100%;
	}

	.username,
	.name,
	.password,
	.passwordup {

		width: 450rpx;
		height: 60upx;
		margin-bottom: 30rpx;
	}

	.username .nameform {
		margin-bottom: 30rpx;
		border-radius: 20upx;
		background: #FFFFFF;
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 25upx;
	}

	.name .name {
		margin-bottom: 30rpx;
		border-radius: 20upx;
		background: #FFFFFF;
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 25upx;
	}

	.password .pawform {
		margin-bottom: 30rpx;
		border-radius: 20upx;
		background: #FFFFFF;
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 25upx;
	}

	.passwordup .pawformup {
		border-radius: 20upx;
		background: #FFFFFF;
		width: 100%;
		height: 100%;
		text-align: center;
		font-size: 25upx;
		margin-bottom: 30rpx;
	}

	.registBtn {
		width: 470rpx;
		height: 60upx;
		background: #FFFFFF;
		border-radius: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 30rpx;
	}
</style>
