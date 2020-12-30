
 const Domain = 'http://testtruckminiapp.huoyunjh.cn'; //  车测试环境
 const hddDomain = 'http://news.huoyunjh.com'; //  消息模块的域名(测试环境)
 const crashDomain = 'http://testtruck.huoyunjh.cn'; //  软件崩溃根域名(测试环境)

// const Domain = 'https://truckminiapp.huoyunjh.com';    //  ☆☆☆小程序的(正式环境)☆☆☆
// const hddDomain = 'https://www.huoyunjh.com'; //  消息模块的域名(☆☆☆正式环境☆☆☆)
// const crashDomain = 'https://truck.huoyunjh.com'; //  软件崩溃根域名(☆☆☆正式环境☆☆☆)

export const WXFetch = (url, params, isShowLoading = true , method = 'POST' , type = 1) => {
  let preUrl = Domain
  if (type == 2) {
    preUrl = hddDomain
  }
  if (type == 3) {
    preUrl = crashDomain
  }
  if (isShowLoading) {
    uni.showLoading({
      title: '加载中'
    })
  }
  return new Promise((resolve, reject) => {
    uni.request({
      url: preUrl + url,
      data: params,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'JSESSIONID=' + uni.getStorageSync('jsessionId')
      },
      success: resolve,
      fail: reject,
      complete: function () {
        if (isShowLoading) {
          uni.hideLoading()
        }
      }
    })
  })
}

export const otherRequest = (url, params, method = 'POST') => {
  uni.showLoading({
    title: '加载中'
  })
  return new Promise((resolve, reject) => {
    uni.request({
      url: url,
      data: params,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': 'JSESSIONID=' + uni.getStorageSync('jsessionId')
      },
      success: resolve,
      fail: reject,
      complete: function () {
        uni.hideLoading()
      }
    })
  })
}

export const returnDomain = () => {
  return Domain
}