<template>
	<view>
		<text></text>
		<foodlist :menu="menu"></foodlist>
		<uni-load-more v-if="!flag" :status="'loading'"></uni-load-more>
		<uni-load-more v-else :status="'noMore'"></uni-load-more>
	</view>
</template>

<script>
	import {
		myRequestPost
	} from '@/utils/request.js';
	import uniIcons from "@/components/uni/uni-icons/uni-icons.vue";
	import uniLoadMore from "@/components/uni/uni-load-more/uni-load-more.vue";
	import foodlist from '@/components/foodlist/foodlist.vue'
	export default {
		components: {
			uniIcons,
			uniLoadMore,
			foodlist
		},
		data() {
			return {
				menu: [],
				limit: 10,
				flag: false,

			};
		},
		onLoad(options) {
			this.id = options.id;
			this.getSwipers()
		},
		methods: {
			async getSwipers() {
				let result = await myRequestPost("/rest/cks/api/cookbook/grounding/get-by-dc", {
					"dc": this.$mp.query.dc,
					"cookbookType": "all",
					"start": 0,
					"limit": this.limit,
					"userId": null
				});
				if (result.rc === 0) {
					this.menu = [...result.cookbooks];
				}
				console.log(result)
				console.log(this,'55555555')
				console.log(this.$mp.query.dc)
				
			},
			onReachBottom() {
				this.limit += 10;
				if (this.limit <= 300) {
					this.getSwipers();
				} else {
					//没有更多数据了
					this.flag = true;
				}
			}
		}
	}
</script>

