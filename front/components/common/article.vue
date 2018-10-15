<template>
    <transition-group tag="div" name="slide-down" class="article-box" :class="{'mobile': mobileLayout}">
      <div
        class="article-item"
        v-for="item in articleList.data"
        :key="item._id"
        :class="{'mobile-article': mobileLayout}">
        <div class="content">
          <!-- tags:{{item}}
          viewCount:{{item.viewCount}}
          {{item.title}} -->
          <!-- <img :src="item.coverImg" /> -->
          <div class="artview-wrap">
            <div class="artview-img" v-if="!mobileLayout">
              <span class="type">原创</span>
              <nuxt-link class="image-wrap" :to="`/article/${item._id}`">
                <img :src="item.coverImg"
                :alt="item.title"
                width="100%"
                class="mobil-img"/>
              </nuxt-link>
            </div>
            <div class="artview-contant">
              <p class="title"><nuxt-link :to="`/article/${item._id}`">{{ item.title }}</nuxt-link></p>
              <p class="abstrack">{{ item.description | text(50)}}</p>
              <div class="meta">
                <span class="time">
                  <i class="iconfont icon-date"></i>
                  {{
                    item.createTime | dateFormat('yyyy.MM.dd hh:mm')
                  }}
                </span>
                <span class="read">
                  <i class="iconfont icon-eye"></i>
                   {{ item.viewCount }}
                </span>
                <span class="zan">
                  <i class="iconfont icon-zan"></i>
                   {{ item.fabulous || 0 }}
                </span>
              </div>
            </div>
          </div>

        </div>
        <span class="article-line"></span>
      </div>
      <div class="end-article" v-if="!haveMoreArt" key="-1">
        <i>end</i>
      </div>
      <div class="loading-more end-article " v-if="haveMoreArt" key="-2">
        <a href="javascript:;" @click="$emit('loadMore')" v-if="!fetch" class="allow"><i>more</i></a>
        <a href="javascript:;" v-if="fetch" class="not-allow"><i>loading...</i></a>
      </div>
    </transition-group>

</template>

<script>
export default {
  name: 'article-view',

  props: ['articleList', 'haveMoreArt'],

  computed: {
    fetch () {
      return this.$store.state.article.fetch
    },

    mobileLayout () {
      return this.$store.state.options.mobileLayout
    }
  },
  mounted() {
    console.log(this.articleList)
  },
}
</script>

<style scoped lang="scss">

.article-box {
  width: $container-left;
  margin: 0 auto;

  >.article-item {
    position: relative;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    margin-bottom: $xlg-pad;
    color: $black;
    background: #fff;

    .title {
      // margin-bottom: $sm-pad;
      font-size: $font-size-large;
      font-weight: 700;
      margin-top: 8px;
    }

    &.mobile-article {

      &:hover {
        background: $module-bg;
      }

      >.content {
        width: 100%;
        margin: 0;

        >a {
          display: block;
          margin-bottom: .5rem;
          width: 100%;
        }

        .meta {
          color: $descript;
        }

        .mobil-img {
          max-width: 100%;
          max-height: 200px;
        }
      }
    }

    >.content {

      >.artview-wrap{
        display: flex;
        >.artview-img{
          flex: 1;
          display: flex;
          // justify-content: center;
          align-items: center;
          margin-right: 15px;
          overflow: hidden;
          >.type{
            position: absolute;
            top: 18px;
            left: 7px;
            padding:0 5px ;
            color: #fff;
            background: rgba(76,175,80,.5);
            z-index: 1;
          }

          >.image-wrap {
            display: inline-block;
            width: 100%;
            height: 100%;
            padding: 11px 0;
          }
          img {
            width: calc(100% + .5em);
            height:110px;
          }
        }
        >.artview-contant{
          flex: 4;
          display: flex;
          flex-direction: column;
          >div{
            margin-bottom: 5px;
          }
          >.title{
            flex:2
          }
          >.abstrack {
            flex:4;
            font-size: $font-size-middle;
          }
          >.meta{
            flex:1;
            color:#767676;
            >span{
              margin-right: 2.142857rem
            }
            .icon-zan:hover{
              color:red
            }
          }
        }
      }

      >.title {
        @include content-overflow(1);
      }

      >.abstrack {
        margin: 2rem 0;
        min-height: 4rem;
        line-height: 1.8rem;
        color: $text;
        @include content-overflow(3);
      }

      >.meta {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        margin-top: $sm-pad;
        height: 1rem;
        line-height: 1rem;
        font-size: $font-size-small;
        color: $descript;
      }
    }

    >a {
      display: block;
      width: 10rem;

      >.pc-thumb {
        width: 100%;
        height: 6rem;
        line-height: 6rem;
        overflow: hidden;
      }
    }

    > .article-line {
      position: absolute;
      left: -$mlg-pad;
      bottom: -$mlg-pad;
      width: $xlg-pad * 2;
      height: 1px;
      background: $border-color;
    }
  }
  >.article-item:hover {
    position: relative;
    background: #c5c5c580;
    img {
      transform: translateX(-.5em);
    }
    // >.type{
    //   position: absolute;
    //   top: 18px;
    //   left: 7px;
    //   padding:0 5px ;
    //   color: #fff;
    //   background: #f10;
    //   z-index: 1;
    // }
  }
  .end-article {
    padding: $md-pad 0;
    color: $black;
  }

  &.mobile {
    width: 100%;

    >.end-article {
      margin-bottom: 0;
      padding: 1rem 0;
    }
  }
}


</style>
