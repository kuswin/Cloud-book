<template>
    <div>
      <div class="content">
        <div class="list" v-for="(item,index) in data" :key="index">
          <div class="img">
            <img :src="item.book.img">
          </div>
          <div class="list-title">
            {{item.book.title}}
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
<style>
  .content{
    padding: 20rpx;
    color: #8C8C8C;
    font-size: 12px;
    display: flex;
    margin-bottom: 50rpx;
  }
  .list{
    height: 300rpx;
    width: 190rpx;
    margin: 20rpx;
  }
  .list img{
    height: 280rpx;
    width: 220rpx;
  }
  .list-title{
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

<script>
  export default {
    name: "index",
    data(){
      return{
        data:[]
      }
    },
    methods:{
      getData(){
        this.$net.get('/collection').then(res =>{
          console.log(res);
          this.data = res.data
        })
      }
    },
    onShow(){
      this.getData()
    }
  };
</script>

<style scoped>

</style>
