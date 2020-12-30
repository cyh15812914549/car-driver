<template>
	<view>
		<web-view :src="webSrc"></web-view>
	</view>
</template>

<script>
	
	import { pagePrefix } from '../../common/js/config.js'
	
	export default {
		data() {
			return {
				webSrc: ''
			}
		},
		onLoad: function(options) {
			const PAGEDOMAIN = pagePrefix()
			var webSrc
			if (options.contract) {
				if (options.isMonthly == '1') {
					webSrc = `${PAGEDOMAIN}/order/m-contract/${options.contract}`
				} else {
					webSrc = `${PAGEDOMAIN}/order/contract/${options.contract}`
				}
			} else if (options.switchUser) {
				webSrc = `${PAGEDOMAIN}/order/s-contract/${options.switchUser}`
			} else if (options.track) {
				webSrc = `${PAGEDOMAIN}/car/carmap/${options.track}`
			} else if (options.ratingmer) {
				webSrc = `${PAGEDOMAIN}/order/ratingmer/${options.ratingmer}`
			} else if (options.userprotocol) {
				webSrc = `${PAGEDOMAIN}/userprotocol`
			} else if (options.deregulation) {
				webSrc = `${PAGEDOMAIN}/deregulation`
			} else if (options.walletprotocol) {
				webSrc = `${PAGEDOMAIN}/walletprotocol`
			} else if (options.mmsi) {
				webSrc = `${PAGEDOMAIN}/car/locate/${options.mmsi}`
			} else if (options.newsTargetUrl) {
				webSrc = options.newsTargetUrl
			} else if (options.articeDetail) {
				webSrc = `${PAGEDOMAIN}/infos/article/detail/${options.articeDetail}`
			} else if (options.redirectTo) {
				webSrc = options.redirectTo
			} else if (options.detailTable) {
				webSrc = `${PAGEDOMAIN}/order/o-detail/${options.orderId}`
			} else if (options.GContract) {
				webSrc = `${PAGEDOMAIN}/order/GContract/${options.GContract}`
			} else if (options.GSContract) {
				webSrc = `${PAGEDOMAIN}/order/GSContract/${options.GSContract}`
			} else if (options.carLockDZXX) {
				webSrc = `${PAGEDOMAIN}/infos/${options.carLockDZXX}`
			} else if (options.threeAgree) {
				webSrc = `${PAGEDOMAIN}/order/ThirdAgreement/${options.threeAgree}`
			} else if (options.carLockLXDH) {
				webSrc = `${PAGEDOMAIN}/infos/${options.carLockLXDH}`
			} else if (options.agentDriverId && options.driverId) {
				webSrc = `${PAGEDOMAIN}/order/AgentShipownerContract/${options.agentDriverId}/${options.driverId}`
			} else if (options.AgentCarriergContract) {
				webSrc = `${PAGEDOMAIN}/order/AgentCarriergContract/${options.AgentCarriergContract}`
			} else if (options.sScaptaincontract) {
				webSrc = `${PAGEDOMAIN}/order/s-scaptaincontract/${options.sScaptaincontract}`
			} else if (options.sContract) {
				webSrc = `${PAGEDOMAIN}/order/s-contract/${options.sContract}`
			}
			this.webSrc = webSrc
			console.log(this.webSrc)
		},
		methods: {

		}
	}
</script>

<style>

</style>
