<template>
    <div class="video">
        <form action="#" method="post" class="definewidth m20" enctype="multipart/form-data">
        <table class="table table-bordered table-hover m10" style="margin-left:10px;margin-top:3px;">
            <tr>
                <td width="10%" class="tableleft">栏目</td>
                <td>
                    <select name="bigTypeId" v-model="program_name">
                        <option v-for="item of column_program_name" v-text="item"></option>
                    </select>
                    
                </td>
            </tr>
            <tr>
                <td class="tableleft">时间</td>
                <td>
                    <select name="bigTypeId" v-model="program_date">
                        <option value="1">周一</option>
                        <option value="2">周二</option>
                        <option value="3">周三</option>
                        <option value="4">周四</option>
                        <option value="5">周五</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="tableleft">音频大小</td>
                <td><input type="text" name="videosNumber" readonly="readonly"/>小于10M</td>
            </tr>
            <tr>
                <td class="tableleft">广播海报</td>
                <td class="tableleft" style="width: 196px; "><input type="file" name="GoodsPicture" id="GoodsPicture" multiple="multiple" @change="getFile" accept=".jpg,.png"/></td>
        <!--         <td class="tableleft">图片预览</td> -->
        <!--         <td><img name="showimg" id="showimg" src="" style="display:none;" alt="预览图片" /> </td> -->
            </tr>
            <tr>
                <td class="tableleft">选择音频</td>
                <td class="tableleft" style="width: 196px; "><input type="file" name="GoodsPicture" id="GoodsPicture" multiple="multiple"  @change="getSund" accept=".mp3,.mp4"/></td>
           </tr>
            <tr>
                <td class="tableleft">广播简介</td>
                <td><input type="text" name="GoodsIntroduce" style="height: 63px;" v-model="program_introduction" v-text="program_introduction"/></td>
            </tr>
            <tr>
                <td class="tableleft"></td>
                <td>
                    <span style="margin-left:5px;" class="btn btn-primary"  @click="radioAdd">保存</span> &nbsp;&nbsp;<router-link class="btn btn-success" name="backid" id="backid" to="/admin/sundList">返回列表</router-link>
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
  name: 'sundPageAmend',
  data () {
    return {
      username:"",
      password:"",
      message:'',
      radioPoster:'',
      radioInfo:'',
      program_name:'',
      program_introduction:'',
      column_program_name:[],
      program_date:'',
      radioList:[],
      program_content_id:null
    }
  },
  methods:{
    getFile(e){
        this.radioPoster = e.target.files[0];

    },
    getSund(e){
        this.radioInfo = e.target.files[0];
    },
    radioAdd(item){
         var that = this;

       // e.preventDefault();
        if(this.program_name&&this.program_introduction&&this.program_date){
            var imgreg=/.+((\.jpg$)|(\.png$))/gi;
            var videoreg=/.+((\.mp3$)|(\.mp4$))/gi;
            if(imgreg.test(this.radioPoster.name)&&videoreg.test(this.radioInfo.name)){
                this.message='正在上传...';
                var formData = new FormData();
                formData.append('radioPoster', this.radioPoster);
                formData.append('radioInfo', this.radioInfo);
                formData.append('program_name', this.program_name);
                formData.append('program_introduction', this.program_introduction);
                formData.append('program_date', this.program_date);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                axios.post(url+'/admin/video/Amend', formData, config)
                .then(res=>{
                    var data;
                    if(typeof (res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length){
                        data=res.data;
                    }else{
                        data=JSON.parse(res.data)
                    }
                    if(data.code==1){
                        this.message='上传成功';
                    }else{
                        this.message='上传失败';
                    }
                })
                .catch(err=>{
                    this.message='上传失败';
                    console.log(err)
                }); 
            }else{
               this.message='文件格式错误' 
            }
        }else{
            this.message='所有内容不能为空！'
        }    
    },
    getcolumn(){
        axios.post(url+'/admin/radio/columnFindAll',{
            program_name:'',
            page:1
        })
        .then(res=>{
            var data;
            if(typeof (res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length){
                data=res.data;
            }else{
                data=JSON.parse(res.data)
            }
            if(data.code==1){
                this.column_program_name=data.column_program_name;
                this.getItemSund();
            }
        })
        .catch(err=>{
            console.log(err)
        }); 
    },
    getItemSund(){
        var itemRadio=decodeURI(window.location.search.substring(1));
        var reg = /.+=(.+)&.+=()/g; 
        var radio = reg.exec(itemRadio);
        axios.post(url+'/admin/radio/Find',{
            program_name:radio[1],
            program_content_id:radio[2]
        })
        .then(res=>{
            var data;
            if(typeof (res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length){
                data=res.data;
            }else{
                data=JSON.parse(res.data)
            }
            if(data.code==1){
                this.radioList=data.radioList;
                this.program_name=this.radioList[0].program_name;
                this.program_date=this.radioList[0].program_date;
                this.program_introduction=this.radioList[0].program_introduction;
                this.program_content_id=this.radioList[0].program_content_id;
            }
        })
        .catch(err=>{
            console.log(err)
        }); 
    }
  },
  mounted(){
        this.$nextTick(function(){
            this.getcolumn();
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message{
    color:#ca7117;
}
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
