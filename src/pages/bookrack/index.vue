<template>
  <div class="contenter">

    <div class="content" v-for="(item,index) in book">

      <div class="img">
        <img :src="item.book.img" alt="">
      </div>

      <div class="content-right">

        <div class="h1">
          {{item.book.title}}
        </div>

        <div>
          <span>{{item.title.index}}/{{item.title.total}}章节</span>
        </div>

        <div class="progress-co">
          <progress class="progress"
                    :percent="item.percent"
                    :stroke-width="2"
                    activeColor="#1296db"
                    backgroundColor="#8a8a8a"
                    :active="true"
          ></progress>
          <div>
            <span>已看</span>
            <span>{{item.percent}}%</span>
          </div>
        </div>

        <div class="view-record">
          <div>
            <span>上次查看：</span>
            <span>{{item.title.title}}</span>
          </div>

          <div>
            <timeSet>{{item.updatedTime}}</timeSet>
          </div>

        </div>

        <div class="buttons">

          <div>
            <button class="btn" @click="handleContinue(item.title.bookId,item.title._id)">继续阅读</button>
          </div>

          <div>
            <button class="btn" @click="handleWatch(item.title.bookId)">查看文档</button>
          </div>

        </div>


      </div>

    </div>

    <div class="noMore">
      <span></span>
      没有更多了
      <span></span>
    </div>

  </div>
</template>

<script>
  import timeSet from '@/components/timeSet.vue'
  export default {
    name: "index",
    components:{
      timeSet
    },
    data(){
      return{
        book:[]
      }
    },
    methods:{
       getData(){
        this.$net.get('/readList').then(res => {
          console.log(res);
          this.book = res.data.map(data =>{
            data.percent = Math.floor((data.title.index/
              data.title.total)*100)
            return data
          })
        })
      },
      handleContinue(id,bookid){
        console.log(id,bookid);
        wx.navigateTo({
          url: `/pages/article/main?id=${bookid}&booId=${id}`
        })
      },
      handleWatch(id){
          wx.navigateTo({
            url: `/pages/catalogue/main?id=${id}`
          })
      }
    },
    onShow(){
      this.getData()
    }
  };
</script>

<style scoped>
  .contenter{
    padding: 20rpx;
  }

  .content{
    display: flex;
    height: 280rpx;
    justify-content: space-between;
    margin-bottom: 50rpx;
  }
  .content .img img{
    height: 280rpx;
    width: 220rpx;
  }

  .content-right{
    display: flex;
    width: 65%;
    flex-direction: column;
    justify-content: space-between;
    color: #8C8C8C;
    font-size: 12px;
  }

  .content-right .h1{
    font-size: 14px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .progress-co{
    display: flex;
    justify-content: space-between;
    color: #1296db;
  }
  .content-right .progress{
    width: 70%;
  }
  .view-record{
    display: flex;
    justify-content: space-between;
  }
  .buttons{
    display: flex;
    justify-content: space-between;
  }
  .btn {
    height: 60rpx;
    line-height: 60rpx;
    padding: 0 30rpx;
    background-color: #E9E9E9;
    color: #8C8C8C;
    border-radius: 8px;
    font-size: 12px;
    width: 150rpx;
  }
  button:active{
    background-color: #E9E9E9;
    color: #8C8C8C;
    border-radius: 8px;
    border: none;
  }
  button::after {
    border: none;
  }
  .noMore{
    color:#8C8C8C ;
    font-size: 14px;
    text-align: center;
    line-height: 30rpx;
    height: 30rpx;
  }
  .noMore span{
    display: inline-block;
    width: 140rpx;
    height: 8rpx;
    border-top: 1px solid #8C8C8C ;

  }
</style>
