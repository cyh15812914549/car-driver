<template>
	<view>
		<view class="uni-tab">
			<view class="uni-navbar tab-row">
				<view class="navbar-row uni-flex">
					<block v-for="(item,index) in tabs" :key="index">
						<view class="uni-flex-item uni-center padding20 border-radius100" :class="tabIndex == index ? 'uni-bg-main-color' : ''"
						 @click="selectTab(index)">
							<text>{{item}}</text>
						</view>
					</block>
				</view>
 
				<view class="condition uni-common-mtb10" v-show="tabIndex == 0">
					<view class="uni-flex uni-align-c">
						<view>
							<uniIcons type="location-filled" color="#99CCFF" size="25"></uniIcons>
						</view>
						<view class="exceed-hidden tag load" @click="openAddres('load')">
							{{loadCity != '' ? loadCity+''+loadCounty : '全部'}}
							<uniIcons type="arrowdown" size="20"></uniIcons>
						</view>
						<view class="uni-common-mrl20">
							<image mode="aspectFit" src="../../static/images/right_jiantou.png" class="right-jiantou"></image>
						</view>
						<view class="exceed-hidden tag load" @click="openAddres('unload')">
							{{unloadCity != '' ? unloadCity+''+unloadCounty : '全部'}}
							<uniIcons type="arrowdown" size="20"></uniIcons>
						</view>
						<view class="exceed-hidden tag pos_absolute load right20">
							<picker :range="carListArr" @change="bindCarChange" range-key="label">
								<view class="lindh60">
									{{carIndex == -1 ? '车型' : carListArr[carIndex].label}}
									<uniIcons type="arrowdown" size="20"></uniIcons>
								</view>
							</picker>
						</view>
					</view>
				</view>
			</view>

			<view class="tab-panel uni-common-mrl20" :style="{'padding-top': tabIndex == 0 ? '230rpx' : '140rpx' }">
				<view v-show="tabIndex == 0">
					<view v-if="sourceList.length > 0">
						<block v-for="item in sourceList" :key="item.sourceId">
							<view class="uni-common-mt20" @click="checkDetail(item.sourceId)">
								<source-item :sourceItem="item"></source-item>
							</view>
						</block>
					</view>
					<view class="uni-common-mt30 uni-center" v-else>
						<image src="../../static/images/no_data.png" class="no-data-img"></image>
						<view>暂无数据</view>
					</view>
				</view>
				<view v-show="tabIndex == 1">
					<view class="uni-common-mt30 uni-center">
						<image src="../../static/images/no_data.png" class="no-data-img"></image>
						<view>暂无数据</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 地址选择组件 -->
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>

	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	import sourceItemV from "@/components/source/source.vue"
	
	import { sourceList, communicativeList, checkWaybillStatus, signUnload, userInfo} from '../../config/api.js'

	import {
		carList
	} from "../../static/js/carList.js"

	import { Toast } from '../../common/common.js'

	export default {
		data() {
			/**
			 *  loadCity: 装货城市
			 * loadCounty: 装货的区县
			 * unloadCity: 卸货城市
			 * unloadCounty: 卸货区县
			 */
			return {
				tabs: ['货源大厅', '待沟通货源'],
				tabIndex: 0,
				swiperHeight: 0,
				cityPickerValueDefault: [0, 0, 1],
				loadCity: '',
				loadCounty: '',
				unloadCity: '',
				unloadCounty: '',
				addressType: '',
				carListArr: [],
				carIndex: -1,
				sourceList: [],
				pageSize: 10,
				pageNo: 1,
				merchantCode: '',
				deadWeightStart: '',
				deadWeightEnd: '',
				carType: '',
			}
		},
		onLoad() {
			this.carListArr = carList,
			this.getSouraceList()
			console.log(this.carListArr[0].label)
		},
		methods: {
			checkDetail(sourceId){
				uni.navigateTo({
					url: '/pages/source/source-detail?sourceId=' + sourceId
				})
			},
			selectTab(index) {
				this.tabIndex = index
			},
			openAddres(data) {
				this.addressType = data
				this.$refs.simpleAddress.open();
			},

			onConfirm(e) {
				let addArr = e.labelArr
				if (this.addressType == 'load') {
					this.loadCity = addArr[1] == '市辖区' ? addArr[0] : addArr[1]
					this.loadCounty = addArr[2]
				} else {
					this.unloadCity = addArr[1] == '市辖区' ? addArr[0] : addArr[1]
					this.unloadCounty = addArr[2]
				}
			},
			bindCarChange(e) {
				this.carIndex = e.detail.value
				this.carType = this.carListArr[e.detail.value].value
				this.getSouraceList()
			},
			//  货物货源列表
			  getSouraceList() {
			    sourceList({
			      pageSize: 10,
			            pageNo: 1,
			            loadCity: this.loadCity,
			            loadCounty: this.loadCounty,
			            unloadCity: this.unloadCity,
			            unloadCounty: this.unloadCounty,
			            merchantCode: this.merchantCode,
			            deadWeightStart: this.deadWeightStart,
			            deadWeightEnd: this.deadWeightEnd,
			            carType: this.carType,
			            carIndex: this.carIndex
			    })
			      .then(res => {
			        if (res.status == 'success') {
			          if (res.data.state == '1') {
			            this.sourceList = res.data.sourceList
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
			          title: '系统异常, 请稍后再试!'
			        })
			      })
			  },
		},
		components: {
			simpleAddress,
			uniIcons,
			"source-item": sourceItemV
		}
	}
</script>

<style lang="scss">
	.lindh60 {
		line-height: 60rpx;
	}

	.right20 {
		right: 20rpx;
	}

	.load {
		max-width: 160rpx;
		height: 60rpx;
		line-height: 60rpx;
	}

	.tag {
		padding: 0 10rpx;
		color: #797979;
		background-color: #DEDEDE;
		border-radius: 8rpx;
	}

	.condition {
		height: 80rpx;
	}

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
		overflow: auto;
		-webkit-overflow-scrolling: touch;
	}
</style>
