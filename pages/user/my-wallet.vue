<template>
	<view>
		<view class="uni-bg-main-color uni-flex padding20">
			<view class="uni-flex-item">
				<view class="uni-flex uni-justify-sa">
					<view>
						<view>可用余额(元)</view>
						<view>¥1.00</view>
					</view>
					<view>
						<view>预付冻结金额(元)</view>
						<view>¥1.00</view>
					</view>
				</view>
				<view class="uni-center uni-common-mt10">
					<view>待结算积分</view>
					<view>0积分</view>
				</view>
			</view>
			<view style="margin: auto;">
				<uni-icons type="arrowright" size="20" color="#ffffff"></uni-icons>
			</view>
		</view>
		
		<view class="uni-common-mt20">
			<uni-list>
				<uni-list-item title="提现" :show-arrow="true"  />
				<uni-list-item title="交易记录" :show-arrow="true"  />
			</uni-list>
		</view>
		<view class="uni-common-mt20">
			<uni-list>
				<uni-list-item title="积分明细" :show-arrow="true"  />
				<uni-list-item title="支付安全" :show-arrow="true"  />
				<uni-list-item title="银行卡" :show-arrow="true"  />
			</uni-list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
