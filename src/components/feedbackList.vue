<template>
    <div class="video">
<table class="table table-bordered table-hover definewidth m10">
    <thead>
    <tr>
        <th>反馈标题</th>
        <th>日期</th>
        <th>状态</th>
        <th>用户名</th>
        <th>管理菜单</th>
    </tr>
    </thead>
        <tr v-for="item in feedbackList">
            <td v-text="item.FeedbackTitle"></td>
            <td v-text="item.Feedback_timestamp"></td>
            <td v-text="item.Feedback_state"></td>
            <td v-text="item.UserName"></td>            
            <td> <router-link class="btn btn-success" :to="'/admin/feedbackDetail?id='+item.id">查看</router-link></td>    
        </tr>    
       </table>
       <nav>
          <p style="text-align:center">一共有{{count}}条数据，每页最多显示{{limit}}条数据，共{{currentPage}}页，当前第{{page}}页</p>
          <ul class="pager">
              <li class="previous"><span @click="getfeedback(--page)">上一页</span></li>
              <li class="next"><span @click="getfeedback(++page)">下一页</span></li>
          </ul>
      </nav>
  </div>
</template>

<script>
import axios from 'axios'
const url = '/getAdmin'
export default {
  name: 'feedbackList',
  data () {
    return {
      username:"",
      password:"",
      message:'',
      feedbackList:[],
      page:1,
      count:null,
      currentPage:null,
      limit:null,
    }
  },
  methods:{
    search(){
    },
    getfeedback(){
         axios.post(url+'/admin/feedback/findAll',{
                page:this.page
        })
        .then(res=>{
            var data;
            if(typeof (res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length){
                data=res.data;
            }else{
                data=JSON.parse(res.data)
            }
            if(data.code==1){
                this.limit=data.limit;
                this.count=data.count;
                this.currentPage=data.currentPage;
                this.page=data.page;
                this.feedbackList=data.feedbackList;
            }else{
                this.message=data.message;
            }
        })
        .catch(err=>{
            console.log(err)
        });
    }
  },
  mounted(){
        this.$nextTick(function(){
            this.getfeedback();
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
.previous,.next{
    cursor: pointer;
}
.previous:hover,.next:hover{
    color:red;
}
</style>
