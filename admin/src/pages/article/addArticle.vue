<template>
  <div class="components-container">
    <el-form :model="articleData" :rules="rules" ref="articleData" label-width="100px" class="demo-articleData">
      <el-form-item label="文章名称" prop="title" >
        <el-input style="width:50%" v-model="articleData.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description" >
        <el-input v-model="articleData.description" clearable></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <div class="editor-container" style="margin: 0 2px">
          <markdown-editor id="contentEditor" @getContent="getContent" ref="contentEditor" :value="content" :zIndex="20"></markdown-editor>
        </div>
      </el-form-item>
      <el-form-item label="所属标签" prop="tags">
        <el-select v-model="onTag" placeholder="请选择文章标签" @change="choiceTag">
          <el-option v-for="item in tagData" :key="item._id" :label="item.tagName" :value="item.tagName"></el-option>
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
        </el-select>
        <div>
          <el-tag
            v-for="tag in choiceTags"
            :key="tag.name"
            closable
            @close="removeTag(tag)">
            {{tag}}
          </el-tag>
        </div>
      </el-form-item>
      <el-form-item label="文章封面">
        <div class="add">
          <!-- <el-input v-model="articleData.coverImg" clearable></el-input> -->
          <img v-if="articleData.coverImg" :src="articleData.coverImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <input type="file" multiple accept="image/*"
            @change="uploadCoverImg" ref="file"
          >
        </div>
      </el-form-item>
      <el-form-item label="状态" prop="status" style="margin-top:30px">
        <el-radio-group v-model="articleData.status">
          <el-radio :label="0">发布</el-radio>
          <el-radio :label="1">草稿</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-button :disabled="articleData.title === ''" @click="addArticle" style="margin-top:80px;" type="primary" icon="el-icon-document">确定</el-button>
  </div>
</template>

<script>
import MarkdownEditor from '../../components/mardownEditor'
import articleVue from './article.vue';
import * as qiniu from 'qiniu-js'

const content = ''

export default {
  name: 'markdown-demo',
  components: { MarkdownEditor },
  data() {
    return {
      content: content,
      uploadHeaders: { 'Content-Type': 'multipart/form-data' },
      html: '',
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入文章描述', trigger: 'blur' }
        ],
        content:[
          { required: true, message: '请输入文章内容' }
        ]
      },
      articleData: {
        title: '',
        description: '',
        tags: [],
        status: 0,
        content: '',
        coverImg: ''
      },
      onTag: '',
      tagData: [],
      choiceTags: []
    }
  },
  created() {
    this.http({method:'get',url:'/tagList'}).then(info => {
      if (info.code === 200) {
        this.tagData = info.data
      } else {
        this.tagData = []
      }
    })
  },
  methods: {
    getContent(val) {
      this.articleData.content = val
    },
    addArticle() {
      this.http({method:'post',url:'/addArticle', data: this.articleData}).then(info => {
        if (info.data.code === -1) {
          this.$router.push('/login')
        } else {
          this.$router.push('/article')
        }
      })
    },
    removeTag(tag) {
      this.choiceTags.splice(this.choiceTags.indexOf(tag), 1);
    },
    choiceTag(val) {
      if (this.choiceTags.indexOf(val) < 0) {
        this.choiceTags.push(val)
      }
      this.articleData.tags = this.choiceTags
    },
    uploadCoverImg() {
      let files = this.$refs.file.files[0]
      const putExtra = {
        params: {},
        fname: files.name,
        mimeType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
      }
      const upOptions = {
        useCdnDomain: true
      }
      this.http({
        url:  `/getQN?${Math.random(1) * 10000}`,
        method: 'get'
      }).then(res => {
        console.log(res.data.token)
        const observable = qiniu.upload(files, files.name, res.data.token, putExtra, upOptions)
        const subscription = observable.subscribe({
          error: err => {
            console.error('失败', err)
          },
          complete: res => {
            console.log(res)
            if(res.hash) {
              this.articleData.coverImg = 'https://static.jinhaidi.cn/' + res.key;
            }
          }
        })
      })
      // var formdata = new FormData();
      // formdata.append('file', files);
      // this.http({
      //   url: '/getQN',
      //   method: 'get'
      // }).then(res => {
      //   formdata.append('token', res.data.token);
      //   formdata.append('key', files.name);
      //   this.http({
      //     url: 'http://up.qiniup.com',
      //     method: 'post',
      //     data: formdata,
      //     headers: { 'Content-Type': 'multipart/form-data' },
      //   }).then((info) => {
      //     if(info.hash) {
      //       this.articleData.coverImg = 'https://static.jinhaidi.cn' + info.key
      //     }
      //   })
      // })
    },
  }
}
</script>

<style>
  .components-container {
    overflow-y: auto
  }
  .el-form-item{
    margin-bottom: 25px;
  }
  .el-form-item__content{
    text-align: left;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #ccc;
    border-radius: 5px;
    cursor: pointer;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    width: 178px;
    height: 178px;
    opacity: 0;
    cursor: pointer;
  }
</style>


