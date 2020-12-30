import { WXFetch, returnDomain, otherRequest } from './http.js'

//  传code值获取登录状态
export const loginState = params => WXFetch('/user/getOpenIdReturnState', params).then(res => res.data)

//  注册模块
//  获取注册验证码
export const getCode = params => WXFetch('/phone/getRegistrationCodeForApp', params).then(res => res.data)


//  注册
export const register = params => WXFetch('/phone/registrationForApp', params).then(res => res.data)

//  重置密码验证码
export const getResetPasswordCode = params => WXFetch('/paycode/getResertCode', params).then(res => res.data)

//  重置密码
export const resetPassword = params => WXFetch('/paycode/resertPassword', params).then(res => res.data)

//  检查mmsi是否已经被使用
export const checkMMSI = params => WXFetch('/user/testMMSI', params).then(res => res.data)

//  提交认证身份信息
export const submitAuthInfo = params => WXFetch('/user/submitIdentityInfo', params).then(res => res.data)

//  获取认证信息
export const getAuthInfo = params => WXFetch('/user/getIdentityInfo', params).then(res => res.data)

//  登录接口
export const userLogin = params => WXFetch('/appLogin/login', params).then(res => res.data)

//  货源
//  获取货源大厅列表
export const sourceList = params => WXFetch('/goodsource/getList', params).then(res => res.data)

//  获取待沟通货源列表
export const communicativeList = params => WXFetch('/goodsource/getMineList', params).then(res => res.data)

//  获取货源详情
export const sourceDetail = params => WXFetch('/goodsource/getDetail', params).then(res => res.data)

//  获取货源详情(没有登录的)
export const getnonDetail = params => { return WXFetch('/goodsource/getnonDetail', params).then(res => res.data) };

//  立即接单
export const takeOrder = params => WXFetch('/goodsource/takeOrder', params).then(res => res.data)

//  取消接单(取消货源的接单)
export const cancelOrder = params => WXFetch('/goodsource/cancelOrderReceive', params).then(res => res.data)

//  运单
//  获取运单列表
export const orderList = params => WXFetch('/order/getList', params).then(res => res.data)

//  获取平台交易运单信息列表
export const findAllRunningSimpleWaybillInfo = params => WXFetch('/order/findAllRunningSimpleWaybillInfo.cf', params).then(res => res.data)

//  获取运单详情
export const orderDetail = params => WXFetch('/order/getDetail', params).then(res => res.data)

//  获取运单日志
export const orderLog = params => WXFetch('/order/getLogs', params).then(res => res.data)

//  确认修改未卸货运单的费用
export const confirmFreight = params => WXFetch('/order/changeFreigtOrPrice', params).then(res => res.data)

//  取消运单(取消运单的接单)
export const cancelTheOrder = params => WXFetch('/order/cancel', params).then(res => res.data)

//  上传图片
export const uploadFile = () => (returnDomain() + '/image/submitImage')

//  上传装卸货地址经纬度信息
export const uploadLatLgn = params => WXFetch('/order/uploadAddress', params).then(res => res.data)

//  装货签到
export const signLoad = params => WXFetch('/order/signInLoading', params).then(res => res.data)

//  卸货签到
export const signUnload = params => WXFetch('/order/signInUnloading', params).then(res => res.data)

//  保单详情
export const insuraceDetail = params => WXFetch('/insuranceinfo/getInsuranceinfo.cf', params).then(res => res.data)

//  获取预付款验证码
export const prepayCode = params => WXFetch('/wallet/getCancelOrderCode', params).then(res => res.data)

//  校验预付款验证
export const checkPrepayCode = params => WXFetch('/wallet/checkCancelOrderCode', params).then(res => res.data)

//  上传运单附件
export const uploadOrderFiles = params => WXFetch('/order/updateOrderFile', params).then(res => res.data)

//  个人中心
//  获取个人信息接口
export const userInfo = params => WXFetch('/user/getUserInfo', params).then(res => res.data)

//  更换头像
export const changeAvatar = params => WXFetch('/user/uploadImgUrl', params).then(res => res.data)

