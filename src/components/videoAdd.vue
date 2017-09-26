<template>
    <div class="video">
        <form action="#" method="post" class="definewidth m20" enctype="multipart/form-data">
        <table class="table table-bordered table-hover m10" style="margin-left:10px;margin-top:3px;">
            <tr>
                <td width="10%" class="tableleft">类别</td>
                <td>
                    <select name="bigTypeId" v-model="videoId">
                    <option v-bind:value="{number: 0}">校园多看点</option>
                    <option v-bind:value="{number: 1}">民族风韵</option>
                    <option v-bind:value="{number: 2}">我爱看电影</option>
                    <option v-bind:value="{number: 3}">我在民大</option>
                    <option v-bind:value="{number: 4}">白色文化</option>
                    </select>
                    
                </td>
            </tr>
    
   
            <tr>
                <td class="tableleft">视频名称</td>
                <td><input type="text" v-model="videoName" name="videosName"/></td>
                <td class="tableleft">视频大小</td>
                <td><input type="text" name="videosNumber"readonly="readonly"/></td>
            </tr>
            <tr>
                <td class="tableleft">视频关键字</td>
                <td><input type="text" v-model="videoTitle" name="GoodsNormalPrice"/></td>
            </tr>
            <tr>
                <td class="tableleft">视频海报</td>
                <td class="tableleft" style="width: 196px; "><input type="file" @change="getFile" name="GoodsPicture" id="GoodsPicture" multiple="multiple" /></td>
        <!--         <td class="tableleft">图片预览</td> -->
        <!--         <td><img name="showimg" id="showimg" src="" style="display:none;" alt="预览图片" /> </td> -->
            </tr>
            <tr>
                <td class="tableleft">选择视频</td>
                <td class="tableleft" style="width: 196px; "><input type="file" @change="getVideo" name="GoodsPicture" id="GoodsPicture" multiple="multiple" /></td>
           </tr>
            <tr>
                <td class="tableleft">视频简介</td>
                <td><input type="text" v-model="videoWords" name="GoodsIntroduce" style="height: 63px;"/></td>
            </tr>
            <tr>
                <td class="tableleft"></td>
                <td>
                    <span style="margin-left:5px;" class="btn btn-primary" @click="addVideo">保存</span> &nbsp;&nbsp;<span class="btn btn-success" name="backid" id="backid" @click="returnItem('videoQuery')">返回列表</span>
                </td>
            </tr>
        </table>
    </form>

  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'videoAdd',
  data () {
    return {
      username:"",
      password:"",
      message:'',
      videoId:'',  //d
      videoName:'',
      videoTitle:'',
      videoPoster:'',
      video:'',
      videoWords:'',
      note:''    //(管理员id)
    }
  },
  methods:{
    returnItem(item){
        this.$emit('choseItem',item)
    },
    getFile(e){
        this.videoPoster = e.target.files[0];
        let formData = new FormData();
            formData.append('videoPoster', this.videoPoster);
        console.log(formData);
        console.log(formData.get("name"))
    },
    getVideo(e){
        this.video = e.target.files[0];
        let formData = new FormData();
            formData.append('video', this.video);
    },
    addVideo(){
        var that = this;
            Axios.post('/admin/video/add',{
                videoId:this.videoId.number,
                videoName:this.videoName,
                videoTitle:this.videoTitle,
                videoPoster:this.videoPoster,
                video:this.video,
                videoWords:this.videoWords,
                note:this.note
            })
            .then(res=>{
                if(typeof (res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length){
                    data=res.data;
                }else{
                    data=JSON.parse(res.data)
                }
                
                console.log(res.data)
            })
            .catch(err=>{
                console.log(err)
            });     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {font-size: 20px;
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
