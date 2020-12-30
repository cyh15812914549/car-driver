<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="image-wrapper uni-center-cr">
				<image class="image" mode="widthFix" src="@/static/images/hdd_main_logo.png" />
			</view>

			<view>
				<form @submit="formSubmit">
					<view class="uni-form-item uni-column">
						<view class="title">手机号</view>
						<input class="uni-input" type="number" value="15007532753" maxlength="11" name="phoneNumber" placeholder="请输入手机号码" />
					</view>
					<view class="uni-form-item uni-column">
						<view class="title">密码</view>
						<view class="uni-input-wrapper">
							<input class="uni-input" name="password" value="qwe12345" placeholder="请输入密码" :password="showPassword" />
							<text class="uni-icon" :class="[!showPassword ? 'uni-eye-active' : '']" @click="changePassword">&#xe568;</text>
						</view>
					</view>
					<view class="uni-form-item uni-column" v-show="ifDisplayCanvas">
						<view class="title">验证码</view>
						<view style="display: flex;flex-direction: row;flex-wrap: nowrap;">
							<input class="uni-input" name="verCode" placeholder="请输入验证码" />
							<view class="canvas-img-code uni-common-ml20" @click="refresh()">
								<canvas :style="{width:width+'px',height:height+'px'}" canvas-id="imgcanvas" @error="canvasIdErrorCallback"></canvas>
							</view>
						</view>
					</view>
					<view class="uni-btn-v uni-common-mtb20">
						<button class="global-button" form-type="submit">登录</button>
					</view>
				</form>
			</view>

			<view class="uni-display-flex uni-justify-sb uni-main-color">
				<text @click="register">快速注册</text>
				<text @click="forgetPass">忘记密码</text>
			</view>

			<view class="foot">
				<view class="uni-common-mtb20">跳过登录>></view>
				<view class="uni-center-cr">
					<uniIcons type="weixin" color="#09BB07" size="30"></uniIcons>
					<text>分享给好友</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		checkPhoneNumber,
		checkLoginPassword
	}
	from '../../utils/validate.js'
	
	import { Toast } from '../../common/common.js'
	
	import uniIcons from "@/components/uni-icons/uni-icons.vue"

	import {
		userLogin
	} from '../../config/api.js'

	import md5 from '../../utils/md5.min.js'

	export default {
		data() {
			return {
				showPassword: true,
				phoneNumber: '',
				password: '',
				openid: '',
				ifDisplayCanvas: false,
				width: 120,
				height: 40,
				verCode: '',
			}
		},
		onLoad(options) {
			
		},
		onShow() {
			 // #ifdef MP-WEIXIN
				uni.hideHomeButton()
			// #endif
			
		
		},
		onReady() {
			this.initImgCode()
		},
		methods: {
			// 初始化验证码
			initImgCode() {
				console.log('start');
				var context = uni.createCanvasContext('imgcanvas', this),
					w = this.width,
					h = this.height;
				context.setFillStyle("white");
				context.setLineWidth(5);
				context.fillRect(0, 0, w, h);
				var pool = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S",
						"T", "U", "V", "W", "S", "Y", "Z", "2", "3", "4", "5", "6", "7", "8", "9"
					],
					str = '';
				for (var i = 0; i < 4; i++) {
					var c = pool[this.rn(0, pool.length - 1)];
					var deg = this.rn(-30, 30);
					context.setFontSize(18);
					context.setTextBaseline("top");
					context.setFillStyle(this.rc(80, 150));
					context.save();
					context.translate(30 * i + 15, parseInt(h / 1.5));
					context.rotate(deg * Math.PI / 180);
					context.fillText(c, -15 + 5, -15);
					context.restore();
					str += c;
				}
				uni.setStorage({
					key: 'imgcode',
					data: str,
				});
				for (var i = 0; i < 40; i++) {
					context.beginPath();
					context.arc(this.rn(0, w), this.rn(0, h), 1, 0, 2 * Math.PI);
					context.closePath();
					context.setFillStyle(this.rc(150, 200));
					context.fill();
				}
				context.draw();
				console.log('end');
			},
			rc(min, max) {
				var r = this.rn(min, max);
				var g = this.rn(min, max);
				var b = this.rn(min, max);
				return "rgb(" + r + "," + g + "," + b + ")";
			},
			rn(max, min) {
				return parseInt(Math.random() * (max - min)) + min;
			},
			//刷新
			refresh() {
				this.initImgCode();
			},
			canvasIdErrorCallback(e) {
				console.error(e.detail.errMsg)
			},
			changePassword() {
				this.showPassword = !this.showPassword;
			},
			register() {
				uni.navigateTo({
					url: '/pages/login/register'
				})
			},
			forgetPass() {
				uni.navigateTo({
					url: '/pages/login/forgetPassword'
				})
			},
			//登录
			formSubmit(e) {
				let {
					phoneNumber,
					password,
					verCode
				} = e.detail.value
				this.phoneNumber = phoneNumber
				this.password = password
				this.verCode = verCode
				

				let that = this
				if (that.checkLoginInfo()) {
					userLogin({
							caller: that.phoneNumber,
							password: md5(that.password),
							openid: that.openid
						})
						.then(res => {
							console.log(res)
							if (res.status == 'logined') {
								that.$store.commit('saveLoginData',{
									authState: res.data.authState,
									phoneNumber: that.phoneNumber,
									password: md5(that.password),
									roleNum: res.data.roleNum
								})
							
								uni.setStorageSync('jsessionId', res.data.jsessionId)
								uni.setStorageSync('phoneNumber', that.phoneNumber)
								
								uni.switchTab({
									url: '/pages/source/source'
								})

							} else {
								this.ifDisplayCanvas = true
								this.refresh()
								Toast({
									title: res.data.info
								})
							}

						})
						.catch(error => {
							console.log(error)
							Toast({
								title: '系统异常, 请稍后再试'
							})
						})
				}
			},
			// 检查用户名和密码输入的有效性
			checkLoginInfo() {
				if (checkPhoneNumber(this.phoneNumber)) {
					if (checkLoginPassword(this.password)) {
						if (this.ifDisplayCanvas) {
							if (this.verCode == '' || this.verCode == null) {
								Toast({
									title: '请输入图形验证码'
								})
								return false
							}
							
							if (this.verCode.length == 4 && this.verCode.toLowerCase() != uni.getStorageSync('imgcode').toLowerCase()) {
								Toast({
									title: '验证码不正确'
								});
								return false;
							}
						} else {
							return true
						}
					}else {
						return false
					}
				}else {
					return false
				}
				
				

				if (!this.password) {
					console.log(this.password)
					Toast({
						title: '请输入正确的密码'
					})
					return false
				}
				return true
			},
		},
		components:{
			uniIcons
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

	.image-wrapper {
		height: 240rpx;
	}

	.image {
		height: 200rpx;
		width: 200rpx;
	}

	.uni-icon {
		font-family: uniicons;
		font-size: 24px;
		font-weight: normal;
		font-style: normal;
		width: 24px;
		height: 24px;
		margin-top: 15rpx;
		margin-right: 20rpx;
		line-height: 24px;
		color: #999999;
	}

	.uni-eye-active {
		color: #007AFF;
	}


	.foot {
		position: fixed;
		left: 0;
		bottom: 30rpx;
		width: 750rpx;
		text-align: center;

		view:nth-child(1) {
			color: #444;
		}
	}
	
	.canvas-img-code {
		display: inline-block;
	}
</style>
