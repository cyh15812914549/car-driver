<template>
	<view class="padding20 uni-bg-white border-radius15">
		
		
		<!-- 地址 -->
		<view>
			<view class="uni-flex">
				<view class="display-one-line address-one">{{orderItem.loadAddress}}</view>
				<view class="uni-common-pt10 uni-common-prl20">
					<image mode="aspectFit" src="../../static/images/right_jiantou.png" class="right-jiantou"></image>
				</view>
				<view class="display-one-line address-one">{{orderItem.unloadAddress}}</view>
			</view>
			<view class="uni-flex border_bottom">
				<view class="display-one-line">{{orderItem.startCity}}</view>
				<view>
					<image mode="aspectFit" src="../../static/images/right_jiantou.png" class="right-jiantou"></image>
				</view>
				<view class="display-one-line">{{orderItem.endCity}}</view>
			</view>
		</view>

		<view>
			<view class="uni-common-mt10">
				<text>{{ orderItem.sourceType }}</text>
				<text class="uni-mrl10">|</text>
				<text class="col_188FEA">{{ orderItem.amount }}{{ orderItem.unit == 1 ? '吨' : '方' }}</text>
				<text class="uni-mrl10">|</text>
				<text>{{orderItem.loadingDate == '' ? orderItem.loadingDate : orderItem.loadingDate | formatDateMDZW}}</text>
				<text v-if="orderItem.toleranceDays && orderItem.toleranceDays != 0">+{{ orderItem.toleranceDays }}天</text>
				<text>装货</text>
				<text class="uni-common-ml10 monthly_bottom_text" v-if="orderItem.isMonthly == 1">月结</text>
				<text class="uni-common-ml10 batch_bottom_text" v-if="orderItem.isTon == 1">批量</text>
			</view>
			<view>
				<view v-if="roleNum != 1">
					<text>车牌号：</text>
					<text>{{orderItem.carNo}}</text>
				</view>
				<view >
					<image class="border-radius50P icon50 align-middle" :src="orderItem.merchantUrl ? orderItem.merchantUrl : headRelativeUrlImage"></image>
					<text class="align-middle uni-common-ml10">{{ orderItem.merchant }}</text>
				</view>
				<view class="uni-flex uni-justify-sb">
					<view>运单号：{{orderItem.orderNo}}</view>
					<view class="col_fd52">
						<text v-if="orderItem.isTon == 1 && orderItem.orderState == 1">运费待定</text>
						<text v-else><block v-if="orderItem.isMonthly != '1'">¥</block>{{ orderItem.freight }}</text>
						<block v-if="orderItem.isMonthly == '1' && orderItem.orderState != 5">积分</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'source',
		props: {
			orderItem: {
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
				headRelativeUrlImage: './../../assets/images/icon_user_placeholder.png',
				roleNum: 1
			};
		},
		created() {

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
