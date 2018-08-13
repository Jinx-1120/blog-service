<template>
  <div style="margin-top:10px">
    <el-form :model="formInline" :inline="true" class="demo-form-inline">
      <el-form-item label="标签名">
        <el-input v-model="formInline.article" placeholder="标签名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addArticle">添加新文章</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tagData"
      border
      align="center"
      style="width: 100%">
      <el-table-column
        type="index"
        width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题">
        <!-- <template slot-scope="scope">
          {{scope.row.time | moment("YYYY-MM-DD hh:mm:ss A")}}
        </template> -->
      </el-table-column>
      <el-table-column
        prop="tags"
        label="标签"
        width="180">
        <template slot-scope="scope">
          <el-tag style="margin: 0 2px" v-for="(item,index) in scope.row.tags" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间">
        <template slot-scope="scope">
          {{scope.row.updateTime | moment("YYYY-MM-DD hh:mm:ss A")}}
        </template>
      </el-table-column>
      <el-table-column
        prop="btn"
        label="操作">
        <template slot-scope="scope">
          <el-button type="info" icon="el-icon-search" circle></el-button>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="removeTag(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-dialog v-el-drag-dialog title="添加文章" :visible.sync="dialogAddArticle">
      <AddArticle></AddArticle>
    </el-dialog> -->
  </div>
</template>

<script>
import AddArticle from './addArticle'

export default {
  data () {
    return {
      formInline: {
        article: ''
      },
      addTagForm: {
        article: ''
      },
      tagData:[],
      dialogAddArticle: false,
      rules:{
        article: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getArticlelist()
  },
  methods: {
    submitForm() {

    },
    addArticle() {
      this.$router.push('/addArticle')
    },
    // 获取列表数据
    getArticlelist() {
      this.http({method:'get',url:'/articleList'}).then(info => {
        if (info.data.code === 200) {
          this.tagData = info.data.data.data
        } else {
          this.tagData = []
        }
      })
    },
    // 删除文章
    removeTag(item) {
      this.$confirm(`是否确定删除${item.article}标签`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this.http({
        //   method: 'delete',
        //   url: '/delTag',
        //   data: {
        //     article:item.article
        //   }
        // }).then(info => {
        //   this.getTaglist()
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    onSubmit() {

    }
  },
  components: {
    AddArticle
  }
}
</script>

<style>


</style>
