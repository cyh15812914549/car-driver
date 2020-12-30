<template>
	<view>
		<view class="user-info-area uni-bg-main-color">
			<view class="avatar-area uni-flex uni-justify-sb uni-align-c">
				<view class="uni-flex uni-common-ml30">
					<image :src="headUrl ? headUrl : placeholderImage" class="img-headRelativeUrl"></image>
					<view class="uni-common-ml20">
						<text class="uni-block">{{name}}</text>
						<text class="uni-block">{{carNo}}</text>
					</view>
				</view>
				<view class="uni-common-mr20">
					<!-- <text>认证状态</text> -->
					<view class="uni-flex" catchtap="checkAuthInfo">
						<view v-if="authState == '0'">待认证</view>
						<view v-else-if="authState == '3'">待审核</view>
						<view v-else-if="authState == '2'">已认证</view>
						<block v-else-if="authState == '1'">
							<view>已拒绝</view>
							<view class="uni-common-ml10">
								<uni-icons type="info"></uni-icons>
							</view>
						</block>
						<view class="uni-common-ml10">
							<uni-icons type="arrowright" color="#ffffff"></uni-icons>
						</view>
					</view>
				</view>
			</view>
			<view class="data-area uni-flex uni-align-c">
				<view class="uni-flex-item uni-center font-size32 order-number-item">
					<text>完成运单：{{totalOrder ? totalOrder + '笔' : '未知'}}</text>
				</view>
				<view class="uni-flex-item uni-center font-size32">
					<text>总收入：{{totalIncome ? totalIncome + '元' : '未知'}}</text>
				</view>
			</view>
		</view>
		<uni-list>
			<uni-list-item title="钱包余额" rightColor="uni-main-color" :rightText="balance ? '￥' + balance : '0'" :show-arrow="true"
			 to="/pages/user/my-wallet" thumb="../../static/images/icon_wallet.png" />
		</uni-list>
		<view class="uni-common-mt20">
			<uni-list>
				<uni-list-item title="车辆管理" :show-arrow="true" thumb="../../static/images/car_logo.png" />
				<uni-list-item title="待收运费" rightColor="uni-main-color" :rightText="priceSum ? '￥' + priceSum : '0'" :show-arrow="true"
				 thumb="../../static/images/icon_freight.png" />
				<uni-list-item title="代理人管理" :show-arrow="true" thumb="../../static/images/icon_user_placeholder.png" />
				<uni-list-item title="消息中心" badgeType="error" badge-text="15" :show-badge="true" :show-arrow="true" thumb="../../static/images/icon_news.png" />
			</uni-list>
		</view>
		<view class="uni-common-mt20">
			<uni-list>
				<uni-list-item title="推荐小程序给好友" :show-arrow="true" thumb="../../static/images/icon_share.png" />
				<uni-list-item title="帮助反馈" :show-arrow="true" thumb="../../static/images/icon_help.png" />
				<uni-list-item title="联系客服" :show-arrow="true" thumb="../../static/images/icon_service.png" />
			</uni-list>
		</view>
		<view class="uni-common-mt20">
			<uni-list>
				<uni-list-item title="设置" :show-arrow="true" link to="/pages/user/setting" thumb="../../static/images/icon_setting.png" />
			</uni-list>
		</view>
	</view>
</template>

<script>
	import {
		userInfo,
		changeAvatar,
		notReadMsg
	} from '../../config/api.js'
	import {
		Toast,
		getSystemInfo,
		otherAuthState
	} from '../../common/common.js'

	import {
		mapState
	} from 'vuex'
	

	export default {
		data() {
			return {
				placeholderImage: '../../static/images/icon_user_placeholder.png',
				name: '',
				headUrl: '',
				balance: '',
				priceSum: '',
				totalOrder: '',
				totalIncome: '',
				ponitWaitPay: '',
				pointAvaliableBalance: '',
				frozenMoney: '',
				pointCreditLimit: '',
				carNo: '',
				carNum: ''
			};
		},
		onLoad() {
			this.getUserInfo()
		},
		methods: {
			//  获取用户个人信息
			getUserInfo() {
				userInfo({}).then(res => {
						console.log(res)
						if (res.status == 'success') {
							if (res.data.state == '1') {
								this.name = res.data.name
								this.headUrl = res.data.headUrl
								this.balance = res.data.balance
								this.priceSum = res.data.priceSum
								this.totalOrder = res.data.totalOrder
								this.totalIncome = res.data.totalIncome
								this.ponitWaitPay = res.data.ponitWaitPay
								this.pointAvaliableBalance = res.data.pointAvaliableBalance
								this.frozenMoney = res.data.frozenMoney
								this.pointCreditLimit = res.data.pointCreditLimit

								if (res.data.carNo.length > 10) {
									let arr = res.data.carNo.split("_")
									this.carNo = arr[1]
								} else {
									this.carNo = res.data.carNo
								}
								this.carNum = res.data.carNum

							} else {
								Toast({
									title: res.data.info
								})
							}
						} else {
							Toast({
								title: '系统异常, 请稍后再试'
							});
						}
					})
					.catch(error => {
						Toast({
							title: '系统异常,请稍后再试'
						})
					})
			},
		},
		computed: {
			...mapState({
				roleNum: state => state.login.roleNum,
				authState: state => state.login.authState
			})

		}
	}
</script>

<style lang="scss">
	.phone-round {
		height: 90rpx;
		width: 90rpx;
		line-height: 90rpx;
	}

	.user-info-area {
		height: 270rpx;
	}

	.avatar-area {
		height: 180rpx;
	}

	.data-area {
		height: 90rpx;
		width: 100%;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.1);
	}

	.img-headRelativeUrl {
		width: 100rpx;
		height: 100rpx;
		border: 4rpx solid #fff;
		border-radius: 50%;
	}

	.user-info-area .order-number-item {
		position: relative;
	}

	.order-number-item::before {
		position: absolute;
		right: 0;
		content: " ";
		width: 1px;
		height: 50rpx;
		background-color: #fff;
	}
</style>