//  意见反馈
export const feedback = params => WXFetch('/phone/uploadFeedBack.cf', params).then(res => res.data)

//  获取未读消息的数量
export const notReadMsg = params => WXFetch('/info/getUnlookedCount.cf', params, false).then(res => res.data)

//  获取消息列表
export const msgList = params => WXFetch('/info/getInfoList.cf', params).then(res => res.data)

//  将当前用户的所有消息标为已读或未读
export const markAllMsgHadRead = params => WXFetch('/info/updateLookedAll.cf', params).then(res => res.data)

//  批量标为已读或未读
export const markSomeMsgHadRead = params => WXFetch('/info/updateLookedById.cf', params).then(res => res.data)

//  批量删除消息
export const deleteSomeMsg = params => WXFetch('/info/deleteByIds.cf', params).then(res => res.data)

//  消息详情
export const msgDetail = params => WXFetch('/info/getDetailById.cf', params).then(res => res.data)

//  车队长模式下的接口
//  车辆管理类接口
//  待分配的货源列表
export const sWaitDispatchList = params => WXFetch('/goodsource/collectedSourceList', params).then(res => res.data)

//  分配历史列表
export const sHistoryDispatchList = params => WXFetch('/goodsource/distributeSourceList', params).then(res => res.data)

//  分配历史货源详情
export const sDispatchHistoryDeital = params => WXFetch('/goodsource/distributeDetail', params).then(res => res.data)

//  收藏货源
export const sCollectSource = params => WXFetch('/goodsource/collectSource', params).then(res => res.data)

//  取消收藏货源
export const sCancelCollet = params => WXFetch('/goodsource/unCollectSource', params).then(res => res.data)

//  邀请挂号车辆
export const sInviteCar = params => WXFetch('/carlink/inviteCarLinkInfo', params).then(res => res.data)

//  挂号车辆详情
export const sCarInfos = params => WXFetch('/carlink/getCarLinkInfoById', params).then(res => res.data)

//  删除旗下的挂靠车辆关系
export const sRemoveCarRelation = params => WXFetch('/carlink/deleteDriverCarLink', params).then(res => res.data)

//  新增挂号车辆并邀请
export const sAddAndInvite = params => WXFetch('/carlink/insertCarLinkInfo', params).then(res => res.data)

//  检验mmsi是否被现有挂号车辆使用
export const sCheckCarNo = params => WXFetch('/carlink/testCarNoForCarLink', params).then(res => res.data)

//  车队长挂靠车
export const sLinkCarList = params => WXFetch('/carlink/getCarLinkList', params).then(res => res.data)

//  根据挂号车辆id获取挂号车辆详情
export const sLinkCarDetail = params => WXFetch('/carlink/getCarLinkDetail', params).then(res => res.data)

//  身份信息管理类接口
//  申请绑定身份信息
export const sSwitchIdInfos = params => WXFetch('/driveridentity/changeIdentityInfo', params).then(res => res.data)

//  修改信息
export const sUpdateIdInfos = params => WXFetch('/driveridentity/updateIdentityInfo', params).then(res => res.data)

//  删除身份信息
export const sDeleteIdInfos = params => WXFetch('/driveridentity/deleteDriverIdentity', params).then(res => res.data)

//  新增身份信息
export const sAddIdInfos = params => WXFetch('/driveridentity/insertDriverIdentity', params).then(res => res.data)

//  车队长身份信息列表
export const sIdInfosList = params => WXFetch('/driveridentity/getDriverIdentityList', params).then(res => res.data)

//  身份信息详情
export const sIdInfos = params => WXFetch('/driveridentity/getDriverIdentityDetail', params).then(res => res.data)

//  轮播图
export const nBannerImg = params => WXFetch('/huoduoduo/banner', params, true, 'GET', 2).then(res => res.data)

//  首页快捷方式
export const nShortcut = params => WXFetch('/huoduoduo/shortcutcfg/find', params, true, 'GET', 2).then(res => res.data)

