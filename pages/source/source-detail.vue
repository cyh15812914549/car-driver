<template>
	<view>
		<view class="top-area">
			<uni-nav-bar color="#ffffff" background-color="#FF8400" @clickLeft="back"
			:status-bar="true" left-icon="arrowleft" title="货源详情" >
				
				<block slot="left">
					<view>
						<text class="uni-common-ml30 font-size32" @click="feedback">反馈</text>
					</view>
				</block>
				
			</uni-nav-bar>
		</view>
		<view :style="{paddingTop: totalTopHeight + 'px'}"> 
			<source-detail :detail="detail"></source-detail>
		</view>
	</view>
</template>

<script>
	
	import {
		mapState
	} from 'vuex'
	
	import souceDetail from "@/components/source/source-detail.vue"
	
	import {sourceDetail} from "../../config/api.js"
	
	export default {
		data() {
			return {
				detail: {},
				sourceId: ''
			}
		},
		onLoad(option) {
			this.sourceId = option.sourceId
			
			this.getSourceDetail()
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			feedback(){
				uni.navigateTo({
					url: '/pages/common/feedback'
				})
			},
			//  获取货源详情
			  getSourceDetail() {
			    sourceDetail({
			      sourceId: this.sourceId
			    })
			      .then(res => {
			        console.log(res)
			        if (res.status == 'success') {
			          if (res.data.state == '1') {
			            this.getSourceDetailInfos(res)
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
			  },
			//  获取货源详情的值
			  getSourceDetailInfos(res) {
			    let phoneNumberList = [{
			      type: '装货联系人',
			      name: res.data.loadContact,
			      phoneNumber: res.data.loadPhone
			    }, {
			      type: '卸货联系人',
			      name: res.data.unloadContact,
			      phoneNumber: res.data.unloadPhone
			    }]
			    let loadPhone = res.data.loadPhone
			    let unloadPhone = res.data.unloadPhone
			    let replaceShowLoadPhone = loadPhone.substr(0, 3) + '****' + loadPhone.substr(7)
			    let replaceShowUnloadPhone = unloadPhone.substr(0, 3) + '****' + unloadPhone.substr(7)
			    var deadWeightEnd = ''
			    if (res.data.deadWeightEnd) {
			      deadWeightEnd = res.data.deadWeightEnd * 1
			    }
			    var surplusSize = ''
			    if (res.data.surplusSize) {
			      surplusSize = res.data.surplusSize * 1
			    }
			    
				let dataObj = {
					startCity: res.data.startCity,
					endCity: res.data.endCity,
					startLoc: res.data.startLoc,
					endLoc: res.data.endLoc,
					loadingDate: res.data.loadingDate,
					sourceName: res.data.sourceName,
					freightType: res.data.freightType,
					price: res.data.price,
					carType: res.data.carType,
					merchant: res.data.merchant,
					merchantUrl: res.data.merchantUrl,
					loadContact: res.data.loadContact,
					loadPhone: res.data.loadPhone,
					unloadContact: res.data.unloadContact,
					unloadPhone: res.data.unloadPhone,
					remark: res.data.remark,
					isTon: res.data.isTon,
					toleranceDays: res.data.toleranceDays,
					size: res.data.size,
					unit: res.data.unit,
					deadWeightStart: res.data.deadWeightStart,
					deadWeightEnd: deadWeightEnd,
					phoneContact: res.data.phoneContact,
					phoneNumberList: phoneNumberList,
					loadLatitude: res.data.loadLatitude,
					loadLongitude: res.data.loadLongitude,
					unloadLatitude: res.data.unloadLatitude,
					unloadLongitude: res.data.unloadLongitude,
					surplusSize: surplusSize,
					replaceShowLoadPhone: replaceShowLoadPhone,
					replaceShowUnloadPhone: replaceShowUnloadPhone,
					toleratePrice: res.data.toleratePrice * 1,
					toleratePercentage: res.data.toleratePercentage * 1000,
					isMonthly: res.data.isMonthly,
					distributeDate: res.data.distributeDate,
					carLinkNo: res.data.carLinkNo,
					isPreparePay: res.data.isPreparePay || 0,
					serverFrozen: res.data.serverFrozen,
					hasServer: res.data.hasServer,
					sourceCode: res.data.sourceCode,
					merchantCompanyCode: res.data.merchantCompanyCode,
					carLength: res.data.carLength,
					sourceModel: res.data.sourceModel,
					carTimesTotal: res.data.carTimesTotal,
					carLoadSize: res.data.carLoadSize,
					isPublic: res.data.isPublic,
					isAutoChoiceDriver: res.data.isAutoChoiceDriver,
				}
				
				const detail = JSON.parse(JSON.stringify(dataObj))
				this.detail = detail
			  },
		},
		computed: {
			...mapState({
				statusBar: state => state.login.statusBar,
				customBar: state => state.login.customBar,
				totalTopHeight: state => state.login.totalTopHeight
			})
		},
		components:{
			"source-detail": souceDetail
		}
	}
</script>

<style>

</style>
