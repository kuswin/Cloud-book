<template>
  <div>
  <div class="img" v-show="show2" >
    <img src="/static/Double%20Ring-1s-200px.svg" alt="" style="width: 100rpx;height: 100rpx;">
  </div>
<div class="book-In">

  <div class="bo-header">

    <div class="bo-head">
      <div class="bo-img">
        <img :src="bookdata.img" alt="">
      </div>
      <div class="bo-head-ri">
        <div class="title">
          {{bookdata.title}}
        </div>
        <div class="author">
          <span>作者：</span><span>{{bookdata.author}}</span>
        </div>

        <div class="view-number">
          <span>{{bookdata.looknums}}</span><sapn>人在看</sapn>
        </div>

        <div class="like-number">
          <span>{{bookdata.like_this_users}}</span><span>人喜欢</span>
        </div>
      </div>
    </div>

    <div class="bo-middle">
      <button v-if="show">已收藏</button>
      <button @click="handleCollect" v-else="show">加入收藏</button>
      <button open-type="share">分享好友</button>
    </div>

  </div>

  <div class="books-middle">
    <div class="b-mIntroduction">
      简介
    </div>

    <div class="b-mIcontent">
      {{bookdata.desc}}
    </div>

    <div class="C-directory">

      <a :href="'/pages/catalogue/main?id='+ bookdata._id">
      <span class="cd-title">查看目录</span>

      <span>共</span><span>62</span><span>章</span>
      <div class="C-diri">
        <span>更新于</span><span>{{bookdata.startsnums}}</span><span>天</span><span>前</span><span>></span>
      </div>
      </a>
    </div>

  </div>

  <div class="books-tab">
    <a :href="'/pages/catalogue/main?id='+ bookdata._id">阅读该书籍</a>
  </div>

</div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        bookId:'',
        bookdata:{},
        show2:true,
        show:false
      }
    },
    methods:{
      getData(){
        this.bookdata = {},
        this.$net.get(`/book/${this.bookId}`).then(res => {
          console.log(res);
          if(res.isCollect == 1){
            this.show = true
          }else {
            this.show = false
          }
          this.bookdata = res.data
          this.show2 = false
        })
      },
      handleCollect(){
        console.log(this.bookId);
        this.$net.post('/collection',{bookId:this.bookId}).then(res => {
          console.log(res)
          if(res.code == 200){
            this.show = true
            wx.showToast({title:'收藏成功'})
          }else if (res.code == 400) {
            wx.showToast({title:'不能重复收藏'})
          }else {
            wx.showToast({title:'收藏失败'})
          }
        })
      },
    },
    onLoad (options) {
      console.log(options.id)
      this.bookId = options.id
      this.getData()
      // this.handleCollect()
  },
    }
</script>

<style>
  .img{
    position: fixed;
    top: 40%;
    left: 0;
    right: 0;
    width: 150rpx;
    height: 150rpx;
    margin: 0 auto;
  }
  .bo-head {
    display: flex;
    padding: 0 20 rpx;
  }

  .bo-head img {
    width: 236rpx;
    height: 250rpx;
  }

  .bo-img {
    flex: 2;
    height: 125px;
    overflow: hidden;
    padding-left: 10px;
  }

  .bo-head-ri {
    flex: 4;
    overflow: hidden;
    margin-left: 15px;
  }

  .bo-head-ri .title {
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    width: 230px;
    margin-top: 15px;
  }

  .bo-head-ri .author {
    color: #8C8C8C;
    margin-top: 15px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bo-head-ri .view-number {
    color: #8C8C8C;
    margin-top: 15px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bo-head-ri .like-number {
    color: #8C8C8C;
    margin-top: 15px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .bo-middle {
    padding: 20px 5px;
    font-size: 12px;
    color: #5F5F5F;
    display: flex;
    border: none;
  }

  .bo-middle button {
    flex: 1;
    background-color: #E9E9E9;
    margin-left: 15px;
    border:none;
    color: #8C8C8C;
    font-size: 12px;
    border-radius: 8px;
    width: 105px;
    height: 30px;
  }
  .bo-middle button::after {
    border: none;
  }

  .books-middle {
    background-color: #F0F0F0;
    padding-top: 10px;
  }

  .b-mIntroduction {
    background-color: #fff;
    color: #000;
    line-height: 35 rpx;
    height: 35 rpx;
    font-size: 16px;
    font-weight: bolder;
    padding-left: 10px;
  }

  .b-mIcontent {
    padding: 10px;
    background-color: #fff;
    font-size: 12px;
    color: #5f5f5f;
  }

  .C-directory {
    margin-top: 1px;
    height: 27px;
    padding: 10px;
    background-color: #fff;
    border-bottom: 3px solid #F0F0F0;
  }

  .C-directory span {
    display: inline-block;
    font-size: 12px;
    color: #5f5f5f;
  }

  .C-directory .cd-title {
    line-height: 35 rpx;
    height: 35 rpx;
    font-size: 16px;
    font-weight: bolder;
    margin-right: 10px;
    color: black;
  }

  .C-diri {
    float: right;
    font-size: 12px;
    color: #5f5f5f;
    padding-top: 5px;
  }

  .books-tab{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 95%;
    height: 30px;
    line-height: 30px;
    margin:10px;
    text-align: center;
    color: white;
    font-size: 12px;
    border-radius: 8px;
    background-color: #409EFE;
  }

</style>
