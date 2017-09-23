<template>
    <div class="video">
    <form class="form-inline definewidth m20">
    <font color="#777777"><strong>请输入杂志名称：</strong></font>
    <input type="text" class="abc input-default">&nbsp;&nbsp; 
    <span  class="btn btn-primary" @click="search">查询</span>&nbsp;&nbsp; 
    <span class="btn btn-success" id="addnew" @click="addVideo('bookPageAdd')"><span style="color:#fff">添加新文章</span></span>
</form>
<table class="table table-bordered table-hover definewidth m10">
    <thead>
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <font color="#777777"><strong>用户名称：</strong></font>
 &nbsp;&nbsp;<span style="color:#005580;cursor: pointer;" @click="addVideo('studentDetail')">小强</span>
    <tr>
	     <th>序号</th>
        <th>杂志名称</th>
        <th>期数</th>
        <th>文章标题</th>
        <th>上传日期</th>
        <th>管理菜单</th>
    </tr>
    </thead>
        <tr>
            <td>1</td>
            <td>微众</td>
            <td>1</td>
            <td>光量子技术</td>
            <td>2016.07.22</td>               
            <td> <span class="btn btn-danger" @click="delArticle">删除</span><span class="btn btn-success" @click="reArticle">修改</span><span class="btn btn-primary">预览</span></td>
               
        </tr>    
       </table>

  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'videoList',
  data () {
    return {
      username:"",
      password:"",
      message:''
    }
  },
  methods:{
    search(){
        Axios.post('/admin/magazine/findPeriods',{
            magazine_journal_no:'单个查询'  //不是杂志名称？是期数？
        })
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },
    delArticle(){
        Axios.post('/admin/magazine/delPeriods',{
            magazine_journal_no:'1'//(期数)
        })
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },
    reArticle(){
        Axios.post('/admin/magazine/amend',{
            magazine_journal_no:'1',   //(期数)
            magazine_journal_title:'测试', //(主题文字)
            magazine_journal_picture:'form-data类型',
            note:''
        })
        .then(res=>{
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })
    },
    addVideo(item){
        this.$emit('choseItem',item);
    }
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
