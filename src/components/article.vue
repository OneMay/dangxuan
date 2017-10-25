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
               magazine_journal_no:'第十一期',//期数,
                list_title:'天天看',//文章标题
                insert_time:'2017-9-12',//时间
                list_writer:'admin',//作者，
                magazine_list_id:'1',
                list_content:'"<p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp;2:传入参数：{</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; magazine_list_id:&#39;&#39;,(更新)</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; magazine_journal_no:&#39;&#39;,//(期数)</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; list_title:&#39;&#39;,//（文章标题）</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; list_content:&#39;&#39;,//(文章内容)</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; list_writer:&#39;&#39;//(文章作者)</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; }</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; 3：返回参数</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; messageInfo:{</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; code:number(0:表示失败，1：表示成功,404:表示身份验证失败)，</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; message:&#39;操作成功&#39;</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; }</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; }</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp;&nbsp;</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp;k:文章预览：{</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; 1：url地址：http://../admin/magazine/previewArticle,</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; 2:传入参数：{</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; list_title:&#39;&#39;,//（文章标题）</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; }</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; 3：返回参数</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; messageInfo:{</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; code:number(0:表示失败，1：表示成功,404:表示身份验证失败)，</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; articleList:[{</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; magazine_journal_no:&#39;&#39;//期数,</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; list_title:&#39;&#39;,//文章标题</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; insert_time:&#39;&#39;//时间</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; list_writer:&#39;&#39;//作者,</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; list_content:&#39;&#39;//内容</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; }],</span></p><p style="text-align: center;"><span style="color: rgb(84, 141, 212); font-size: 20px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; message:&#39;操作成功&#39;</span></p><p><br/></p>"'
            }]
        }
    },
    methods:{
        getArticle(){
            var path = decodeURI(window.location.search.substring(1));
            var reg = /.+=(.+)/gi;
            var article = reg.exec(path)[1];
            axios.post(url+'/admin/magazine/previewArticle',{
                list_title:article
            })
            .then(res=>{
                 var data;
                if(typeof (res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length){
                    data=res.data;
                }else{
                    data=JSON.parse(res.data)
                }
                if(data.code==1){
                    this.articleList=articleList;
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
    font-size: 16px;
    color: #f36228;
}
.trazition span{
    margin-right:20px;
}
</style>
