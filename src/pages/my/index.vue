<template>
    <div v-show="show2">

      <div v-show="show"  class="login">
        <div class="islogin">您还没有登录，是否登录？</div>
        <button @click="handleClick">
          授权登录
        </button>
      </div>

      <div class="contenter-big" v-show="!show">

        <div class="contenter" >

          <div  class="content">

            <div>
              <open-data type="userAvatarUrl" class="open-data-class"></open-data>
            </div>
            <div class="content-ri">
              <div class="username">
                <open-data type="userNickName"></open-data>
              </div>
              <div>
                这家伙很懒，什么都没有留下
              </div>
            </div>

          </div>

          <div class="content-bottom">

            <div class="con-boc" @click="handleCollect">
              <div class="num">{{data}}</div>
              <div >收藏</div>
            </div>

            <div class="con-boc">
              <div class="num">0</div>
              <div>关注</div>
            </div>

            <div class="con-boc">
              <div class="num">0</div>
              <div>粉丝</div>
            </div>

          </div>
        </div>

        <div class="conten-bo">
          <div>
            <div class="content-img" @click="handleScan">
              <img src="../../../static/icon/saoyisao.png" alt="">
            </div>
            <div class="font">
              扫一扫
            </div>
          </div>

          <div>
            <div class="content-img">
              <img src="../../../static/icon/wendang.png" alt="">
            </div>
            <div class="font">
              文档中心
            </div>
          </div>

          <div>
            <div class="content-img">
              <img src="../../../static/icon/qianbao.png" alt="">
            </div>
            <div class="font">
              钱包
            </div>
          </div>

          <div>
            <div class="content-img">
              <img src="../../../static/icon/dingdan.png" alt="">
            </div>
            <div class="font">
              我的订单
            </div>
          </div>

          <div>
            <div class="content-img">
              <img src="../../../static/icon/fankui.png" alt="">
            </div>
            <div class="font">
              反馈建议
            </div>
          </div>

        </div>
      </div>

    </div>
</template>



<script>
  import {login} from '../../utils/net.js';
  export default {
    name: "index",
    data() {
      return {
        show: true,
        data: '',
        item: {},
        show2:false
      }
    },
    methods: {
      getData() {
        this.$net.get('/collection').then(res => {
          console.log(res);
          if (res.data.length >= 0){
            this.data = res.data.length
            this.show = false
          }else {
            this.show = true
          }
        })
      },
      handleCollect() {
        const data = this.getData()
        console.log(data);
        wx.navigateTo({
          url: '/pages/collection/main'
        })
      },
      handleScan(){
        wx.scanCode({
          success: (res) => {
            wx.navigateTo({
              url: `/pages/scodcont/main?content=${res.result}`
            })
            console.log(res)

          }
        })
      },
      handleClick() {
        login()
      },
    },
    onShow(){
      this.getData()
      console.log(this.show);
      this.show2 = true

    },
    // onLoad() {
    //   const that = this
    //   // 查看是否授权
    //   wx.getSetting({
    //     success: function(res) {
    //       that.show = false
    //       console.log(that.show);
    //       // if (res.authSetting['scope.userInfo']) {
    //
    //         // 已经授权，可以直接调用getUserInfo 获取头像昵称
    //         // wx.getUserInfo({
    //         //   success: function(res) {
    //         //     console.log(res.userInfo)
    //         //     that.item = res.userInfo
    //         //
    //         //   }
    //         // })
    //       // }
    //     },
    //   })
    //   this.getData()
    //   console.log(this.show);
    // },
  }
</script>

<style scoped>
  .contenter{
    padding: 20rpx;
    background-color: #1982D3;
  }
  .content{
    display: flex;
    margin-bottom: 50rpx;
  }
  .open-data-class{
    width: 130rpx;
    height: 130rpx;
    display: flex;
    text-align: center;
    overflow: hidden;
    border-radius: 50%;
  }
  .open-data-class img{
    width: 130rpx;
    height: 130rpx;
  }
  .content-ri{
    font-size: 12px;
    color: white;
    margin-left: 20rpx;
  }
  .username{
    font-size: 16px;
    font-weight: 700;
    line-height: 100rpx;
  }
  .content-bottom{
    color: white;
    display: flex;
    justify-content: space-around;
  }
  .con-boc{
    text-align: center;
    font-size: 12px;
  }
  .num{
    font-size: 16px;
    font-weight: 700;
  }
  .conten-bo{
    display: flex;
    justify-content: space-around;
    color: #8C8C8C;
    font-size: 12px;
    text-align: center;
    margin-top: 40rpx;
  }
  .content-img{
    width: 40rpx;
    height: 40rpx;
    margin: 0 auto;
  }
  .content-img img{
    width: 40rpx;
    height: 40rpx;
  }
  .font{
    line-height: 75rpx;
  }
  .login{
    position: fixed;
    top: 40%;
    left: 30%;
  }
  .islogin{
    color: #333;
    font-size: 14px;
    text-align: center;
    margin-bottom: 60rpx;
  }
  .login button{
    width: 300rpx;
    height:90rpx;
    font-size: 40rpx;
    line-height: 90rpx;
    background-color: #E9E9E9;
    border:none;
    color: #8C8C8C;
    border-radius: 8px;
  }
  button::after {
    border: none;
  }
</style>
