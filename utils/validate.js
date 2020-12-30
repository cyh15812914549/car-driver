import { Toast } from '../common/common.js'
//  检查手机号码的有效性
export const checkPhoneNumber = (phoneNumber) => {
  const regPhoneNumber = /^(1(3|4|5|6|7|8|9))\d{9}$/g
  if (!phoneNumber || !regPhoneNumber.test(phoneNumber)) {
    Toast({
      title: '请输入有效的手机号码'
    })
    return false
  }
  return true
}
//  检查验证码
export const checkCode = (code, codeLength) => {
  if (!code || code.length != codeLength) {
    Toast({
      title: '请输入' + codeLength + '位数的验证码'
    })
    return false
  }
  return true
}

//  检查登录密码
export const checkLoginPassword = password => {
  const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/g
  if (!password || !regPassword.test(password)) {
    Toast({
      title: '请输入6到20位数字加字母组合的密码'
    })
    return false
  }
  return true
}

//  检查密码规则
export const checkPassword = (password) => {
  const regPassword = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/g
  if (!password || !regPassword.test(password)) {
    Toast({
      title: '请输入8到20位数字加字母组合的密码'
    })
    return false
  }
  return true
}

//  检查是否为有效的数字(最多只能有2位小数)
export const checkNumber = (number, content = '请输入有效的数值') => {
  const regNumber = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/g
  if (!number || !regNumber.test(number)) {
    Toast({
      title: content
    })
    return false
  }
  return true
}

//  不能超过两位小数
export const checkDecimal = (pos, digit) => {
  if (pos > 0 && digit > 2) {
    Toast({
      title: '小数点后的位数不能超过两位',
    });
    return false;
  };
  return true;
}

//  检查身份证号码
export const checkIdCard = (idCardNo) => {
  const regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  if (!idCardNo || !regIdCard.test(idCardNo)) {
    Toast({
      title: '请输入正确的身份证号码'
    })
    return false
  }
  return true
}

//  检查邀请码
export const checkInviteCode = (inviteCode) => {
  const regInviteCode = /^([a-zA-Z0-9]{6})$/g
  if (!regInviteCode.test(inviteCode)) {
    Toast({
      title: '请输入6位纯数字，字母或数字和字母的组合的邀请码'
    })
    return false
  }
  return true
}

//  检查车牌号
export const checkCarNumber = (carNumber) => {
  const regCarNumber = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领]{1}[A-Z]{1}[A-Z0-9]{5,6}$/g
  if (!regCarNumber.test(carNumber)) {
    Toast({
      title: '请输入正确的车牌号'
    })
    return false
  }
  return true
}
