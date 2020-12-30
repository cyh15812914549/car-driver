<template>
	<view>
		<!-- 轮播 -->
		<view class="swiper-wrapper">
			<swiper indicator-dots circular autoplay interval="30000">
				<swiper-item v-for="item in swipers" :key="item.id">
					<image :src="item.url"></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 江湖头条 -->
		<view class="uni-flex  uni-bg-white uni-common-prl20 uni-common-ptb20">
			<view class="uni-flex1">
				<image src="../../static/images/jianghtt.png" class="jianghtt-img"></image>
			</view>
			<view class="uni-flex2 sub-title uni-common-ml30" style="height: 50rpx">
				<swiper style="height: 40rpx" scroll-y autoplay interval="5000" vertical circular>
					<block v-for="item in articles" :key="item.id">
						<swiper-item>
							<text class="uni-common-ml30">{{item.title}}</text>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<view>
				<image src="../../static/images/hot.png" class="hot-img"></image>
			</view>
		</view>

		<view class="uni-padding-wrap uni-common-mt">
			<!--  -->
			<view class="uni-bg-white border-radius10">
				<uni-grid :column="4" :showBorder="false" :highlight="true" @change="change">
					<uni-grid-item v-for="(item, index) in shortCut" :index="index" :key="index">
						<view class="grid-item-box">
							<image :src="item.iconUrl" class="image" />
							<text class="text">{{ item.shortCutName }}</text>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
			
			<!-- 平台交易运单 -->
			<view>
				<view class="uni-display-flex uni-justify-sb deal-order uni-common-mtb30">
					<view class="uni-display-flex">
						<view class="title">平台交易运单</view>
						<view class="uni-flex-item uni-common-ml20 uni-common-mt5">
							<view class="hor_line_one"></view>
							<view class="hor_line_two"></view>
						</view>
					</view>
					<view class="uni-center-cr">
						<text class="color-999">更多</text>
						<uni-icons type="forward" color="#999" size="20"></uni-icons>
					</view>
				</view>
				
				<view>
					<view class="order-title uni-bg-main-color uni-common-ptb20">
						<view class="uni-flex">
							<view class="uni-flex-item uni-center">物品</view>
							<view class="uni-flex-item uni-center">起点</view>
							<view class="uni-flex-item"></view>
							<view class="uni-flex-item uni-center">终点</view>
							<view class="uni-flex-item uni-center">时间</view>
						</view>
					</view>
					<swiper class="pad-all-m" style="pointer-events: auto" scroll-y autoplay vertical circular
					 interval="5000" :display-multiple-items="displayMultipleItems" easing-function="easeInOutCubic">
						<block v-for="(item,index) in dealOrderList" :key="index">
							<swiper-item>
								<view class="uni-flex" :style="{backgroundColor: index%2 == 0 ? '' : '#E0EEEE'}">
									<view class="uni-flex-item uni-center">
										<text>{{item.goodsName}}</text>
									</view>
									<view class="uni-flex-item uni-center">
										<text>{{item.loadingPlace}}</text>
									</view>
									<view class="uni-flex-item uni-center">
										<image mode="aspectFit" src="../../static/images/right_jiantou.png" class="right-jiantou"></image>
									</view>
									<view class="uni-flex-item uni-center ">
										<text>{{item.landingPlace}}</text>
									</view>
									<view class="uni-flex-item uni-center">
										<text>{{item.loadingTime | formatDateMD}}</text>
									</view>
								</view>
							</swiper-item>
						</block>
					</swiper>
				</view>
			</view>

			<!-- 注册认证滚动播报 -->
			<view class="uni-common-mrl30 uni-common-ptb30">
				<view class="uni-bg-white uni-flex" style="border-radius: 100px;padding: 20rpx;">
					<view style="padding-top: 7rpx;margin-right: 10rpx;">
						<image src="../../static/images/horn.png" class="icon40"></image>
					</view>
					<view class="uni-flex-item">
						<swiper style="height: 50rpx" scroll-y autoplay interval="10000" vertical circular>
							<block v-for="item in registerAuthList" :key="item.id">
								<swiper-item>
									<view class="uni-flex uni-justify-sb">
										<text>{{item.name}}</text>
										<text>{{item.state}}成功</text>
									</view>
								</swiper-item>
							</block>
						</swiper>
					</view>
				</view>
			</view>
			
			<!-- 货源推荐 -->
			<view>
				<view class="uni-display-flex uni-justify-sb deal-order uni-common-mtb30">
					<view class="uni-display-flex">
						<view class="title">货源推荐</view>
						<view class="uni-flex-item uni-common-ml20 uni-common-mt5">
							<view class="hor_line_one"></view>
							<view class="hor_line_two"></view>
						</view>
					</view>
					<view class="uni-center-cr">
						<text class="color-999">查看全部货源</text>
						<uni-icons type="forward" color="#999" size="20"></uni-icons>
					</view>
				</view>
				
				<view class="order-title uni-bg-white uni-common-ptb20">
					<view class="uni-flex">
						<block v-for="(item,index) in sourceType" :key="index">
							<view class="uni-flex-item uni-center">
								<text :class="sourceTypeIndex == index ? 'tag-select' : 'tag'" @click="selectSourceType(item)">{{item.name}}</text>
							</view>
						</block>
					</view>
				</view>
				
				<block v-for="item in sourceList">
					<view class="uni-common-mt20">
						<source-item :sourceItem="item"></source-item>
					</view>
				</block>
				
			</view>
			
			

		</view>
	</view>
