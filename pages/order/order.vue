<template>
	<view>
		<view class="uni-tab">
			<view class="uni-navbar tab-row">
				<view class="navbar-row uni-flex">
					<block v-for="(item,index) in tabs" :key="index">
						<view class="uni-flex-item uni-center padding20 border-radius100" :class="tabIndex == index ? 'uni-bg-main-color' : ''"
						 @click="selectTab(index,item.mark)">
							<text>{{item.name}}</text>
						</view>
					</block>
				</view>
			</view>

			<view class="tab-panel uni-common-mrl20">
				<view v-show="tabIndex == 0">
					<view v-if="myOrderList.length > 0">
						<block v-for="(item,index) in myOrderList" :key="item.orderNo">
							<view class="uni-common-mt20" @click="checkDetail(item.orderId)">
								<order-item :orderItem="item"></order-item>
							</view>
						</block>
					</view>
					<view class="uni-common-mt30 uni-center" v-else>
						<image src="../../static/images/no_data.png" class="no-data-img"></image>
						<view>暂无数据</view>
					</view>
				</view>
				<view v-show="tabIndex == 1">
					<view v-if="eOrderList.length > 0">
						<block v-for="(item,index) in eOrderList" :key="index">
							<view class="uni-common-mt20" @click="checkDetail(item.orderId)">
								<order-item :orderItem="item"></order-item>
							</view>
						</block>
					</view>
					<view class="uni-common-mt30 uni-center" v-else>
						<image src="../../static/images/no_data.png" class="no-data-img"></image>
						<view>暂无数据</view>
					</view>
				</view>
				<view v-show="tabIndex == 2">
					<view v-if="pastOrderList.length > 0">
						<block v-for="(item,index) in pastOrderList" :key="index">
							<view class="uni-common-mt20" @click="checkDetail(item.orderId)">
								<order-item :orderItem="item"></order-item>
							</view>
						</block>
					</view>
					<view class="uni-common-mt30 uni-center" v-else>
						<image src="../../static/images/no_data.png" class="no-data-img"></image>
						<view>暂无数据</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	
	import { orderList } from '../../config/api.js'
	
	import orderItemV from "@/components/order/order.vue"
	
	import { Toast } from '../../common/common.js'
	
	export default {
		data() {
			return {
				tabs: [
					{name: '运单状态',mark: 'dwcl'},{name: '待企业处理',mark: 'dqycl'},{name: '历史运单',mark: 'lsyd'}
				],
				tabIndex: 0,
				flag: 1,
				state: 2,
				pageNo: 1,
				pageSize: 10,
				subState: '',
				searchValue: '',
				myOrderList: [],
				eOrderList: [],
				pastOrderList: [],
				mark: 'dwcl',
			}
		},
		onLoad() {
			this.getOrderList()
			
			
		},
		methods: {
			checkDetail(orderId){
				uni.navigateTo({
					url:'/pages/order/order-detail?orderId=' + orderId
				})
			},
			selectTab(index,mark) {
				this.tabIndex = index
				this.mark = mark
				
				switch(mark){
					case 'dwcl':
						this.flag = 1
						this.state = 2
						this.myOrderList = []
						break
					case 'dqycl':
						this.flag = 2
						this.state = 3
						this.eOrderList = []
						break
					case 'lsyd':
						this.flag = 3
						this.state = ''
						this.pastOrderList = []
						break
					default:
				}
				this.getOrderList()
			},
			getOrderList(){
				orderList({
				      flag: this.flag,
				      state: this.state,
				      pageNo: this.pageNo,
				      pageSize: 10,
				      subState: this.subState,
				      carNo: this.searchValue
				    })
				      .then(res => {
				        if (res.status == 'success') {
				          if (res.data.state == '1') {
							switch(this.mark){
								case 'dwcl':
									this.myOrderList = this.myOrderList.concat(res.data.orderList)
									break
								case 'dqycl':
									this.eOrderList = this.eOrderList.concat(res.data.orderList)
									break
								case 'lsyd':
									this.pastOrderList = this.pastOrderList.concat(res.data.orderList)
									break
								default:
							}
				          } else {
				            Toast({
				              title: res.data.info
				            })
				          }
				        } else {
				          Toast({
							  title: '系统异常, 请稍后再试'
							})
				        }
				      })
				      .catch(error => {
				        Toast({
				          title: '系统异常,请稍后再试'
				        })
				      })
			}
		},
		components: {
			"order-item": orderItemV
		}
	}
</script>

<style lang="scss">


	.tab-row {
		width: 710rpx;
	}

	.navbar-row {
		border-radius: 100rpx;
		border: 2rpx solid $uni-text-main-color;
	}

	.uni-tab {
		// position: relative;
		height: 100%
	}

	.uni-navbar {
		position: fixed;
		/* #ifndef H5*/
		top: 0;
		/* #endif */
		left: 0;
		padding: 20rpx;
		z-index: 10;
		background-color: #F4F5F6
	}

	.tab-panel {
		box-sizing: border-box;
		height: 100%;
		padding-top: 140rpx;
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
</style>
