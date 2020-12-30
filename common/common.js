
const app = getApp()
// toast提示
export const Toast = (data) => {
  uni.showToast({
    title: data.title || '提示',
    icon: data.icon || 'none',
    duration: data.duration || 1500,
    mask: true
  })
}

// 
export const getTotalPage = (total,pageSize) => {
  let TotalPage = (Number(total) % pageSize) == 0 ? Number(total) / pageSize
      : Math.floor(Number(total) / pageSize) + 1
  return TotalPage
}

// 延迟2s后返回上一页
export const goBack = () => {
  setTimeout(() => {
    uni.navigateBack({
      delta: 1
    })
  }, 2000)
}


//  showModal提示
export const WXShowModal1 = (data, cb, cb1) => {
  uni.showModal({
    title: data.title || '提示!',
    content: data.content,
    cancelText: data.cancelText || '取消',
    cancelColor: app.globalData.mainColor,
    confirmColor: app.globalData.mainColor,
    confirmText: data.confirmText || '确定',
    success(res) {
      if (res.confirm) {
        if (typeof (cb) == 'function') {
          cb()
        }
      } else {
        if (typeof (cb1) == 'function') {
          cb1()
        }
      }
    }
  })
}

//  设置scroll-view的高度; otherHeight 为需要减去的高度,单位为 rpx
export const setTheViewHeight = (otherHeight) => {
  let res = uni.getSystemInfoSync()
  let screenHeight = 750 * (res.windowHeight / res.windowWidth) - otherHeight
  return screenHeight + 'rpx'
}

//拨打电话
export const makePhoneCall = (phoneNum) => {
  uni.makePhoneCall({
      phoneNumber: phoneNum
  });
}



