<template>
  <div class="main">
    <div class="tag-wrap">
      <span class="tag-item" v-for="(item,index) in tagList" :key="index">{{item.tagName}}</span>
    </div>
    <div v-for="(item,index) in artList" :key="index">{{item.title}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {

    }
  },
  fetch ({ store }) {
    return store.dispatch('getArtList',{'isAll': true})
  },
  computed: {
    ...mapState({
      tagList: state => state.tag.tagList,
      artList: state => state.article.artList
    })
  },
  components: {

  }
}
</script>

<style lang="scss" scoped>
.main{
  width: $container-left;
  margin: 0 auto;
}
.tag-wrap{
  text-align: center;
  >.tag-item{
    padding: 10px;
    color: #463c3c;
    font-size: 1.571429rem;
  }
}

</style>
