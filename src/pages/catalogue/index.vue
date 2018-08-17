<template>
  <div>
  <div class="img" v-show="show2" >
    <img src="/static/Double%20Ring-1s-200px.svg" alt="" style="width: 100rpx;height: 100rpx;">
  </div>
    <div class="catalogue">

      <div class="ca-content" v-for="item in data" :key="item._id">
        <a :href="'/pages/article/main?id='+item._id+'&booId='+ dataId">
          {{item.title}}
        </a>
      </div>

    </div>
  </div>
</template>

<style>

</style>
<script>
  export default {
    name: "index",
    data(){
      return{
        dataId:'',
        data:[],
        show2:true
      }
  },
    methods:{
      getData(){
        this.data = ''
        this.$net.get(`/titles/${this.dataId}`).then(res =>{
          // console.log(res.data);
          this.data = res.data
          this.show2 = false
        })
      }
    },
    onLoad(options){
      console.log(options.id);
      this.dataId = options.id
      this.getData()
    },
  };
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
  .catalogue{
    background-color: #fff;
    padding: 0 5%;
  }
  .ca-content{
    /*width: 100%;*/
    margin: 0 auto;
    text-align: center;
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 10px;
    font-size: 12px;
    border-bottom: 1px solid #000;
  }
</style>
