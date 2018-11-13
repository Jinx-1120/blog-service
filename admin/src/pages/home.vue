<template>
  <div>
    <el-row class="bth-wrap">
      <el-button class="left" size="mini" type="primary" @click="infoDialogVisible = true">完善信息</el-button>
    </el-row>
    <div class="homenes">
      <div class="image-head">
        <img :src="userInfo.headImg ? userInfo.headImg : '/static/code.jpg' " alt="" width="300">
      </div>
      <el-form class="info" :model="userInfo" label-width="180px">
        <el-form-item label="花名">{{userInfo.name || ''}}</el-form-item>
        <el-form-item label="登陆账号">{{userInfo.userName}}</el-form-item>
        <el-form-item label="个人描述">{{userInfo.description || '暂未填写'}}</el-form-item>
        <el-form-item label="个人喜好">
          <el-tag type="success" v-for="item in userInfo.likes" :key="item">{{item}}</el-tag>
        </el-form-item>
        <el-form-item label="友情链接">{{userInfo.friends}}</el-form-item>
        <el-form-item label="个人链接">{{userInfo.link}}</el-form-item>
      </el-form>
    </div>
    <div v-if="infoDialogVisible">
      <user-dialog :infoDialogVisible="infoDialogVisible" @close="close"></user-dialog>
    </div>

  </div>

</template>

<script>
import userDialog from '../components/userInfoDialog'

export default {
  data () {
    return {
      userInfo: {
        userName: '',
        type: '',
        headImg: '',
        description: '',
        likes: [],
        friends: [],
        name: '',
        link: []
      },
      infoDialogVisible: false
    }
  },
  created () {
    this.http({
      method: 'get',
      url: `/userInfo`,
    }).then(res => {
      this.userInfo = res.data
    })
  },
  methods: {
    close() {
      this.infoDialogVisible = false
    }
  },
  components: {
    userDialog
  }
}
</script>

<style lang="scss" scoped>
.bth-wrap{
  padding: 30px
}
.homenes{
  display: flex;
  >.image-head {
    flex:2;
    >img{
      border: 1px solid dashed;
      border-radius: 5px;
      box-shadow: 2px 1px 2px 3px #ccc;
    }
  }
  >.info{
    flex:3
  }
}
</style>
