<template>
  <div class="components-container">
    <!-- <code>Markdown is based on
      <a href="https://github.com/sparksuite/simplemde-markdown-editor" target="_blank">simplemde-markdown-editor</a> ，Simply encapsulated in Vue.
      <a target="_blank" href="https://segmentfault.com/a/1190000009762198#articleHeader14">
        相关文章 </a>
    </code> -->
    <el-form :model="articleData" :rules="rules" ref="articleData" label-width="100px" class="demo-articleData">
      <el-form-item label="文章名称" prop="title" >
        <el-input style="width:50%" v-model="articleData.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="所属标签" prop="tags">
        <el-select v-model="articleData.tags" placeholder="请选择活动区域" @change="choiceTag">
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
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <div class="editor-container">
          <markdown-editor id="contentEditor" @getContent="getContent" ref="contentEditor" :value="content" :zIndex="20"></markdown-editor>
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

const content = ''

export default {
  name: 'markdown-demo',
  components: { MarkdownEditor },
  data() {
    return {
      content: content,
      html: '',
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' }
        ],
        content:[
          { required: true, message: '请输入文章内容' }
        ]
      },
      articleData: {
        title: '',
        tags: [],
        status: 0,
        content: ''
      },
      imageUrl: '',
      tagData: [],
      choiceTags: []
    }
  },
  created() {
    this.http({method:'get',url:'/tagList'}).then(info => {
      if (info.data.code === 200) {
        this.tagData = info.data.data
      } else {
        this.tagData = []
      }
    })
  },
  methods: {
    getContent(val) {
      console.log(val)
      this.articleData.content = val
    },
    addArticle() {
      this.http({method:'post',url:'/addArticle', data: this.articleData}).then(info => {
        console.log(info)
      })
    },
    removeTag(tag) {
      this.choiceTags.splice(this.choiceTags.indexOf(tag), 1);
    },
    choiceTag(val) {
      if (this.choiceTags.indexOf(val) < 0) {
        this.choiceTags.push(val)
      }
      console.log(this.choiceTags)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style>
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
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