//  文章列表获取
export const nArticle = params => WXFetch('/huoduoduo/article', params, true, 'GET', 2).then(res => res.data)

//  货源列表
export const nSourceList = params => WXFetch('/goodsource/getList', params, true, 'GET').then(res => res.data)

//  钱包
//  获取提现验证码
export const withdrawCode = params => WXFetch('/wallet/getPutForwardCode', params).then(res => res.data)

//  校验提现验证码
export const checkWithdrawCode = params => WXFetch('/wallet/checkPutForwardCode', params).then(res => res.data)

//  确认提现
export const withdraw = params => WXFetch('/wallet/withdraw', params).then(res => res.data)

//  获取交易记录
export const tradeRecords = params => WXFetch('/wallet/getTransRecords', params).then(res => res.data)

//  获取支付密码验证码
export const getPayCode = params => WXFetch('/paycode/getVerifyCode', params).then(res => res.data)

//  验证支付密码验证码
export const checkPayCode = params => WXFetch('/paycode/checkSmsCode', params).then(res => res.data)

//  验证支付密码
export const checkPwdCode = params => WXFetch('/paycode/checkPayCode', params).then(res => res.data)

//  验证身份信息
export const checkUserInfo = params => WXFetch('/paycode/checkIdCard', params).then(res => res.data)

//  设置支付密码
export const setPaycode = params => WXFetch('/paycode/setPayCode', params).then(res => res.data)

//  获取银行卡列表
export const bankCardList = params => WXFetch('/user/getBankCards', params).then(res => res.data)

//  添加银行卡
export const addNewCard = params => WXFetch('/user/bindingBankCard', params).then(res => res.data)

//  校验银行卡号是否有效
export const validateCard = params => WXFetch('/user/validateAndCacheCardInfo.cf', params).then(res => res.data)
// export const validateCard = params => otherRequest('https://ccdcapi.alipay.com/validateAndCacheCardInfo.json', params, 'GET').then(res => res.data)

//  删除绑定的银行卡
export const removeCard = params => WXFetch('/user/delBankCard', params).then(res => res.data)

//改版相关接口
//物质交易列表
export const materialDealList = params => WXFetch('/tradeingmaterial/findTradeingMaterialPage.cf', params).then(res => res.data)

//发布物质交易
export const releaseMaterialDeal = params => WXFetch('/tradeingmaterial/savePushTradeingMaterial.cf', params).then(res => res.data)

//公共数据字典(码表)
export const getPubDictsByParentCode = params => WXFetch('/pubdict/getPubDictsByParentCode.cf', params).then(res => res.data)

//物质交易详情
export const materialDealDetail= params => WXFetch('/tradeingmaterial/getTradeingMaterialDetail.cf', params).then(res => res.data)

//车辆交易详情
export const carDealDetail= params => WXFetch('/tradeingcar/getTradeingCarDetail.cf', params).then(res => res.data)

//车东货主投诉建议
export const savePubComplainInfo= params => WXFetch('/pubcomplaininfo/savePubComplainInfo.cf', params).then(res => res.data)

//物质交易停止发布
export const stopRelease = params => WXFetch('/tradeingmaterial/stop.cf', params).then(res => res.data)

//车辆交易停止发布
export const stopcarDealRelease = params => WXFetch('/tradeingcar/stop.cf', params).then(res => res.data)

//获取新注册/认证货主车主列表
export const getInfoList= params => WXFetch('/info/getRegisterAndCertifiedInfo.cf', params).then(res => res.data)

//车辆交易列表
export const carDealList = params => WXFetch('/tradeingcar/findTradeingCarPage.cf', params).then(res => res.data)

//发布车辆交易
export const releaseCarDeal = params => WXFetch('/tradeingcar/savePushTradeingCar.cf', params).then(res => res.data)

//查询当前用户所有现金子账户
export const getAllSubAccountInfos = params => WXFetch('/user/getAllSubAccountInfos', params,'GET').then(res => res.data)

//崩溃记录
export const saveCrashReport = params => WXFetch('/api/public-data/crashReport/saveCrashReport', params, true, 'POST', 3).then(res => res.data)

