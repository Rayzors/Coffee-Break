<template>
  <div class="container" v-if="videosByCategory">
      <section class="category-section" v-for="({title, items}, i) of videosByCategory" :key="i">
        <h2 class="category-title">{{ title }}</h2>
        <div data-fluffy-container
              data-fluffy-options='{"showScrollbars": false, "smartWidth": "largest"}'>
          <ul class="grid horizontal" data-fluffy-content>
            <li v-for="({id, snippet : { title }, contentDetails: {duration}}, a) of items" :key="a">
              <article-item :id="id" :title="title.substring(0, 60)" :duration="duration"/>
            </li>
          </ul>
        </div>
      </section>
  </div>
  <loader v-else />
</template>

<script>
import Article from '@/components/Article';
import Loader from '@/components/Loader';
import Fluffy from '../../node_modules/fluffy.js/src/fluffy.js';

export default {
  components: { 'article-item': Article, Loader },
  data() {
    return {
      videosByCategory: null,
    };
  },
  async created() {
    const videos = await this.getVideos();
    const categories = await this.$parent.categories;
    this.videosByCategory = this.filterVideosByCategory(categories, videos);
  },
  watch: {
    videosByCategory(val) {
      if (val) {
        setTimeout(() => {
          Fluffy.detect();
        }, 1000);
      }
    },
  },
  methods: {
    filterVideosByCategory(categories, videos) {
      return categories
        .map(({ id, snippet: { title } }) => {
          const items = videos.filter(({ snippet: { categoryId } }) => categoryId === id);
          return {
            title,
            items,
          };
        })
        .filter(({ items }) => items.length > 0).sort((a, b) => b.items.length - a.items.length);
    },
  },
};
</script>

<style lang="scss">
[data-fluffy-container] {
  background-color: rgba(255, 255, 255, 0.1);
  position: relative;
  padding: 0 25px;
  transition: background-color 1s 600ms, opacity 600ms 600ms;

  &.is-ready {
    background-color: transparent;
  }

  &.is-ready [data-fluffy-content],
  &.is-moving [data-fluffy-scrollbars] {
    opacity: 1;
  }
}

[data-fluffy-scrollbars] {
  opacity: 0;
  transition: opacity 600ms;

  .is-horizontal,
  .is-vertical {
    background-color: rgba(0, 0, 0, 0.66);
    box-shadow: inset 0 0 20px 20px rgba(255, 255, 255, 0.66);
    position: absolute;
    top: 0;
  }

  .is-horizontal {
    height: 3px;
    left: 0;
    width: 40px;
  }

  .is-vertical {
    height: 40px;
    right: 0;
    width: 3px;
  }
}

[data-fluffy-content] {
  height: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  transition: opacity 600ms 600ms;
}
</style>
