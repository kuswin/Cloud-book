<template>
<div>
  {{str}}
</div>
</template>

<script>
  export default {
    name: "tabBar",
    props:{
      time:{
        type:[String , Number]
      }
    },
    data(){
      return{
        str:'',
        timestamp:''
      }
    },
    methods:{
      getTime(){
        const timetam = new Data(this.time)
        this.timestamp = Math.round(timetam.getTime()/1000)
        return timestamp
      },
      getNowUnix () {
        const time = new Date().getTime()
        const unixtimestamp = Math.round(time/1000)
       return unixtimestamp
      },
      getTodayUnix () {
        const time = new Date()
        time.setHours(0)
        time.setMinutes(0)
        time.setSeconds(0)
        time.setMilliseconds(0)
        const unixa = Math.round(time.getTime() / 1000)
        return unixa
      },
      getUpdateStr () {
        const time = new Date(this.time)
        const year = time.getFullYear()
        const month = time.getMonth() + 1
        const day = time.getDate()
        return `${year}年${month}月${day}日`
      },
      getTimeStr () {
        const timestamp = this.getTime()
        const unixtimestamp = this.getNowUnix ()
        const todyUnix = this.getTodayUnix ()
        const Temporal = unixtimestamp - timestamp
        if ((Temporal/60) <= 60 && Temporal >= 0){
          this.str = `${Math.floor(Temporal/60)}分钟前`
        }
        else if ((Temporal/60) >= 60 && (timestamp - todyUnix)>= 0) {
          const times = Math.floor((timestamp - todyUnix)/3600)
          this.str = `${times}小时前`
        }
        else if ((timestamp - todyUnix)< 0 && Temporal/3600 <= 24*31){
          this.str = `${Math.round(Temporal/86400)}天前`
        }
        else {
          this.str = this.getUpdateStr ()
        }
      }
    }
  };
</script>

<style scoped>

</style>
