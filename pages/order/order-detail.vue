<template>
	<view>
		
		<view class="uni-bg-white margin20 border-radius15 padding20">
			<view class="uni-flex uni-justify-sb">
				<view>
					<text class="icon iconfont icon-shizhong uni-bg-main-color col_white border-radius50P" ></text>
					<text class="uni-main-color uni-common-ml10">运输中</text>
				</view>
				<view @click="checkProgress">
					运单进度
					<text class="icon iconfont icon-jiantou"></text>
				</view>
			</view>
			<view class="uni-flex uni-justify-sb">
				<view>运单号：{{detail.code}}</view>
				<view><text class="uni-main-color">取消运单</text></view>
			</view>
		</view>
		
		<view class="uni-bg-white margin20 border-radius15">
			<view class="uni-flex border_bottom uni-common-ptb20">
				<view class="uni-flex-item uni-center">{{ detail.startCity }}</view>
				<view>
					<image src="../../static/images/right_jiantou_main.png" class="right-arrow"></image>
				</view>
				<view class="uni-flex-item uni-center">{{ detail.endCity }}</view>
			</view>
			<view class="uni-flex uni-justify-sb padding10 uni-align-c" >
				<view class="uni-flex uni-align-c">
					<image :src="detail.merchantUrl || defaultImage" class="icon60 border-radius50P"></image>
					<view class="uni-common-ml20">
						<view class="font-size32">{{detail.merchant}}</view>
						<view class="uni-flex uni-align-c" v-if="detail.orderState == 1">{{detail.loadPhone}}</view>
						<view class="uni-flex uni-align-c" v-elif="detail.orderState == 2">{{detail.unloadPhone}}</view>
					</view>
				</view>
				<view>
					<uni-icons type="phone-filled" color="#FF8400" size="25" @click="openSheet"></uni-icons>
				</view>
			</view>
		</view>

		<view class="uni-form-item uni-column content-mar-b">
			<view class="uni-list">
				<view class="uni-list-cell uni-list-cell-pd">
					<view>
						<text>结算模式</text>
					</view>
					<view>
						<text>{{ detail.isMonthly == 1 ? '月结模式' : '现结模式' }}</text>
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-pd">
					<view>
						<text>允许司机自动接单</text>
					</view>
					<view>
						<text>{{ detail.isAutoChoiceDriver == 1 ? '是' : '否' }}</text>
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-pd">
					<view>
						<text>装货日期</text>
					</view>
					<view>
						<text>{{ detail.loadingDate }} {{ detail.toleranceDays && detail.toleranceDays != 0 ? '+ ' + detail.toleranceDays + '天' : '' }}</text>
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-pd">
					<view>
						<text>货物信息</text>
					</view>
					<view>
						<text>{{ detail.sourceType }}/{{detail.amount}}{{ detail.unit == 1 ? '吨' : '方' }}</text>
					</view>
				</view>
				
				
				<view class="uni-list-cell uni-list-cell-pd">
					<view>
						<text>运价</text>
					</view>
					<view>
						<view v-if="detail.freightType == 1">
							<text>{{ detail.price }}{{ detail.isMonthly == '1' ? '积分' : '元' }}/{{ detail.unit == 1 ? '吨' : '方' }}</text>
							<text>{{ detail.phoneContact == 1 ? '  可接受议价' : '' }}</text>
							<text v-if="detail.isPreparePay == '1'"> 预付{{detail.hasServer == 1 ? '(含税)' : ''}}</text>
						</view>
						<view v-if="detail.freightType == 2">
							<text>{{ detail.price }}{{ detail.isMonthly == '1' ? '积分' : '元' }}/车 </text>
							<text class="uni-common-ml20">{{ detail.phoneContact == 1 ? '  可接受议价' : '' }}</text>
							<text v-if="detail.isPreparePay == '1'"> 预付{{detail.hasServer == 1 ? '(含税)' : ''}}</text>
						</view>
					</view>
				</view>
				
				<view class="uni-list-cell uni-list-cell-pd">
					<view>
						<text>下单运费</text>
					</view>
					<view>
						<text>{{ detail.freight }}{{ detail.unit == 1 ? '吨' : '方' }}</text>
					</view>
				</view>
				
				<view class="uni-list-cell uni-list-cell-pd" v-if="detail.toleratePrice > 0">
					<view>
						<text>收单规则</text>
					</view>
					<view>
						<text>允许损耗值:</text>
						<text>千分之 {{ detail.toleratePercentage }}</text>
						<text>亏吨扣罚:</text>
						<text>{{ detail.toleratePrice }}{{ detail.isMonthly == '1' ? '积分' : '元' }}{{ detail.unit == 1 ? '/吨' : '/方' }}</text>
					</view>
				</view>
			</view>
			<view class="uni-list uni-common-mt20">
				<view class="uni-list-cell uni-list-cell-pd">
					<view>
						<image src="../../static/images/icon_load.png" class="icon40 align-middle"></image>
						<text class="align-middle">始发地</text>
					</view>
					<view class="text-r">
						<view>{{ detail.startLoc }}</view>
						<view>
							<text class="uni-common-mr20">{{ detail.loadContact }}</text>
							<text>{{ authState == 1 ? detail.loadPhone : '' }}</text>
						</view>
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-pd">
					<view>
						<image src="../../static/images/icon_unload.png" class="icon40 align-middle"></image>
						<text class="align-middle">目的地</text>
					</view>
					<view class="text-r">
						<view class="text-r">{{ detail.endLoc }}</view>
						<view>
							<text class="uni-common-mr20">{{ detail.unloadContact }}</text>
							<text>{{ authState == 1 ? detail.unloadPhone : '' }}</text>
						</view>
					</view>
				</view>
				<view class="uni-list-cell uni-list-cell-pd">
					<view>
						<text>备注</text>
					</view>
					<view>
						<text>{{ detail.remark ? detail.remark: '无备注信息' }}</text>
					</view>
				</view>
			</view>
		</view>

		<view class="bottom-b">
			<button class="border-radius100 uni-bg-main-color">立即接单</button>
		</view>
		
		<uni-popup ref="popup" type="bottom">
			<view class="page_bg">
				<uni-list>
					<uni-list-item>
						<view slot="header" class="uni-flex uni-align-c uni-width-30P">
							<text>装货联系人</text>
						</view>
						<view slot="body" class="uni-width-50P">
							<view>{{detail.loadContact}}</view>
							<view>{{detail.loadPhone}}</view>
						</view>
						<view slot="footer" class="uni-flex uni-align-c uni-justify-c uni-width-20P">
							<uni-icons type="phone-filled" color="#FF8400" size="25" @click="makeCall(detail.loadPhone)"></uni-icons>
						</view>
					</uni-list-item>
					<uni-list-item>
						<view slot="header" class="uni-flex uni-align-c uni-width-30P">
							<text>卸货联系人</text>
						</view>
						<view slot="body" class="uni-width-50P">
							<view>{{detail.unloadContact}}</view>
							<view>{{detail.unloadPhone}}</view>
						</view>
						<view slot="footer" class="uni-flex uni-align-c uni-justify-c uni-width-20P">
							<uni-icons type="phone-filled" color="#FF8400" size="25" @click="makeCall(detail.unloadPhone)"></uni-icons>
						</view>
					</uni-list-item>
				</uni-list>
				<view class="uni-bg-white uni-common-mt10">
					<view class="uni-center uni-common-ptb20" @click="cancel">
						<text>取消</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	
	import {
		mapState
	} from 'vuex'
	
	import { Toast,makePhoneCall } from '../../common/common.js'
	import { orderDetail } from '../../config/api.js'
	
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	
	export default {
		components:{
			uniPopup
		},
		filters: {

		},
		data() {
			return {
				grade: 4,
				orderId: '',
				detail: {},
			};
		},
		onLoad(options) {
			!!options.orderId && (this.orderId = options.orderId)
			this.getOrderList()
		},
		created() {
			
		},
		mounted() {

		},
		computed: {
			...mapState({
				defaultImage: state => state.common.defaultImage,
				authState: state => state.login.authState,
			})
		},
		watch: {

		},
		methods: {
			checkProgress(){
				uni.navigateTo({
					url: '/pages/order/progress?orderId=' + this.orderId
				})
			},
			openSheet(){
				this.$refs.popup.open()
			},
			cancel(){
				this.$refs.popup.close()
			},
			makeCall(phoneNumber){
				makePhoneCall(phoneNumber)
			},
			getOrderList() {
				let that = this
				orderDetail({
				  orderId: that.orderId
				})
					.then(res => {
						if (res.status == 'success') {
							if (res.data.state == '1') {
								that.detail = res.data
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
	}
</script>

<style lang="scss">
	.right-arrow {
		width: 70rpx;
		height: 25rpx;
	}
</style>
