<template>
	<view class="padding20 uni-bg-white border-radius15">
		<view class="uni-flex">
			<!-- 左边角标 -->
			<!-- <view style="margin-right: 5rpx;">
				<view style="background-color: #09BB07;color: #FFFFFF;-webkit-writing-mode: vertical-rl;writing-mode: vertical-rl;" class="uni-center uni-common-ptb10">
					<text>司机已取消</text>
				</view>
			</view> -->
			<view class="uni-flex-item">
				<!-- 地址 -->
				<view>
					<view class="uni-flex">
						<view class="display-one-line address-one">{{sourceItem.loadAddress}}</view>
						<view class="uni-common-pt10 uni-common-prl20">
							<image mode="aspectFit" src="../../static/images/right_jiantou.png" class="right-jiantou"></image>
						</view>
						<view class="display-one-line address-one">{{sourceItem.unloadAddress}}</view>
					</view>
					<view class="uni-flex border_bottom">
						<view class="display-one-line">{{sourceItem.startCity}}</view>
						<view>
							<image mode="aspectFit" src="../../static/images/right_jiantou.png" class="right-jiantou"></image>
						</view>
						<view class="display-one-line">{{sourceItem.endCity}}</view>
					</view>
				</view>
				
				<view>
					<view class="uni-common-mt10">
						<text>{{ sourceItem.sourceName }}</text>
						<text class="uni-mrl10">|</text>
						<text v-if="sourceItem.isTon == 1" class="col_188FEA">余{{ sourceItem.surplusAmout || sourceItem.surplusAmount }}</text>
						<text v-else-if="sourceItem.isTon != 1" class="col_188FEA">{{ sourceItem.amount }}</text>
						<text class="uni-mrl10">|</text>
						<text>{{sourceItem.loadingDate == '' ? sourceItem.loadingDate : sourceItem.loadingDate | formatDateMDZW}}</text>
						<text v-if="sourceItem.toleranceDays && sourceItem.toleranceDays != 0">+{{ sourceItem.toleranceDays }}天</text>
						<text>装货</text>
						<text class="uni-common-ml10 monthly_bottom_text" v-if="sourceItem.isMonthly == 1">月结</text>
						<text class="uni-common-ml10 batch_bottom_text" v-if="sourceItem.isTon == 1">批量</text>
					</view>
					<view class="uni-flex">
						<view class="uni-flex-item col_E51818 freight">
							<block v-if="sourceItem.freightType == 1">
								<text v-if="sourceItem.phoneContact == 1">电议</text>
								<block v-if="sourceItem.phoneContact != 1">
									<text>{{ sourceItem.price }}{{ sourceItem.isMonthly == '1' ? '积分' : '元' }}/{{ sourceItem.unit }}</text>
								</block>
							</block>
							<block v-if="sourceItem.freightType == 2">
								<text>{{ sourceItem.freight }}</text>
								<text>{{ sourceItem.isMonthly == '1' ? '积分' : '元' }}/船</text>
							</block>
							<block>
								<text class="uni-common-ml20" v-if="sourceItem.isPreparePay == 1"> 可预付</text>
							</block>
						</view>
						
						<view class="uni-center-cr">
							<view class="border-radius50P uni-center uni-bg-main-color phone-round" @click.stop="makeCall">
								<uni-icons type="phone" color="#fff" size="25"></uni-icons>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import { makePhoneCall } from '../../common/common.js'
	
	export default {
		name: 'source',
		props: {
			sourceItem: {
				type: Object,
				value: {},
			}
		},
		filters: {
			//时间处理
			formatDateMDZW(data) {
				var date = new Date(data)
				var M = date.getMonth() + 1 + '月';
				var D = date.getDate() + '日'; 
				return M + '-' + D
			}
		},
		data() {
			return {

			};
		},
		created() {

		},
		methods:{
			makeCall(){
				makePhoneCall(this.sourceItem.loadPhone)
			}
		}
	}
</script>

<style lang="scss">
	.address-one {
	  font-size: 36rpx;
	  font-weight: bold;
	  color: #333;
	}
	
	.freight{
		font-size: 36rpx;
		margin: auto 0;
	}
	
	.phone-round {
		height: 90rpx;
		width: 90rpx;
		line-height: 90rpx;
	}
</style>
