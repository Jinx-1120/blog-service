<template>
  <div style="margin-top:10px">
    <el-form left :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="dialogAddTag = true">添加标签</el-button>
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
        prop="time"
        label="创建时间">
        <template slot-scope="scope">
          {{scope.row.time | moment("YYYY-MM-DD hh:mm:ss A")}}
        </template>
      </el-table-column>
      <el-table-column
        prop="tagName"
        label="标签"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="标签描述"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="btn"
        label="操作">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" circle @click="removeTag(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-el-drag-dialog title="添加标签" :visible.sync="dialogAddTag">
      <el-form :model="addTagForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标签名" prop="tagName">
          <el-input v-model="addTagForm.tagName"></el-input>
        </el-form-item>
        <el-form-item label="标签描述" prop="description">
          <el-input v-model="addTagForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="addTagForm.tagName === ''" type="primary" @click="submitForm()">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data () {
    return {
      addTagForm: {
        tagName: '',
        description: ''
      },
      tagData:[],
      dialogAddTag: false,
      rules:{
        tagName: [
          { required: true, message: '请输入标签名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getTaglist()
  },
  methods: {
    // 添加标签
    submitForm() {
      this.http({method:'post',url:'/addTag',data:this.addTagForm}).then(info => {
        if (info.code === 201) {
          this.dialogAddTag = false
          this.getTaglist()
        } else {
          this.dialogAddTag = false
        }
        this.addTagForm.tagName = ''
        this.addTagForm.description = ''
      })
    },
    // 获取列表数据
    getTaglist() {
      this.http({method:'get',url:'/tagList'}).then(info => {
        if (info.code === 200) {
          this.tagData = info.data
        } else {
          this.tagData = []
        }
      })
    },
    // 删除标签
    removeTag(item) {
      this.$confirm(`是否确定删除${item.tagName}标签`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.http({
          method: 'delete',
          url: '/delTag',
          data: {
            tagName:item.tagName
          }
        }).then(info => {
          this.getTaglist()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  components: {

  }
}
</script>

<style>


</style>
