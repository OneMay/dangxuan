<template>
    <div class="video">
        <form action="#" method="post" class="definewidth m20" enctype="multipart/form-data">
        <table class="table table-bordered table-hover m10" style="margin-left:10px;margin-top:3px;">
            <tr>
                <td width="10%" class="tableleft">类别</td>
                <td>
                    <select name="bigTypeId" v-model="videoId">
                        <option v-bind:value="{number: 1}" >校园多看点</option>
                        <option v-bind:value="{number: 2}">民族风韵</option>
                        <option v-bind:value="{number: 3}">我爱看电影</option>
                        <option v-bind:value="{number: 4}">我在民大</option>
                        <option v-bind:value="{number: 5}">白色文化</option>
                        <option v-bind:value="{number: 6}">聆音品文</option>
                    </select>
                    
                </td>
            </tr>
    
   
            <tr>
                <td class="tableleft">视频名称</td>
                <td><input type="text" v-model="videoName" v-text="videoName" name="videosName"/></td>
                
            </tr>
            <tr>
                <td class="tableleft">视频关键字</td>
                <td><input type="text" v-model="videoTitle" v-text="videoTitle" name="GoodsNormalPrice"/></td>
            </tr>
            <tr>
                <td class="tableleft">视频海报</td>
                <td class="tableleft" style="width: 196px; "><input type="file" @change="getFile" name="GoodsPicture" id="GoodsPicture" multiple="multiple" accept=".jpg,.png"/></td>
        <!--         <td class="tableleft">图片预览</td> -->
        <!--         <td><img name="showimg" id="showimg" src="" style="display:none;" alt="预览图片" /> </td> -->
            </tr>
            <tr>
                <td class="tableleft">选择视频</td>
                <td class="tableleft" style="width: 196px; "><input type="file" @change="getVideo" name="GoodsPicture" id="GoodsPicture" multiple="multiple" accept=".mp4" /></td>
           </tr>
            <tr>
                <td class="tableleft">视频简介</td>
                <td><textarea type="text" v-model="videoWords" v-text="videoWords" name="GoodsIntroduce"  rows="3" cols="20"></textarea></td>
            </tr>
            <tr>
                <td class="tableleft"></td>
                <td>
                    <span style="margin-left:5px;" class="btn btn-primary" @click="addVideo">保存</span> &nbsp;&nbsp;<router-link class="btn btn-success" name="backid" id="backid" to="/admin/videoQuery">返回列表</router-link>
                    <span v-text="message" class='message'></span>
                </td>
            </tr>
        </table>
    </form>

  </div>
</template>

<script>
import axios from 'axios'
const url='/getAdmin'
export default {
  name: 'videoUpdate',
  data () {
    return {
      username:"",
      password:"",
      message:'',
      videoId:{
          number: 1
      },  
      videoName:'',
      videoTitle:'',
      videoPoster:'',
      videoCategory:'',
      video:'',
      videoWords:'',
      television_program_content_id:'',
      note:''    //(管理员id)
    }
  },
  methods:{
    returnItem(item){
        this.$emit('choseItem',item)
    },
    getFile(e){
        this.videoPoster = e.target.files[0];

    },
    getVideo(e){
        this.video = e.target.files[0];
    },
    addVideo(e){
         var that = this;

       // e.preventDefault();
        if(this.videoPoster&&this.video&&this.videoId.number&&this.videoName&&this.videoTitle&&this.videoWords){
            var imgreg=/.+((\.jpg$)|(\.png$))/g;
            var videoreg=/.+\.mp4$/g
            if(imgreg.test(this.videoPoster.name)&&videoreg.test(this.video.name)){
                this.message='正在上传...';
                var formData = new FormData();
                formData.append('videoPoster', this.videoPoster);
                formData.append('video', this.video);
                formData.append('videoId', this.videoId.number);
                formData.append('videoName', this.videoName);
                formData.append('videoTitle', this.videoTitle);
                formData.append('videoWords', this.videoWords);
                formData.append('television_program_content_id', this.television_program_content_id);

                let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                }

                Axios.post(url+'/admin/video/amend', formData, config)
                .then(res=>{
                    if(typeof (res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length){
                        data=res.data;
                    }else{
                        data=JSON.parse(res.data)
                    }
                    this.message='更新成功';
                    console.log(res.data)
                })
                .catch(err=>{
                    this.message='更新失败';
                    console.log(err)
                }); 
            }else{
               this.message='文件格式错误' 
            }
        }else{
            this.message='所有内容不能为空！'
        }
        
        if(!this.videoPoster&&!this.video&&this.videoId.number&&this.videoName&&this.videoTitle&&this.videoWords){

                this.message='正在上传...';
                var formData = new FormData();
                //formData.append('videoPoster', this.videoPoster);
               // formData.append('video', this.video);
                formData.append('videoId', this.videoId.number);
                formData.append('videoName', this.videoName);
                formData.append('videoTitle', this.videoTitle);
                formData.append('videoWords', this.videoWords);
                formData.append('note', this.note);

                let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                }

                Axios.post(url+'/admin/video/amend', formData, config)
                .then(res=>{
                    if(typeof (res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length){
                        data=res.data;
                    }else{
                        data=JSON.parse(res.data)
                    }
                    this.message='更新成功';
                    console.log(res.data)
                })
                .catch(err=>{
                    this.message='更新失败';
                    console.log(err)
                }); 
        }else{
            this.message='所有内容不能为空！'
        }   
    },
    getVideo(){
       
        var search=decodeURI(window.location.search.substring(1));
        var reg=/.+=(.+)/g;
        var videoname=reg.exec(search)[1];
        this.television_program_content_id=videoname;
         axios.post(url+'/admin/video/find',{
                television_program_content_id: videoname
            })
            .then(res=>{
                var data;
                if(typeof (res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length){
                    data=res.data;
                }else{
                    data=JSON.parse(res.data)
                }
                if(data.code==1){
                    this.videoCategory=data.videoList[0].videoCategory;
                    this.videoName=data.videoList[0].videoName;
                    this.videoTitle=data.videoList[0].videoTitle;
                    this.videoWords=data.videoList[0].videoWords;
                    this.videoId.number=data.videoList[0].videoCategory;
                }else{
                     this.message=data.message;
                }
            })
            .catch(res=>{
                console.log(err);
            })
    }
  },
  mounted(){
        this.$nextTick(function(){
            this.getVideo();
        })
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
.message{
    color:#ca7117;
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
