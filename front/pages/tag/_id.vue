<template>
  <div class="tag main">
    <p class="title">
      <span class="title-name"><i class="iconfont icon-tag"></i> {{tag.tagName}} </span>
      <span class="line"></span>
    </p>
    <div class="article">
      <articleView
        :articleList="list"
        :haveMoreArt="haveMoreArt"
        @loadMore="loadMore"></articleView>
    </div>
  </div>
</template>
<script>

import articleView from '~/components/common/article'
import { mapState } from 'vuex'

export default {

  name: 'tag',

  transition: 'fade',

  scrollToTop: true,

  fetch ({ store, params }) {
    let data = {
      tag: params.id,
      isAll: false
    }
    return store.dispatch('getArtList', data)
  },

  head () {
    return {
      title: `${this.$route.params.id} | tag`,
      meta: [
        { hid: 'description', name: 'description', content: this.$route.params.id }
      ]
    }
  },

  data () {
    return {
    }
  },

  components: {
    articleView
  },

  computed: {

    ...mapState({
      list: state => state.article.artList,
      mobileLayout: state => state.options.mobileLayout
    }),

    tag () {
      const _id = this.$route.params.id
      return this.$store.state.tag.tagList.find(item => item.tagName === _id)
    },

    haveMoreArt () {
      return false
    }
  },

  methods: {
    loadMore () {
      // this.$store.dispatch('getArtList', {
      //   current_page: this.$store.state.article.art.pagination.current_page + 1,
      //   tag: this.$route.params.tag
      // })
    }
  }
}
</script>

<style scoped lang="scss">
.main{
  width: $container-left;
  margin: 0 auto;
}

.tag > .title {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5rem 0rem;
  line-height: 1.5rem;
  font-size: 1rem;
  font-weight: normal;

  i {
    margin-right: .5rem;
  }

  > .title-name {
    position: relative;
    padding-right: $lg-pad;
    background: #f3f3f3;
    z-index: 99;
  }

  > .line {
    top: 50%;
    background:#cccccc;
  }
}
</style>
