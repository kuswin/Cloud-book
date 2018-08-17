<template>
  <div>
    <div class="img" v-show="show2" >
      <img src="/static/Double%20Ring-1s-200px.svg" alt="" style="width: 100rpx;height: 100rpx;">
    </div>
    <div class="ar-c" v-show="show1">
      <div class="article">

        <div :style='fontSize'>
          <wemark :md="md" link highlight  type="rich-text"></wemark>
        </div>
      </div>
      <div class="tab">
        <i class="iconfont icon-shangyiye" @click="handleUp"></i>
        <i class="iconfont icon-mulu" @click="handleMulu"></i>
        <span @click="handleAdd"     class="iconfont">A+</span>
        <span @click = "handleMinus" class="iconfont">A-</span>
        <i class="iconfont icon-xiayiye" @click="handleNext"></i>
      </div>

      <div class="left" v-show="show" @click="handleClose">

      </div>
      <scroll-view class="titles" :scroll-y="true" :style="{transform:'translateX('+ trans +')'}" @click="handleClose">
        <div class="left-cont" v-for="(item,index) in title" :key="index">
          <div @click="handleCatal(item._id)">
            {{item.title}}
          </div>
        </div>
      </scroll-view>

    </div>

  </div>


</template>

<script>
  export default {
    name: "index",
    data(){
      return{
        bookId1:'',
        number:100,
        md:'',
        fontSize:'',
        title:[],
        catalogue:'',
        show:false,
        title2:'',
        index:'',
        length:'',
        show1:false,
        trans:'',
        shows:false,
        show2:true
      }
    },
    methods:{
      async getData(){
        this.md=''
         const article = await this.$net.get(`/article/${this.bookId1}`)

        console.log(article);
        this.show1 = true
        this.show2 = false
        this.md = article.data.article.content
        this.titles = article.data.title
        wx.setNavigationBarTitle({
          title: article.data.title
        })
          const titles = await this.$net.get(`/titles/${this.catalogue}`)
           this.title = titles.data
          this.length = this.title.length
        this.index = this.title.findIndex(cont => cont._id  === this.bookId1)
      },
      handleClose(){
        this.trans = '-300px'
        this.show = !this.show
      },
      handleMulu(){
        this.trans = '300px'
        this.show = !this.show
      },
      handleAdd(){
        this.number=this.number + 3
        this.fontSize = `font-size:${this.number}%`

      },
      handleMinus(){
        this.number=this.number - 3
        this.fontSize = `font-size:${this.number}%`
      },
      handleUp(){
        this.show = false
        this.$net.get(`/titles/${this.catalogue}`).then(res =>{
          if (this.index<=0){
            wx.showToast({title: '没有了'})
          }
          else {
            this.index = this.index - 1
            console.log(this.index);
            this.title2 = this.title[this.index]._id
            this.$net.get(`/article/${this.title2}`).then(res =>{
              this.md = res.data.article.content
              wx.setNavigationBarTitle({
                title: res.data.title
              })
            })
          }
        })
      },
      handleNext(){
        this.show = false
        this.$net.get(`/titles/${this.catalogue}`).then(res =>{
          if (this.index>= this.length){
            wx.showToast({title: '最后一章'})
          }
          else {
            this.index = this.index + 1
            console.log(this.index);
            this.title2 = this.title[this.index]._id
            this.$net.get(`/article/${this.title2}`).then(res =>{
              this.md = res.data.article.content
              wx.setNavigationBarTitle({
                title: res.data.title
              })
            })
          }
        })
    },
      handleCatal(val){
        this.$net.get(`/article/${val}`).then(res =>{
          this.md = res.data.article.content
          wx.setNavigationBarTitle({
            title: res.data.title
          })
      })
        this.index = this.title.findIndex(cont => cont._id  === val)
    }
    },

    onLoad(options){
      console.log(options)
      this.bookId1 = options.id
      this.catalogue = options.booId
      this.getData()
  }
  }
</script>

<style scoped>
  .img{
    position: fixed;
    top: 40%;
    left: 0;
    right: 0;
    width: 150rpx;
    height: 150rpx;
    margin: 0 auto;
  }
.article{
  padding: 10px;
}
  .tab{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height:60rpx ;
    line-height: 30px;
    border-top: 1px solid #F0F0F0;
    display: flex;
    padding: 20rpx 0;
    background-color: #fff;
    color: black;
    z-index: 999;
    /*font-family: ;*/
  }
.tab .iconfont{
  flex: 1;
  text-align: center;
}
.left{
  position: fixed;
  z-index: 7000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.2);
}
.titles{
  transition: transform 0.5s ease;
  position: fixed;
  z-index: 8898;
  width: 320px;
  left: -351px;
  height: 100%;
  bottom: 0;
  /*padding: 10rpx 20rpx;*/
  background-color: #fff;
  /*overflow: scroll;*/
}

.ar-c{

}

 .left-cont{
  width: 80%;
  margin: 0 auto;
  line-height: 60rpx;
  height: 60rpx;
  color: #333;
  border-bottom: 1px solid #f1f1f1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  z-index: 99;
  padding-left: 40rpx;
}
</style>
