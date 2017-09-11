<template>
    <div class="studentDetail">
       <h3><strong>基本信息：</strong></h3>
   <table class="table table-condensed">
   <tr>              
      <td width="18%" height="30" align="center">用 户 名：</td>
      <td width="82%" class="word_grey">小强</td>
    </tr>
	<tr>              
      <td width="18%" height="30" align="center">真实姓名：</td>
      <td width="82%" class="word_grey">何方强</td>
    </tr>
    <tr>
      <td height="28" align="center">密&nbsp;&nbsp;&nbsp;&nbsp;码：</td>
      <td height="28">******</td>
    </tr>
	<tr>
      <td height="28" align="center">用户类型：</td>
      <td height="28">学生</td>
    </tr> 
    <tr>
      <td height="28" align="center">E-mail：</td>
      <td height="28">fendou@fendou.com</td>
    </tr> 
   
    <tr>
      <td height="28" align="center">创建时间：</td>
      <td height="28">2008-11-15 12:33:23</td>
    </tr> 
</table>				
<h3><strong>操作记录：</strong></h3><br>
&nbsp;&nbsp;&nbsp;&nbsp;<strong>浏览记录：</strong>

<table class="table table-condensed"   >
      <tr>
         <td class="word_grey">序号 &nbsp;</td>
          <td class="word_grey">操作对象 &nbsp;</td>
		  <td class="word_grey">操作时间 &nbsp; </td>
        </tr>  
		  
       <tr>
	   
           <td class="word_grey">1</td>
          <td class="word_grey">复仇者联盟</td>
		  <td class="word_grey">2015.03.15</td>
        </tr> 
		 <tr>
	  
           <td class="word_grey">2</td>
          <td class="word_grey">复仇者联盟</td>
		  <td class="word_grey">2015.03.15</td>
        </tr>   
		</table>
	<!--/////////////////////////////////////-->  
&nbsp;&nbsp;&nbsp;&nbsp; <strong>下载记录：</strong>        

<table class="table table-condensed"  >
<tr>
         
          <td class="word_grey">序号</td>
		  <td class="word_grey">下载对象</td>
		  <td class="word_grey">下载时间</td>
        </tr> 
		<tr>
	  
           <td class="word_grey">1</td>
          <td class="word_grey">复仇者联盟</td>
		  <td class="word_grey">2015.03.15</td>
        </tr> 
		 <tr>
	   
           <td class="word_grey">2</td>
          <td class="word_grey">复仇者联盟</td>
		  <td class="word_grey">2015.03.15</td>
        </tr>
		</table>
		<!--/////////////////////////////////////-->
&nbsp;&nbsp;&nbsp;&nbsp;	
<strong>上传记录：</strong>
		
	<table  class="table table-condensed">
       <tr>
         
          <td class="word_grey">序号</td>
		  <td class="word_grey">上传对象</td>
		  <td class="word_grey">上传时间</td>
        </tr>               
       <tr>
	   
           <td class="word_grey">1</td>
          <td class="word_grey">复仇者联盟</td>
		  <td class="word_grey">2015.03.15</td>
        </tr> 
		 <tr>
	  
           <td class="word_grey">2</td>
          <td class="word_grey">复仇者联盟</td>
		  <td class="word_grey">2015.03.15</td>
        </tr> 
    </table> 

  </div>
</template>

<script>
export default {
  name: 'studentDetail',
  data () {
    return {
      username:"",
      password:"",
      message:''
    }
  },
  methods:{
    returnItem(item){
        //document.getElementById('right').style.overflowY= 'scroll';
       // this.$emit('choseItem',item)
    }
  },
   mounted(){
      this.$nextTick(function(){
           document.getElementById('right').style.overflowY= 'scroll';
      })
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.studentDetail h3 {
    text-align:left !important;
}
.right strong{
    text-align:left !important;
}
body {font-size: 20px;
             padding-bottom: 40px;
             background-color:#e9e7ef;
             font-size:17px;
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
#right{
    overflow-y:scroll;
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
