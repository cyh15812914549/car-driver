<template>
	<view>
		<view class="uni-bg-white margin20 border-radius15">
			<view class="uni-flex border_bottom uni-common-ptb20">
				<view class="uni-flex-item uni-center">{{ detail.startCity }}</view>
				<view>
					<image src="../../static/images/right_jiantou_main.png" class="right-arrow"></image>
				</view>
				<view class="uni-flex-item uni-center">{{ detail.endCity }}</view>
			</view>
			<view class="uni-flex uni-justify-sb padding10 uni-align-c">
				<view class="uni-flex uni-align-c">
					<image src="../../static/icon/icon_home_HL.png" class="icon60 border-radius50P"></image>
					<view class="uni-common-ml20">
						<view class="font-size32">{{detail.merchant}}</view>
						<view class="uni-flex uni-align-c">
							<view>信用评级</view>
							<view class="uni-flex uni-common-ml10">
								<view>
									<block v-for="(item,index) in grade" :key="index">
										<uni-icons type="star-filled" color="#FF8400" size="20"></uni-icons>
									</block>
								</view>
								
								<view v-if="grade != 5">
									<block v-for="(item,index) in 5-grade" :key="index">
										<uni-icons type="star" size="20"></uni-icons>
									</block>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view>
					<uni-icons type="phone-filled" color="#FF8400" size="25"></uni-icons>
				</view>
			</view>
		</view>
		
		<view class="uni-form-item uni-column content-mar-b">
			<view class="uni-list">
				<view class="uni-list-cell uni-list-cell-pd">
					<view>
						<text>货源编号</text>
					</view>
		            <view>
		            	<text>{{ detail.sourceCode}}</text>
		            </view>
				</view>
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
						<text>发货方式</text>
					</view>
				    <view>
				    	<text>{{ detail.isTon == 1 ? '批量发货' : '按单次发货' }}</text>
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
				    	<text>{{ detail.sourceName }}/{{ detail.isTon == 1 ? '余' + detail.surplusSize : detail.size }}{{ detail.unit == 1 ? '吨' : '方' }}</text>
				    </view>
				</view>
				<view class="uni-list-cell uni-list-cell-pd" v-if="detail.sourceModel == 2">
					<view>
						<text>车次数量</text>
					</view>
				    <view>
				    	<text>{{ detail.carTimesTotal }}车/每车{{detail.carLoadSize}}{{ detail.unit == 1 ? '吨' : '方' }}</text>
				    </view>
				</view>
				<view class="uni-list-cell uni-list-cell-pd" v-if="detail.sourceModel == 1">
					<view>
						<text>车辆信息</text>
					</view>
				    <view>
				    	<text>{{ detail.carType }} {{ detail.deadWeightStart ? detail.deadWeightStart : '无' }} ~ {{ detail.deadWeightEnd ? detail.deadWeightEnd : '无' }} 吨 /{{detail.carLength}}</text>
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
				    <view>
				    	<view>{{ detail.startLoc }}</view>
				    	<view>
				    	    <text class="uni-common-mr20">{{ detail.loadContact }}</text>
				    	    <text>{{ detail.authState == 1 ? detail.loadPhone : detail.replaceShowLoadPhone }}</text>
				    	</view>
				    </view>
				</view>
				<view class="uni-list-cell uni-list-cell-pd">
					<view>
						<image src="../../static/images/icon_unload.png" class="icon40 align-middle"></image>
						<text class="align-middle">目的地</text>
					</view>
				    <view>
				    	<view>{{ detail.endLoc }}</view>
				    	<view>
				    	    <text class="uni-common-mr20">{{ detail.unloadContact }}</text>
				    	    <text>{{ detail.authState == 1 ? detail.unloadPhone : detail.replaceShowUnloadPhone }}</text>
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
	</view>
</template>

<script>
	export default {
		name: 'source-detail',
		props: {
			detail: {
				type: Object,
				default: {}
			}
		},
		filters: {

		},
		data() {
			return {
				grade: 4
			};
		},
		created() {
			
		},
		mounted() {
			
		},
		watch:{
			
		},
		methods:{
			
		},
	}
</script>

<style lang="scss">
	.right-arrow{
		width: 70rpx;
		height: 25rpx;
	}

</style>
