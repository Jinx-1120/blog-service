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
      // 第一步.将图片上传到服务器.
      // var formdata = new FormData();
      // formdata.append('image', $file);
      // this.http({
      //   url: '/uploadImg',
      //   method: 'post',
      //   data: formdata,
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // }).then((info) => {
      //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //   // $vm.$img2Url 详情见本页末尾
      //   let url = info.data.data.baseImgUrl + info.data.data.path
      //   this.$refs.md.$img2Url(pos, url);
      // })
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
              this.$refs.md.$img2Url(pos, 'http://qn.jinhaidi.cn/' + res.key);
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
