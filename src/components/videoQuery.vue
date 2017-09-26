<template>
    <div class="video">
     <form class="form-inline definewidth m20" action="#" method="get">
    <font color="#777777"><strong>视频名称：</strong></font>
    <input type="text" name="menuname" id="menuname"class="abc input-default" placeholder="" v-model="videoName">&nbsp;&nbsp; 
    <span  class="btn btn-primary" @click="search">查询</span>&nbsp;&nbsp; 
	<span type="button"  class="btn btn-success" id="addnew" @click="addVideo('videoAdd')"><span style="color:#fff">添加视频</span></span>
</form>
<table class="table table-bordered table-hover definewidth m10">
    <thead>
    <tr>
        <th>视频名称</th>
        <th>分类</th>
        <th>上传者</th>
        <th>上传日期</th>
        <th>管理菜单</th>
    </tr>
    </thead>
        <tr v-for="video in videoList">
            <td v-text="video.videoName"></td>
            <td v-text="video.videoCategory"></td>
            <td v-text="video.note"><span style="color:#005580;cursor: pointer;" @click="addVideo('studentDetail')">小强</span></td>
            <td v-text="video.video_timestamp"></td>
            <td> <span  class="btn btn-success">预览</span> <span  class="btn btn-danger">修改</span></td>  
        </tr>
       </table>
       <nav>
          <p style="text-align:center">一共有{{count}}条数据，每页最多显示{{limit}}条数据，共{{currentPage}}页，当前第{{pages}}页</p>
          <ul class="pager">
              <li class="previous"><span @click="getProducts(--page)">&larr;上一页</span></li>
              <li class="next"><span @click="getProducts(++page)">下一页 &rarr;</span></li>
          </ul>
      </nav>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'videoQuery',
  data () {
    return {  
      username:"",
      password:"",
      message:'',
      videoList:[],
      page:1,
      count:null,
      currentPage:null,
      pages:null,
      limit:null,
      videoName:''  //d
    }
  },
  methods:{
    search(){
        Axios.post('/admin/video/find',{
                videoName: this.videoName
            })
            .then(res=>{
                var data;
                if(typeof (res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length){
                    data=res.data;
                }else{
                    data=JSON.parse(res.data)
                }
                if(data.code>=1){
                     this.videoName=data.videoName;
                     this.videoCategory = data.videoCategory;
                     this.videoWords = data.videoWords;
                     this.video_timestamp = data.video_timestamp;
                     this.note = data.note;
                }else{
                     this.message=data.message;
                }
            })
            .catch(res=>{
                console.log(err);
            })
    },
    getVideoList(num){
        if(num>this.currentPage){
            num=this.currentPage;
            this.page=this.currentPage;
        }
        if(num<=1){
            num=1;
            this.page=1;
        }
        let params={
            api:'/admin/video/findAll'+'?page='+num,
            param:{
                page:this.page
            }
        }
        Axios.get(params)
        .then(res=>{
            var data;
            if(typeof (res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length){
                data=res.data;
            }else{
                data=JSON.parse(res.data)
            }
            this.limit=data.limit;
            this.count=data.count;
            this.currentPage=data.currentPage;
            this.pages=data.page;
            this.videoList=data.videoList;
        })
        .catch(err => {
            console.log(err);
        });
    },
    addVideo(item){
        this.$emit('choseItem',item);
    },
    getProducts(){

    }
  },
   mounted(){
        this.$nextTick(function(){
            this.getProducts(this.page);
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
