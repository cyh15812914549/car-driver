<template>
	<view>
		<view>
			<view class="uni-padding-wrap uni-common-mt">
				<form @submit="formSubmit">
					<view class="uni-form-item uni-column">
						<view class="title">手机号</view>
						<input class="uni-input" name="phoneNumber" placeholder="请输入手机号码"/>
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">验证码</view>
						<view class="uni-input-wrapper">
						    <input class="uni-input" name="code" placeholder="请输入验证码"/>
						    <view class="click-code">
								<text>获取验证码</text>
							</view>
						</view>
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">密码</view>
						<input class="uni-input" name="password" placeholder="请输入密码"/>
					</view>
					
					<view class="uni-btn-v uni-common-mtb30">
						<button class="global-button" form-type="submit">提交</button>
					</view>
				</form>
			</view>
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

<style lang="scss">
	.uni-input-wrapper {
	    /* #ifndef APP-NVUE */
	    display: flex;
	    /* #endif */
	    /* padding: 8px 13px; */
	    flex-direction: row;
	    flex-wrap: nowrap;
	    background-color: #FFFFFF;
	}
	
	.click-code{
		height: 50rpx;
		padding: 15rpx 25rpx;
		line-height:50rpx;
		font-size:28rpx;
		text{
			border-left: #999 solid 4rpx;
			padding-left: 15rpx;
			color: $uni-text-main-color;
		}
	}
</style>
