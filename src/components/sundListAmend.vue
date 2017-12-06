<template>
    <div class="video">
        <form action="#" method="post" class="definewidth m20" enctype="multipart/form-data">
        <table class="table table-bordered table-hover m10" style="margin-left:10px;margin-top:3px;">
            <tr>
                <td class="tableleft" width="10%">栏目名称</td>
                <td><input type="text" name="program_name" v-model="program_name" /></td>
            </tr>

             <tr>
                <td class="tableleft">日期</td>
                <td>
                    <select name="bigTypeId" v-model="program_date">
                        <option >周一</option>
                        <option >周二</option>
                        <option >周三</option>
                        <option >周四</option>
                        <option >周五</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="tableleft" width="10%">时间</td>
                <td><input type="text" name="program_timestamp" v-model="program_timestamp" /></td>
            </tr>
            <tr>
                <td class="tableleft" width="15%">封面</td>
                <td class="tableleft" style="width: 196px; "><input type="file" name="GoodsPicture" id="GoodsPicture" multiple="multiple" @change="getFile" accept=".jpg,.png"/></td>
            </tr>
            <tr>
                <td class="tableleft"></td>
                <td>
                    <span style="margin-left:5px;" class="btn btn-primary" @click="columnAdd">保存</span> &nbsp;&nbsp;<router-link class="btn btn-success" name="backid" id="backid" to="/admin/sundQuery">返回列表</router-link>
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
  name: 'sundListAmend',
  data () {
    return {
      username:"",
      password:"",
      message:'',
      program_name:'',
      program_date:'',
      program_timestamp:'',
      columnList:[],
      program_id:null,
      pictureInfo:''
    }
  },
  methods:{
      getFile(e){
        this.pictureInfo = e.target.files[0];
    },
    columnAdd(){
         if(this.program_name&&this.program_date&&this.program_timestamp&&this.pictureInfo){
             var imgreg=/.+((\.jpg$)|(\.png$))/gi;
            if(imgreg.test(this.pictureInfo.name)){
                this.message='正在上传...';
                var formData = new FormData();
                formData.append('program_id', this.program_id);
                formData.append('program_picture_url', this.pictureInfo);
                formData.append('program_name', this.program_name);
                formData.append('program_date', this.program_date);
                formData.append('program_timestamp', this.program_timestamp);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            axios.post(url+'/admin/radio/columnAmend', formData, config)
            .then(res=>{
                var data;
                if(typeof (res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length){
                    data=res.data;
                }else{
                    data=JSON.parse(res.data)
                }
                if(data.code==1){
                    this.message='操作成功';
                }else{
                    this.message=data.message;
                }
            })
            .catch(err => {
                console.log(err);
            });
            }else{
              this.message='图片格式错误'  
            }
        }else{
            this.message='所有内容不能为空！'
        }
        
    },
    getcolumn(){
        var getcolumn=decodeURI(window.location.search.substring(1));
        var reg = /.+=(.+)/g;
        var column = reg.exec(getcolumn);
        axios.post(url+'/admin/radio/columnFind',{
           program_id:column[1],
        })
        .then(res=>{
            var data;
            if(typeof (res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length){
                data=res.data;
            }else{
                data=JSON.parse(res.data)
            }
            if(data.code==1){
                this.columnList=data.columnList;
                this.program_id=this.columnList[0].program_id;
                this.program_name=this.columnList[0].program_name;
                this.program_date=this.columnList[0].program_date;
                this.program_timestamp=this.columnList[0].program_timestamp;
            }
        })
        .catch(err => {
            console.log(err);
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
