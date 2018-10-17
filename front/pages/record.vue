<template>
  <div class="tag-main main">
    <div class="tag-wrap">
      <div class="title">
        <p>标签</p>
        <span class="line"></span>
      </div>
      <ul class="item-wrap clearfix">
        <li class="tag-item" v-for="(item,index) in tagList" :key="index" @click="getArtListByTag(item.tagName)">
          <nuxt-link :to="`/tag/${item.tagName}`">
            {{item.tagName}}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <!-- {{artList}} -->
    <div class="title">
      <p>文章</p>
      <span class="line"></span>
    </div>
    <div class="sitemap-article-list">
      <div class="year-list" v-for="(item,index) in artList" :key="index">

        <p class="year-name">{{item.year}}</p>
        <ul class="month-list" v-for="(child,ind) in item.months" :key="ind">
          <p class="month-name">{{child.month + 1}} 月</p>
          <li class="sitemap-list" v-for="data in child.data" :key="data.title">
            <article>
              <time>{{data.createTime | dateFormat('MM.dd')}}</time>
              <nuxt-link :to="`/article/${data._id}`">
                {{data.title}}
              </nuxt-link>
            </article>

          </li>
        </ul>
      </div>
    </div>

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
      artList: state => state.article.arts
    })
  },
  methods: {
    getArtListByTag(name) {

    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  width: $container-left;
  margin: 0 auto;
}
.tag-main{
  padding: 30px 20px 50px 20px;
  border-radius: 5px;
  background: #f3f3f3;
}
.tag-wrap{
  >.item-wrap{
    padding: 1rem;
    >.tag-item{
      float: left;
      margin:.714286rem;
      color: #463c3c;
      font-size: 1.571429rem;
    }
  }

}
.title {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0rem;
    line-height: 1.5rem;
    color: $black;
    font-size: 1rem;
    font-weight: normal;

    > p {
      position: relative;
      padding-right: $lg-pad;
      background: #f3f3f3;
      z-index: 99;
    }

    > .line {
      top: 50%;
      background: #cccccc;
    }
}
.sitemap-article-list {
    padding: 1rem 2rem;

    .year-name {
      font-size: 1.5rem;
      color:#333333;
    }

    .month-list {
      margin: 1rem 2rem;

      .month-name {
        margin-bottom: .5rem;
      }

      .sitemap-list {
        padding: .5rem 2rem;

        article {
          position: relative;
          display: flex;
          align-items: center;
          height: 20px;
          line-height: 20px;

          &::before {
            content: " ";
            position: absolute;
            left: 0px;
            top: 6px;
            width: 6px;
            height: 6px;
            margin-left: -4px;
            background: #ccc;
            border-radius: 50%;
          }

          time {
            margin-left: 1rem;
            color: #666666;
            font-size: $font-size-small;

          }

          a {
            margin-left: $md-pad;
            text-decoration: underline;
            color: $black;
            @include text-overflow();
          }
        }
      }
    }

    .sitemap-item {
      padding: 1rem;

      article {
        position: relative;
        display: flex;
        align-items: center;
        height: 20px;
        line-height: 20px;

        &::before {
          content: " ";
          position: absolute;
          left: 0px;
          top: 6px;
          width: 6px;
          height: 6px;
          margin-left: -4px;
          background: $dividers;
          border-radius: 50%;
        }

        time {
          margin-left: $md-pad;
          color: $dividers;
          font-size: $font-size-small;

        }

        a {
          margin-left: $md-pad;
          text-decoration: underline;
          color: $black;
          @include text-overflow();
        }
      }
    }
  }
</style>
