<template>
<div id="article">
    <h1 v-text="articleList[0].list_title"></h1>
    <div class="trazition">
        <span class="magazine_journal_no">期数：{{articleList[0].magazine_journal_no}}</span>
        <span class="insert_time">时间：{{articleList[0].insert_time}}</span>
        <span class="list_writer">作者：{{articleList[0].list_writer}}</span>
    </div>
    <div class="contents" v-html="articleList[0].list_content"></div>
</div>
</template>

<script>
import axios from 'axios'
const url = '/getAdmin'

export default {
    name:'article',
    data(){
        return{
            articleList:[{
               magazine_journal_no:'',//期数,
                list_title:'',//文章标题
                insert_time:'',//时间
                list_writer:'admin',//作者，
                magazine_list_id:'',
                list_content:''
            }]
        }
    },
    methods:{
        getArticle(){
            var path = decodeURI(window.location.search.substring(1));
            var reg = /.+=(.+)/gi;
            var article = reg.exec(path)[1];
            axios.post(url+'/admin/magazine/previewArticle',{
                magazine_list_id:article
            })
            .then(res=>{
                 var data;
                if(typeof (res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length){
                    data=res.data;
                }else{
                    data=JSON.parse(res.data)
                }
                if(data.code==1){
                    this.articleList=data.articleList;
                    this.articleList.forEach(function(val,index){
                        var reg=/(\d{4}-\d{2}-\d{2})(.*||\s*)(\d{2}:\d{2}:\d{2})/;
                        var arr = reg.exec(val.insert_time);
                        var insert_time=arr[1]+'  '+arr[3];
                        val.insert_time=insert_time;  
                    })
                    window.document.title=this.articleList[0].list_title
                    $('#supersized').remove();
                }
            })
        }
    },
    mounted(){
        this.$nextTick(function(){
            setTimeout(function(){
                $('#supersized').remove();
            },0)
            this.getArticle();
        })
    }
}
</script>

<style scoped>
.trazition {
    font-size: 14px;
    color: #f36228;
    margin-bottom: 5px;
    margin: 0px 35px 0 35px;
}
.trazition span{
    font-size: 12px;
}
.contents {
    margin: 0 23px 0 33px;
    height: 500px;
    overflow-y: auto;
    /*三角箭头的颜色*/
    scrollbar-arrow-color: #fff;
    /*滚动条滑块按钮的颜色*/
    scrollbar-face-color: #fff;
    /*滚动条整体颜色*/
    scrollbar-highlight-color: #fff;
    /*滚动条阴影*/
    scrollbar-shadow-color: rgba(0,0,0,0.3);
    /*滚动条轨道颜色*/
    scrollbar-track-color: #fff;
}
h1 {
    padding-top: 155px;
    /* position: relative; */
    margin: 0 35px 0 35px;
}
#article{
    width: 432px;
    margin: 0 auto;
    background: url(/static/images/phone.jpg) no-repeat;
    height: 810px;
    overflow: hidden;
    background-size: 432px 810px;
    overflow: auto;
    
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
::-webkit-scrollbar  
{  
    width: 16px;  
    height: 16px; 
    background-color: #ffffff;  
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  
    background-color: #ffffff;  
}  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: #ffffff;  
}
</style>
