<template>
    <div class="">
      <div class="page-container">
            <h1>中南民族大学微信小程序后台管理系统</h1>
            <form action="" method="post">
				<div>
					<input type="text" name="username" v-model="username" class="username" placeholder="Username" autocomplete="off"/>
				</div>
                <div>
					<input type="password" name="password" v-model="password" class="password" placeholder="Password" oncontextmenu="return false" onpaste="return false" @keyup.enter="login"/>
                </div>
                <div class="color" v-text="message"></div>
                <button id="submit" type="button" @click="login">登录</button>
            </form>
        </div>
  </div>
</template>

<script>
    import AXIOS from './../axios/axios';
    const Axios = new AXIOS();
    const url = '/admin/login'
    export default {
        name: 'login',
        data() {
            return {
                username: "",
                password: "",
                message: ''
            }
        },
        methods: {
            login() {

                var that = this;
                if (this.username == '' || this.password == '') {
                    this.message = '账号和密码不能为空！';
                } else {
                    let params = {
                        api: url,
                        param: {
                            username: this.username,
                            password: this.password
                        }
                    }
                    Axios.post(params)
                        .then(res => {
                            var data;
                            var menu = [];
                            if (typeof(res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length) {
                                data = res.data;
                            } else {
                                data = JSON.parse(res.data)
                            }
                            console.log(data)
                            if (data.code >= 1) {
                                this.message = data.message;
                                menu = data.user_role;
                                this.$store.dispatch('setMenu', menu)
                                this.$store.dispatch('change', 'logined')
                                window.location.href = "#/admin/index";
                            } else {
                                this.message = data.message;
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        //this.$store.dispatch('change','logined') 
                }
            }
        },
        mounted() {
            this.$nextTick(function() {

                if (window.JSON.parse(window.localStorage.getItem('menu'))) {
                    window.location.href = "/#/admin/index";
                }
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*
 *
 * Template Name: Fullscreen Login
 * Description: Login Template with Fullscreen Background Slideshow
 * Author: Anli Zaimi
 * Author URI: http://azmind.com
 *
 */
    
    body {
        background: #f8f8f8;
        /*font-family: 'PT Sans', Helvetica, Arial, sans-serif;*/
        font-family: "Microsoft YaHei", 微软雅黑, "Microsoft JhengHei", 华文细黑, STHeiti, MingLiu;
        text-align: center;
        color: #fff;
    }
    
    .color {
        height: 20px;
        color: #fff;
        font-weight: 300;
    }
    
    .page-container {
        margin: 120px auto 0 auto;
    }
    
    h1 {
        font-size: 30px;
        font-weight: 700;
        text-shadow: 0 1px 4px rgba(0, 0, 0, .2);
        color: #fff;
        font-family: '隶书';
        /* background-image:url('./../../static/images/logo.jpg') ;
    background-repeat:no-repeat; */
    }
    
    form {
        position: relative;
        width: 305px;
        margin: 15px auto 0 auto;
        text-align: center;
    }
    
    input {
        width: 270px;
        height: 42px;
        line-height: 42px;
        margin-top: 25px;
        padding: 0 15px;
        background: #2d2d2d;
        /* browsers that don't support rgba */
        *background-color: transparent;
        background: rgba(45, 45, 45, .15);
        -moz-border-radius: 6px;
        -webkit-border-radius: 6px;
        border-radius: 6px;
        border: 1px solid #3d3d3d;
        /* browsers that don't support rgba */
        border: 1px solid rgba(255, 255, 255, .15);
        -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, .1) inset;
        -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, .1) inset;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, .1) inset;
        font-family: 'PT Sans', Helvetica, Arial, sans-serif;
        font-size: 14px;
        color: #fff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, .1);
        -o-transition: all .2s;
        -moz-transition: all .2s;
        -webkit-transition: all .2s;
        -ms-transition: all .2s;
    }
    
    input:-moz-placeholder {
        color: #fff;
    }
    
    input:-ms-input-placeholder {
        color: #fff;
    }
    
    input::-webkit-input-placeholder {
        color: #fff;
    }
    
    input:focus {
        outline: none;
        -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, .1) inset, 0 2px 7px 0 rgba(0, 0, 0, .2);
        -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, .1) inset, 0 2px 7px 0 rgba(0, 0, 0, .2);
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, .1) inset, 0 2px 7px 0 rgba(0, 0, 0, .2);
    }
    
    button {
        cursor: pointer;
        width: 300px;
        height: 44px;
        margin-top: 5px !important;
        padding: 0;
        background: #ef4300;
        -moz-border-radius: 6px;
        -webkit-border-radius: 6px;
        border-radius: 6px;
        border: 0px;
        -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .25) inset, 0 2px 7px 0 rgba(0, 0, 0, .2);
        -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .25) inset, 0 2px 7px 0 rgba(0, 0, 0, .2);
        box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .25) inset, 0 2px 7px 0 rgba(0, 0, 0, .2);
        font-family: 'PT Sans', Helvetica, Arial, sans-serif;
        font-size: 16px;
        font-weight: 300;
        color: #fff;
        text-shadow: 0 1px 2px rgba(0, 0, 0, .1);
        -o-transition: all .2s;
        -moz-transition: all .2s;
        -webkit-transition: all .2s;
        -ms-transition: all .2s;
    }
    
    button:hover {
        -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .15) inset, 0 2px 7px 0 rgba(0, 0, 0, .2);
        -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .15) inset, 0 2px 7px 0 rgba(0, 0, 0, .2);
        box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .15) inset, 0 2px 7px 0 rgba(0, 0, 0, .2);
    }
    
    button:active {
        -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .15) inset, 0 2px 7px 0 rgba(0, 0, 0, .2);
        -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .15) inset, 0 2px 7px 0 rgba(0, 0, 0, .2);
        box-shadow: 0 5px 8px 0 rgba(0, 0, 0, .1) inset, 0 1px 4px 0 rgba(0, 0, 0, .1);
        border: 0px solid #ef4300;
    }
    
    .connect {
        width: 800px;
        margin: 50px auto 0 auto;
        font-size: 14px;
        text-shadow: 0 1px 3px rgba(0, 0, 0, .2);
    }
    
    .connect p {
        position: relative;
        left: -140%;
        top: 0
    }
    
    .connect a {
        display: inline-block;
        width: 32px;
        height: 35px;
        margin-top: 15px;
        -o-transition: all .2s;
        -moz-transition: all .2s;
        -webkit-transition: all .2s;
        -ms-transition: all .2s;
    }
    
    .alert {
        width: 310px;
        height: 200px;
        background: #000;
        position: absolute;
        top: -40%;
        left: 50%;
        margin: -101px 0 0 -151px;
    }
    
    .alert h2 {
        height: 40px;
        padding-left: 8px;
        font-size: 14px;
        background: #FF0543;
        text-align: left;
        line-height: 40px;
    }
    
    .alert .alert_con {
        background: #fff;
        height: 160px;
    }
    
    .alert .alert_con p {
        color: #000;
        line-height: 90px;
    }
    
    .alert .alert_con .btn {
        padding: 3px 10px;
        color: #fff;
        cursor: pointer;
        background: #72D1FF;
        border: 1px solid #72D1FF;
        border-radius: 4px;
    }
    
    .alert .alert_con .btn:hover {
        background: #4FB2EF;
        border: 1px solid #4FB2EF;
        border-radius: 4px;
    }
    /*
.connect a.facebook { background: url(../img/facebook.png) center center no-repeat; }
.connect a.twitter { background: url(../img/twitter.png) center center no-repeat; }

.connect a:hover { background-position: center bottom; }
*/
</style>