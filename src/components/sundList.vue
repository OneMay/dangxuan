<template>
    <div class="video">
    <div class="form-inline definewidth m20">
    
    <router-link class="btn btn-success" id="addnew" to="/admin/sundPageAdd">添加广播</router-link>
    <router-link class="btn btn-danger"  id="addnew" to="/admin/sundJpgAdd">首页轮播</router-link>
</div>
<table class="table table-bordered table-hover definewidth m10">
    <thead>
    <tr>
        <th>栏目名称</th>
        <th>日期</th>
       
        <th>上传日期</th>
        <th>管理菜单</th>
    </tr>
    </thead>
        <tr v-for="item in radioList">
            <td v-text="item.program_name"></td>
            <td v-text="item.program_date"></td>
            <td v-text="item.program_audio_timestamp"></td>               
            <td> <span class="btn btn-danger" @click="radioDel(item)">删除</span><span class="btn btn-primary" @click="radioAmend(item)">修改</span><span class="btn btn-success"  @click="watch(item.program_content_id)">音频预览</span></td>
               
        </tr>    
       </table>
       <nav>
          <p style="text-align:center">一共有{{count}}条数据，每页最多显示{{limit}}条数据，共{{currentPage}}页，当前第{{page}}页</p>
          <ul class="pager">
              <li class="previous"><span @click="getradioList(--page)">上一页</span></li>
              <li class="next"><span @click="getradioList(++page)">下一页</span></li>
          </ul>
      </nav>
      <Modal
        v-model="modal10"
        title=""
        :styles="{top: '50%',marginTop:height}"
        class-name="vertical-center-modal"
        @on-ok="ok"
        @on-cancel="cancel">
       <audio v-if="play" :src="sund.sources[0].src" controls="controls" style="width:100%;margin-top:20px;">
        </audio>
    </Modal>
  </div>
</template>

