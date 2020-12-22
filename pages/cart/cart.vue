<template>
	<view>
		<view class="tis" v-if="carts.length==0">
			<image src="../../static/img/菜篮子.png" mode="widthFix"></image>
			<!-- <view>还没有添加菜品~</view> -->
		</view>
		<cartlist :carts="carts" :button="buttonList" :border="true" @click="clickMethod" @change="changeMethod"></cartlist>
	</view>
</template>

<script>
	import cartlist from '@/components/cartlist/cartlist.vue'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import {
		myRequestPost
	} from '@/utils/request.js';
	export default {
		components: {
			cartlist
		},
		data() {
			return {
				buttonList: [{
					title: '删除',
					background: '#ff3b32'
				}]
			}
		},
		methods: {
			changeMethod(data, button, index) {
				console.log('滑动按钮回调', data)
				console.log('滑动按钮回调', button)
				let self = this
				console.log('点击删除')
				if (button.title === '删除') {
					uni.showModal({
						title: '',
						content: '确定要删除该信息吗？',
						confirmText: '删除',
						confirmColor: '#ff3b32',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定')
								self.carts.splice(index, 1)
								uni.showToast({
									icon: "success",
									title: '删除成功!',
									duration: 2000
								});
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				}
			},
			clickMethod(data) {
				console.log('点击行回调', data)
			}
		},
		computed: {
			...mapState({
				carts: "carts"
			})
		}
	}
</script>

<style lang="scss">
	.tis {
		image {
			margin-left: 100rpx;
			margin-top: -200rpx;
			width: 600rpx;
		}

		view {
			margin-top: -100rpx;
			margin-left: 100px;
			font-family: "华文仿宋";
			font-size: 20px;
			font-weight: bold;
			z-index: 999;
		}
	}

	.myChoice {
		display: flex;
		font-family: "楷体";
		width: 690rpx;
		margin-left: 30rpx;

		.img {
			width: 250rpx;
			height: 250rpx;
		}

		.choice-main {
			display: flex;
			margin-left: 80rpx;
			padding-top: 30rpx;
			flex-direction: column;

			.choice-main-name {
				font-size: 20px;
				font-weight: bold;
				margin-bottom: 30rpx;
			}
		}
	}
</style>
