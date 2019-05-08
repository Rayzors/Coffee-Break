<template>
  <loader key="loader" v-if="!videos" />
  <div key="empty" class="container loader" v-else-if="videos && videos.length < 1">
    Aucune vidéo disponible.
  </div>
  <div key="show" class="container" v-else>
    <ul class="grid">
      <li v-for="({id, snippet : { title }, contentDetails: {duration}}, i) of videos" :key="i">
        <article-item :id="id" :title="title.substring(0, 40)" :duration="duration"/>
      </li>
    </ul>
  </div>
</template>

<script>
import Article from '@/components/Article.vue';
import Loader from '@/components/Loader.vue';


export default {
  components: {
    'article-item': Article,
    Loader,
  },
  data() {
    return {
      videos: null,
      categoryId: this.$route.params.categoryid,
    };
  },
  async mounted() {
    if (this.$route.params.categoryid) {
      this.videos = await this.getVideosByCategory(this.$route.params.categoryid);
    }
  },
};
</script>

<style>

</style>