//获取注销验证码获取
export const getUpdateIsAbleCode = params => WXFetch('/user/getUpdateIsAbleCode', params).then(res => res.data)

//验证注销验证码
export const checkUpdateIsAbleCode = params => WXFetch('/user/checkUpdateIsAbleCode', params).then(res => res.data)

//注销
export const updateIsAble = params => WXFetch('/user/updateIsAble', params).then(res => res.data)

//运单评价详情
export const waybillCommentDetail = params => WXFetch('/api/quality-data/waybillcomment/detail', params,'GET').then(res => res.data)

//发布空车期
export const updateCarFreeTime = params => WXFetch('/user/updateCarFreeTime', params).then(res => res.data)

//获取空车期车辆列表
export const getCarListByDriverId = params => WXFetch('/user/getCarListByDriverId', params).then(res => res.data)

//获取空车期车辆列表  人车分离模式的
export const getCarFreeTimeList = params => WXFetch('/user/getCarFreeTimeList', params).then(res => res.data)

//删除空车期车辆
export const deleteCarFreeTime = params => WXFetch('/user/deleteCarFreeTime', params).then(res => res.data)

//一键找货
export const getSourceByDriverId = params => WXFetch('/goodsource/getSourceByDriverId', params).then(res => res.data)

//用户综合评价详情
export const userCommentGrade = params => WXFetch('/api/quality-data/waybillcomment/userCommentGrade', params,true, 'POST', 3).then(res => res.data)

//人车分离接口
//获取司机关联车辆列表
export const getLinkList = params => WXFetch('/user/getLinkList', params).then(res => res.data)

//上传车辆信息
export const submitCarInfo = params => WXFetch('/user/submitCarInfo', params).then(res => res.data)

//上传身份信息
export const submitAuthInfos = params => WXFetch('/user/submitAuthInfo', params).then(res => res.data)

//司机切换绑定车辆信息
export const switchCar = params => WXFetch('/user/switchCar', params).then(res => res.data)

//修改绑定申请（待审核/驳回）
export const editCarInfo = params => WXFetch('/user/editCarInfo', params).then(res => res.data)

//资料补充（从业资格证）
export const driverSupplement = params => WXFetch('/user/driverSupplement', params).then(res => res.data)

//资料补充（车辆资料补充）
export const carSupplement = params => WXFetch('/user/carSupplement', params).then(res => res.data)

//删除与代理人关系
export const delAgent = params => WXFetch('/agent/delAgent', params).then(res => res.data)

//车代理申请审核
export const driverAudit = params => WXFetch('/agent/driverAudit', params).then(res => res.data)

//获取司机旗下的代理人列表
export const getAgentList = params => WXFetch('/agent/getAgentList', params).then(res => res.data)

//删除与旗下代理司机的关系
export const delAgentDriver = params => WXFetch('/agent/delAgentDriver', params).then(res => res.data)

//代理司机申请
export const inviteCarLinkInfo = params => WXFetch('/agent/inviteAgentDriver', params).then(res => res.data)

//代理司机辆
export const getDriverCarList = params => WXFetch('/agent/getDriverCarList', params).then(res => res.data)

//获取代理人旗下的车辆
export const getAgentDrive = params => WXFetch('/agentdriverlink/getAgentDrive', params).then(res => res.data)


//获取代理人旗下的车辆信息
export const getCarInfo = params => WXFetch('/agent/getCarDetail', params).then(res => res.data)

//变更分配运价
export const changeDistributePrice = params => WXFetch('/order/changeDistributePrice', params).then(res => res.data)

//确认变更分配运价（司机）
export const confirmChangeDistributePrice = params => WXFetch('/order/confirmChangeDistributePrice', params).then(res => res.data)

// 运单详情车辆信息
export const getCarLinkDetail = params => WXFetch('/carlink/getCarLinkDetail', params).then(res => res.data)

//根据货源id获取当前司机接单状态
export const checkWaybillStatus = params => WXFetch('/goodsource/checkWaybillStatus', params).then(res => res.data)
