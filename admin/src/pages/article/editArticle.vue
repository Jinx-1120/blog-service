<template>
  <div class="show-article">
      <markdown-editor id="contentEditor" ref="contentEditor" @getContent="getContent" :type="true" :value="articleDate.content" :zIndex="20"></markdown-editor>
      <el-button @click="editArticle" style="margin-top:80px;" type="primary" icon="el-icon-document">确定</el-button>
  </div>

</template>

<script>
import MarkdownEditor from '../../components/mardownEditor'

export default {
  data () {
    return {
      articleDate: {
        content: ''
      }
    }
  },
  created() {
    this.http({
      method: 'get',
      url: `/article/${this.$route.params.id}`
    }).then(info => {
      console.log(info)
      this.articleDate = info.data.data
    })
  },
  methods: {
    editArticle() {
      console.log(this.articleDate.content)
    },
    getContent(val) {
      this.articleDate.content = val
    },
  },
  components: {
    MarkdownEditor
  }
}
</script>

<style>


</style>
