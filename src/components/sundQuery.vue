<template>
    <div class="video">
     <div class="form-inline definewidth m20" action="#" method="get">
    <font color="#777777"><strong>广播名称：</strong></font>
    <input type="text" name="menuname" id="menuname"class="abc input-default" placeholder="" v-model="program_name" >&nbsp;&nbsp; 
    <span  class="btn btn-primary" @click="search">查询</span>&nbsp;&nbsp; 
	<router-link class="btn btn-success"  id="addnew" to="/admin/sundListAdd">添加栏目</router-link>
</div>
<table class="table table-bordered table-hover definewidth m10">
    <thead>
    <tr>
        <th>栏目名称</th>
        <th>音频个数</th>
        <th>时间</th>
        <th>日期</th>
        <th>管理菜单</th>
    </tr>
    </thead>
        <tr v-for="item in columnList">
            <td v-text="item.program_name">微众</td>
            <td v-text="item.program_number"></td>
            <td v-text="item.program_timestamp"></td>
            <td v-text="item.program_date"></td>
            <td><span class="btn btn-success" @click="columnAmend(item)">修改</span><span class="btn btn-danger" @click="columnDel(item)">删除</span></td>  
        </tr>
    </table>
       <nav>
          <p style="text-align:center">一共有{{count}}条数据，每页最多显示{{limit}}条数据，共{{currentPage}}页，当前第{{page}}页</p>
          <ul class="pager">
              <li class="previous"><span @click="getcolumnList(--page)">上一页</span></li>
              <li class="next"><span @click="getcolumnList(++page)">下一页</span></li>
          </ul>
      </nav>
  </div>
</template>

<script>
    import axios from "axios"
    const url = '/getAdmin'
    export default {
        name: 'sundQuery',
        data() {
            return {
                username: "",
                password: "",
                message: '',
                page: 1,
                count: null,
                currentPage: null,
                limit: null,
                columnList: [],
                program_name: ''
            }
        },
        methods: {
            search() {
                this.page = 1;
                axios.post(url + '/admin/radio/columnFindAll', {
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
                            this.columnList = data.columnList;

                        } else {
                            this.message = data.message;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            columnDel(item) {
                axios.post(url + '/admin/radio/columnDel', {
                        program_id: item.program_id
                    })
                    .then(res => {
                        var data;
                        if (typeof(res.data) == "object" && Object.prototype.toString.call(res.data).toLowerCase() == "[object object]" && !res.data.length) {
                            data = res.data;
                        } else {
                            data = JSON.parse(res.data)
                        }
                        if (data.code == 1) {
                            this.getcolumnList(1);
                        } else {
                            this.message = data.message;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            columnAmend(item) {
                window.location.href = '/#/admin/sundListAmend?program_id=' + item.program_id;
            },
            getcolumnList(num) {
                if (num > this.currentPage) {
                    num = this.currentPage;
                    this.page = this.currentPage;
                }
                if (num <= 1) {
                    num = 1;
                    this.page = 1;
                }
                axios.post(url + '/admin/radio/columnFindAll', {
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
                            this.columnList = data.columnList;

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
                this.getcolumnList(this.page);
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