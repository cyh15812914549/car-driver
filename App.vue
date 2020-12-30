<script>
	export default {
		onLaunch: function() {
			// 自定义statusBar,customBar
			uni.getSystemInfo({
				success: (e) => {
					
					let totalTopHeight = uni.getSystemInfoSync().statusBarHeight + 44
					
					this.$store.commit('getCustomHeight', {
						totalTopHeight
					})
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/uni.css";
	@import "./common/common.css";
	@import "./common/css/iconfont.css"; 

	page {
		background-color: #F4F5F6;
		/* height: 100%; */
		font-size: 28rpx;
		margin-bottom: 50rpx;
	}

	uni-checkbox .uni-checkbox-input {
		border-radius: 50%;
	}

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		border: 1rpx solid rgb(253, 103, 3);
		background-color: rgb(253, 103, 3);
	}

	uni-checkbox .uni-checkbox-wrapper {
		width: 100%;
	}

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
		color: #FFFFFF;
	}

	uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
		border-color: transparent;
	}
</style>
