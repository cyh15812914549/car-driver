<template>
	<view>
		<view>
			<button @click="logout">退出</button>
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
			logout() {
				uni.reLaunch({
					url: '../login/login'
				})
			},
		}
	}
</script>

<style>

</style>
