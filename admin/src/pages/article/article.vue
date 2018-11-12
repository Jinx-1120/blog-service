<template>
  <div style="margin-top:10px" class="article-list">
    <el-form :model="formInline" :inline="true" class="demo-form-inline">
      <el-form-item label="关键字">
        <el-input v-model="formInline.article" placeholder="keyWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <router-link :to="{name:'addArticle'}">
          <el-button type="primary" @click="addArticle">添加新文章</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <el-table
      :data="artcleList"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="100">
      </el-table-column>
      <el-table-column
        prop="title"
        label="封面"
        align="center">
        <template slot-scope="scope">
          <img width="70" height="45" v-if="scope.row.coverImg" :src="scope.row.coverImg" alt="">
          <span v-else> - </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="文章标题"
        align="center"
        show-overflow-tooltip>
        <!-- <template slot-scope="scope">
          {{scope.row.time | moment("YYYY-MM-DD hh:mm:ss A")}}
        </template> -->
      </el-table-column>
      <el-table-column
        prop="tags"
        label="标签"
        align="center">
        <template slot-scope="scope">
          <el-tag style="margin: 0 2px" v-for="(item,index) in scope.row.tags" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        align="center"
        width="260">
        <template slot-scope="scope">
          <span v-if="scope.row.updateTime">{{scope.row.updateTime | moment("YYYY-MM-DD hh:mm:ss A")}}</span>
          <span v-else>{{scope.row.createTime | moment("YYYY-MM-DD hh:mm:ss A")}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        align="center">
        <template slot-scope="scope">
          <span>{{scope.row.status === 0 ? '发布' : '草稿'}}</span>
          <svg-icon class="article-status" v-if="scope.row.status === 0" icon-class="publish"></svg-icon>
          <svg-icon v-else icon-class="draft"></svg-icon>
        </template>
      </el-table-column>
      <el-table-column
        prop="btn"
        label="操作"
        align="center">
        <template slot-scope="scope">
          <router-link :to="{name:'showArticle', params: {id : scope.row._id } }">
            <el-button type="success" icon="el-icon-search" circle></el-button>
          </router-link>
          <router-link :to="{name:'editArticle', params: {id : scope.row._id } }">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </router-link>
          <el-button type="danger" icon="el-icon-delete" circle @click="removeTag(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
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
      artcleList:[],
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
        if (info.code === 200) {
          this.artcleList = info.data.data
        } else {
          this.artcleList = []
        }
      })
    },
    // 删除文章
    removeTag(item) {
      this.$confirm(`是否确定删除：${item.title}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.http({
          method: 'delete',
          url: `/delArticle/${item._id}`,
        }).then(info => {
          this.getArticlelist()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    onSubmit() {
      this.http({
        method: 'get',
        url: `search/?keyword=${this.formInline.article}`
      }).then(info => {
        this.artcleList = info.data.docs
      })
    }
  },
  components: {
    AddArticle
  }
}
</script>

<style scoped>
  .article-list>>>.svg-icon{
    width: 25px;
    height: 25px;
  }
</style>
