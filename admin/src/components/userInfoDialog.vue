/*
 * @Author: jhd
 * @Date: 2018-10-19 17:50:29
 * @Description: 更新用户资料
 */
<template>
  <div>
    <el-dialog
      title="完善信息"
      :visible.sync="infoDialogVisible"
      width="60%"
      :before-close="DialogClose"
      center>
      <div class="dialog-content">
        <div class="add">
          <img v-if="userInfo.headImg" :src="userInfo.headImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <input type="file" multiple accept="image/*"
            @change="uploadCoverImg" ref="file"
          >
        </div>
        <el-form class="info" :model="userInfo" label-width="180px">
          <el-form-item label="头像地址">
            <el-input v-model="userInfo.headImg" clearable></el-input>
          </el-form-item>
          <el-form-item label="花名">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="登陆账号">
            <el-input v-model="userInfo.userName"></el-input>
          </el-form-item>
          <el-form-item label="个人描述">
            <el-input type="textarea" v-model="userInfo.description"></el-input>
          </el-form-item>
          <el-form-item label="个人喜好">
            <el-tag
              :key="tag"
              v-for="tag in userInfo.likes"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="likeInputVisible"
              v-model="likeInputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" icon="el-icon-circle-plus" size="small" @click="showInput"></el-button>
          </el-form-item>
          <el-form-item label="友情链接">
            <el-form >
              <el-button icon="el-icon-circle-plus" size="small" @click="addDomain('friends')"></el-button>
              <div v-for="(item,index) in userInfo.friends" :key="index"  class="link-wrap">
                <el-form-item label="名称">
                  <el-input class="item-input" v-model="item.name"></el-input>
                  <el-button icon="el-icon-remove" size="small" @click.prevent="removeDomain('friends',item)"></el-button>
                </el-form-item>
                <el-form-item label="链接">
                  <el-input class="item-input" v-model="item.link"></el-input>
                </el-form-item>
              </div>
            </el-form>
          </el-form-item>
          <el-form-item label="个人主页">
            <el-form>
              <el-button icon="el-icon-circle-plus" size="small" @click="addDomain('link')"></el-button>
              <div v-for="(item,index) in userInfo.link" :key="index" class="link-wrap">
                <el-form-item label="名称">
                  <el-input class="item-input" v-model="item.name"></el-input>
                  <el-button icon="el-icon-remove" size="small" @click.prevent="removeDomain('link',item)"></el-button>
                </el-form-item>
                <el-form-item label="链接">
                  <el-input class="item-input" v-model="item.link"></el-input>
                </el-form-item>
              </div>
            </el-form>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="DialogClose">取 消</el-button>
        <el-button type="primary" @click="onSubmitInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as qiniu from 'qiniu-js'

export default {
  props: ['infoDialogVisible'],
  data () {
    return {
      userInfo: {},
      likeInputVisible: false,
      likeInputValue: ''
    }
  },
  created () {
    this.http({
      method: 'get',
      url: '/userInfo'
    }).then(res => {
      this.userInfo = res.data
    })
  },
  components: {

  },
  methods: {
    onSubmitInfo () {
      this.userInfo.friends = this.friends
      this.userInfo.link = this.link
      this.http({
        method: 'put',
        url:'/updateInfo',
        data: this.userInfo
      }).then(res => {
        console.log(res)
      })
    },
    handleClose(tag) {
      this.likes.splice(this.likes.indexOf(tag), 1);
    },

    showInput() {
      this.likeInputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    removeDomain(val,item) {
      var index = this.userInfo[val].indexOf(item)
      if (index !== -1) {
        this.userInfo[val].splice(index, 1)
      }
    },
    addDomain(val) {
      this.userInfo[val].push({
        name: '',
        link: ''
      });
    },
    handleInputConfirm() {
      let likeInputValue = this.likeInputValue;
      if (likeInputValue) {
        this.userInfo.likes.push(likeInputValue);
      }
      this.likeInputVisible = false;
      this.likeInputValue = '';
    },
    uploadCoverImg() {
      let files = this.$refs.file.files[0]
      // var formdata = new FormData();
      // formdata.append('file', files);
      console.log(files)
      const putExtra = {
        params: {},
        fname: files.name,
        mimeType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
      };
      const upOptions = {
        useCdnDomain: true
      }
      this.http({
        url:  `/getQN?${Math.random(10000)}`,
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
              this.userInfo.headImg = 'http://qn.jinhaidi.cn/' + res.key
            }
          }
        })
      })
    },
    DialogClose() {
      this.$emit('close')
    }
  },
  watch:{
    infoDialogVisible() {
      console.log('sdasasdsd')
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.item-input{
    width: 80%!important;
}
.link-wrap{
  margin-top:10px
}
.add{
  display: flex;
  justify-content: center;
  position: relative;
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
  left: 38%;
  top: 0;
  width: 178px;
  height: 178px;
  opacity: 0;
  cursor: pointer;
}

</style>
