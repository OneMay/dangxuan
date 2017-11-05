<template>
<div id="article">
    <h1 style="fontSize:35px;" v-text="articleList[0].list_title"></h1>
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
}
.trazition span{
    margin-right:20px;
}
</style>
