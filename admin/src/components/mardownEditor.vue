<template>
  <div class="editor-container" >
    <div v-if="type" id="editor" style="height:600px">
        <mavon-editor :ishljs="true" ref=md @imgAdd="$imgAdd" :value="value" @change="editChange" style="height: 100%"></mavon-editor>
    </div>
    <div v-else>
        <mavon-editor  defaultOpen="preview" :toolbarsFlag="false" :subfield="false" ref=md :value="value" style="height: 100%"></mavon-editor>
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
    // id: {
    //   type: String
    // },
    // autofocus: {
    //   type: Boolean,
    //   default: false
    // },
    // placeholder: {
    //   type: String,
    //   default: ''
    // },
    // height: {
    //   type: Number,
    //   default: 150
    // },
    // zIndex: {
    //   type: Number,
    //   default: 10
    // },
    // toolbar: {
    //   type: Array
    // }
  },
  data() {
    return {
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
      var formdata = new FormData();
      formdata.append('image', $file);
      this.http({
        url: '/uploadImg',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((info) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        // $vm.$img2Url 详情见本页末尾
        let url = info.data.data.baseImgUrl + info.data.data.path
        this.$refs.md.$img2Url(pos, url);
      })
    },
  },
  destroyed() {
  }
}
</script>

<style scoped>

</style>
