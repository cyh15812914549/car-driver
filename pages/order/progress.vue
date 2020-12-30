<template>
	<view>
		<!-- 运单进度 -->
		<view>
			<uni-steps :options="logs" active-color="#FF8400"
				direction="column" :active="activeIndex">
			</uni-steps>
		</view>
		
		<view class="bottom-b">
			<button class="border-radius100 uni-bg-main-color" @click="checkOrderTrack">运单轨迹</button>
		</view>
	</view>
</template>

<script>
	
	import { orderLog } from '../../config/api.js'
	import { Toast } from '../../common/common.js'
	
	
	export default {
		components:{
		
		},
		data() {
			return {
				orderId: '',
				logs: [],
				activeIndex: 0
			}
		},
		onLoad(options) {
			!!options.orderId && (this.orderId = options.orderId)
			this.getOrderLog()
		},
		methods: {
			checkOrderTrack(){
				uni.navigateTo({
					url: '/pages/webview/webview' + '?track=' + this.orderId
				})
			},
			//  获取运单日志
			  getOrderLog() {
			    let that = this
			    orderLog({
			        orderId: that.orderId
			      })
			      .then(res => {
			        if (res.status == 'success') {
			          if (res.data.state == '1') {
			            if (res.data.logs.length > 0) {
			              var orderState = ['企业发布货源', '司机接单', '企业确认司机接单', '司机已装货', '司机已卸货', '企业已签收', '企业已支付运费', '运单已完成'];
			              orderState.length = res.data.logs.length;
			              for (let i = 0, len = res.data.logs.length; i < len; i++) {
			                res.data.logs[i].orderState = orderState[orderState.length - 1 - i];
			              }
			              that.logs = res.data.logs
						  // that.activeIndex = res.data.logs.length - 1
						  console.log(that.logs)
			            };
			          } else {
			            Toast({
			              title: res.data.info
			            });
			          }
			        } else {
			          Toast({
			          title: '系统异常, 请稍后再试'
			        });
			        }
			      })
			      .catch(error => {
			        Toast({
			          title: '系统异常, 请稍后再试'
			        });
			      });
			  }
		}
	}
</script>

<style>
	page{
		padding-bottom: 120rpx;
	}
</style>
