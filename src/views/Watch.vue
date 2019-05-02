<template>
  <div class="container" v-if="video">
    <div class="video__container">
      <iframe :src="`https://youtube.com/embed/${video.id}?enablejsapi=1&autoplay=1&playsinline=1&origin=${window.origin}`" frameborder="0" allowfullscreen></iframe>
    </div>
    <div class="video__informations-container">
      <div class="video__informations-container__top">

        <div class="video__informations-section">
          <h1 class="video__title">{{ video.snippet.title }}</h1>
        </div>
        <div class="video__informations-section space-between">
          Publié le {{ publishedDate }} par {{ video.snippet.channelTitle }}
          <div class="video__count">
            <div class="video__view">
              <svg id="icon-visibility" viewBox="0 0 24 24">
                <title>visibility</title>
                <path
                  d="M12 9c1.641 0 3 1.359 3 3s-1.359 3-3 3-3-1.359-3-3 1.359-3 3-3zM12 17.016c2.766 0 5.016-2.25 5.016-5.016s-2.25-5.016-5.016-5.016-5.016 2.25-5.016 5.016 2.25 5.016 5.016 5.016zM12 4.5c5.016 0 9.281 3.094 11.016 7.5-1.734 4.406-6 7.5-11.016 7.5s-9.281-3.094-11.016-7.5c1.734-4.406 6-7.5 11.016-7.5z"
                ></path>
              </svg>
              {{ this.numberWithSpaces(video.statistics.viewCount) }}
            </div>
            <div class="video__thumb blue">
              <svg id="icon-thumb_up" viewBox="0 0 24 24">
                <title>thumb_up</title>
                <path
                  d="M23.016 9.984l-0.047 0.094h0.047v1.922c0 0.281-0.047 0.516-0.141 0.75l-3.047 7.031c-0.281 0.703-0.984 1.219-1.828 1.219h-9c-1.078 0-2.016-0.938-2.016-2.016v-9.984c0-0.563 0.234-1.031 0.609-1.406l6.563-6.609 1.078 1.078c0.281 0.281 0.422 0.609 0.422 1.031v0.328l-0.984 4.594h6.328c1.078 0 2.016 0.891 2.016 1.969zM0.984 21v-12h4.031v12h-4.031z"
                ></path>
              </svg>
              {{ this.numberWithSpaces(video.statistics.likeCount) }}
            </div>
            <div class="video__thumb red">
              <svg id="icon-thumb_down" viewBox="0 0 24 24">
                <title>thumb_down</title>
                <path
                  d="M18.984 3h4.031v12h-4.031v-12zM15 3c1.078 0 2.016 0.938 2.016 2.016v9.984c0 0.563-0.234 1.031-0.609 1.406l-6.563 6.609-1.078-1.078c-0.281-0.281-0.422-0.609-0.422-1.031v-0.328l0.984-4.594h-6.328c-1.078 0-2.016-0.891-2.016-1.969l0.047-0.094h-0.047v-1.922c0-0.281 0.047-0.516 0.141-0.75l3.047-7.031c0.281-0.703 0.984-1.219 1.828-1.219h9z"
                ></path>
              </svg>
              {{ this.numberWithSpaces(video.statistics.dislikeCount) }}
            </div>
          </div>
        </div>
      </div>
      <div class="video__informations-section">
        <div
          v-html="this.parseBackToLine(video.snippet.description)"
          class="video__description"
        ></div>
      </div>
    </div>
  </div>
  <loader v-else/>
</template>

<script>
import Loader from '@/components/Loader';
import moment from 'moment';

moment.locale('fr');

export default {
  components: { Loader },
  data() {
    return {
      video: null,
      window,
    };
  },
  async created() {
    const videos = await this.getVideosByIds(this.$route.params.videoid);
    this.video = { ...videos[0] };
    this.$emit('currentVideoCategoryId', this.video.snippet.categoryId);
  },
  computed: {
    publishedDate() {
      return moment(this.video.snippet.publishedAt).format('D MMMM YYYY');
    },
  },
};
</script>

<style lang="scss">
.video {
  &__container {
    position: relative;
    padding-top: 56.25%;
    background: #000;

    iframe {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      width: 100%;
    }
  }

  &__informations-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    padding: 0;

    &__top {
      position: sticky;
      top: 60px;
      width: 100%;
      padding: 25px 50px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid darken(#fbfcfd, 3%);
    }
  }

  &__informations-section {
    display: flex;
    align-items: center;
    flex: 0 0 100%;
    margin-bottom: 10px;
  }

  &__title {
    flex: 0 0 100%;
    margin: 0 0 0;
    font-size: 20px;
  }

  &__thumbs-container {
    display: flex;
    float: row wrap;
    align-items: center;
  }

  &__count {
    display: flex;
    align-items: center;
  }

  &__thumb,
  &__view {
    display: flex;
    align-items: center;
    &:not(:last-child) {
      margin-right: 25px;
    }
  }

  &__thumb {
    &.red {
      svg {
        color: #FF3E8F;
        fill: currentColor;
        stroke: currentColor;
      }
    }

    &.blue {
      svg {
        color: #3e98ff;
        fill: currentColor;
        stroke: currentColor;
      }
    }
  }

  &__description {
    padding: 25px 50px;
    line-height: 1.4;
    flex: 0 0 100%;
  }
}

.space-between {
  justify-content: space-between;
}
</style>
