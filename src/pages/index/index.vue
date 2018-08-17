<template>
  <div class="index" style="background-color: #F4F4F4;">
  <div class="img" v-show="show2" >
      <img src="/static/Double%20Ring-1s-200px.svg" alt="" style="width: 100rpx;height: 100rpx;">
  </div>
  <div class="h-content">
    <swiper class="swiper"
            :indicator-dots="indicatorDots"
            :circular="true"
            :autoplay="autoplay"
            :interval="interval"
            :duration="duration" indicator-active-color="#ffffff">
      <block v-for="(item,index) in swiper" :key ="index">
        <a :href="'/pages/books/main?id='+ item.book._id">
        <swiper-item>
            <img :src="item.img">
        </swiper-item>
        </a>

      </block>
    </swiper>

    <div class="h-list"v-for="item in category">
      <div class="h-l-title" >
        {{item.title}}
      </div>

      <div class="h-list-cont" v-for="(books,idx) in item.books" :key="idx">
        <a :href="'/pages/books/main?id='+ books._id">
        <div class="h-lcimg">
          <img :src="books.img" alt="">
        </div>

        <div class="h-lcright">
          <div class="h-lcname">
            <span class="h-lcnamemain">{{books.title}}</span>
          </div>

          <div class="h-lcIntroduction">
            {{books.desc}}
          </div>
          <div class="h-lclast">
            <span class="h-lcauther">
              {{books.author}}
            </span>

            <div class="right">
              {{books.startsnums}}

              {{item.title}}
                {{books.looknums}}
              人在看
            </div>

          </div>
        </div>
        </a>
      </div>

    </div>

  </div>
  </div>
</template>

<style>

</style>

<script>
  export default {
           data(){
             return{
               swiper:[],
               category:[],
               books:'',
               autoplay: true,
               interval: 5000,
               duration: 500,
               indicatorDots: true,
               swiperArr: [],
               articles: [],
               show2:true
             }
           },
    methods:{
      getSwiper(){
        this.$net.get('/swiper').then(res =>{
          // console.log(res.data);
          this.swiper = res.data
          this.show2 = false
        })
      },
      getData(){
        this.$net.get('/category/books').then(res =>{
          // console.log(res.data)
          this.show2 = false
            this.category = res.data
          // console.log(this.category[0].books);
        })
      },

    },
    created(){
         this.getSwiper(),
         this.getData()
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

.swiper img{
    height: 100%;
    width: 100%;
  }

.h-content{
  padding: 0 20rpx;
  background-color: #fff;
}

.h-list{
  margin-top: 30rpx;
  background-color: #fff;
}

.h-list .h-l-title{
  border-left: solid 1px #000;
  padding-left: 10rpx;
  color: #000;
  line-height: 35rpx;
  height: 35rpx;
  font-size: 16px;
  font-weight: bolder;
}

.h-lcright{
  height:300rpx;
}

.h-lcimg{
  width: 230rpx;
  height: 270rpx;
  float: left;
}

.h-lcimg img{
  width: 230rpx;
  height: 270rpx;
}

.h-lcright{
  float: left;
  margin-left: 10rpx;
  overflow: hidden;
  width: 230px;
}

.h-list-cont{
  margin-top: 20rpx;
}

.h-lcnamemain{
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap ;
  width: 450rpx;

}

.h-list-cont{
  height: 300rpx;
  margin-top: 20rpx;
}

.h-lcname{
  display: block;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  width: 230px;
}

.h-lcIntroduction{
  margin-top: 5px;
  font-size: 12px;
  height: 93.6rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  color: #8C8C8C;
}

.h-lclast{
  margin-top: 60rpx;
  font-size: 12px;
  color: #8C8C8C;
  height: 25px;
}

.h-lclast span{
  display: inline-block;
  height: 25px;
  line-height: 74rpx;
}

.h-lcauther{
  float: left;
  width: 150rpx;
  padding-right: 50rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
}
  .right{
    float: right;
    height: 25px;
    line-height: 74rpx;
  }

</style>
