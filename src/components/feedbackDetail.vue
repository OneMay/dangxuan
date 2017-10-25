<template>
    <div class="video">
<table class="table table-bordered table-hover definewidth m10">
    <tr>
	     <td class="tableleft" width="10%">反馈标题</td>
         <td v-text="FeedbackTitle"></td>
    </tr>
    <tr>
        <td class="tableleft" width="10%">反馈内容</td>
         <td v-text="FeedbackContent"></td>
    </tr>
        <tr>   
            <td class="tableleft" width="10%"></td>           
            <td><router-link class="btn btn-success" name="backid" id="backid" to="/admin/feedbackList">返回列表</router-link></td>    
        </tr>   
         
       </table>

  </div>
</template>

<script>
import axios from 'axios'
const url = '/getAdmin'
export default {
  name: 'feedbackDetail',
  data () {
    return {
      username:"",
      password:"",
      message:'',
      FeedbackTitle:'',
      FeedbackContent:'',
      feedbackList:[]
    }
  },
  methods:{
    getItemfeedback(){
        var item = window.location.search;
        var reg = /.+=(.+)/g;
        var feed = reg.exec(item)[1];
        axios.post(url+'/admin/feedback/detail',{
            id:feed
        })
        .then(res=>{
            var data;
            if(typeof (res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length){
                data=res.data;
            }else{
                data=JSON.parse(res.data)
            }
            if(data.code==1){
                this.feedbackList=data.feedbackList;
                this.FeedbackTitle=this.feedbackList[0].FeedbackTitle;
                 this.FeedbackContent=this.feedbackList[0].FeedbackContent;
            }else{
                this.message=data.message;
            }
        })
    }
  },
  mounted(){
        this.$nextTick(function(){
            this.getItemfeedback();
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {font-size: 20px;
    font-size: 20px;
        padding-bottom: 40px;
        background-color:#e9e7ef;
    }
    .sidebar-nav {
        padding: 9px 0;
    }

    @media (max-width: 980px) {
        /* Enable use of floated navbar text */
        .navbar-text.pull-right {
            float: none;
            padding-left: 5px;
            padding-right: 5px;
        }
    }

@charset "utf-8";
body{
    font-size: 13px;
}
select, textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"], .uneditable-input {
    padding: 1px;
}

select {
    height: 24px;
}

.radio{
    font-size: 11px;
    margin-bottom: 4px;
}

.nav{
    margin-bottom: 5px;
}

form{
    margin: 0 0 5px;
}

.page{
    text-align: right;margin-right:25px;margin-top:5px;
}

.page a{
    margin-left: 5px;
}

.page .current{
    margin-left: 5px;
    color: red;
}
/*1*/
.table td input[type="checkbox"]{
    padding: 0;
    margin: 0;
}

.table th input[type="checkbox"]{
    padding: 0;
    margin: 0;
}

.table td, .table th{
    padding-top: 8px;
    padding-bottom: 4px;
	line-height:20ppx;
	
}
.table th{
	background-color:#eaeaea;
}
.tableleft{
	text-align:right;
	padding-left:5px;
	background-color:#f5f5f5;

}
.definewidth{
	width:96%;
	margin:auto;		
}

/*2*/
.table2 td input[type="checkbox"]{
    padding: 0;
    margin: 0;
}

.table2 th input[type="checkbox"]{
    padding: 0;
    margin: 0;
}

.table2 td, .table2 th{
    padding-top: 10px;
    padding-bottom: 4px;
	line-height:50ppx;
	
}
.table2 th{
	background-color:#eaeaea;
}
.table2left{
	text-align:center;
	padding-left:10px;
	background-color:#f5f5f5;

}
.definewidth2{
	width:50%;
	margin:auto;
}



.m10{
	margin-top:10px;
}
.m20{
	padding-top:20px;
}
.m30{
	padding-top:50px;
}





/*formValidator�?��֤*/
.onShow,.onFocus,.onError,.onCorrect,.onLoad,.onTime{display:inline-block;display:-moz-inline-stack;zoom:1;*display:inline; vertical-align:middle;	color:#444;line-height:18px;padding:2px 10px 2px 23px; margin-left:10px;_margin-left:5px}
.onShow{background-position:3px -147px;border-color:#40B3FF;color:#959595}
.onFocus{background-position:3px -147px;border-color:#40B3FF;}
.onError{background-position:3px -47px;border-color:#40B3FF; color:red}
.onCorrect{background-position:3px -247px;border-color:#40B3FF;}
.onLamp{background-position:3px -200px}
.onTime{background-position:3px -1356px}
</style>
