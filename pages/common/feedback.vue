<template>
	<view>
		<view class="uni-flex uni-justify-sa uni-common-ptb20 uni-bg-white">
			<label class="radio">
				<radio value="r1" color="#FF8400" checked="true" />投诉
			</label>
			<label class="radio">
				<radio color="#FF8400" value="r2" />建议
			</label>
		</view>
		
		<view class="uni-form-item uni-column uni-common-mtb20">
			<view class="uni-list">
				<view class="uni-list-cell uni-list-cell-pd">
					<view>
						<text>联系人</text>
					</view>
		            <view>
		            	<input placeholder="请输入联系人" />
		            </view>
				</view>
				<view class="uni-list-cell uni-list-cell-pd">
					<view>
						<text>联系电话</text>
					</view>
				    <view>
				    	<input placeholder="请输入联系电话" />
				    </view>
				</view>
			</view>
		</view>
		
		<view class="uni-textarea">
		    <textarea placeholder="请输入问题或建议, 我们将不断为您改进"/>
		</view>
		
		<view class="bottom-b">
			<button class="border-radius100 uni-bg-main-color">确认提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad(){
		},
		methods:{
			
		},
		
	}
</script>

<style>

</style>
