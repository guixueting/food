<template>
	<view class="recommend">
		<view v-for="item in menu" :key="item.id" class="item">
			<view class="item-main">
				<image :src="item.imgLarge" @click="itemClick(item)"></image>
				<view class="item-text">
					<view>
						<text>{{item.name}}</text>
					</view>
					<view>
						<text class="text-right">{{item.collectCount}}人收藏</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue";
	import {
		myRequestPost
	} from '@/utils/request.js'
	export default {
		props: ['menu'],
		components: {
			uniIcons
		},
		data() {
			return {};
		},
		methods: {
			itemClick(item) {
				uni.navigateTo({
					url: '/pages/fooddetail/fooddetail?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss">
	.recommend {
		margin-top: 40rpx;
		.item {
			.item-main {
				margin: 0 25rpx;

				image {
					width: 700rpx;
					height: 450rpx;
					border-radius: 20rpx;
				}

				.item-text {
					display: flex;
					justify-content: space-between;
					margin: 15rpx 0 15rpx 15rpx;
					font-size: 30rpx;

					.text-right {
						float: right;
						margin-right: 30rpx;
					}
				}
			}
		}
	}
</style>
