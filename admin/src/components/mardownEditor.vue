<template>
  <div class="editor-container" >
    <div v-if="type" id="editor">
        <mavon-editor :ishljs="true" ref=md @imgAdd="$imgAdd" :subfield="false" :value="value" @change="editChange"></mavon-editor>
    </div>
    <div v-else class="showview">
        <mavon-editor  :navigation="true"  defaultOpen="preview" codeStyle="paraiso-light" :toolbarsFlag="false" :subfield="false" ref=md :value="value" :style="markdownStyle"></mavon-editor>
        <!-- <vue-markdown :source="value" :anchor-attributes="anchorAttrs"></vue-markdown> -->
    </div>
  </div>
</template>

<script>

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import * as qiniu from 'qiniu-js'

export default {
  components: {
    mavonEditor
  },
  name: 'md',
  props: {
    value: String,
    type: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      anchorAttrs: {
        target: '_blank',
        rel: 'noopener noreferrer nofollow',
      },
      markdownStyle: {
          'height': document.documentElement.clientHeight - 60 + 'px'
      }
    }
  },
  watch: {
    value(val) {

    }
  },
  methods: {
    editChange(val,render) {
      this.$emit('getContent', val)
    },
    $imgAdd(pos, $file){
      const putExtra = {
        params: {},
        fname: $file.name,
        mimeType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
      };
      const upOptions = {
        useCdnDomain: true
      }
      this.http({
        url:  `/getQN?${Math.random(1) * 10000}`,
        method: 'get'
      }).then(res => {
        console.log(res.data.token)

        const observable = qiniu.upload($file, $file.name, res.data.token, putExtra, upOptions)
        const subscription = observable.subscribe({
          error: err => {
            console.error('失败', err)
          },
          complete: res => {
            console.log(res)
            if(res.hash) {
              this.$refs.md.$img2Url(pos, 'https://static.jinhaidi.cn/' + res.key);
            }
          }
        })
      })
    },
  },
  destroyed() {
  }
}
</script>

<style scoped>
.showview>>>.v-note-show.single-show{
  flex: 4!important;
}
.showview>>>.v-note-navigation-wrapper{
  position: initial!important;
}
</style>
