<template>
  <div class="show-article">
      <markdown-editor id="contentEditor" ref="contentEditor" :type="false" :value="articleDate.content" :zIndex="20"></markdown-editor>
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
      this.articleDate = info.data
    })
  },
  components: {
    MarkdownEditor
  }
}
</script>

<style>


</style>
