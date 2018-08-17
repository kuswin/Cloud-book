<template>
    <div class="web">
      <web-view :src="data">
        将要打开外部连接
      </web-view>
    </div>
</template>

<style>
  .web{
    color: darkgray;
    font-size: 16px;
    position: fixed;
    width: 100%;
    top: 40%;
    text-align: center;
  }
  .web web-view{
    width: 100%;
    text-align: center;
  }
</style>

<script>
  export default {
    name: "index",
    data(){
      return{
        data:""
      }
    },
    onLoad(options){
      console.log(options);
      this.data = options.content
    }
  };
</script>

<style scoped>

</style>
