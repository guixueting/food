<template>
	<view class="lotterydetail">
		<view class="opcity1"></view>
		<view class="opcity2"></view>
		<view class="contentbox">
			<view class="menu" @click="itemClick(item)">
				<image :src="lotteryDetailMenu.imgLarge" mode=""></image>
				<view class="name">
					{{lotteryDetailMenu.name}}
				</view>
				<view class="metiral">
					主食材: <text v-for="item in material" :key="item.id">
						{{item.name}}、</text>
				</view>
			</view>
			<view class="btn">
				<view class="collect" @click="addtocollect">
					加入收藏
				</view>
				<view class="collect" @click="linktoloterry">
					返回搜索
				</view>
				<view class="collect" @click="agin">
					再选一个
				</view>
			</view>
			<view class="foot">
				<view class="time">
					<uni-icons type="flag" size="20"></uni-icons>
					{{(lotteryDetailMenu.needTime)/60}}分钟
				</view>
				<view class="heart">
					<uni-icons type="heart-filled" color="red" size="20"></uni-icons>
					{{lotteryDetailMenu.collectCount}}人收藏
				</view>
				<view class="look">
					难度指数:<text style="color: #FFA200;font-size: 30rpx;">{{lotteryDetailMenu.difficulty}}</text>颗星
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue"
	import {
		myRequestPost
	} from '@/utils/request.js';
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	export default {
		data() {
			return {
				id: "",
				lotteryDetailMenu: {},
				material: [],
				j:true,
				flag:true
			};
		},
		components: {
			uniIcons
		},
		onLoad(option) {
			this.getMenuDetail()
			console.log(this.menus,"ttttttttt")
			for (var i=0;i<this.menus.length;i++) {
				if(this.menus[i].id==this.id){
					this.flag=true
				}else{
					this.flag=false
				}
			}
		},
		computed: {
			...mapState({
				menus: "menus"
			})
		},
		methods: {
			...mapMutations({
				addToMenus: 'addToMenus'
			}),
			//https://api.myroki.com/rest/cks/api/cookbook/by-name/get
			async getMenuDetail() {
				this.id = parseInt(Math.random() * 10 + 510) || parseInt(Math.random() * 10 + 550) || parseInt(Math.random() * 10 +
					560) || parseInt(Math.random() * 10 + 580)
				let result = await myRequestPost('/rest/cks/api/cookbook/details/get-by-id/', {
					"cookbookId": this.id
				})
				console.log(result.cookbook, "mmmm")
				this.lotteryDetailMenu = result.cookbook
				console.log(this.lotteryDetailMenu.name, "mmmm")
				this.material = result.cookbook.materials.main
				console.log(this.material, "mmmm")
			},
			agin() {
				this.getMenuDetail()
			},
			linktoloterry() {
				uni.navigateTo({
					url: "/pages/lottery/lottery"
				})
			},
			
			addtocollect() {
				this.id = this.lotteryDetailMenu.id
				var menu = {
					"id": this.lotteryDetailMenu.id,
					"name": this.lotteryDetailMenu.name,
					num: this.lotteryDetailMenu.collectCount,
					img: this.lotteryDetailMenu.imgLarge,
					collected: true
				}
				console.log(menu)
				console.log(this.lotteryDetailMenu, this.lotteryDetailMenu.id, "eeeeeeee")
				this.addToMenus(menu)
				for (var i=0;i<this.menus.length;i++) {
					if(this.menus[i].id==this.id){
						this.flag=false
					}else{
						this.flag=true
					}
				}
				if(!this.flag){
				
					uni.showToast({
						title: "加入收藏",
						icon: 'success',
						duration: 1000 //1后消失
					});
				}else{
				
					uni.showToast({
						title: "取消收藏",
						icon: 'success',
						duration: 1000 //1后消失
					});
				}
			},
			itemClick(item){
				uni.navigateTo({
				        url: '/pages/fooddetail/fooddetail?id=' + this.lotteryDetailMenu.id
				    })
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		width: 100%;
	}

	.lotterydetail {
		background-color: #eeeded;
		height: 100%;

		.opcity1 {
			width: 540rpx;
			height: 1204rpx;
			background-color: rgba($color: #fff, $alpha: 0.5);
			z-index: 2;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -600rpx;
			margin-left: -270rpx;
			box-shadow: 5rpx 5rpx 5rpx 5rpx #dbd8d8;
			border-radius: 16rpx;
		}

		.opcity2 {
			width: 600rpx;
			height: 1124rpx;
			background-color: rgba($color: #f5f4f4, $alpha: 0.6);
			z-index: 99;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -560rpx;
			margin-left: -300rpx;
			box-shadow: 5rpx 5rpx 5rpx 5rpx #dbd8d8;
			border-radius: 16rpx;
		}

		.contentbox {
			position: absolute;
			top: 50%;
			left: 50%;
			margin-top: -520rpx;
			margin-left: -350rpx;
			z-index: 999;
			width: 700rpx;
			height: 1040rpx;
			border-radius: 16rpx;
			background-color: #fff;
			box-shadow: 10rpx 10rpx 5rpx 5rpx #dbd8d8;

			.menu {
				text-align: center;
				height: 780rpx;

				image {
					background-size: cover;
					width: 100%;
					height: 500rpx;
					border-radius: 16rpx 16rpx 0 0;
				}

				.name {
					margin-top: 20rpx;
					font-size: 38rpx;
				}

				.metiral {
					margin-top: 20rpx;
					color: #333;
					font-size: 24rpx;
				}
			}

			.btn {
				height: 180rpx;
				text-align: center;
				line-height: 100rpx;
				display: flex;

				.collect {
					margin: 8rpx 55rpx;
					padding: 15rpx 30rpx;
					flex: 1;
					font-size: 30rpx;
					text-align: center;
					line-height: 50rpx;
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					background-color: #FFA200;
					color: #fff;
				}
			}

			.foot {
				border-top: 1px solid #ccc;
				height: 80rpx;
				line-height: 90rpx;
				background-color: #fcfcfc;
				border-radius: 0 0 16rpx 16rpx;
				display: flex;
				font-size: 24rpx;
				padding: 0 20rpx;

				.time {
					flex: 1;
				}

				.heart {
					flex: 1;
				}
			}
		}
	}
</style>
