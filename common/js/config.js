import { returnDomain } from '../../config/http.js';

export const pagePrefix = () => {
  const DOMAIN = returnDomain();
  switch (DOMAIN) {
    //  开发环境
    case 'http://devminiapp.huoyunjh.cn':
      return 'http://devcar.huoyunjh.cn/index.html#';
      //  测试环境
    case 'http://testtruckminiapp.huoyunjh.cn':
      return 'http://testtruck.huoyunjh.cn/index.html#';
      //  正式环境
    case 'https://truckminiapp.huoyunjh.com':
      return 'https://truck.huoyunjh.com/index.html#';
    default:
      return 'https://truck.huoyunjh.com/index.html#';
  }
}