</template>

<script>

	import { nBannerImg, nShortcut, nArticle, nSourceList, findAllRunningSimpleWaybillInfo, getInfoList, userInfo} from '../../config/api.js'
	
	import {Toast} from '../../common/common.js'
	
	import sourceItemV from "@/components/source/source.vue"

	export default {
		data() {
			return {
				swipers: [],
				articles: [],
				articleId: '',
				shortCut: [{
						shortCutName: "物质商贸",
						iconUrl: "../../static/images/material_deal.png"
					},
					{
						shortCutName: "车辆交易",
						iconUrl: "../../static/images/ship_deal.png"
					}
				],
				tharticleId: '',
				dealOrderList: [],
				displayMultipleItems: 5,
				registerAuthList: [],
				sourceType: [
					{id: 0, name: '运价最高',sort: 2},{id: 1, name: '自动接单',sort: 3},
					{id: 2, name: '批量货源',sort: 4}
				],
				sourceTypeIndex: -1,
				sort: 1,  //1: 根据时间排序(默认); 2: 根据单价排序; 3: 自动接单并根据时间派讯; 4: 批量货源
				sourceList: [],
			}
		},

		filters: {
			//时间处理  
			formatDateMD(data) {
				var date = new Date(data)
				// var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
				// var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
				var M = (date.getMonth() + 1 + '').padStart(2, '0')
				var D = (date.getDate() + '').padStart(2, '0')
				return M + '-' + D
			}
		},
		onLoad() {
			console.log(this.$store.state.login.roleNum)
			this.getBannerImages()
			this.getArticle()
			this.getShortcut()
			this.getAllRunningSimpleWaybillInfo()
			this.getInfoList()
			this.getSouraceList()
			// setTimeout(()=>{
			// 	this.getArticle()
			// },1000)
			// setTimeout(()=>{
			// 	this.getShortcut()
			// },2000)
			// setTimeout(()=>{
			// 	this.getAllRunningSimpleWaybillInfo()
			// },3000)
			// setTimeout(()=>{
			// 	this.getInfoList()
			// },4000)
			// setTimeout(()=>{
			// 	this.getSouraceList()
			// },5000)
		},
		methods: {
			selectSourceType(data){
				this.sourceTypeIndex = data.id
				this.sort = data.sort
				this.getSouraceList()
			},
			//  获取轮播图
			getBannerImages() {
				nBannerImg({
					current: 1,
					size: 10,
					targetTerminal: 5
				}).then(res => {
					if (res.code == 200) {
						this.swipers = res.data.list
					} else {
						Toast({
							title: res.msg
						})
					}
				}).catch(error => {
					console.log(error)
					Toast({
						title: '系统异常, 请稍后再试!'
					})
				})
			},
			//  文章列表(江湖头条)
			getArticle() {
				nArticle({
					current: 1,
					size: 3
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.articles = res.data.list
						if (res.data.list.length > 0) {
							this.tharticleId = res.data.list[0].id
						}
					} else {
						Toast({
							title: res.msg
						})
					}
				}).catch(error => {
					console.log(error)
					Toast({
						title: '系统异常, 请稍后再试!'
					})
				})
			},
			//  获取主菜单的快捷图标
			getShortcut() {
				nShortcut({
					current: 1,
					size: 10,
					targetTerminal: 6
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.shortCut = this.shortCut.concat(res.data.list)
					} else {
						Toast({
							title: res.msg
						})
					}
				}).catch(error => {
					console.log(error)
					Toast({
						title: '系统异常, 请稍后再试!'
					})
				})
			},
			// 获取滚动运单列表
			getAllRunningSimpleWaybillInfo() {
				findAllRunningSimpleWaybillInfo({
					pageNo: 1,
					pageSize: 1000
				}).then(res => {
					if (res.status === 'success') {
						if (res.data.state === '1') {
							this.dealOrderList = res.data.datas
						}
					} else {
						Toast({
							title: res.msg
						})
					}
				}).catch(error => {
					Toast({
						title: '系统异常, 请稍后再试!'
					})
				})
			},
			// 获取新注册/认证货主船东列表
			getInfoList() {
				getInfoList({
					pageSize: 1000
				}).then(res => {
					if (res.status === 'success') {
						let registerAuthList = res.data.infos
						registerAuthList = registerAuthList.filter(item => item.name !== '')
						this.registerAuthList = registerAuthList
					} else {
						Toast({
							title: res.data.info
						})
					}
				}).catch(error => {
					Toast({
						title: '系统异常, 请稍后再试!'
					})
				})
			},
			//  货物货源列表
			  getSouraceList() {
			    nSourceList({
			      pageSize: 10,
			      pageNo: 1,
			      loadCity: '',
			      loadCounty: '',
			      unloadCity: '',
			      unloadCounty: '',
			      merchantCode: '',
			      deadWeightStart: '',
			      deadWeightEnd: '',
			      sort: this.sort
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
			"source-item": sourceItemV
		}
	}
</script>

<style lang="scss">
	.tag {
	  padding: 12rpx 20rpx;
	  color: #797979;
	  background-color: #DEDEDE;
	  border-radius: 8rpx;
	}
	
	.tag-select {
	  padding: 12rpx 20rpx;
	  background-color: #FF8400;
	  color: #FFFFFF;
	  border-radius: 8rpx;
	}
	
	.order-deal-hidden {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.order-title {
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;
	}

	.deal-order {
		.title {
			font-weight: 800;
			color: rgba(40, 40, 40, 1);
			font-size: 36rpx;
		}
	}

	.swiper-wrapper {
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				height: 100%;
				width: 100%;
			}
		}
	}

	.jianghtt-img {
		width: 100%;
		height: 50rpx;
	}

	.hot-img {
		width: 60rpx;
		height: 50rpx;
	}

	.sub-title {
		border-left: #999 solid 2rpx;
	}



	.grid-item-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.image {
		width: 80rpx;
		height: 80rpx;
	}

	.text {
		font-size: 22rpx;
		margin-top: 10rpx;
	}

	.hor_line_one {
		height: 8rpx;
		background: rgba(253, 136, 6, 1);
		border-radius: 4rpx;
		width: 52rpx;
		margin-top: 16rpx;
	}

	.hor_line_two {
		height: 8rpx;
		background: rgba(253, 136, 6, 1);
		border-radius: 4rpx;
		width: 36rpx;
		margin-top: 6rpx;
	}
</style>
