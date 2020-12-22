<template>
	<view>
		<view class="container">
			<view class="slide-box" v-for="(item, index) in listData" :key="index">
				<view class="slide-list" @touchstart="touchStart($event, index)" @touchend="touchEnd($event, index)" @touchmove="touchMove($event, index)"
				 @tap="recover(index)" :style="{ transform: 'translate3d(' + item.slide_x + 'px, 0, 0)' }">
					<view class="now-message-info" hover-class="uni-item--hover" :style="{ width: windowWidth + 'px' }" @click="clickItemMethod(item)">
						<image class="icon-image" v-if="item.imgPath" :src="item.imgPath"></image>
						<view class="list-right">
							<view class="list-title" v-if="item.name">{{item.name}}</view>
							<view class="list-detail" v-if="item.price">参考价：￥{{item.price}}</view>
						</view>
					</view>
					<view class="group-btn">
						<view class="btn-div" v-for="(value, key) in button" :key="key" @click="clickMethod(item, value, index)" :style="{background: value.background}">{{value.title}}</view>
					</view>
					<view style="clear:both"></view>
				</view>
				<view class="list-item-border" v-if="border"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'cartlist',
		props: {
			carts: { //数据carts
				type: Array,
				default () {
					return [];
				}
			},
			button: { //按钮数据
				type: Array,
				default () {
					return [];
				}
			},
			border: { //边框
				type: Boolean,
				default: false
			}
		},
		computed: {
			windowWidth() {
				return uni.getSystemInfoSync().windowWidth;
			}
		},
		data() {
			return {
				listData: [],
				start_slide_x: 0,
				btnWidth: 0,
				startX: 0,
				LastX: 0,
				startTime: 0,
				itemIndex: 0
			};
		},
		mounted() {
			this.listData = this.clone(this.carts)
		},
		watch: {
			carts: {
				handler: function(val, oldval) {
					this.listData = this.clone(this.carts)
				},
				deep: true
			}
		},
		methods: {
			clone(data) {
				const type = typeof data
				let obj;
				if (type === 'array') {
					obj = [];
				} else if (type === 'object') {
					obj = {};
				} else {
					// 不再具有下一层次
					return data;
				}
				if (type === 'array') {
					for (let i = 0, len = data.length; i < len; i++) {
						obj.push(this.clone(data[i]));
					}
				} else if (type === 'object') {
					// 对原型上的方法也拷贝了....
					for (const key in data) {
						obj[key] = this.clone(data[key]);
					}
				}
				return obj;
			},

			// 滑动开始
			touchStart(e, index) {
				if (this.itemIndex == index) {
					this.itemIndex = index
				}
				//记录手指放上去的时间
				this.startTime = e.timeStamp;
				//记录滑块的初始位置
				this.start_slide_x = this.listData[index].slide_x;
				// 按钮宽度
				//#ifdef MP-WEIXIN || MP-ALIPAY
				uni.createSelectorQuery().in(this).selectAll('.group-btn').boundingClientRect(res => {
					if (res != null) {
						this.btnWidth = res[index].width * -1;
					}
				}).exec();
				//#endif
				//#ifdef H5 || APP-PLUS
				uni.createSelectorQuery()
					.selectAll('.group-btn')
					.boundingClientRect()
					.exec(res => {
						if (res[0] != null) {
							this.btnWidth = res[0][index].width * -1;
						}
					});
				//#endif
				// 记录上一次开始时手指所处位置
				this.startX = e.touches[0].pageX;
				// 记录上一次手指位置
				this.lastX = this.startX;
				//初始化非当前滑动消息列的位置			
				for (var i in this.listData) {
					if (index != i) {
						this.listData[i].slide_x = 0;
					}
				}
			},
			// 滑动中
			touchMove(e, index) {
				const endX = e.touches[0].pageX;
				const distance = endX - this.lastX;
				// 预测滑块所处位置
				const duang = this.listData[index].slide_x + distance;
				// 如果在可行区域内
				if (duang <= 0 && duang >= this.btnWidth) {
					this.listData[index].slide_x = duang;
				}
				// 此处手指所处位置将成为下次手指移动时的上一次位置
				this.lastX = endX;
			},
			// 滑动结束
			touchEnd(e, index) {
				let distance = 10;
				const endTime = e.timeStamp;
				const x_end_distance = this.startX - this.lastX;
				if (Math.abs(endTime - this.startTime) > 200) {
					distance = this.btnWidth / -2;
				}
				// 判断手指最终位置与手指开始位置的位置差距
				if (x_end_distance > distance) {
					this.listData[index].slide_x = this.btnWidth;
				} else if (x_end_distance < distance * -1) {
					this.listData[index].slide_x = 0;
				} else {
					this.listData[index].slide_x = this.start_slide_x;
				}
			},
			// 点击回复原状
			recover(index) {
				this.listData[index].slide_x = 0;
			},
			clickMethod(item, buttonItem, index) {
				this.$emit("change", item, buttonItem, index)
			},
			clickItemMethod(item) {
				this.$emit("click", item)
			}
		}
	};
</script>

<style lang="scss">
	.container {
		.slide-box {
			width: 100%;
			overflow: hidden;

			.list-item-border {
				width: 100%;
				border-bottom: 1px solid #f2f2f2;
			}

			.slide-list {
				transition: all 100ms;
				transition-timing-function: ease-out;
				min-width: 200%;
				height: 160rpx;

				.uni-item--hover {
					background-color: #f1f1f1 !important;
				}

				.now-message-info {
					position: relative;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					/* justify-content: space-between; */
					font-size: 16px;
					clear: both;
					height: 160rpx;
					padding: 0 30rpx;
					// margin-bottom: 20rpx;
					background: #ffffff;
					float: left;

					.icon-image {
						border-radius: 12rpx;
						width: 130rpx;
						height: 130rpx;
						float: left;
					}

					.icon-circle {
						background: #3396fb;
						border-radius: 100%;
						width: 100rpx;
						height: 100rpx;
						line-height: 100rpx;
						text-align: center;
						color: #ffffff;
						font-weight: bold;
						font-size: 20px;
						float: left;
					}

					.list-right {
						float: left;
						margin-left: 25rpx;
						margin-right: 30rpx;

						.list-title {
							width: 350rpx;
							line-height: 1.5;
							overflow: hidden;
							margin-bottom: 10rpx;
							color: #333;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}

						.list-detail {
							width: 350rpx;
							font-size: 14px;
							color: #a9a9a9;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 1;
							overflow: hidden;
						}
					}

					.list-right-1 {
						float: right;
						position: absolute;
						right: 30rpx;
						color: #a9a9a9;
					}
				}

				.group-btn {
					float: left;
					display: flex;
					flex-direction: row;
					height: 160rpx;
					min-width: 100rpx;
					align-items: center;

					.btn-div {
						height: 160rpx;
						color: #fff;
						text-align: center;
						padding: 0 50rpx;
						font-size: 34rpx;
						line-height: 160rpx;
					}

					.top {
						background-color: #c4c7cd;
					}

					.removeM {
						background-color: #ff3b32;
					}
				}
			}
		}
	}
</style>
