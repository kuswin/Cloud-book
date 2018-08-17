import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch';
import {net} from '@/utils/net';

Vue.prototype.$net = net
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(MpvueRouterPatch)

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main','pages/books/main','pages/catalogue/main','pages/article/main','pages/classify/main','pages/bookrack/main','pages/my/main','pages/collection/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      color: "#bfbfbf",
      selectedColor: "#010101",
      backgroundColor: "#ffffff",
      borderStyle: "white",
      list: [{
        pagePath: "pages/index/main",
        iconPath : "/static/icon/shouyen.png",
        selectedIconPath: '/static/icon/shouyeac.png',
        text: "首页",
      },
        {
          pagePath: "pages/classify/main",
          iconPath : "/static/icon/fenlein.png",
          selectedIconPath: '/static/icon/fenleiac.png',
          text: "分类",
        },
        {
          pagePath: "pages/bookrack/main",
          iconPath : "/static/icon/shujin.png",
          selectedIconPath: '/static/icon/shujiac.png',
          text: "书架",
        },
        {
          pagePath: "pages/my/main",
          iconPath : "/static/icon/woden.png",
          selectedIconPath: '/static/icon/wodeac.png',
          text: "我的",
        }
      ]
    }

  }
}
