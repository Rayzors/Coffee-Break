<template>
  <article>
    <router-link :to="`/watch/${id}`" class="article-link">
      <header>
        <img :src="`https://i.ytimg.com/vi/${id}/hqdefault.jpg`" :alt="title">
        <div class="article-overlay">
          <div class="play">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <filter id="dropshadow" width="130%" height="150%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="0" dy="4" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.2"/>
                </feComponentTransfer>
                <feMerge> 
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <title>play_arrow</title>
              <path d="M8.016 5.016l10.969 6.984-10.969 6.984v-13.969z" style="filter:url(#dropshadow)"></path>
            </svg>
          </div>
        </div>
        <div class="duration" v-if="duration">{{ parsedDuration }}</div>
      </header>
      <h2 class="article-title">{{ title }}</h2>
    </router-link>
  </article>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    id: String,
    title: String,
    duration: String,
  },
  computed: {
    parsedDuration() {
      return moment
        .utc(moment.duration(this.duration).asMilliseconds())
        .format('mm:ss');
    },
  },
};
</script>

<style lang="scss">
.article-link {
  display: block;
  position: relative;
  transition: 260ms ease;
  text-decoration: none;
  border-radius: 10px;

  header {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 24px 50px rgba(0, 0, 0, 0.2);
    padding-top: 56.25%;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 10px;
      object-fit: cover;
      transition: 260ms ease;
    }

    .duration {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: #121212;
      color: #fff;
      padding: 5px;
      border-radius: 10px;
      font-size: 14px;
      box-shadow: 0 24px 30px rgba(0, 0, 0, 0.2);
    }
  }

  &:hover {
    transform: scale(1.1);
    z-index: 2;

    img {
      filter: blur(5px);
    }

    .article-overlay {
      opacity: 1;
      background: linear-gradient(
        45deg,
        rgba(#ff3e8f, 0.9),
        rgba(#ffba8f, 0.9)
      );
      color: #fff;
      font-size: 14px;
      padding: 10px;

      .play {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    }
  }
}

.article-title {
  text-align: center;
  margin-top: 1.5em;
  font-size: 14px;
  color: lighten(#121212, 20%);
}

.article-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: 260ms ease;

  .play{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0%);
    color: #fff;
    opacity: 0;
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    transition: 260ms ease-out 130ms;

    svg {
      fill: currentColor;
      width: 1em;
      height: 1em;
      font-size: 3em;
    }
  }
}
</style>
