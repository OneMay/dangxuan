<template>
    <div class="video">
        <form action="#" method="post" class="definewidth m20" enctype="multipart/form-data">
        <table class="table table-bordered table-hover m10" style="margin-left:10px;margin-top:3px;">
            <tr>
                <td width="10%" class="tableleft">杂志名称</td>
                <td>
                    <select name="bigTypeId">
                        <option value="0">微众</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="tableleft">期数</td>
                <td><input type="text" name="bookName" v-model="magazine_journal_no" /></td>
            </tr>
            <tr>
                <td class="tableleft">主题文字</td>
                <td><input type="text" name="words" v-model="magazine_journal_title"  /></td>
            </tr>
            <tr>
                <td class="tableleft">封面</td>
                <td class="tableleft" >
                    <input type="file" name="GoodsPicture" id="GoodsPicture" @change="getFile" multiple="multiple" accept=".jpg,.png" />
                </td>
        <!--         <td class="tableleft">图片预览</td> -->
        <!--         <td><img name="showimg" id="showimg" src="" style="display:none;" alt="预览图片" /> </td> -->
            </tr>
            <tr>
                <td class="tableleft">杂志封面大小</td>
                <td><input type="text" name="bookJpgnumber"readonly="readonly"/>小于10M</td>
            </tr>
            <tr>
                <td class="tableleft"></td>
                <td>
                    <span style="margin-left:5px;" class="btn btn-primary"  @click="addMagazine">保存</span> &nbsp;&nbsp;<router-link class="btn btn-success" name="backid" id="backid" to="/admin/bookQuery">返回列表</router-link>
                    <span v-text="message" class='message'></span>
                </td>
            </tr>
        </table>
    </form>
  </div>
</template>

<script>
    import Axios from 'axios'
    const url = '/getAdmin'
    export default {
        name: 'bookAdd',
        data() {
            return {
                username: "",
                password: "",
                message: '',
                page: 1,
                megazinePeriods: [],
                magazine_journal_no: '',
                magazine_journal_title: '',
                magazine_journal_picture: '',
                magazine_program_id: ''
            }
        },
        methods: {
            returnItem(item) {
                this.$emit('choseItem', item)
            },
            getFile(e) {
                this.magazine_journal_picture = e.target.files[0];
            },
            addMagazine() {
                var that = this;

                // e.preventDefault();
                if (this.magazine_journal_picture && this.magazine_journal_no && this.magazine_journal_title) {
                    var imgreg = /.+((\.jpg$)|(\.png$))/gi;
                    if (imgreg.test(this.magazine_journal_picture.name)) {
                        this.message = '正在上传...';
                        var formData = new FormData();
                        formData.append('magazine_journal_picture', this.magazine_journal_picture);
                        formData.append('magazine_journal_no', this.magazine_journal_no);
                        formData.append('magazine_journal_title', this.magazine_journal_title);
                        formData.append('magazine_program_id', this.magazine_program_id);
                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                        Axios.post(url + '/admin/magazine/amend', formData, config)
                            .then(res => {
                                var data;
                                if (typeof(res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length) {
                                    data = res.data;
                                } else {
                                    data = JSON.parse(res.data)
                                }
                                if (data.code == 1) {
                                    this.message = '更新成功';
                                }
                                //console.log(res.data)
                            })
                            .catch(err => {
                                this.message = '更新失败';
                                console.log(err)
                            });
                    } else {
                        this.message = '文件格式错误'
                    }
                } else {
                    this.message = '所有内容不能为空！'
                }
            },
            getPeriods() {
                var program = decodeURI(window.location.hash.substring(1));
                var reg = /.+=(.+)/g;
                var journal_no = reg.exec(program)[1];
                Axios.post(url + '/admin/magazine/findPeriods', {
                        magazine_journal_no: journal_no
                    })
                    .then(res => {
                        var data;
                        if (typeof(res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length) {
                            data = res.data;
                        } else {
                            data = JSON.parse(res.data)
                        }
                        if (data.code == 1) {
                            this.magazine_journal_no = data.magazine_journal_no;
                            this.magazine_journal_title = data.magazine_journal_title;
                            this.magazine_program_id = data.magazine_program_id
                        } else {
                            this.message = data.message;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        },
        mounted() {
            this.$nextTick(function() {
                this.getPeriods();
            })
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    body {
        font-size: 20px;
        padding-bottom: 40px;
        background-color: #e9e7ef;
    }
    
    .sidebar-nav {
        padding: 9px 0;
    }
    
    .message {
        color: #ca7117;
    }
    
    @media (max-width: 980px) {
        /* Enable use of floated navbar text */
        .navbar-text.pull-right {
            float: none;
            padding-left: 5px;
            padding-right: 5px;
        }
    }
    
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
        text-align: left;
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
</style>