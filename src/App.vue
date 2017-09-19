<template>
  <div id="app">
    <router-view></router-view>
    {{getLogin}}
    <login v-if="login=='islogin'" v-on:user="userInfo"></login>
    <index v-if="login=='logined'"></index>
  </div>
</template>

<script>
import login from './components/login'
import index from './components/index'
export default {
  name: 'app',
  data(){
    return {
      login:'',
      name:"",
      password:"",
      menu:[]
    }
  },
  methods:{
    userInfo(msg){
      this.name=msg.username;
      this.password=msg.password;
    }
  },
  computed:{
    getLogin(){
      this.login=this.$store.getters.getLoginData;
      this.menu=this.$store.getters.getMenuData;
    }
  },
   mounted() {
     var that=this;
        this.$nextTick(function () {
           this.getLogin;
        })
    },
  components:{
    login,
    index
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
</style>