<script>
    import axios from 'axios'
    const url = '/getAdmin'
    export default {
        name: 'sundList',
        data() {
            return {
                play: false,
                height: '-44.5px',
                username: "",
                password: "",
                message: '',
                radioList: [],
                page: 1,
                count: null,
                currentPage: null,
                limit: null,
                program_name: '',
                modal9: false,
                modal10: false,
                sund: {
                    sources: [{
                        src: '', //http://localhost:8089/static/public/avatar/计算机科学及编程导论 第02集.mp4'
                        type: 'video/mp3'
                    }],
                    options: {
                        autoplay: true,
                        volume: 0.6,
                        poster: ''
                    }
                }
            }
        },
        methods: {
            ok(e) {
                this.play = false;
                this.$Message.info('');
            },
            cancel() {
                this.play = false;
                this.$Message.info('');
            },
            watch(item) {
                this.modal10 = true;
                this.play = true;
                axios.post(url + '/admin/radio/Preview', {
                        program_content_id: item,
                    })
                    .then(res => {
                        var data;
                        if (typeof(res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length) {
                            data = res.data;
                        } else {
                            data = JSON.parse(res.data)
                        }
                        if (data.code == 1) {
                            this.play = true;
                            this.sund.sources = [{
                                src: data.program_audio_url,
                                type: 'video/mp3'
                            }]
                            setTimeout(function() {
                                $('.container').removeClass('container');
                                this.height = '-' + $('.ivu-modal')[0].clientHeight / 2 + 'px';
                            }, 0)
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });

                $('.ivu-modal-footer').remove();
                setTimeout(function() {
                    this.height = '-' + $('.ivu-modal')[0].clientHeight / 2 + 'px';
                }, 0)
            },
            search() {
                this.page = 1;
                axios.post(url + '/admin/radio/FindAll', {
                        page: this.page,
                        program_name: this.program_name
                    })
                    .then(res => {
                        var data;
                        if (typeof(res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length) {
                            data = res.data;
                        } else {
                            data = JSON.parse(res.data)
                        }
                        if (data.code == 1) {
                            this.limit = data.limit;
                            this.count = data.count;
                            this.currentPage = data.currentPage;
                            this.page = data.page;
                            this.radioList = data.radioList;
                        } else {
                            this.message = data.message;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            radioDel(item) {
                axios.post(url + '/admin/radio/del', {
                        program_content_id: item.program_content_id
                    })
                    .then(res => {
                        var data;
                        if (typeof(res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length) {
                            data = res.data;
                        } else {
                            data = JSON.parse(res.data)
                        }
                        if (data.code == 1) {
                            this.getradioList(1);
                        } else {
                            this.message = data.message;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            radioAmend(item) {
                window.location.href = '/#/admin/sundPageAmend?program_name=' + item.program_name + '&program_content_id=' + item.program_content_id;

            },
            getradioList(num) {
                if (num > this.currentPage) {
                    num = this.currentPage;
                    this.page = this.currentPage;
                }
                if (num <= 1) {
                    num = 1;
                    this.page = 1;
                }
                axios.post(url + '/admin/radio/FindAll', {
                        page: this.page,
                        program_name: this.program_name
                    })
                    .then(res => {
                        var data;
                        if (typeof(res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length) {
                            data = res.data;
                        } else {
                            data = JSON.parse(res.data)
                        }
                        if (data.code == 1) {
                            this.limit = data.limit;
                            this.count = data.count;
                            this.currentPage = data.currentPage;
                            this.page = data.page;
                            this.radioList = data.radioList;
                        } else {
                            this.message = data.message;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        },
        mounted() {
            this.$nextTick(function() {
                this.getradioList(this.page);
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body {
        font-size: 20px;
        font-size: 20px;
        padding-bottom: 40px;
        background-color: #e9e7ef;
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
    body {
        font-size: 13px;
    }
    
    select,
    textarea,
    input[type="text"],
    input[type="password"],
    input[type="datetime"],
    input[type="datetime-local"],
    input[type="date"],
    input[type="month"],
    input[type="time"],
    input[type="week"],
    input[type="number"],
    input[type="email"],
    input[type="url"],
    input[type="search"],
    input[type="tel"],
    input[type="color"],
    .uneditable-input {
        padding: 1px;
    }
    
    select {
        height: 24px;
    }
    
    .radio {
        font-size: 11px;
        margin-bottom: 4px;
    }
    
    .nav {
        margin-bottom: 5px;
    }
    
    form {
        margin: 0 0 5px;
    }
    
    .page {
        text-align: right;
        margin-right: 25px;
        margin-top: 5px;
    }
    
    .page a {
        margin-left: 5px;
    }
    
    .page .current {
        margin-left: 5px;
        color: red;
    }
    /*1*/
    
    .table td input[type="checkbox"] {
        padding: 0;
        margin: 0;
    }
    
    .table th input[type="checkbox"] {
        padding: 0;
        margin: 0;
    }
    
    .table td,
    .table th {
        padding-top: 8px;
        padding-bottom: 4px;
        line-height: 20ppx;
    }
    
    .table th {
        background-color: #eaeaea;
    }
    
    .tableleft {
        text-align: right;
        padding-left: 5px;
        background-color: #f5f5f5;
    }
    
    .definewidth {
        width: 96%;
        margin: auto;
    }
    /*2*/
    
    .table2 td input[type="checkbox"] {
        padding: 0;
        margin: 0;
    }
    
    .table2 th input[type="checkbox"] {
        padding: 0;
        margin: 0;
    }
    
    .table2 td,
    .table2 th {
        padding-top: 10px;
        padding-bottom: 4px;
        line-height: 50ppx;
    }
    
    .table2 th {
        background-color: #eaeaea;
    }
    
    .table2left {
        text-align: center;
        padding-left: 10px;
        background-color: #f5f5f5;
    }
    
    .definewidth2 {
        width: 50%;
        margin: auto;
    }
    
    .m10 {
        margin-top: 10px;
    }
    
    .m20 {
        padding-top: 20px;
    }
    
    .m30 {
        padding-top: 50px;
    }
    /*formValidator�?��֤*/
    
    .onShow,
    .onFocus,
    .onError,
    .onCorrect,
    .onLoad,
    .onTime {
        display: inline-block;
        display: -moz-inline-stack;
        zoom: 1;
        *display: inline;
        vertical-align: middle;
        color: #444;
        line-height: 18px;
        padding: 2px 10px 2px 23px;
        margin-left: 10px;
        _margin-left: 5px
    }
    
    .onShow {
        background-position: 3px -147px;
        border-color: #40B3FF;
        color: #959595
    }
    
    .onFocus {
        background-position: 3px -147px;
        border-color: #40B3FF;
    }
    
    .onError {
        background-position: 3px -47px;
        border-color: #40B3FF;
        color: red
    }
    
    .onCorrect {
        background-position: 3px -247px;
        border-color: #40B3FF;
    }
    
    .onLamp {
        background-position: 3px -200px
    }
    
    .onTime {
        background-position: 3px -1356px
    }
    
    .previous,
    .next {
        cursor: pointer;
    }
    
    .previous:hover,
    .next:hover {
        color: red;
    }
</style>